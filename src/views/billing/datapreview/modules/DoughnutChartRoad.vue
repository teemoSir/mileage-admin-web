<template>
	<div id="DoughnutChartWithRoundedCorner2today"></div>
</template>
<!--ec官网：https://echarts.apache.org/zh/index.html-->
<script setup name="DoughnutChartWithRoundedCornertoday">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
	import tool from '@/utils/tool'

	const vehicleTypeOptions = tool.dictList('vehicleType')

	const onOpen = (dataArray) => {
		queryBillingVehicleByType(dataArray)
	}

	const queryBillingVehicleByType = (dataArray) => {
		const dataTotal = ref(0)
		for (let i = 0; i < dataArray.length; i++) {
			dataTotal.value += dataArray[i].value || 0
		}
		let Echarts = echarts.init(document.getElementById('DoughnutChartWithRoundedCorner2today'))
		const option = {
			tooltip: {
				trigger: 'item',
				formatter: function (dataArray) {
					const percent = ((dataArray.value / dataTotal.value) * 100).toFixed(2) + '%'
					return (
						'<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:' +
						dataArray.color +
						';"></span>' +
						dataArray.name +
						'    ' +
						dataArray.value +
						' 辆  ' +
						percent
					)
				}
			},
			series: [
				{
					type: 'pie',
					radius: ['30%', '50%'],
					avoidLabelOverlap: false,
					itemStyle: {
						borderColor: '#fff',
						borderRadius: 0,
						borderWidth: 0
					},
					label: {
						show: true,
						position: 'outside',
						fontSize: '12',
						formatter: function (params) {
							const percent = ((params.value / dataTotal.value) * 100).toFixed(2) + '%'
							// return [params.name, '{a|' + percent + '}'].join('\n')
							return [params.name, params.value].join(': ') + ' 辆\n   ' + percent
						},
						rich: {
							a: {
								color(params) {
									return params.color
								}
							}
						}
					},
					emphasis: {
						label: {
							show: true,
							fontSize: '12'
						}
					},
					labelLine: {
						show: true,
						lineStyle: {
							width: 1,
							color: '#999'
						}
					},
					data: dataArray
				}
			]
		}
		// 绘制图表
		Echarts.setOption(option)
	}

	onMounted(() => {})

	defineExpose({
		onOpen
	})
</script>
