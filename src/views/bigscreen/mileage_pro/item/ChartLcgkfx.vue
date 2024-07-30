<template>
	<a-spin class="chart-body" :spinning="loadSpinning">
		<CommonTitle @menu-click="menuClick"  :menu="menu" :title="props.title" />
		<a-row>
			<a-col :span="24">
				<div  :style="{ height: `${height}px`}" class="chart-main" :id="props.chartId"></div>
			</a-col>
		</a-row>
	</a-spin>
</template>

<script setup name="ChartLcgkfx">
import bigscreenApi from '@/api/billing/bigscreenApi'
import CommonTitle from "@/views/bigscreen/mileage_pro/item/CommonTitle.vue";
import * as echarts from "echarts"
import tool from "@/utils/tool";
const loadSpinning = ref(false)
const menu = ref(['按车辆','按车次'])

let menuIndex = 0
let requestParam = null

const tipUnit = new Map()
	.set('总计费车辆','辆')
	.set('总计费车次','次')
	.set('总计费里程','公里')
	.set('平均计费里程',menuIndex === 0 ? '公里/辆' : '公里/次')

const tipColor = new Map()
	.set('总计费车辆','#2f66db')
	.set('总计费车次','#2f66db')
	.set('总计费里程','#57e0f0')
	.set('平均计费里程','#ff9f59')

const vehicleTypeOptions = tool.dictList('vehicleType')
let vehicleTypeMap = null

const props = defineProps({
	chartId: {
		type: String,
		default: 'ChartJtllqs'
	},
	title: {
		type: String,
		default: ''
	},
	height: {
		type: Number,
		default: ''
	}
})

const menuClick = (index) => {
	if (index !== menuIndex) {
		menuIndex = index
		onOpen()
	}
}

const onOpen = (record) => {
	loadSpinning.value = true
	if (record) {
		requestParam = record
	}
	doRequest()
}

const doRequest = () => {

	if (menuIndex === 0) {
		bigscreenApi.queryBigScreenLcgkfxCl(requestParam).then((data) => {
			if (data) {
				showCharts(data)
			}
			loadSpinning.value = false
		})
	} else {
		bigscreenApi.queryBigScreenLcgkfxCc(requestParam).then((data) => {
			if (data) {
				showCharts(data)
			}
			loadSpinning.value = false
		})
	}
}



let myCharts = null

const showCharts = (tempData) => {

	if (!vehicleTypeMap) {
		vehicleTypeMap = new Map()
		tempData.forEach(fo => {
			vehicleTypeMap.set(`${fo.vehicleType}`, fo)
		})
	}

	const showData = []
	let vehicleCount = 0;
	let distance = 0;
	vehicleTypeOptions.forEach(fo => {
		const car = vehicleTypeMap.get(`${fo.value}`)
		if (car) {
			if (fo.label.includes('专项作业车')) {
				vehicleCount = vehicleCount + car.vehicleCount
				distance = distance + car.distance
			} else {
				showData.push({
					label: fo.label,
					distance: car.distance,
					vehicleCount: car.vehicleCount,
					av: (car.distance / car.vehicleCount).toFixed(2)
				})
			}
		}
	})

	const av = vehicleCount === 0 ? 0 : (distance / vehicleCount).toFixed(2)
	showData.push({
		label: '专项作业车',
		distance: distance,
		vehicleCount: vehicleCount,
		av: av
	})


	if (!myCharts) {
		const chartDou = document.getElementById(props.chartId)
		myCharts = echarts.init(chartDou)
	}

	const option = {
		tooltip: {
			trigger: 'axis',
			formatter: function (params) {
				let tooltipContent = params[0].axisValue + '<br>'
				params.forEach(function (item, index) {
					let dotHtml = `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${tipColor.get(item.seriesName)}"></span>`
					tooltipContent += dotHtml +  item.seriesName + ': ' + item.value + ' ' + tipUnit.get(item.seriesName) + '<br>'
				})
				return tooltipContent
			}
		},
		legend: {
			data: [(menuIndex === 0 ? '总计费车辆' : '总计费车次'), '总计费里程', '平均计费里程'],
			textStyle : {//坐标轴刻度标签的相关设置
				color: '#F6F9FC'
			}
		},
		grid: {
			top: '12%', // 顶部边距为容器高度的百分之十
			bottom: '17%', // 底部边距为像素值 20px
			left: '10%', // 左侧边距为容器宽度的百分之三十
			right: '10%' // 右侧边距为像素值 40px
		},
		xAxis: [
			{
				type: 'category',
				data: showData.map(ma => ma.label),
				axisLabel : {//坐标轴刻度标签的相关设置
					interval:0,
					rotate:"-45",
					color: '#F6F9FC'
				}
			}
		],
		yAxis: [
			{
				name: (menuIndex === 0 ? '总计费车辆' : '总计费车次'),
				nameTextStyle:{
					color:"#F6F9FC",
				},
				type: 'value',
				position: 'left',
				alignTicks: true,
				splitLine :{
					lineStyle:{
						type:'dashed',//虚线
						color: '#454e61'
					},
					show: true //隐藏
				},
				axisLabel : {//坐标轴刻度标签的相关设置
					interval:0,
					rotate:"45",
					color: '#F6F9FC'
				}
			},
			{
				name: '平均计费里程',
				nameTextStyle:{
					color:"#F6F9FC",
				},
				position: 'right',
				alignTicks: true,
				offset: 0,
				splitLine :{
					lineStyle:{
						type:'dashed',//虚线
						color: '#454e61'
					},
					show: true //隐藏
				},
				axisLabel : {//坐标轴刻度标签的相关设置
					interval:0,
					rotate:"45",
					color: '#F6F9FC'
				}
			},
		],
		series: [
			{
				name: (menuIndex === 0 ? '总计费车辆' : '总计费车次'),
				type: 'bar',
				barWidth: 16,
				stack: 'a',
				yAxisIndex: 0,
				data: showData.map(ma => ma.vehicleCount),
				itemStyle: {
					color: {
						type: 'linear',
						x: 0, // 若将此值设为1，表示从右到左渐变
						y: 1, // 若将此值设为1，表示从上到下渐变
						x2: 0, // 左
						y2: 0, // 上
						colorStops: [
							{
								offset: 0,
								color: `#2f66db00` // 0% 处的颜色
							},
							{
								offset: 0.9,
								color: '#2f66db' // 90% 处的颜色
							}
						]
					}
				}
			},
			{
				name: '总计费里程',
				type: 'bar',
				barWidth: 20,
				stack: 'a',
				yAxisIndex: 0,
				data: showData.map(ma => ma.distance),
				itemStyle: {
					color: {
						type: 'linear',
						x: 0, // 若将此值设为1，表示从右到左渐变
						y: 1, // 若将此值设为1，表示从上到下渐变
						x2: 0, // 左
						y2: 0, // 上
						colorStops: [
							{
								offset: 0,
								color: `#57e0f000` // 0% 处的颜色
							},
							{
								offset: 0.9,
								color: '#57e0f0' // 90% 处的颜色
							}
						]
					}
				}
			},
			{
				name: '平均计费里程',
				type: 'line',
				data: showData.map(ma => ma.av),
				yAxisIndex: 1,
				itemStyle: {
					color: '#ff9f59'
				}
			}
		]
	};

	myCharts.setOption(option)
}


defineExpose({
	onOpen
})
</script>
<style lang="less" scoped>
.chart-body {
	padding: 0;
	.chart-main {
		margin-left: 10px;
	}
}
.title {
	border-left: 1px solid #4C5B7C;
	margin: 30px 0;
	padding-bottom: 0;
	.title-top {
		margin-top: 10px;
		padding-left: 10px;
		color: #9FBCDD;
		font-weight: bold;
		font-family: 'sm';
		height: 16px;
		line-height: 16px;
		span {
			font-size: 14px;
		}
	}
	.legend-box {
		padding-top: 5px;
		text-align: left;
		position: relative;
		height: 38px;
		line-height: 38px;
		.spanValue {
			font-size: 25px;
			font-weight: bold;
			font-family: 'sm';
			background: linear-gradient(to top, #B7DCFF, #F6F9FC); /* 从左到右渐变 */
			-webkit-background-clip: text; /* Safari/Chrome需要添加此属性才能正常显示背景渐变效果 */
			color: transparent; /* 将文本设置为透明，只保留背景渐变效果 */
			margin-left: 10px;
			position: absolute;

			&:after {
				content: '元';
				font-weight: bold;
				font-family: 'sm';
				color: #556b85;
				font-size: 14px;
				margin-left: 6px;
			}
		}
	}
}
</style>
