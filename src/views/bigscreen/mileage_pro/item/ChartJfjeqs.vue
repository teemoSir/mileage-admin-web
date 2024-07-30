<template>
	<a-spin class="chart-body" :spinning="loadSpinning">
		<CommonTitle :title="props.title" />
		<a-row>
			<a-col :span="24">
				<div  :style="{ height: `${height}px`}" class="chart-main" :id="props.chartId"></div>
			</a-col>
		</a-row>
	</a-spin>
</template>

<script setup name="ChartJtllqs">
import bigscreenApi from '@/api/billing/bigscreenApi'
import CommonTitle from "@/views/bigscreen/mileage_pro/item/CommonTitle.vue";
import * as echarts from "echarts"
const loadSpinning = ref(false)

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

const onOpen = (record) => {
	loadSpinning.value = true

	bigscreenApi.queryBigScreenJfjeqs(record).then((data) => {
		if (data) {
			showCharts(data)
		}
		loadSpinning.value = false
	})
}

const tipColor = new Map()
	.set('预估金额','#57e0f0')
	.set('计费金额','#2f66db')

const showCharts = (showData) => {
	const chartDou = document.getElementById(props.chartId)
	const myCharts = echarts.init(chartDou)

	let xAxisData = []
	let ygjes = []
	let jfjes = []
	showData.forEach(v => {
		if("预估金额" == v.classify){
			ygjes.push(v.chargeAmount)
			xAxisData.push(v.value)
		} else if("计费金额" == v.classify){
			jfjes.push(v.chargeAmount)
		}
	})

	let option = {
		grid: {
			top: '12%',
			bottom: '12%',
			left: '8%',
			right: '5%'
		},
		legend: {
			data: ['预估金额', '计费金额'],
			textStyle : {//坐标轴刻度标签的相关设置
				color: '#F6F9FC'
			}
		},
		xAxis: [
			{
				type: 'category',		// axisLine: {
				// 	onZero: false,
				// 	lineStyle: {
				// 		color: colors[1]
				// 	}
				// },
				axisTick: {
					alignWithLabel: true
				},
				// axisLine: {
				// 	onZero: false,
				// 	lineStyle: {
				// 		color: colors[1]
				// 	}
				// },
				axisPointer: {
					label: {
						formatter: function (params) {
							return (
								'Precipitation  ' +
								params.value +
								(params.seriesData.length ? '：' + params.seriesData[0].data : '')
							);
						}
					}
				},
				axisLabel : {//坐标轴刻度标签的相关设置
					color: '#F6F9FC'
				},
				data: xAxisData
			},
			{
				show: false,
				type: 'category',
				axisTick: {
					alignWithLabel: true
				},
				// axisPointer: {
				// 	label: {
				// 		formatter: function (params) {
				// 			return (
				// 				'Precipitation  ' +
				// 				params.value +
				// 				(params.seriesData.length ? '：' + params.seriesData[0].data : '')
				// 			);
				// 		}
				// 	}
				// },
				// prettier-ignore
				data: xAxisData
			}
		],
		tooltip: {
			trigger: 'axis',
			formatter: function (params) {
				let tooltipContent = params[0].axisValue + '<br>'
				params.forEach(function (item, index) {
					let dotHtml = `<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${tipColor.get(item.seriesName)}"></span>`
					tooltipContent += dotHtml +  item.seriesName + ': ' + item.value + ' 元' + '<br>'
				})
				return tooltipContent
			}
		},
		yAxis: [
			{
				name: '元',
				nameTextStyle:{
					color:"#F6F9FC",
				},
				type: 'value',
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
			}
		],
		series: [
			{
				name: '预估金额',
				type: 'line',
				xAxisIndex: 1,
				smooth: true,
				itemStyle: { color: '#57e0f0'},
				emphasis: {
					focus: 'series'
				},
				data: ygjes
			},
			{
				name: '计费金额',
				type: 'line',
				smooth: true,
				itemStyle: { color: '#2f66db'},
				emphasis: {
					focus: 'series'
				},
				data: jfjes
			}
		]
	};

	// const option = {
	// 	title: {
	// 		left: 'center',
	// 		text: ''
	// 	},
	// 	xAxis: {
	// 		type: 'category',
	// 		axisLabel : {//坐标轴刻度标签的相关设置
	// 			color: '#9ebbdb'
	// 		},
	// 		// axisPointer: {
	// 		// 	value: '2016-10-7',
	// 		// 	snap: true,
	// 		// 	lineStyle: {
	// 		// 		color: '#7581BD',
	// 		// 		width: 2
	// 		// 	},
	// 		// 	label: {
	// 		// 		show: true,
	// 		// 		formatter: function (params) {
	// 		// 			return echarts.format.formatTime('yyyy-MM-dd', params.value);
	// 		// 		},
	// 		// 		backgroundColor: '#7581BD'
	// 		// 	},
	// 		// },
	// 		// splitLine: {
	// 		// 	show: false
	// 		// },
	// 		data: xAxisData,
	// 	},
	// 	tooltip: {
	// 		// 触发方式：设置为坐标轴触发提示框
	// 		trigger: "axis",
	// 		// 设置提示框浮层位置 point: 鼠标位置
	//
	// 		padding: 0,
	// 		// 提示框浮层内容格式器: 自定义提示框样式
	// 		formatter: function (params) { // params 是 formatter 需要的数据集
	// 			let content = "";
	// 			params.forEach((item) => {
	// 				// 提示框的内容样式及数据
	// 				content += `<div style="height: 25px; line-height: 25px;">
	// 				  <!-- 圆点样式 -->
	// 				  <span style="display: inline-block; margin-right: 10px; border-radius: 50%; width: 8px; height: 8px;background-color: #000000;"></span>
	// 				  <span style="color: #424864;">${item.seriesName}:</span>
	// 				  <span style="color: #172045;">${item.value}</span>
	// 				</div>`;
	// 			});
	// 			// 提示框外框样式及内容数据
	// 			const htmlContent = `<div style="width: 236px; height: 100px;">
	// 				<!-- 提示框顶部标题样式及数据 smsUseData.xAxis.date（标题数据）-->
	// 				<div style="color: #000000D9; border-bottom: 1px solid #F0F0F0; padding: 5px 16px;">
	// 				${params[0].name}
	// 				</div>
	// 				<div style="padding: 12px 16px; position: relative;">
	// 				  ${content}
	// 				</div>
	// 			  </div>`;
	//
	// 			return htmlContent;
	// 		}
	// 	},
	// 	yAxis: {
	// 		name: '元',
	// 		nameTextStyle:{
	// 			color:"#9ebbdb",
	// 		},
	// 		type: 'value',
	// 		splitLine :{
	// 			lineStyle:{
	// 				type:'dashed',//虚线
	// 				color: '#454e61'
	// 			},
	// 			show: true //隐藏
	// 		},
	// 		axisLabel : {//坐标轴刻度标签的相关设置
	// 			interval:0,
	// 			rotate:"45",
	// 			color: '#9ebbdb'
	// 		}
	// 	},
	// 	grid: {
	// 		top: '12%',
	// 		bottom: '15%',
	// 		left: '8%',
	// 		right: '5%'
	// 	},
	// 	series: [
	// 		{
	// 			name: '预估金额',
	// 			type: 'line',
	// 			smooth: true,
	// 			symbol: 'circle',
	// 			symbolSize: 5,
	// 			sampling: 'average',
	// 			itemStyle: {
	// 				color: '#57e0f0'
	// 			},
	// 			stack: 'a',
	// 			areaStyle: {
	// 				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
	// 					{
	// 						offset: 0,
	// 						color: '#57e0f0aa'
	// 					},
	// 					{
	// 						offset: 1,
	// 						color: '#57e0f000'
	// 					}
	// 				])
	// 			},
	// 			// data: showData.map(ma => {
	// 			// 	return {
	// 			// 		classify: ma.classify,
	// 			// 		value: ma.chargeAmount
	// 			// 	}
	// 			// }),
	// 			data: ygjes
	// 		},
	// 		{
	// 			name: '计费金额',
	// 			type: 'line',
	// 			smooth: true,
	// 			stack: 'a',
	// 			symbol: 'circle',
	// 			symbolSize: 5,
	// 			sampling: 'average',
	// 			itemStyle: {
	// 				color: '#2f66db'
	// 			},
	// 			areaStyle: {
	// 				color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
	// 					{
	// 						offset: 0,
	// 						color: '#2f66dbaa'
	// 					},
	// 					{
	// 						offset: 1,
	// 						color: '#2f66db00'
	// 					}
	// 				])
	// 			},
	// 			// data: showData.map(ma => {
	// 			// 	return {
	// 			// 		classify: ma.classify,
	// 			// 		value: ma.chargeAmount
	// 			// 	}
	// 			// }),
	// 			data: jfjes
	// 		}
	// 	]
	// };




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
