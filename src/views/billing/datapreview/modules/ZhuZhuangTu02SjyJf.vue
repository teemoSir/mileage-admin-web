<template>
	<div id="ZhuZhuangTu02today"></div>
</template>

<script setup>
	import { onMounted } from 'vue'
	import { Column } from '@antv/g2plot'
	import tool from '@/utils/tool'

	const vehicleSourceOptions = tool.dictList('VEH_LOCATION_SOURCE')
	const roadTypeOptions = tool.dictList('roadType')

	const onOpen = (data) => {
		document.getElementById('ZhuZhuangTu02today').innerHTML = ''

		data.forEach((v) => {
			roadTypeOptions.forEach((value) => {
				if (v.type == value.value) {
					v.type = value.label
				}
			})
			vehicleSourceOptions.forEach((value) => {
				if (v.source == value.value) {
					v.source = value.label
				}
			})
		})

		const stackedColumnPlot = new Column('ZhuZhuangTu02today', {
			data,
			isStack: true,
			xField: 'source',
			yField: 'billing',
			seriesField: 'type',
			yAxis: {
				label: {
					formatter: (value) => value + '元'
				}
			},
			tooltip: {
				show: true,
				trigger: 'item',
				formatter: (v) => ({
					source: v.source,
					name: v.type,
					value: v.billing + ' 元'
				})
				// formatter: function (params) {
				// 	console.log(params)
				// 	let tooltipContent = params.source + '<br>'
				// 	tooltipContent +=
				// 		params.type + ': ' + params.billing + ' 元' + '<br>'
				//
				// 	return tooltipContent
				// }
				// formatter: function (params) {
				// 	console.log(params)
				//
				// 	params.billing =  params.billing + ' 元'
				//
				// 	console.log(params)
				//
				// 	return params
				// }
				// trigger: 'item',
				// formatter: function (v) {
				// 	return {
				// 		source: v.source,
				// 		billing: v.billing + ' 元',
				// 		type: v.type
				// 	}
				// }
			},
			label: {
				// 可手动配置 label 数据标签位置
				position: 'middle', // 'top', 'bottom', 'middle'
				// 可配置附加的布局方法
				layout: [
					// 柱形图数据标签位置自动调整
					{ type: 'interval-adjust-position' },
					// 数据标签防遮挡
					{ type: 'interval-hide-overlap' },
					// 数据标签文颜色自动调整
					{ type: 'adjust-color' }
				]
			},
			legend: {
				position: 'top-left'
			}
		})

		stackedColumnPlot.render()
	}

	defineExpose({
		onOpen
	})
</script>
