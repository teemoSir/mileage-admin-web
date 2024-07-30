<template>
	<a-spin :spinning="loadSpinning">
		<gaode-map
			ref="map"
			api-key="94bd11195a06ec51f597ee0fd4205332"
			@complete="handleComplete"
			@marker-click="handleMarkerClick"
		/>
		<a-row>&nbsp;</a-row>
		<a-row>
			<a-col :span="6" style="text-align: center"
				><a-button type="primary" @click="markerCARmoveAnimation('move')">开始回放</a-button></a-col
			>
			<a-col :span="6" style="text-align: center"
				><a-button type="dashed" @click="markerCARmoveAnimation('pauseMove')">暂停回放</a-button></a-col
			>
			<a-col :span="6" style="text-align: center"
				><a-button type="primary" @click="markerCARmoveAnimation('resumeMove')">继续播放</a-button></a-col
			>
			<a-col :span="6" style="text-align: center">
				<a-button type="danger" @click="markerCARmoveAnimation('stopMove')">停止回放</a-button>
			</a-col>
		</a-row>
		<a-row>&nbsp; </a-row>
		<a-row>
			<a-col :span="2"><span>播放速度：</span></a-col>
			<a-col :span="20">
				<a-steps :current="stepCurrent" :onChange="stepChange" size="small">
					<a-step title="低速"></a-step>
					<a-step title="中速"></a-step>
					<a-step title="高速"></a-step>
				</a-steps>
			</a-col>
			<a-col :span="2"></a-col>
		</a-row>
	</a-spin>
</template>

<script setup name="billingtrafficMapTrack">
	import bdBillingTrafficRecordApi from '@/api/billing/bdBillingTrafficRecordApi'
	import wgs84togcj02 from '@/api/billing/wgs84togcj02'
	import GaodeMap from '@/components/Map/gaodeMap/index.vue'
	const map = ref(null)
	const detail = ref({})
	const lineArr = ref([])

	const loadSpinning = ref(false)

	const onOpen = (record) => {
		loadSpinning.value = true
		detail.value = record
		lineArr.value = []
		map.value.init()
		queryTracks(detail.value)
		loadSpinning.value = false
	}

	const queryTracks = (record) => {
		let param = {
			vehicleId: record.vehicleId,
			startTime: record.startTime,
			endTime: record.endTime,
			source: record.vehicleSource
		}
		bdBillingTrafficRecordApi.bdBillingTrafficRecordQueryTracks(Object.assign(param)).then((data) => {
			if (null != data && data.length > 0) {
				// let resData = cloneDeep(data)
				data.forEach((v) => {
					lineArr.value.push(wgs84togcj02.wgs84togcj02(v.oriLon, v.oriLat))
				})

				//轨迹绘制
				map.value.renderPolyline(lineArr.value, { strokeColor: 'red', strokeWeight: 6 })

				//起点
				map.value.renderSimpleMarker([
					{
						position: lineArr.value[0],
						label: '起点',
						labelStyle: {
							color: '#fff',
							fontSize: '12px'
						},
						style: 'green'
					},
					{
						position: lineArr.value[lineArr.value.length - 1],
						label: '终点',
						labelStyle: {
							color: '#fff',
							fontSize: '12px'
						},
						style: 'red'
					}
				])

				// map.value.renderSimpleMarkerCAR(lineArr.value[0])
			}
			loadSpinning.value = false
		})
	}

	const markerCARmoveAnimation = (value) => {
		if ('move' == value) {
			map.value.remove()
			//轨迹绘制
			map.value.renderPolyline(lineArr.value, { strokeColor: 'red', strokeWeight: 6 })
			map.value.renderSimpleMarkerCAR(lineArr.value[0])
		}
		map.value.markerCARmoveAnimation(value, lineArr.value, stepCurrent.value)
	}

	const handleComplete = () => {
		// queryTracks(detail.value)
	}

	const handleMarkerClick = (position) => {
		map.value.openInfoWindow(position)
	}

	const rowClick = (record) => {
		let param = {
			vehicleId: record.vehicleId,
			startTime: record.startTime,
			endTime: record.endTime,
			source: record.vehicleSource
		}
		bdBillingTrafficRecordApi.bdBillingTrafficRecordQueryTracks(Object.assign(param)).then((data) => {
			if (null != data && data.length > 0) {
				let lineArr = []
				data.forEach((v) => {
					lineArr.push({ position: wgs84togcj02.wgs84togcj02(v.oriLon, v.oriLat) })
				})
				//轨迹绘制
				map.value.renderPolylineRoad(lineArr, { strokeColor: 'blue', strokeWeight: 5 })
			}
		})
	}

	const stepCurrent = ref(0)
	const stepChange = (current) => {
		console.log(current)
		stepCurrent.value = current
	}

	defineExpose({
		onOpen,
		rowClick
	})
</script>
<style lang="less" scoped>
	#container {
		height: calc(100% - 88px);
		height: 800px;
		//position: absolute;
		left: 0;
		right: 0;
		top: 0px;
		bottom: 0;
		background: transparent !important;
	}

	.el-table .warning-row {
		background: oldlace;
	}

	.el-table .success-row {
		background: #f0f9eb;
	}
</style>
