<template>
	<a-spin :spinning="loadSpinning">
		<a-card :bordered="false">
			<a-row>
				<a-col :span="10">
					<a-row>
						<a-card style="width: 100%" title="通行记录详情">
							<a-row>
								<a-col :span="8">
									<span :class="'big-plateColor-text big-plateColor-' + trafficDetail.vehiclePlateColor">{{
										trafficDetail.vehiclePlate
									}}</span>
								</a-col>
								<a-col :span="16">
									<a-row>
										<a-col :span="12" style="text-align: center">
											<div v-for="vehicleType in vehicleTypeOptions" :key="vehicleType.value">
												<a-tag color="#2db7f5" v-if="vehicleType.value == trafficDetail.vehicleType">{{
													vehicleType.label
												}}</a-tag>
											</div>
										</a-col>
										<a-col :span="12" style="text-align: center">
											<a-tag color="#108ee9">本年累计里程</a-tag>
										</a-col>
									</a-row>
									<a-row>
										<a-col :span="12" style="text-align: center">
											<div v-for="vehicleClass in vehicleClassOptions" :key="vehicleClass.value">
												<a-tag color="#87d068" v-if="vehicleClass.value == trafficDetail.vehicleClass">{{
													vehicleClass.label
												}}</a-tag>
											</div>
										</a-col>
										<a-col :span="12" style="text-align: center"
											>{{ $TOOL.changgeKilometers(trafficDetail.yearMileage) }} 公里</a-col
										>
									</a-row>
								</a-col>
							</a-row>
							<a-row>&nbsp;</a-row>
							<a-row>
								<a-col :span="3" style="text-align: center">计费金额</a-col>
								<a-col :span="3" style="text-align: center"></a-col>
								<a-col :span="3" style="text-align: center">优惠金额</a-col>
								<a-col :span="3" style="text-align: center"></a-col>
								<a-col :span="3" style="text-align: center">应收金额</a-col>
								<a-col :span="3" style="text-align: center"></a-col>
								<a-col :span="6" style="text-align: center">计费里程</a-col>
							</a-row>
							<a-row>
								<a-col :span="3" style="text-align: center"
									>{{ $TOOL.changeMoney(trafficDetail.chargeAmount) }} 元</a-col
								>
								<a-col :span="3" style="text-align: center">-</a-col>
								<a-col :span="3" style="text-align: center"
									>{{ $TOOL.changeMoney(trafficDetail.discountAmount) }} 元</a-col
								>
								<a-col :span="3" style="text-align: center">=</a-col>
								<a-col :span="3" style="text-align: center"
									>{{ $TOOL.changeMoney(trafficDetail.actualAmount) }} 元</a-col
								>
								<a-col :span="3" style="text-align: center"></a-col>
								<a-col :span="6" style="text-align: center"
									>{{ $TOOL.changgeKilometers(trafficDetail.chargeDistance) }} 公里</a-col
								>
							</a-row>
						</a-card>
					</a-row>
					<a-row>
						<a-col :span="12" style="text-align: center"><a-tag color="#108ee9">起点</a-tag></a-col>
						<a-col :span="12" style="text-align: center"><a-tag color="#108ee9">终点</a-tag></a-col>
					</a-row>
					<a-spin :spinning="loadSpinning2">
						<a-row>
							<a-col :span="12" style="text-align: center">{{ trafficDetail.startAddress }}</a-col>
							<a-col :span="12" style="text-align: center">{{ trafficDetail.endAddress }}</a-col>
						</a-row>
					</a-spin>
					<a-row>
						<a-col :span="12" style="text-align: center">{{ trafficDetail.startTime }}</a-col>
						<a-col :span="12" style="text-align: center">{{ trafficDetail.endTime }}</a-col>
					</a-row>
					<a-divider orientation="left">通行记录明细</a-divider>
					<a-row>
						<Road ref="roadRef" @rowClick="rowClick"></Road>
					</a-row>
				</a-col>
				<a-col :span="14">
					<TrafficDetailMapTrack ref="trafficDetailMapTrackRef"></TrafficDetailMapTrack>
				</a-col>
			</a-row>
		</a-card>
	</a-spin>
</template>

<script setup name="billingtrafficMap">
	import '@/assets/css/index.less'
	import tool from '@/utils/tool'
	import bdBillingTrafficRecordApi from '@/api/billing/bdBillingTrafficRecordApi'
	import { cloneDeep } from 'lodash-es'
	import Road from './trafficDetailMapTab.vue'
	import TrafficDetailMapTrack from './trafficDetailMapTrack.vue'
	const roadRef = ref()
	const trafficDetailMapTrackRef = ref()

	//车辆类型
	const vehicleTypeOptions = tool.dictList('vehicleType')
	//车种
	const vehicleClassOptions = tool.dictList('vehicleClass')

	const loadSpinning = ref(false)
	const loadSpinning2 = ref(false)

	let trafficDetail = ref({})

	const onOpen = (record) => {
		loadSpinning.value = true

		let param = {
			id: record.traRecId
		}
		bdBillingTrafficRecordApi.bdBillingTrafficRecordDetail(Object.assign(param)).then((data) => {
			if (data) {
				let recordData = cloneDeep(data)
				trafficDetail.value = Object.assign({}, recordData)
			}
			loadSpinning.value = false

			loadSpinning2.value = true
			let param1 = {
				lonlat: trafficDetail.value.startLon + ',' + trafficDetail.value.startLat
			}
			bdBillingTrafficRecordApi.bdBillingTrafficRecordLocation(Object.assign(param1)).then((data) => {
				if (data) {
					let resData = cloneDeep(data)
					trafficDetail.value.startAddress = resData
				}
				loadSpinning2.value = false
			})

			let param2 = {
				lonlat: trafficDetail.value.endLon + ',' + trafficDetail.value.endLat
			}
			bdBillingTrafficRecordApi.bdBillingTrafficRecordLocation(Object.assign(param2)).then((data) => {
				if (data) {
					let resData = cloneDeep(data)
					trafficDetail.value.endAddress = resData
				}
				loadSpinning2.value = false
			})
		})

		roadRef.value.onOpen(record)
		trafficDetailMapTrackRef.value.onOpen(record)
	}

	const rowClick = (value) => {
		trafficDetailMapTrackRef.value.rowClick(value)
	}

	defineExpose({
		onOpen
	})
</script>
