<template>
	<div id="BingZhuangTu03" style="height: 180px"></div>
</template>

<script setup>
	import { Pie } from '@antv/g2plot'
	const vehicleData = ref()

	const onOpen = (record) => {
		if (null == vehicleData.value) {
			vehicleData.value = record
			setEachartsNow(record)
		} else {
			if (vehicleData.value.onlineCount != record.onlineCount) {
				vehicleData.value = record
				setEachartsNow(record)
			}
		}
	}

	const setEachartsNow = (record) => {
		document.getElementById('BingZhuangTu03').innerHTML = ''

		const data = [
			{ type: '收费道路车辆数', value: record.sfdlVehicleCount },
			{ type: '非收费道路车辆数', value: record.fsfdlVehicleCount }
		]

		const piePlot = new Pie('BingZhuangTu03', {
			appendPadding: 5,
			data,
			angleField: 'value',
			colorField: 'type',
			radius: 0.8,
			innerRadius: 0.7,
			legend: false,
			animation: false,
			label: {
				offset: 2,
				content: '{name}:\n{value}  {percentage}',
				show: false
			},
			// interactions: [{ type: 'element-selected' }, { type: 'element-active' }],
			statistic: {
				title: false,
				content: {
					content:
						'<div>' +
						'<div style="font-size: 13px;color:#333; font-weight: 200">在线车辆</div>' +
						'<div style="font-size: 30px; color: #222; font-weight: bold">' +
						record.onlineCount +
						'</div>' +
						'</div>'
				}
			}
		})

		piePlot.render()
	}

	defineExpose({
		onOpen
	})
</script>
