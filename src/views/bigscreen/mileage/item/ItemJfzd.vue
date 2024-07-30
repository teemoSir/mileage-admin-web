<template>
	<div style="background: #6699ff; width: 100%">
		<a-row style="text-align: center; font-size: 16px; color: #ffffff; padding: 4px 0">
			<a-col :span="4">车牌号</a-col>
			<a-col :span="4">车牌颜色</a-col>
			<a-col :span="5">计费车型</a-col>
			<a-col :span="6">计费里程(公里)</a-col>
			<a-col :span="5">计费金额(元)</a-col>
		</a-row>
	</div>
	<div id="publishMain" class="b_list" :style="{ height: `${boxHeigth}px` }">
		<div id="publishMain1">
			<div style="margin: 5px 10px 10px 0">
				<div v-for="(item, acindex) in tableArray" :key="acindex" style="font-size: 14px">
					<a-row style="text-align: center; padding-top: 8px">
						<a-col :span="4">{{ item.vehiclePlate }}</a-col>
						<a-col :span="4">
							<div v-for="etcVehicleColor in etcVehicleColorOptions" :key="etcVehicleColor.value">
								<span v-if="etcVehicleColor.value == item.vehiclePlateColor">{{ etcVehicleColor.label }}</span>
							</div>
						</a-col>
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
		<div id="publishMain2"></div>
	</div>
</template>

<script setup name="ItemJfgkTop10">
	import bigscreenApi from '@/api/billing/bigscreenApi'
	const loadSpinning = ref(false)
	const tableArray = ref([])
	import tool from '@/utils/tool'
	import { onMounted } from 'vue'
	let page = ref(1)
	const timer = ref()
	const queryParam = ref()
	const boxHeigth = ref()

	//车辆类型
	const vehicleTypeOptions = tool.dictList('vehicleType')
	//车辆颜色
	const etcVehicleColorOptions = tool.dictList('etcVehicleColor')

	const columns = [
		{ title: '车牌号', dataIndex: 'vehiclePlate' },
		{ title: '车牌颜色', dataIndex: 'vehiclePlateColor' },
		{ title: '计费车型', dataIndex: 'vehicleType' },
		{ title: '计费里程(公)', dataIndex: 'chargeDistance' },
		{ title: '计费金额(元)', dataIndex: 'chargeAmount' }
	]

	// const windowOnload = () => {
	// 	let winHeight = 0
	// 	if (window.innerHeight) {
	// 		winHeight = window.innerHeight
	// 	} else if (document.body && document.body.clientHeight) {
	// 		winHeight = document.body.clientHeight
	// 	}
	// 	let sjHeight = (winHeight - 120) / 3
	// 	if (sjHeight > 350) {
	// 		boxHeigth.value = sjHeight
	// 	} else {
	// 		boxHeigth.value = 350
	// 	}
	//
	// 	boxHeigth.value = boxHeigth.value - 100
	// }
	//
	// onMounted(() => {
	// 	windowOnload()
	// })

	const onOpen = (record) => {
		boxHeigth.value = record.boxHeigth - 100
		queryParam.value = record
		loadSpinning.value = true
		tableArray.value = []

		queryBigScreenJfzd()

		window.setInterval(function () {
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
		let ul2 = document.getElementById('publishMain2')
		let box = document.getElementById('publishMain')
		ul2.innerHTML = ul1.innerHTML
		box.scrollTop = 0
		function rollStart() {
			if (box.scrollTop >= ul1.scrollHeight) {
				box.scrollTop = 0
			} else {
				box.scrollTop++
			}
		}
		timer.value = setInterval(rollStart, 50)
	}

	defineExpose({
		onOpen
	})
</script>
<style lang="less">
	.b_list {
		margin-top: 10px;
		height: 19rem;
		overflow: hidden;
	}
</style>
