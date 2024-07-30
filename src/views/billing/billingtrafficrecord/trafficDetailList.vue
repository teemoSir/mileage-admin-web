<template>
	<a-spin :spinning="loadSpinning">
		<a-card :bordered="false">
			<a-card title="通行记录详情">
				<a-row>
					<a-col :span="12">
						<a-form layout="horizontal" :label-col="{ span: 6 }">
							<a-form-item label="车牌号：">
								<div class="form-inside-div-content">
									<span :class="'big-plateColor-text big-plateColor-' + trafficDetail.vehiclePlateColor">{{
										trafficDetail.vehiclePlate
									}}</span>
								</div>
							</a-form-item>
							<a-form-item label="终端报文ID：">
								<span class="form-inside-span-content">{{ trafficDetail.terminalMessageId }}</span>
							</a-form-item>
							<a-form-item label="车种：">
								<div
									class="form-inside-div-content"
									v-for="vehicleClass in vehicleClassOptions"
									:key="vehicleClass.value"
								>
									<a-tag color="#108ee9" v-if="vehicleClass.value == trafficDetail.vehicleClass">{{
										vehicleClass.label
									}}</a-tag>
								</div>
							</a-form-item>
							<a-form-item label="计费金额（元）：">
								<span class="form-inside-span-content">{{ $TOOL.changeMoney(trafficDetail.chargeAmount) }}</span>
							</a-form-item>
							<a-form-item label="应收金额（元）：">
								<span class="form-inside-span-content">{{ $TOOL.changeMoney(trafficDetail.actualAmount) }}</span>
							</a-form-item>
							<a-form-item label="起点位置：">
								<span class="form-inside-span-content">{{ trafficDetail.startAddress }}</span>
							</a-form-item>
							<a-form-item label="起点时间：">
								<span class="form-inside-span-content">{{ trafficDetail.startTime }}</span>
							</a-form-item>
							<a-form-item label="创建时间：">
								<span class="form-inside-span-content">{{ trafficDetail.createTime }}</span>
							</a-form-item>
						</a-form>
					</a-col>
					<a-col :span="12">
						<a-form layout="horizontal" :label-col="{ span: 6 }">
							<a-form-item label="通行记录编号：">
								<span class="form-inside-span-content">{{ trafficDetail.traRecId }}</span>
							</a-form-item>
							<a-form-item label="账单编号：">
								<span class="form-inside-span-content">{{ trafficDetail.settlementId }}</span>
							</a-form-item>
							<a-form-item label="计费车型：">
								<div v-for="vehicleType in vehicleTypeOptions" :key="vehicleType.value">
									<a-tag color="#2db7f5" v-if="vehicleType.value == trafficDetail.vehicleType">{{
										vehicleType.label
									}}</a-tag>
								</div>
							</a-form-item>
							<a-form-item label="本年里程累计（公里）：">
								<span class="form-inside-span-content">{{ $TOOL.changgeKilometers(trafficDetail.yearMileage) }}</span>
							</a-form-item>
							<a-form-item label="优惠金额（元）：">
								<span class="form-inside-span-content">{{ $TOOL.changeMoney(trafficDetail.discountAmount) }}</span>
							</a-form-item>
							<a-form-item label="计费里程（公里）：">
								<span class="form-inside-span-content">{{
									$TOOL.changgeKilometers(trafficDetail.chargeDistance)
								}}</span>
							</a-form-item>
							<a-form-item label="终点位置：">
								<span class="form-inside-span-content">{{ trafficDetail.endAddress }}</span>
							</a-form-item>
							<a-form-item label="终点时间：">
								<span class="form-inside-span-content">{{ trafficDetail.endTime }}</span>
							</a-form-item>
						</a-form>
					</a-col>
				</a-row>
			</a-card>
			<a-row>&nbsp;</a-row>
			<a-card title="通行记录明细详情">
				<TrafficDetailListRoad ref="roadRef"></TrafficDetailListRoad>
			</a-card>
		</a-card>
	</a-spin>
</template>

<script setup name="billingtrafficList">
	import '@/assets/css/index.less'
	import tool from '@/utils/tool'
	import bdBillingTrafficRecordApi from '@/api/billing/bdBillingTrafficRecordApi'
	import { cloneDeep } from 'lodash-es'
	import TrafficDetailListRoad from './trafficDetailListRoad.vue'
	const roadRef = ref()

	//车辆类型
	const vehicleTypeOptions = tool.dictList('vehicleType')
	//车种
	const vehicleClassOptions = tool.dictList('vehicleClass')
	//车辆颜色
	const etcVehicleColorOptions = tool.dictList('etcVehicleColor')

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
	}

	defineExpose({
		onOpen
	})
</script>
