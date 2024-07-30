<template>
	<a-card :bordered="false" :destroy-on-close="true" @close="onClose">
		<a-row>
			<a-col :span="12">
				<a-divider>原始轨迹</a-divider>
				<a-spin :spinning="loadSpinning1">
					<gaode-map1 ref="ysTrackMap" api-key="94bd11195a06ec51f597ee0fd4205332" />
				</a-spin>
			</a-col>
			<a-col :span="12">
				<a-divider>匹配后的轨迹</a-divider>
				<a-spin :spinning="loadSpinning2">
					<gaode-map2 ref="ppTrackMap" api-key="94bd11195a06ec51f597ee0fd4205332" />
				</a-spin>
			</a-col>
		</a-row>
		<a-row>&nbsp;</a-row>
		<a-row>
			<a-col :span="16"></a-col>
			<a-col :span="8" style="text-align: right">
				<a-button style="margin-right: 8px" type="primary" @click="onClose">关闭</a-button>
			</a-col>
		</a-row>
	</a-card>
</template>

<script setup name="contrastTrack">
	import bdBillingTrafficRecordApi from '@/api/billing/bdBillingTrafficRecordApi'
	import wgs84togcj02 from '@/api/billing/wgs84togcj02'

	import GaodeMap1 from '@/components/Map/gaodeMap/index.vue'
	const ysTrackMap = ref(null)

	import GaodeMap2 from '@/components/Map/gaodeMap/index2.vue'
	const ppTrackMap = ref(null)

	const visible = ref(false)
	const emit = defineEmits({ successful: null })
	const loadSpinning1 = ref(false)
	const loadSpinning2 = ref(false)

	const onOpen = (record) => {
		visible.value = true
		ysTrackMap.value.init()
		ppTrackMap.value.init()
		queryTracksYs(record)
		queryTracksPp(record)
	}

	/**
	 * 原始轨迹数据
	 */
	const queryTracksYs = (record) => {
		let param = {
			vehicleId: record.vehicleId,
			startTime: record.startTime,
			endTime: record.endTime,
			source: record.vehicleSource
		}
		loadSpinning1.value = true
		bdBillingTrafficRecordApi.bdBillingTrafficRecordQueryTracks(Object.assign(param)).then((data) => {
			loadSpinning1.value = false
			if (null != data && data.length > 0) {
				let lineArr = []
				data.forEach((v) => {
					lineArr.push(wgs84togcj02.wgs84togcj02(v.oriLon, v.oriLat))
				})

				//轨迹绘制
				ysTrackMap.value.renderPolyline(lineArr, { strokeColor: 'red', strokeWeight: 6 })

				//起点
				ysTrackMap.value.renderSimpleMarker([
					{
						position: lineArr[0],
						label: '起点',
						labelStyle: {
							color: '#fff',
							fontSize: '12px'
						},
						style: 'green'
					},
					{
						position: lineArr[lineArr.length - 1],
						label: '终点',
						labelStyle: {
							color: '#fff',
							fontSize: '12px'
						},
						style: 'red'
					}
				])
			}
		})
	}

	/**
	 * 匹配后的轨迹数据
	 */
	const queryTracksPp = (record) => {
		let param = {
			vehicleId: record.vehicleId,
			startTime: record.startTime,
			endTime: record.endTime,
			source: record.vehicleSource
		}
		loadSpinning2.value = true
		bdBillingTrafficRecordApi.bdBillingTrafficRecordQueryTracks(Object.assign(param)).then((data) => {
			loadSpinning2.value = false
			if (null != data && data.length > 0) {
				let lineArr = []
				data.forEach((v) => {
					lineArr.push(wgs84togcj02.wgs84togcj02(v.oriLon, v.oriLat))
				})

				//轨迹绘制
				ppTrackMap.value.renderPolyline(lineArr, { strokeColor: 'red', strokeWeight: 6 })

				//起点
				ppTrackMap.value.renderSimpleMarker([
					{
						position: lineArr[0],
						label: '起点',
						labelStyle: {
							color: '#fff',
							fontSize: '12px'
						},
						style: 'black'
					},
					{
						position: lineArr[lineArr.length - 1],
						label: '终点',
						labelStyle: {
							color: '#fff',
							fontSize: '12px'
						},
						style: 'orange'
					}
				])
			}
		})
	}

	const onClose = () => {
		visible.value = false
		emit('successful')
	}

	defineExpose({
		onOpen
	})
</script>
