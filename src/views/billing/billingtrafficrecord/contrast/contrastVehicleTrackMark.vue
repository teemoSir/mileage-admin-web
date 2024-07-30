<template>
	<a-card :bordered="false">
		<a-form ref="searchFormRef" name="advanced_search" :model="searchFormState" class="ant-advanced-search-form">
			<a-row :gutter="24">
				<a-col :span="4">
					<a-form-item label="起点时间" name="startTime">
						<a-date-picker
							v-model:value="searchFormState.startTime"
							value-format="YYYY-MM-DD HH:mm:ss"
							show-time
							:allowClear="false"
							placeholder="请选择起点时间"
							style="width: 100%"
						/>
					</a-form-item>
				</a-col>

				<a-col :span="4">
					<a-form-item label="终点时间" name="endTime">
						<a-date-picker
							v-model:value="searchFormState.endTime"
							value-format="YYYY-MM-DD HH:mm:ss"
							show-time
							:allowClear="false"
							placeholder="请选择终点时间"
							style="width: 100%"
						/>
					</a-form-item>
				</a-col>

				<a-col :span="4">
					<a-form-item label="车牌号码" name="vehiclePlate">
						<a-input v-model:value="searchFormState.vehicleNo" placeholder="请输入车牌号码" />
					</a-form-item>
				</a-col>

				<a-col :span="4">
					<a-form-item label="车牌颜色" name="vehiclePlateColor">
						<a-select
							v-model:value="searchFormState.vehiclePlateColor"
							placeholder="请选择车牌颜色"
							:options="etcVehicleColorOptions"
						/>
					</a-form-item>
				</a-col>

				<a-col :span="4">
					<a-button type="primary" @click="search">查询</a-button>
				</a-col>
			</a-row>
		</a-form>
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
	</a-card>
</template>

<script setup name="contrastTrack">
	import tool from '@/utils/tool'
	import bdBillingTrafficRecordApi from '@/api/billing/bdBillingTrafficRecordApi'
	import wgs84togcj02 from '@/api/billing/wgs84togcj02'
	import GaodeMap1 from '@/components/Map/contrast/index.vue'
	const ysTrackMap = ref(null)

	import GaodeMap2 from '@/components/Map/contrast/index2.vue'
	const ppTrackMap = ref(null)

	const searchFormState = ref({})
	const searchFormRef = ref()

	const loadSpinning1 = ref(false)
	const loadSpinning2 = ref(false)

	//车辆颜色
	const etcVehicleColorOptions = tool.dictList('etcVehicleColor')

	const search = () => {
		ysTrackMap.value.init()
		ppTrackMap.value.init()

		const searchFormParam = JSON.parse(JSON.stringify(searchFormState.value))
		queryTracksYs(searchFormParam)
		queryTracksPp(searchFormParam)
	}

	const timestampToStartTime = (timestamp) => {
		var date = new Date(timestamp * 1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var Y = date.getFullYear() + '-'
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
		var day = date.getDate()
		var D = (day < 10 ? '0' + day : day) + ' '
		// var h = (date.getHours() < 10 ? '0'+date.getHours():date.getHours())+ ':';
		// var m = (date.getMinutes() < 10 ? '0'+date.getMinutes():date.getMinutes()) + ':';
		// var s = date.getSeconds() < 10 ? '0'+date.getSeconds():date.getSeconds();
		return Y + M + D + '00:00:00'
	}
	const timestampToEndTime = (timestamp) => {
		var date = new Date(timestamp * 1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var Y = date.getFullYear() + '-'
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
		var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
		return Y + M + D + '23:59:59'
	}

	const timestamp = new Date().getTime() / 1000
	searchFormState.value.startTime = timestampToStartTime(timestamp)
	searchFormState.value.endTime = timestampToEndTime(timestamp)

	/**
	 * 原始轨迹数据
	 */
	const queryTracksYs = (param) => {
		loadSpinning1.value = true
		bdBillingTrafficRecordApi.bdBillingTrafficRecordQueryTracks(Object.assign(param)).then((data) => {
			loadSpinning1.value = false
			if (null != data && data.length > 0) {
				let lineArr = []
				data.forEach((v) => {
					let logLat = wgs84togcj02.wgs84togcj02(v.oriLon, v.oriLat)
					lineArr.push({
						position: logLat,
						radius: 5,
						fillColor: 'red',
						sendTime: v.positionTime
					})
				})
				ysTrackMap.value.renderCircleMarker(lineArr)

				//起点
				ysTrackMap.value.renderSimpleMarker([
					{
						position: lineArr[0].position,
						label: '起点',
						labelStyle: {
							color: '#fff',
							fontSize: '12px'
						},
						style: 'green'
					},
					{
						position: lineArr[lineArr.length - 1].position,
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
	const queryTracksPp = (param) => {
		loadSpinning2.value = true
		bdBillingTrafficRecordApi.bdBillingTrafficRecordQueryTracks(Object.assign(param)).then((data) => {
			loadSpinning2.value = false
			if (null != data && data.length > 0) {
				let lineArr = []
				data.forEach((v) => {
					let logLat = wgs84togcj02.wgs84togcj02(v.oriLon, v.oriLat)
					lineArr.push({
						position: logLat,
						radius: 5,
						fillColor: 'red',
						sendTime: v.positionTime
					})
				})
				ppTrackMap.value.renderCircleMarker(lineArr)

				//起点
				ppTrackMap.value.renderSimpleMarker([
					{
						position: lineArr[0].position,
						label: '起点',
						labelStyle: {
							color: '#fff',
							fontSize: '12px'
						},
						style: 'black'
					},
					{
						position: lineArr[lineArr.length - 1].position,
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
</script>
