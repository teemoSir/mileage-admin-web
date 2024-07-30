<template>
	<div id="TiaoXingTu01today"></div>
</template>

<script setup>
	import { onMounted } from 'vue'
	import { Bar } from '@antv/g2plot'

	onMounted(() => {})

	const onOpen = (data) => {
		document.getElementById('TiaoXingTu01today').innerHTML = ''
		const bar = new Bar('TiaoXingTu01today', {
			data,
			xField: `billing`,
			yField: 'roadname',
			color: '#62DAAB',
			xAxis: {
				label: {
					formatter: (value) => value + '元'
				}
			},
			tooltip: {
				show: true,
				trigger: 'item',
				formatter: (v) => ({
					name: '计费金额',
					value: v.billing + ' 元'
				})
				// formatter: function (params) {
				// 	console.log(params)
				// }
			}
			// seriesField: 'roadname',
			// legend: {
			// 	position: 'top-left'
			// }
		})

		bar.render()
	}

	defineExpose({
		onOpen
	})
</script>
