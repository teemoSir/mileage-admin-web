<template>
	<div :id="`${props.chartId}_out`" style="height: 100%;">
		<a-spin  class="chart-body" :spinning="loadSpinning">
			<CommonTitle :title="props.title" />
			<a-row>
				<a-col :span="15">
					<div :style="{ height: `${height}px`}" class="chart-main" :id="props.chartId"></div>
				</a-col>
				<a-col :span="9">
					<div style="padding: 0 10px 10px 0">
						<div v-for="item in jfDataList" :key="item.title" class="title">
							<div
								class="title-top"
								:style="{'border-left': `4px solid ${item.color}`,}">
								<span>{{ item.title }}</span>
							</div>
							<div class="legend-box">
								<span class="spanValue">{{ tool.groupSeparator(item.vehicle) }} </span>
							</div>
						</div>
					</div>
				</a-col>
			</a-row>
		</a-spin>
	</div>
</template>

<script setup name="ChartCxjfgk">
import bigscreenApi from '@/api/billing/bigscreenApi'
import CommonTitle from "@/views/bigscreen/mileage_pro/item/CommonTitle.vue";
import * as echarts from "echarts"
import tool from '@/utils/tool'
const loadSpinning = ref(false)
const jfDataList = ref([])
const vehicleTypeOptions = tool.dictList('vehicleType')

const props = defineProps({
	chartId: {
		type: String,
		default: 'ChartCxjfgk'
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

	let kcBilling = 0
	let hcBilling = 0
	let zxBilling = 0
	let hj = 0

	bigscreenApi.queryBillingByRoadType(record).then((data) => {
		let dataArray = []
		let num = 0
		if (data) {
			vehicleTypeOptions.forEach((value) => {
				data.forEach((v) => {
					if (`${v.type}` === `${value.value}`) {
						if (value.label.includes('专项作业车')) {
							num += v.billing
						} else {
							dataArray.push({ name: value.label, value: v.billing })
						}
					}
				})
			})

			data.forEach((v) => {
				if (v.type < 10) {
					kcBilling = kcBilling + v.billing
				} else if (v.type < 20) {
					hcBilling = hcBilling + v.billing
				} else if (v.type < 30) {
					zxBilling = zxBilling + v.billing
				}
			})
			// if (num > 0) {
			dataArray.push({ name: '专项作业车', value: num })
			// }

			showCharts(dataArray)

			hj = kcBilling + hcBilling + zxBilling
			jfDataList.value = [
				{
					title: '客车',
					vehicle: kcBilling.toFixed(2),
					ratio: ((kcBilling / hj) * 100).toFixed(2),
					color: '#2f66db',
					component: 'CarOutlined'
				},
				{
					title: '货车',
					vehicle: hcBilling.toFixed(2),
					ratio: ((hcBilling / hj) * 100).toFixed(2),
					color: '#57e0f0',
					component: 'SplitCellsOutlined'
				},
				{
					title: '专项作业车',
					vehicle: zxBilling.toFixed(2),
					ratio: ((zxBilling / hj) * 100).toFixed(2),
					color: '#ff9f59',
					component: 'AlertOutlined'
				}
			]
		}
		loadSpinning.value = false
	})
}
const showCharts = (data) => {
	data.forEach(fo => {
		if (fo.name.includes('客车')) {
			fo.color = '#2f66db'
		} else if (fo.name.includes('货车')) {
			fo.color = '#57e0f0'
		}  else if (fo.name.includes('作业车')) {
			fo.color = '#ff9f59'
		}
	})
	const chartDou = document.getElementById(props.chartId)
	const myCharts = echarts.init(chartDou)
	const option = {
		tooltip: {
			trigger: 'axis',
			formatter: function (params) {
				let tooltipContent = params[0].axisValue
				params.forEach(function (item, index) {
					tooltipContent += ': ' + item.value + ' 元' + '<br>'
				})
				return tooltipContent
			}
		},
		grid: {
			top: '12%', // 顶部边距为容器高度的百分之十
			bottom: '18%', // 底部边距为像素值 20px
			left: '13%', // 左侧边距为容器宽度的百分之三十
			right: '8%' // 右侧边距为像素值 40px
		},
		xAxis: {
			type: 'category',
			data: data.map(ma => ma.name),
			nameLocation:'start',//坐标轴名称显示位置
			axisLabel : {//坐标轴刻度标签的相关设置
				interval:0,
				rotate:"-45",
				color: '#F6F9FC'
			}
		},
		yAxis: {
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
		},
		series: [
			{
				data:  data.map(ma => {
					return {
						value: ma.value,
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
										color: `${ma.color}00` // 0% 处的颜色
									},
									{
										offset: 0.9,
										color: ma.color // 90% 处的颜色
									}
								]
							}
						}
					}
				}),
				type: 'bar',
				barWidth: 16,
				showBackground: false,
				itemStyle: {
					// 这个地方是通用配置bar颜色的
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
	margin: 24px 0;
	padding-bottom: 0;
	padding-top: 0;
	.title-top {
		padding-left: 10px;
		color: #9FBCDD;
		font-weight: bold;
		font-family: 'sm';
		height: 16px;
		line-height: 16px;
		text-align: left;
		span {
			font-size: 14px;
		}
	}
	.legend-box {
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
