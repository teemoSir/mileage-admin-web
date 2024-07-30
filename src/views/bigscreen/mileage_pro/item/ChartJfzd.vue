<template>
	<div style="padding: 0 20px; height: 100%">
		<div style="width: 100%">
			<a-row class="title">
				<a-col :span="4"><span class="title-item">车牌号</span></a-col>
				<a-col :span="4"><span class="title-item">行驶状态</span></a-col>
				<a-col :span="5"><span class="title-item">计费车型</span></a-col>
				<a-col :span="6"><span class="title-item">计费里程(公里)</span></a-col>
				<a-col :span="5"><span class="title-item">计费金额(元)</span></a-col>
			</a-row>
		</div>
		<div id="publishMain" :style="{ height: `${height}px` }" class="b_list">
			<div id="publishMain1">
				<div style="margin: 5px 10px 10px 0">
					<div v-for="(item, acindex) in tableArray" :key="acindex" style="font-size: 14px">
						<a-row class="content-item">
							<a-col :span="4"
								><span :class="'content-item-' + item.vehiclePlateColor">{{ item.vehiclePlate }}</span>
							</a-col>
							<!--							<a-col :span="4">-->
							<!--								<div v-for="etcVehicleColor in etcVehicleColorOptions" :key="etcVehicleColor.value">-->
							<!--									<span v-if="etcVehicleColor.value == item.vehiclePlateColor">{{ etcVehicleColor.label }}</span>-->
							<!--								</div>-->
							<!--							</a-col>-->
							<a-col :span="4"> {{ item.endTime == null || item.endTime == '' ? '行驶中' : '结束' }} </a-col>
							<a-col :span="5">
								<div v-for="vehicleType in vehicleTypeOptions" :key="vehicleType.value">
									<span v-if="vehicleType.value == item.vehicleType">{{ vehicleType.label }}</span>
								</div>
							</a-col>
							<a-col :span="6">{{ item.chargeDistance }}</a-col>
							<a-col :span="5">{{ item.chargeAmount }}</a-col>
						</a-row>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup name="ChartJfzd">
	import bigscreenApi from '@/api/billing/bigscreenApi'
	const loadSpinning = ref(false)
	const tableArray = ref([])
	import tool from '@/utils/tool'
	let page = ref(1)
	const timer = ref()
	const netTimer = ref()
	const queryParam = ref()
	const boxHeigth = ref()

	//车辆类型
	const vehicleTypeOptions = tool.dictList('vehicleType')
	//车辆颜色
	const etcVehicleColorOptions = tool.dictList('etcVehicleColor')

	const columns = [
		{ title: '车牌号', dataIndex: 'vehiclePlate' },
		{ title: '行驶状态', dataIndex: 'endTime' },
		{ title: '计费车型', dataIndex: 'vehicleType' },
		{ title: '计费里程(公)', dataIndex: 'chargeDistance' },
		{ title: '计费金额(元)', dataIndex: 'chargeAmount' }
	]

	const props = defineProps({
		height: {
			type: Number,
			default: ''
		}
	})

	const onOpen = (record) => {
		boxHeigth.value = record.boxHeigth - 100
		queryParam.value = record
		loadSpinning.value = true
		tableArray.value = []

		queryBigScreenJfzd()

		if (netTimer.value) {
			clearInterval(netTimer.value)
		}
		netTimer.value = setInterval(function () {
			repqueryBigScreenJfzd()
			console.log('每隔60秒钟执行一次')
		}, 60000)
	}

	const queryBigScreenJfzd = () => {
		queryParam.value.page = page.value
		bigscreenApi.queryBigScreenJfzd(queryParam.value).then((data) => {
			if (data) {
				tableArray.value = data
				nextTick(() => {
					rollUp()
				})
			}
			page.value = page.value + 1
			loadSpinning.value = false
		})
	}

	const repqueryBigScreenJfzd = () => {
		queryParam.value.page = page.value
		bigscreenApi.queryBigScreenJfzd(queryParam.value).then((data) => {
			if (data) {
				tableArray.value = data
				if (data.length < 1) {
					page.value = 1
				}
			} else {
				page.value = 1
			}
			page.value = page.value + 1
			loadSpinning.value = false
		})
	}

	const rollUp = () => {
		let ul1 = document.getElementById('publishMain1')
		let box = document.getElementById('publishMain')
		box.scrollTop = 0
		let maxTop = -1
		function rollStart() {
			if (box.scrollTop === maxTop) {
				box.scrollTop = 0
			}
			if (box.scrollTop >= ul1.scrollHeight) {
				box.scrollTop = 0
			} else {
				maxTop = box.scrollTop
				box.scrollTop++
			}
		}
		if (timer.value) {
			clearInterval(timer.value)
		}
		timer.value = setInterval(rollStart, 50)
	}

	onUnmounted(() => {
		// 清除定时器
		if (timer.value) {
			clearInterval(timer.value)
		}
		if (netTimer.value) {
			clearInterval(netTimer.value)
		}
	})

	defineExpose({
		onOpen
	})
</script>
<style lang="less">
	.title {
		text-align: center;
		font-size: 16px;
		color: #ffffff;
		padding: 4px 0;
		.title-item {
			// background: linear-gradient(to right, #185eb2aa, #185eb288, #185eb200);
			background-image: url('@/assets/images/bigscreen_pro/table_title.png');
			background-size: 100% 100%;
			padding: 2px 14px;
			border-radius: 4px;
		}
	}
	.b_list {
		margin-top: 10px;
		overflow: hidden;
		height: 100%;
		.content-item {
			text-align: center;
			padding: 6px 0;
			color: #9fbcdd;
			font-size: 16px;
			font-family: 'sm';
			.content-item-0 {
				color: #fff !important;
				background-image: url('@/assets/images/new/blue_1_icon.png');
				background-size: 100% 100%;
				padding: 2px 14px;
				border-radius: 4px;
			}
			.content-item-1 {
				color: #000000 !important;
				background-image: url('@/assets/images/new/yellow_1_icon.png');
				background-size: 100% 100%;
				padding: 2px 14px;
				border-radius: 4px;
			}
			.content-item-2 {
				color: #fff !important;
				background-image: url('@/assets/images/new/black_1_icon.png');
				background-size: 100% 100%;
				padding: 2px 14px;
				border-radius: 4px;
			}
			.content-item-3 {
				color: #000000 !important;
				background-image: url('@/assets/images/new/white_1_icon.png');
				background-size: 100% 100%;
				padding: 2px 14px;
				border-radius: 4px;
			}
			.content-item-4 {
				color: #000000 !important;
				background-image: url('@/assets/images/new/gradientgreen_1_icon.png');
				background-size: 100% 100%;
				padding: 2px 14px;
				border-radius: 4px;
			}
			.content-item-5 {
				color: #000000 !important;
				background-image: url('@/assets/images/new/yellowgreen_1_icon.png');
				background-size: 100% 100%;
				padding: 2px 14px;
				border-radius: 4px;
			}
			.content-item-6 {
				color: #000000 !important;
				background-image: url('@/assets/images/new/gradientblue_1_icon.png');
				background-size: 100% 100%;
				padding: 2px 14px;
				border-radius: 4px;
			}
			.content-item-11 {
				color: #000000 !important;
				background-image: url('@/assets/images/new/green_1_icon.png');
				background-size: 100% 100%;
				padding: 2px 14px;
				border-radius: 4px;
			}
			.content-item-12 {
				color: #000000 !important;
				background-image: url('@/assets/images/new/red_1_icon.png');
				background-size: 100% 100%;
				padding: 2px 14px;
				border-radius: 4px;
			}
		}
	}
</style>
