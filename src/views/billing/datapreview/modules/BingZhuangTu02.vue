<template>
	<div id="BingZhuangTu02today"></div>
</template>

<script setup>
	import { onMounted } from 'vue'
	import { Pie } from '@antv/g2plot'

	onMounted(() => {})

	const onOpen = (dataArray) => {
		let data = dataArray
		let totalVal = 0
		for (var i = 0; i < dataArray.length; i++) {
			totalVal = totalVal + dataArray[i].value
		}
		document.getElementById('BingZhuangTu02today').innerHTML = ''
		const piePlot = new Pie('BingZhuangTu02today', {
			appendPadding: 10,
			data,
			angleField: 'value',
			colorField: 'type',
			radius: 0.75,
			label: {
				type: 'spider',
				labelHeight: 28,
				content: '{name}:\n{value}元 {percentage}'
			},
			tooltip: {
				show: true,
				trigger: 'item',
				formatter: (data) => ({
					name: data.type,
					value: data.value + '元  ' + ((data.value / totalVal) * 100).toFixed(2) + '%'
				})
			},
			interactions: [{ type: 'element-selected' }, { type: 'element-active' }]
		})

		piePlot.render()
	}

	defineExpose({
		onOpen
	})
</script>
