<template>
	<a-spin :spinning="loadSpinning">
		<div id="ItemJfjeqs" :style="{ height: `${boxHeigth}px` }"></div>
	</a-spin>
</template>

<script setup>
	import { Area, Column } from '@antv/g2plot'
	import tool from '@/utils/tool'
	import bigscreenApi from '@/api/billing/bigscreenApi'
	const loadSpinning = ref(false)
	const boxHeigth = ref()

	const onOpen = (record) => {
		document.getElementById('ItemJfjeqs').innerHTML = ''

		loadSpinning.value = true
		boxHeigth.value = record.boxHeigth - 80

		bigscreenApi.queryBigScreenJfjeqs(record).then((data) => {
			if (data) {
				const area = new Area('ItemJfjeqs', {
					data,
					xField: 'value',
					yField: 'chargeAmount',
					seriesField: 'classify',
					point: {
						size: 3,
						shape: 'custom-point',
						style: {
							fill: 'white',
							stroke: '#5B8FF9',
							lineWidth: 1
						}
					},
					tooltip: {
						customContent: function (value, params) {
							var tooltipContent = `<div class="top">${value}</div>`
							params.forEach(function (item) {
								tooltipContent += `<div><span style="background:${item.color}"></span>  ${item.name}  :   ${item.value}  元  </div>`
							})

							return '<div class="tooltip-box">' + tooltipContent + '</div>'
						}
					}
				})
				area.render()
			}
			loadSpinning.value = false
		})
	}

	defineExpose({
		onOpen
	})
</script>
<style lang="less" scoped>
	.tooltip-box {
		padding: 10px 0px;
		font-size: 15px;
		color: #666;
		div {
			margin-top: 8px;
		}
		.top {
			margin-bottom: 10px;
		}
		span {
			border-radius: 50%;
			display: inline-block;
			height: 10px;
			width: 10px;
		}
	}
</style>
