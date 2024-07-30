<template>
	<a-card :bordered="false">
		<a-card title="高速计费明细">
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

						<a-form-item label="收费制式：">
							<div class="form-inside-for-content" v-for="chargeMode in chargeModeOptions" :key="chargeMode.value">
								<a-tag color="#108ee9" v-if="chargeMode.value == detail.chargeMode">{{ chargeMode.label }}</a-tag>
							</div>
						</a-form-item>
						<a-form-item label="公路：">
							<span class="form-inside-span-content">{{ detail.highwayCode }}--{{ detail.highwayName }}</span>
						</a-form-item>
						<a-form-item label="收费区间：">
							<span class="form-inside-span-content">{{ detail.intervalCode }}--{{ detail.intervalName }}</span>
						</a-form-item>
						<a-form-item label="计费里程（公里）：">
							<span class="form-inside-span-content">{{ $TOOL.changgeKilometers(detail.chargeDistance) }}</span>
						</a-form-item>
						<a-form-item label="费率编码：">
							<span class="form-inside-span-content">{{ detail.rateCode }}</span>
						</a-form-item>
						<a-form-item label="计费依据：">
							<div class="form-inside-for-content" v-for="feeBasis in feeBasisOptions" :key="feeBasis.value">
								<a-tag color="#108ee9" v-if="feeBasis.value == detail.feeBasis">{{ feeBasis.label }}</a-tag>
							</div>
						</a-form-item>
						<a-form-item label="优惠编码：">
							<span class="form-inside-span-content">{{ detail.discountCode }}</span>
						</a-form-item>
						<a-form-item label="优惠比例（%）：">
							<span class="form-inside-span-content">{{ detail.discountRatio }}</span>
						</a-form-item>
						<a-form-item label="起点位置：">
							<span class="form-inside-span-content">{{ detail.startAddress }}</span>
						</a-form-item>
						<a-form-item label="起点时间：">
							<span class="form-inside-span-content">{{ detail.startTime }}</span>
						</a-form-item>
						<a-form-item label="创建时间：">
							<span class="form-inside-span-content">{{ detail.createTime }}</span>
						</a-form-item>
					</a-form>
				</a-col>
				<a-col :span="12">
					<a-form layout="horizontal" :label-col="{ span: 6 }">
						<a-form-item label="通行记录编号：">
							<span class="form-inside-span-content">{{ detail.trafficId }}</span>
						</a-form-item>
						<a-form-item label="计费车型：">
							<div class="form-inside-for-content">
								<template v-for="vehicleType in vehicleTypeOptions" :key="vehicleType.value">
									<a-tag color="#2db7f5" v-if="vehicleType.value == detail.vehicleType">{{
										vehicleType.label
									}}</a-tag></template
								>
							</div>
						</a-form-item>
						<a-form-item label="车种：">
							<div
								class="form-inside-for-content"
								v-for="vehicleClass in vehicleClassOptions"
								:key="vehicleClass.value"
							>
								<a-tag color="#108ee9" v-if="vehicleClass.value == detail.vehicleClass">{{ vehicleClass.label }}</a-tag>
							</div>
						</a-form-item>

						<a-form-item label="收费道路类型：">
							<div class="form-inside-for-content" v-for="highwayType in highwayTypeOptions" :key="highwayType.value">
								<a-tag color="#108ee9" v-if="highwayType.value == detail.highwayType">{{ highwayType.label }}</a-tag>
							</div>
						</a-form-item>
						<a-form-item label="路段【名称】：">
							<span class="form-inside-span-content">{{ detail.sectionCode }}--{{ detail.sectionName }}</span>
						</a-form-item>
						<a-form-item label="交叉口：">
							<span class="form-inside-span-content">{{ detail.crossCode }}--{{ detail.crossName }}</span>
						</a-form-item>
						<a-form-item label="方向：">
							<div class="form-inside-for-content" v-for="direction in directionOptions" :key="direction.value">
								<a-tag color="#108ee9" v-if="direction.value == detail.direction">{{ direction.label }}</a-tag>
							</div>
						</a-form-item>
						<a-form-item label="计费金额（元）：">
							<span class="form-inside-span-content">{{ $TOOL.changeMoney(detail.chargeAmount) }}</span>
						</a-form-item>
						<a-form-item label="计费费率：">
							<span class="form-inside-span-content">{{ $TOOL.changeRate(detail.rateValue) }}</span>
						</a-form-item>
						<a-form-item label="优惠类型：">
							<span class="form-inside-span-content">{{ detail.discountType }}</span>
						</a-form-item>
						<a-form-item label="优惠金额（元）：">
							<span class="form-inside-span-content">{{ $TOOL.changeMoney(detail.discountAmount) }}</span>
						</a-form-item>
						<a-form-item label="终点位置：">
							<span class="form-inside-span-content">{{ detail.endAddress }}</span>
						</a-form-item>
						<a-form-item label="终点时间：">
							<span class="form-inside-span-content">{{ detail.endTime }}</span>
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
</template>

<script setup name="SectionDetail">
	import tool from '@/utils/tool'
	import highwayfeeSection from '@/api/highwayfee/highwayfeeSection'
	import { cloneDeep } from 'lodash-es'
	const visible = ref(false)
	const emit = defineEmits({ successful: null })

	//车辆类型
	const vehicleTypeOptions = tool.dictList('vehicleType')
	//车种
	const vehicleClassOptions = tool.dictList('vehicleClass')
	//车辆颜色
	const etcVehicleColorOptions = tool.dictList('etcVehicleColor')

	const highwayTypeOptions = tool.dictList('highwayType')
	const chargeModeOptions = tool.dictList('chargeMode')
	const feeBasisOptions = tool.dictList('feeBasis')
	const directionOptions = tool.dictList('IS_UP_DOWN')

	const loadSpinning = ref(false)

	let detail = ref({})

	const onOpen = (record) => {
		loadSpinning.value = true
		visible.value = true
		let param = {
			id: record.id
		}
		highwayfeeSection.detail(Object.assign(param)).then((data) => {
			if (data) {
				let recordData = cloneDeep(data)
				detail.value = Object.assign({}, recordData)
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
