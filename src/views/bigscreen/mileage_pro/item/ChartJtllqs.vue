<template>
	<a-spin class="chart-body" :spinning="loadSpinning">
		<CommonTitle :title="props.title" />
		<a-row>
			<a-col :span="24">
				<div :style="{ height: `${height}px` }" class="chart-main" :id="props.chartId"></div>
			</a-col>
		</a-row>
	</a-spin>
</template>

<script setup name="ChartJtllqs">
	import bigscreenApi from '@/api/billing/bigscreenApi'
	import CommonTitle from '@/views/bigscreen/mileage_pro/item/CommonTitle.vue'
	import * as echarts from 'echarts'
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
			// eslint-disable-next-line vue/require-valid-default-prop
			default: ''
		}
	})
	const onOpen = (record) => {
		loadSpinning.value = true

		bigscreenApi.queryBigScreenJtllqs(record).then((data) => {
			if (data) {
				showCharts(data)
			}
			loadSpinning.value = false
		})
	}
	const showCharts = (showData) => {
		let xAxisData = []
		let ygjes = []
		let jfjes = []
		showData.forEach((v) => {
			if ('预估道路车次' == v.classify) {
				ygjes.push(v.vehicleCount)
				xAxisData.push(v.value)
			} else if ('收费道路车次' == v.classify) {
				jfjes.push(v.vehicleCount)
			}
		})
		const chartDou = document.getElementById(props.chartId)
		const myCharts = echarts.init(chartDou)
		var option

		option = {
			title: {
				text: ''
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: ['预估道路车次', '收费道路车次'],
				textStyle: {
					//坐标轴刻度标签的相关设置
					color: '#F6F9FC'
				}
			},
			grid: {
				top: '12%', // 顶部边距为容器高度的百分之十
				bottom: '12%', // 底部边距为像素值 20px
				left: '8%', // 左侧边距为容器宽度的百分之三十
				right: '5%' // 右侧边距为像素值 40px
			},
			xAxis: {
				axisLabel: {
					//坐标轴刻度标签的相关设置
					color: '#F6F9FC'
				},
				type: 'category',
				data: xAxisData
			},
			yAxis: {
				name: '车次',
				nameTextStyle: {
					color: '#F6F9FC'
				},
				axisLabel: {
					//坐标轴刻度标签的相关设置
					color: '#F6F9FC'
				},
				splitLine: {
					lineStyle: {
						type: 'dashed', //虚线
						color: '#454e61'
					},
					show: true //隐藏
				},
				type: 'value'
			},
			series: [
				{
					name: '收费道路车次',
					type: 'line',
					step: 'middle',
					data: jfjes
				},
				{
					name: '预估道路车次',
					type: 'line',
					step: 'end',
					data: ygjes
				}
			]
		}

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
		border-left: 1px solid #4c5b7c;
		margin: 30px 0;
		padding-bottom: 0;
		.title-top {
			margin-top: 10px;
			padding-left: 10px;
			color: #9fbcdd;
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
				background: linear-gradient(to top, #b7dcff, #f6f9fc); /* 从左到右渐变 */
				-webkit-background-clip: text; /* Safari/Chrome需要添加此属性才能正常显示背景渐变效果 */
				color: transparent; /* 将文本设置为透明，只保留背景渐变效果 */
				margin-left: 10px;
				position: absolute;

				&:after {
					content: '车次';
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
