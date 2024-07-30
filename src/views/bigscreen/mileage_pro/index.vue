<template>
<div class="screen-body">
	<div class="screen-top">
        <div class="header">
          <span class="headerSpan">北斗自由流收费监控大屏</span>
        </div>
		<div class="main-pic">
			<a-image
				:src="screenTopImage"
				:preview="false"
			/>
		</div>
		<div class="home-data-check">
			<CommonCheckBox @menuClick="menuClick" :menu="dataMenu"/>
			<div class="home-data-check-date">
				<span class="show-date">{{showDate}}</span>
				<span class="show-time">{{showTime}}</span>
			</div>
		</div>
		<div class="pic-logo">
			<a-image
				:src="screenLogoImage"
				:preview="false"
			/>
		</div>
	</div>
	<a-row class="chart-body">
		<a-col id="screenTop" class="chart-left" :span="7">
			<div class="left-top">
				<ChartZtgk ref="ChartZtgkRef"/>
			</div>
			<div class="left-mid">
				<ChartJfgkph :height="jfgkphHeight" ref="ChartJfgkphRef"/>
			</div>
			<div class="left-bottom">
				<ChartCxjfgk :height="chartHeight" title="车型计费概况" chart-id="ChartCxjfgkId" ref="ChartCxjfgkRef"/>
			</div>
		</a-col>
		<a-col class="chart-mid" :span="10">
			<div class="mid-top">
				<CommonNumberShow ref="CommonNumberShowRef" class="number-show"/>
			</div>
			<div class="mid-mid">
				<MapGaoDe class="map-gaode"/>
			</div>
			<div class="mid-bottom">
				<ChartJfzd :height="jfzdHeight" ref="ChartJfzdRef"/>
			</div>
		</a-col>
		<a-col class="chart-right" :span="7">
			<div class="right-top">
				<ChartLcgkfx :height="chartHeight" title="里程概况分析" chart-id="ChartLcgkfxId" ref="ChartLcgkfxRef"/>
			</div>
			<div class="right-mid">
				<ChartJfjeqs :height="chartHeight" title="计费金额趋势" chart-id="ChartJfjeqsId" ref="ChartJfjeqsRef"/>
			</div>
			<div class="right-bottom">
				<ChartJtllqs :height="chartHeight" title="交通流量趋势" chart-id="ChartJtllqsId" ref="ChartJtllqsRef"/>
			</div>
		</a-col>
	</a-row>
</div>
</template>

<script setup>
import autofit from 'autofit.js'
import ChartCxjfgk from "@/views/bigscreen/mileage_pro/item/ChartCxjfgk.vue";
import ChartJtllqs from "@/views/bigscreen/mileage_pro/item/ChartJtllqs.vue";
import ChartJfjeqs from "@/views/bigscreen/mileage_pro/item/ChartJfjeqs.vue";
import ChartLcgkfx from "@/views/bigscreen/mileage_pro/item/ChartLcgkfx.vue";
import ChartJfzd from "@/views/bigscreen/mileage_pro/item/ChartJfzd.vue";
import ChartJfgkph from "@/views/bigscreen/mileage_pro/item/ChartJfgkph.vue";
import CommonCheckBox from "@/views/bigscreen/mileage_pro/item/CommonCheckBox.vue";
import ChartZtgk from "@/views/bigscreen/mileage_pro/item/ChartZtgk.vue";
import MapGaoDe from "@/views/bigscreen/mileage_pro/item/MapGaoDe.vue";
import CommonNumberShow from "@/views/bigscreen/mileage_pro/item/CommonNumberShow.vue";

import screenTopImage from '@/assets/images/bigscreen_pro/screen_pro_guide2.png'
import screenLogoImage from '@/assets/images/bigscreen_pro/screen_logo.png'
import bigscreenApi from '@/api/billing/bigscreenApi' // 获取日、周、月、年请求参数
import { onMounted } from 'vue'
import dayjs from "dayjs";

const ChartCxjfgkRef = ref() // 车型计费概况
const ChartJtllqsRef = ref() // 交通流量趋势
const ChartJfjeqsRef = ref() // 计费金额趋势
const ChartLcgkfxRef = ref() // 里程概况分析
const ChartJfzdRef = ref() // 计费账单
const ChartJfgkphRef = ref() // 计费概况排行
const CommonNumberShowRef = ref() // 地图
const ChartZtgkRef = ref() // 总体概况

const boxHeight = ref(350)
let createQueryParam = ref()

const dataMenu = ref(['本日','本周','本月','本年'])
const showDate = ref('')
const showTime = ref('')

const totalHeight = ref()
const chartHeight = ref(294.67)
const jfgkphHeight = ref(248)
const jfzdHeight = ref(220)

let clearTime

const selectTimeChQuery = (value) => {
	let param = createQueryParam.value[value]
	param.timeType = value
	param.boxHeigth = boxHeight.value
	ChartCxjfgkRef.value.onOpen(param)
	ChartJtllqsRef.value.onOpen(param)
	ChartJfjeqsRef.value.onOpen(param)
	ChartLcgkfxRef.value.onOpen(param)
	ChartJfzdRef.value.onOpen(param)
	ChartJfgkphRef.value.onOpen(param)
	CommonNumberShowRef.value.onOpen(param)
	ChartZtgkRef.value.onOpen(param)
}

const windowOnload = () => {
	let winHeight = 0
	if (window.innerHeight) {
		winHeight = window.innerHeight
	} else if (document.body && document.body.clientHeight) {
		winHeight = document.body.clientHeight
	}
	let sjHeight = (winHeight - 120) / 3
	if (sjHeight > 350) {
		boxHeight.value = sjHeight
	} else {
		boxHeight.value = 350
	}

	let total = document.getElementById('screenTop')
	const totalHeightString = window.getComputedStyle(total).height
	totalHeight.value = Number(totalHeightString.substring(0, totalHeightString.length - 2))

	const cz = window.innerHeight % 1080
	console.log(cz)
	console.log(cz * 1080 / window.innerHeight)
	console.log(window.innerWidth)
	console.log(window.innerHeight)

	const fblMap = new Map()
		.set('2560#1600', 336)
		.set('2048#1536', 454)
		.set('1920#2160', 710)
		.set('1920#1440', 434)
		.set('1920#1200', 334)
		.set('1680#1050', 334)
		.set('1600#1200', 434)
		.set('1600#1024', 350)
		.set('1440#900', 330)
		.set('1366#768', 288)

	const jfgkphMap = new Map()
		.set('2560#1600', 290)
		.set('2048#1536', 400)
		.set('1920#2160', 600)
		.set('1920#1440', 368)
		.set('1920#1200', 290)
		.set('1680#1050', 290)
		.set('1600#1200', 370)
		.set('1600#1024', 300)
		.set('1440#900', 290)
		.set('1366#768', 250)

	const jfzdMap = new Map()
		.set('2560#1600', 250)
		.set('2048#1536', 344)
		.set('1920#2160', 510)
		.set('1920#1440', 320)
		.set('1920#1200', 256)
		.set('1680#1050', 250)
		.set('1600#1200', 320)
		.set('1600#1024', 260)
		.set('1440#900', 254)
		.set('1366#768', 220)

	if (1920 * window.innerHeight === 1080 * window.innerWidth) {
		chartHeight.value = 294.67
		jfgkphHeight.value = 248
		jfzdHeight.value = 220
	} else {
		chartHeight.value = fblMap.get(`${window.innerWidth}#${window.innerHeight}`)
		jfgkphHeight.value = jfgkphMap.get(`${window.innerWidth}#${window.innerHeight}`)
		jfzdHeight.value = jfzdMap.get(`${window.innerWidth}#${window.innerHeight}`)
	}
	bigscreenApi.createQueryParam().then((data) => {
		if (data) {
			createQueryParam.value = data
			nextTick(() => {
				selectTimeChQuery(0)
			})
		}
	})
}

const menuClick = (index) => {
	selectTimeChQuery(index)
}

const getTime = () => dayjs().format('YYYY/MM/DD HH:mm:ss')

onMounted(() => {
	windowOnload()
	autofit.init({
		designHeight: 1080,
		designWidth: 1920,
		renderDom:"#app",
		resize: true
	})
	clearTime = setInterval(() => {
		const tempData = showTime.value = getTime()
		showDate.value = tempData.substring(0, 10);
		showTime.value = tempData.substring(11);
	}, 1000)
})

onUnmounted(() => clearTimeout(clearTime))

</script>

<style lang="less" scoped>
.screen-body {
	width: 100%;
	height: 100%;
	background-image: url("../../../assets/images/bigscreen_pro/bigscreenbj.png");
	background-repeat: no-repeat;
	background-size: cover; /* 调整背景图片大小以完全覆盖容器 */
	background-position: center; /* 将背景图片居中对齐 */
	background-attachment: fixed; /* 设置背景图片固定位置 */
	display: flex;
	flex-direction: column;
	.map-gaode {
		width: 100%;
		height: 100%;
		position: absolute;
	}
	.chart-body {
		flex: 1;
		padding-top: 70px;
		.chart-left {
			.left-top {
				height: 33.3%;
			}
			.left-mid {
				height: 33.3%;
			}
			.left-bottom {
				height: 33.3%;
			}
		}
		.chart-mid {
			// 允许点击穿透
			// pointer-events: none;
			.mid-top {
				height: 13.33%;
				padding-top: 22px;
			}
			.mid-mid {
				height: 59.66%;
				overflow: hidden;
				// pointer-events: none;
			}
			.mid-bottom {
				height: 27%;
			}
		}
		.chart-right {
			.right-top {
				height: 33.33%;
			}
			.right-mid {
				height: 33.33%;
			}
			.right-bottom {
				height: 33.33%;
			}
		}
	}
	.screen-top {
		width: 100%;
		position: absolute;
		.pic-logo {
			position: absolute;
			top: 20px;
			left: 20px;
		}
		.main-pic {
			width: 100%;
			position: absolute;
			top: 0;
			text-align: center;
		}
		.home-data-check {
			z-index: 9;
			position: absolute;
			top: 0;
			right: 0;
			padding-top: 4px;
			background: #09182e;
			height: 36px;
			.home-data-check-date {
				text-align: end;
				margin-right: 20px;
				margin-top: 6px;
				.show-date {
					color: #5788f2;
					padding-right: 18px;
					font-size: 16px;
					font-family: 'sm';
				}
				.show-time {
					color: #ffffff;
					font-size: 18px;
					font-family: 'sm';
				}
			}
		}

		.header {
			z-index: 1;
			height: 90px;
			width: 100%;
			position: relative;
			filter: drop-shadow(0 0.1rem 0.1rem rgba(0, 0, 0, 0.5));
			padding-top: 10px;
			text-align: center;
			color: #ffffff;
			font-size: 35px;
			font-weight: bold;
			font-weight: bold;
			font-family: 'ab_blod';
		}
		.headerSpan {

		}
	}
}
</style>
