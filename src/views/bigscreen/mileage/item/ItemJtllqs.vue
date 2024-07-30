<template>
	<a-spin :spinning="loadSpinning">
		<div id="ItemJtllqs" :style="{ height: `${boxHeigth}px` }"></div>
	</a-spin>
</template>

<script setup>
	import { Area, Line } from '@antv/g2plot'
	import bigscreenApi from '@/api/billing/bigscreenApi'
	import * as echarts from 'echarts'
	const loadSpinning = ref(false)
	const boxHeigth = ref()

	const onOpen = (record) => {
		// document.getElementById('ItemJtllqs').innerHTML = ''

		loadSpinning.value = true
		boxHeigth.value = record.boxHeigth - 50

		bigscreenApi.queryBigScreenJtllqs(record).then((data) => {
			if (data) {
				let Echarts = echarts.init(document.getElementById('ItemJtllqs'))
				let xAxis = []
				let dataArray = []
				data.forEach((v) => {
					xAxis.push(v.value)
					dataArray.push(v.vehicleCount)
				})
				let option = {
					tooltip: {
						trigger: 'axis'
					},
					grid: {
						top: '50px',
						left: '10',
						right: '10px',
						bottom: '20px',
						containLabel: true
					},
					xAxis: {
						type: 'category',
						data: xAxis
					},
					yAxis: {
						type: 'value',
						name: '单位（车次）'
					},
					series: [
						{
							name: '收费道路车次',
							type: 'line',
							step: 'start',
							data: dataArray
						}
					]
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
