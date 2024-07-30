<template>
	<a-spin :spinning="loadSpinning">
		<a-card :bordered="false" :visible="visible">
			<a-card title="计费明细详情">
				<a-row>
					<a-col :span="12" style="padding-right: 10px">
						<a-form layout="horizontal" :label-col="{ span: 6 }">
							<a-form-item label="计费明细编号：">
								<span class="form-inside-span-content">{{ detail.id }}</span>
							</a-form-item>
							<a-form-item label="车牌号：">
								<div class="form-inside-div-content">
									<span :class="'big-plateColor-text big-plateColor-' + detail.vehiclePlateColor">{{
										detail.vehiclePlate
									}}</span>
								</div>
							</a-form-item>
							<a-form-item label="终端报文ID：">
								<span class="form-inside-span-content">{{ detail.terminalMessageId }}</span>
							</a-form-item>
							<a-form-item label="车种：">
								<div
									class="form-inside-div-content"
									v-for="vehicleClass in vehicleClassOptions"
									:key="vehicleClass.value"
								>
									<a-tag color="#108ee9" v-if="vehicleClass.value == detail.vehicleClass">{{
										vehicleClass.label
									}}</a-tag>
								</div>
							</a-form-item>
							<a-form-item label="是否收费：">
								<span class="form-inside-span-content" v-if="1 == detail.chargeType">是</span>
								<span class="form-inside-span-content" v-else>否</span>
							</a-form-item>
							<a-form-item label="计费里程(公里)：">
								<span class="form-inside-span-content">{{ $TOOL.changgeKilometers(detail.chargeDistance) }}</span>
							</a-form-item>
							<a-form-item label="费率编码：">
								<span class="form-inside-span-content">{{ detail.rateCode }}</span>
							</a-form-item>
							<a-form-item label="优惠编码：">
								<span class="form-inside-span-content">{{ detail.discountCode }}</span>
							</a-form-item>
							<a-form-item label="优惠比例(%)：">
								<span class="form-inside-span-content"></span>
							</a-form-item>
							<a-form-item label="起点位置：">
								<span class="form-inside-span-content">{{ detail.startAddress }}</span>
							</a-form-item>
							<a-form-item label="起点时间：">
								<span class="form-inside-span-content">{{ detail.startTime }}</span>
							</a-form-item>
							<a-form-item label="计费依据：">
								<span class="form-inside-span-content" v-if="detail.feeBasis == 1">轨迹</span>
								<dspaniv class="form-inside-span-content" v-else-if="detail.feeBasis == 2">视频</dspaniv>
								<dspaniv class="form-inside-span-content" v-else-if="detail.feeBasis == 3">轨迹+视频</dspaniv>
								<span class="form-inside-span-content" v-else>其他</span>
							</a-form-item>
						</a-form>
					</a-col>
					<a-col :span="12">
						<a-form layout="horizontal" :label-col="{ span: 6 }">
							<a-form-item label="通行记录编号：">
								<span class="form-inside-span-content">{{ detail.trafficId }}</span>
							</a-form-item>
							<!--							<a-form-item label="车牌颜色：">-->
							<!--								<div v-for="etcVehicleColor in etcVehicleColorOptions" :key="etcVehicleColor.value">-->
							<!--									<a-tag color="#87d068" v-if="etcVehicleColor.value == detail.vehiclePlateColor">{{-->
							<!--										etcVehicleColor.label-->
							<!--									}}</a-tag>-->
							<!--								</div>-->
							<!--							</a-form-item>-->
							<a-form-item label="计费车型：">
								<div class="form-inside-div-content">
									<template v-for="vehicleType in vehicleTypeOptions" :key="vehicleType.value">
										<a-tag color="#2db7f5" v-if="vehicleType.value == detail.vehicleType">{{
											vehicleType.label
										}}</a-tag></template
									>
								</div>
							</a-form-item>
							<a-form-item label="收费道路类型：">
								<div class="form-inside-div-content">
									<template v-for="roadType in roadTypeOptions" :key="roadType.value"
										><a-tag color="#108ee9" v-if="roadType.value == detail.roadType">{{
											roadType.label
										}}</a-tag></template
									>
								</div>
							</a-form-item>
							<a-form-item label="道路编码【名称】：">
								<span class="form-inside-span-content" v-if="detail.roadname != null && '' != detail.roadname"
									>{{ detail.roadCode }}【{{ detail.roadname }}】</span
								>
								<span class="form-inside-span-content" v-else>{{ detail.roadCode }}</span>
							</a-form-item>
							<a-form-item label="排放水平：">
								<div class="form-inside-div-content">
									<template v-for="energyType in energyTypeOptions" :key="energyType.value">
										<a-tag color="#108ee9" v-if="energyType.value == detail.vehicleCc">{{ energyType.label }}</a-tag>
									</template>
								</div>
							</a-form-item>
							<a-form-item label="计费金额(元)：">
								<span class="form-inside-span-content">{{ $TOOL.changeMoney(detail.chargeAmount) }}</span>
							</a-form-item>
							<a-form-item label="计费费率(元/公里)：">
								<span class="form-inside-span-content">{{ $TOOL.changeRate(detail.rateValue) }}</span>
							</a-form-item>
							<a-form-item label="优惠类型：">
								<span class="form-inside-span-content"></span>
							</a-form-item>
							<a-form-item label="优惠金额(元)：">
								<span class="form-inside-span-content">{{ $TOOL.changeMoney(detail.discountAmount) }}</span>
							</a-form-item>
							<a-form-item label="终点位置：">
								<span class="form-inside-span-content">{{ detail.endAddress }}</span>
							</a-form-item>
							<a-form-item label="终点时间：">
								<span class="form-inside-span-content">{{ detail.endTime }}</span>
							</a-form-item>
							<a-form-item label="创建时间：">
								<span class="form-inside-span-content">{{ detail.createTime }}</span>
							</a-form-item>
						</a-form>
					</a-col>
				</a-row>
			</a-card>
			<a-row>&nbsp;</a-row>
			<a-card title="关联视频"></a-card>
			<a-row>&nbsp;</a-row>
			<a-row>
				<a-col :span="16"></a-col>
				<a-col :span="8" style="text-align: right">
					<a-button style="margin-right: 8px" type="primary" @click="onClose">关闭</a-button>
				</a-col>
			</a-row>
		</a-card>
	</a-spin>
</template>

<script setup name="roadDetail">
	import '@/assets/css/index.less'
	import tool from '@/utils/tool'
	import bdBillingRoadDetailApi from '@/api/billing/bdBillingRoadDetailApi'
	import { cloneDeep } from 'lodash-es'
	import bdBillingTrafficRecordApi from '@/api/billing/bdBillingTrafficRecordApi'
	const visible = ref(false)
	const emit = defineEmits({ successful: null })

	//车辆类型
	const vehicleTypeOptions = tool.dictList('vehicleType')
	//车种
	const vehicleClassOptions = tool.dictList('vehicleClass')
	//道路类型
	const roadTypeOptions = tool.dictList('roadType')
	//排放水平
	const energyTypeOptions = tool.dictList('energyType')

	const loadSpinning = ref(false)

	let detail = ref({})

	const onOpen = (record) => {
		loadSpinning.value = true

		let param = {
			id: record.id
		}
		bdBillingRoadDetailApi.bdBillingRoadDetailDetail(Object.assign(param)).then((data) => {
			if (data) {
				let recordData = cloneDeep(data)
				detail.value = Object.assign({}, recordData)

				if (!detail.value.startAddress) {
					let param1 = {
						lonlat: detail.value.startLon + ',' + detail.value.startLat
					}
					bdBillingTrafficRecordApi.bdBillingTrafficRecordLocation(Object.assign(param1)).then((data) => {
						if (data) {
							let resData = cloneDeep(data)
							detail.value.startAddress = resData
						}
					})
				}

				if (!detail.value.endAddress) {
					let param2 = {
						lonlat: detail.value.endLon + ',' + detail.value.endLat
					}
					bdBillingTrafficRecordApi.bdBillingTrafficRecordLocation(Object.assign(param2)).then((data) => {
						if (data) {
							let resData = cloneDeep(data)
							detail.value.endAddress = resData
						}
					})
				}
			}
			loadSpinning.value = false
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
