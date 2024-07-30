<template>
	<div class="home-css">
		<div class="map">
			<HainanMap class="map"></HainanMap>
		</div>
		<div class="header">
			<h1 style="font-weight: 700">北斗自由流收费监控大屏</h1>
		</div>
		<div style="position: relative; top: -90px">
			<div class="headTitleLeft">
				<img src="/src/assets/images/index_03.jpg" class="carousel-images" />
				<span style="margin-left: 10px; color: white">{{ showTime }}</span>
			</div>
		</div>
		<div style="position: relative; top: -90px">
			<div class="headTitleRight">
				<a-tag :color="selectTimeValue[0]" @click="selectTimeChQuery(0)">
					<a href="#" :style="fontColor(0)">本日</a>
				</a-tag>
				<a-tag :color="selectTimeValue[1]" @click="selectTimeChQuery(1)">
					<a href="#" :style="fontColor(1)">本周</a>
				</a-tag>
				<a-tag :color="selectTimeValue[2]" @click="selectTimeChQuery(2)">
					<a href="#" :style="fontColor(2)">本月</a>
				</a-tag>
				<a-tag :color="selectTimeValue[3]" @click="selectTimeChQuery(3)">
					<a href="#" :style="fontColor(3)">本年</a>
				</a-tag>
			</div>
		</div>
		<div style="position: relative; top: -90px">
			<ItemHead ref="ItemHeadRef"></ItemHead>
		</div>
		<div class="main">
			<a-row>
				<a-col :span="7">
					<div class="newStatistics-box" :style="{ height: `${boxHeigth}px` }">
						<div class="new-title" style="background-size: 35% 100%">
							<span>总体概况</span>
						</div>
						<div class="beidou-title">
							<ItemZtgk ref="ItemZtgkRef"></ItemZtgk>
						</div>
					</div>
				</a-col>
				<a-col :span="7" :offset="10">
					<div class="newStatistics-box" :style="{ height: `${boxHeigth}px` }">
						<div class="new-title" style="background-size: 50% 100%">
							<span>里程概况分析</span>
						</div>
						<div class="beidou-title">
							<div style="width: 90%; text-align: right; margin-top: -25px">
								<a-radio-group
									v-model:value="jflcfxVehicleType"
									style="margin-right: 10px"
									size="small"
									button-style="solid"
									@change="paneChangeVehicleype"
								>
									<a-radio-button value="1">按车辆</a-radio-button>
									<a-radio-button value="2">按车次</a-radio-button>
								</a-radio-group>
							</div>
							<ZhuZhuangTu02Lcgkfx01
								ref="ZhuZhuangTu02Lcgkfx01Ref"
								v-show="1 == jflcfxVehicleType"
							></ZhuZhuangTu02Lcgkfx01>
							<ZhuZhuangTu02Lcgkfx02
								ref="ZhuZhuangTu02Lcgkfx02Ref"
								v-show="2 == jflcfxVehicleType"
							></ZhuZhuangTu02Lcgkfx02>
						</div>
					</div>
				</a-col>
			</a-row>
			<a-row>
				<a-col :span="7">
					<div class="newStatistics-box" :style="{ height: `${boxHeigth}px` }">
						<div class="new-title" style="background-size: 50% 100%">
							<span>车型计费概况</span>
						</div>
						<div class="beidou-title">
							<ItemCxjfgk ref="ItemCxjfgkRef"></ItemCxjfgk>
						</div>
					</div>
				</a-col>
				<a-col :span="7" :offset="10">
					<div class="newStatistics-box" :style="{ height: `${boxHeigth}px` }">
						<div class="new-title" style="background-size: 50% 100%">
							<span>计费金额趋势</span>
						</div>
						<div class="beidou-title">
							<ItemJfjeqs ref="ItemJfjeqsRef"></ItemJfjeqs>
						</div>
					</div>
				</a-col>
			</a-row>
			<a-row>
				<a-col :span="7">
					<div class="newStatistics-box" :style="{ height: `${boxHeigth}px` }">
						<div class="new-title" style="background-size: 58% 100%">
							<span>计费概况Top 10</span>
						</div>
						<div class="beidou-title">
							<ItemJfgkTop10 ref="ItemJfgkTop10Ref"></ItemJfgkTop10>
						</div>
					</div>
				</a-col>
				<a-col :span="10">
					<div class="newStatistics-box newStatistics-box-center" :style="{ height: `${boxHeigth}px` }">
						<div class="new-title" style="background-size: 25% 100%">
							<span>计费账单</span>
						</div>
						<div class="beidou-title">
							<ItemJfzd ref="ItemJfzdRef"></ItemJfzd>
						</div>
					</div>
				</a-col>
				<a-col :span="7">
					<div class="newStatistics-box" :style="{ height: `${boxHeigth}px` }">
						<div class="new-title" style="background-size: 50% 100%">
							<span>交通流量趋势</span>
						</div>
						<div class="beidou-title">
							<ItemJtllqs ref="ItemJtllqsRef"></ItemJtllqs>
						</div>
					</div>
				</a-col>
			</a-row>
		</div>
	</div>
</template>

<script setup name="bigscreenmileage">
	import tool from '@/utils/tool'
	// import { BorderBox11 } from '@dataview/datav-vue3'
	import HainanMap from './HainanMap.vue'
	import ItemZtgk from '@/views/bigscreen/mileage/item/ItemZtgk.vue'
	import ItemCxjfgk from './item/ItemCxjfgk.vue'
	import { onMounted } from 'vue'
	import bigscreenApi from '@/api/billing/bigscreenApi'
	import ItemJfgkTop10 from './item/ItemJfgkTop10.vue'
	import ZhuZhuangTu02Lcgkfx01 from './item/ZhuZhuangTu02Lcgkfx01.vue'
	import ZhuZhuangTu02Lcgkfx02 from './item/ZhuZhuangTu02Lcgkfx02.vue'
	import ItemJfjeqs from './item/ItemJfjeqs.vue'
	import ItemJtllqs from './item/ItemJtllqs.vue'
	import ItemJfzd from './item/ItemJfzd.vue'
	import ItemHead from './item/ItemHead.vue'
	import dayjs from 'dayjs'
	const boxHeigth = ref()
	// const selectTimeValue = ref(['', '#2db7f5', '#2db7f5', '#2db7f5'])
	const selectTimeValue = ref(['#6784ED', '', '', ''])
	const selectTimeValueType = ref(0)
	let createQueryParam = ref()
	const ItemZtgkRef = ref()
	const ItemCxjfgkRef = ref()
	const ItemJfgkTop10Ref = ref()
	const ZhuZhuangTu02Lcgkfx01Ref = ref()
	const ZhuZhuangTu02Lcgkfx02Ref = ref()
	const ItemJfjeqsRef = ref()
	const ItemJtllqsRef = ref()
	const ItemJfzdRef = ref()
	const color = ref()
	const ItemHeadRef = ref()
	let jflcfxVehicleType = ref('1')
	let clearTime
	const showTime = ref()

	onMounted(() => {
		windowOnload()
		clearTime = setInterval(() => (showTime.value = getTime()), 1000)
	})

	onUnmounted(() => clearTimeout(clearTime))

	const getTime = () => dayjs().format('YYYY-MM-DD HH:mm:ss')

	const fontColor = (i) => ({ color: selectTimeValueType.value == i ? 'white' : '#1E90FF' })

	const windowOnload = () => {
		let winHeight = 0
		if (window.innerHeight) {
			winHeight = window.innerHeight
		} else if (document.body && document.body.clientHeight) {
			winHeight = document.body.clientHeight
		}
		let sjHeight = (winHeight - 120) / 3
		if (sjHeight > 350) {
			boxHeigth.value = sjHeight
		} else {
			boxHeigth.value = 350
		}
		// var html = document.getElementsByTagName('html')[0];
		// if(document.body.offsetHeight < windowHeight){
		// 	html.style.height = windowHeight
		// }

		bigscreenApi.createQueryParam().then((data) => {
			if (data) {
				console.log('============222222222222')
				console.log(data)
				createQueryParam.value = data
				nextTick(() => {
					selectTimeChQuery(0)
				})
			}
		})
	}

	const selectTimeChQuery = (value) => {
		// selectTimeValue.value = ['#2db7f5', '#2db7f5', '#2db7f5', '#2db7f5']
		// selectTimeValue.value[value] = ''
		selectTimeValue.value = ['', '', '', '']
		selectTimeValue.value[value] = '#6784ED'
		selectTimeValueType.value = value
		// $('#' + value).css('background', '#fff0f6')
		let param = createQueryParam.value[value]
		param.timeType = value
		param.boxHeigth = boxHeigth.value
		console.log('==================')
		console.log(param)
		ItemHeadRef.value.onOpen(param)

		ItemZtgkRef.value.onOpen(param)
		ItemCxjfgkRef.value.onOpen(param)
		ItemJfgkTop10Ref.value.onOpen(param)
		paneChangeVehicleype(param)
		ItemJfjeqsRef.value.onOpen(param)
		ItemJtllqsRef.value.onOpen(param)

		ItemJfzdRef.value.onOpen(param)
	}

	const paneChangeVehicleype = () => {
		nextTick(() => {
			if (1 == jflcfxVehicleType.value) {
				//按车辆
				ZhuZhuangTu02Lcgkfx01Ref.value.onOpen(createQueryParam.value[selectTimeValueType.value])
			} else if (2 == jflcfxVehicleType.value) {
				//按车次
				ZhuZhuangTu02Lcgkfx02Ref.value.onOpen(createQueryParam.value[selectTimeValueType.value])
			}
		})
	}
</script>
<style lang="less">
	.main {
		padding: 5px 10px 0px 10px;
	}
	.map {
		position: absolute;
		left: 0;
		//right: 0;
		top: 0px;
		bottom: 0;
		width: 100%;
		height: 30%;
		background: transparent !important;
	}
	.headTitleLeft {
		z-index: 100;
		position: absolute;
		top: 8px;
		left: 20px;
	}
	.carousel-images {
		height: 25px;
		width: 150px;
		cursor: pointer;
	}
	.headTitleRight {
		z-index: 100;
		position: absolute;
		top: 10px;
		right: 15px;
		span {
			margin: 0;
		}
	}
	.headBotton {
		z-index: 999;
		background: #add8e6;
		width: 40px;
		text-align: center;
		margin-left: 3px;
		display: inline-block;
	}
	.header {
		z-index: 88;
		height: 90px;
		width: 100%;
		position: relative;
		filter: drop-shadow(0 0.1rem 0.1rem rgba(0, 0, 0, 0.5));
	}
	.header::before {
		content: '';
		display: block;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		z-index: 2;
		clip-path: polygon(0 0, 100% 0, 100% 45%, 65% 45%, 63% 100%, 37% 100%, 35% 45%, 0 45%);
		background: linear-gradient(rgba(20, 120, 200, 1) 0, rgba(100, 170, 222, 1) 100%);
	}
	.header h1 {
		text-align: center;
		top: 30%;
		position: relative;
		font-size: 2rem;
		color: #fff;
		z-index: 3;
	}
	.home-css {
		//min-width: 1920px;
		width: 100%;
		min-height: 100%;
		background: #bbd5f7;
		background-size: 100% 100%;
		//padding: 0px 10px 0px 10px;
		overflow: auto;
	}
	//隐藏滚动条
	::-webkit-scrollbar {
		width: 0px;
	}

	.newStatistics-box {
		background: #fff;
		border-radius: 5px;
		// padding: 10px 10px 10px 10px;
		padding: 0px 10px 10px 0px;
		margin-top: 10px;
	}

	.newStatistics-box-center {
		//margin: 0px 10px 0px 10px;
		margin-left: 10px;
		margin-right: 10px;
	}

	.new-title {
		background-image: url('../../../assets/images/bigscreen/left_top_bg@2x.png');
		background-repeat: no-repeat;
		position: relative;
		span {
			font-size: 20px;
			font-weight: bold;
			// color: #404040;
			color: #4976e4;
			line-height: 30px;
			margin-left: 10px;
		}
		// &:before {
		// 	content: '';
		// 	width: 4px;
		// 	height: 20px;
		// 	background: rgba(41, 115, 207, 1);
		// 	position: absolute;
		// 	left: 0;
		// 	top: 50%;
		// 	transform: translateY(-50%);
		// }
	}
	// .clear {
	// 	clear: both;
	// }
	.beidou-title {
		margin: 0 10px;
		padding: 10px 0 10px 10px;
		font-size: 18px;
		p {
			color: rgba(255, 192, 96, 1);
		}
		.gradient-line-row {
			top: 45px;
		}
	}
	.boxheight {
		min-height: 300px;
		//height: auto;
	}
</style>
