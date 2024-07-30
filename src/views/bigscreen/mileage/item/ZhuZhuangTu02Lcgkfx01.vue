<template>
	<a-spin :spinning="loadSpinning">
		<div id="ZhuZhuangTu02Lcgkfx01" :style="{ height: `${boxHeigth}px` }"></div>
	</a-spin>
</template>

<script setup>
	import * as echarts from 'echarts'
	import { Column } from '@antv/g2plot'
	import tool from '@/utils/tool'
	import bigscreenApi from '@/api/billing/bigscreenApi'
	const loadSpinning = ref(false)
	const boxHeigth = ref()

	const vehicleTypeOptions = tool.dictList('vehicleType')

	const dwset = (value) => {
		if(value == '总计费车辆'){
			return '辆'
		} else if(value == '总计费里程') {
			return '公里'
		} else if(value == '平均计费里程') {
			return '公里/辆'
		}
	}

	const onOpen = (record) => {
		// document.getElementById('ZhuZhuangTu02Lcgkfx01').innerHTML = ''

		loadSpinning.value = true
		boxHeigth.value = record.boxHeigth - 70

		bigscreenApi.queryBigScreenLcgkfxCl(record).then((data) => {
			if (data) {
				let Echarts = echarts.init(document.getElementById('ZhuZhuangTu02Lcgkfx01'))
				let xAxis = []
				let zjfcls = [] //总计费车辆
				let zjflc = [] //总计费里程
				let pjjflc = [] //平均计费里程
				let i = 0
				vehicleTypeOptions.forEach((value) => {
					xAxis.push(value.label)
					zjfcls[i] = 0
					zjflc[i] = 0
					pjjflc[i] = 0
					data.forEach((v) => {
						if (v.vehicleType == value.value) {
							zjfcls[i] = v.vehicleCount
							zjflc[i] = v.distance
							pjjflc[i] = (v.distance / v.vehicleCount).toFixed(2)
						}
					})
					i++
				})

				// 合并专项作业车
				let num = [0, 0]
				for (let index = vehicleTypeOptions.length - 1; index >= 0; index--) {
					const item = vehicleTypeOptions[index]
					if (item.label.includes('专项作业车')) {
						num[0] += zjfcls[i] || 0
						num[1] += zjflc[i] || 0
						xAxis.splice(index, 1)
						zjfcls.splice(index, 1)
						zjflc.splice(index, 1)
						pjjflc.splice(index, 1)
					}
				}
				xAxis.push('专项作业车')
				zjfcls.push(num[0])
				zjflc.push(num[1])
				pjjflc.push(!num[1] || !num[0] ? 0 : (num[1] / num[0]).toFixed(2))

				const option = {
					tooltip: {
						show: true,
						trigger: 'axis',
						formatter: function (params) {
							var tooltipContent = params[0].axisValue + '<br>'
							params.forEach(function (item, index) {
								tooltipContent +=
									item.marker + item.seriesName + ': ' + item.value + ' ' + dwset(item.seriesName) + '<br>'
							})

							return tooltipContent
						}
					},
					legend: {
						show: true,
						itemWidth: 10,
						itemHeight: 10,
						x: 'left',
						data: ['总计费车辆', '总计费里程', '平均计费里程']
					},
					xAxis: {
						data: xAxis,
						// name: 'name',
						boundaryGap: true,
						axisTick: {
							alignWithLabel: true
						},
						axisLabel: {
							show: true,
							rotate: -45 // 设置x轴标签旋转角度
						}
					},
					yAxis: [
						{ type: 'value', name: '单位（公里）' },
						{ type: 'value', name: '单位（公里/辆）' }
					],
					series: [
						{
							yAxisIndex: 0,
							type: 'bar',
							stack: 'x',
							name: '总计费车辆',
							data: zjfcls
						},
						{
							yAxisIndex: 0,
							type: 'bar',
							stack: 'x',
							name: '总计费里程',
							data: zjflc,
							itemStyle: {
								color: '#96bbf1' // 指定柱子颜色
							}
						},
						{
							yAxisIndex: 1,
							type: 'line',
							name: '平均计费里程',
							symbol: 'none',
							data: pjjflc
						}
					],
					bar: { barCategoryGap: '20%' }
				}
				// 绘制图表
				Echarts.setOption(option)
				// 自适应大小
				window.onresize = () => {
					Echarts.resize()
				}
			}
			loadSpinning.value = false
		})
	}

	defineExpose({
		onOpen
	})
</script>
