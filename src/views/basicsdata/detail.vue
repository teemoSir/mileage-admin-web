<template>
	<a-spin :spinning="loadSpinning">
		<a-card :bordered="false" :visible="visible">
			<a-card title="车辆基础信息">
				<a-row>
					<a-col :span="12" style="padding-right: 10px">
						<a-form layout="horizontal" :label-col="{ span: 6 }">
							<a-form-item label="办理人姓名：">
								<span class="form-inside-span-content">{{ detail.vehicleOwner }}</span>
							</a-form-item>
							<a-form-item label="车牌号：">
								<div class="form-inside-div-content">
									<span :class="'big-plateColor-text big-plateColor-' + detail.vehiclePlateColor">{{
										detail.vehiclePlate
									}}</span>
								</div>
							</a-form-item>
							<a-form-item label="动力类型：">
								<div class="form-inside-for-content">
									<span v-for="vehiclePower in vehiclePowerOptions" :key="vehiclePower.value">
										<template v-if="vehiclePower.value == detail.vehiclePower">{{ vehiclePower.label }}</template>
									</span>
								</div>
							</a-form-item>
							<a-form-item label="数据来源：">
								<div class="form-inside-for-content">
									<span v-for="vehicleSource in vehicleSourceOptions" :key="vehicleSource.value">
										<template v-if="vehicleSource.value == detail.vehicleSource">{{ vehicleSource.label }}</template>
									</span>
								</div>
							</a-form-item>
						</a-form>
					</a-col>
					<a-col :span="12">
						<a-form layout="horizontal" :label-col="{ span: 6 }">
							<a-form-item label="办理类型：">
								<span class="form-inside-span-content" v-if="detail.infoFlag == 1">个人办理</span>
								<span class="form-inside-span-content" v-if="detail.infoFlag == 2">企业办理</span>
							</a-form-item>
							<!--							<a-form-item label="车牌颜色：">-->
							<!--								<div v-for="etcVehicleColor in etcVehicleColorOptions" :key="etcVehicleColor.value">-->
							<!--									<a-tag v-if="etcVehicleColor.value == detail.vehiclePlateColor">{{-->
							<!--										etcVehicleColor.label-->
							<!--									}}</a-tag>-->
							<!--								</div>-->
							<!--							</a-form-item>-->
							<a-form-item label="计费车型：">
								<span class="form-inside-span-content">{{
									$TOOL.dictTypeData('vehicleType', detail.vehicleType + '')
								}}</span>
							</a-form-item>
							<a-form-item label="车轴数：">
								<span class="form-inside-span-content">{{ detail.axleCount }}</span>
							</a-form-item>

							<a-form-item label="排放水平：" name="vehicleCc">
								<div class="form-inside-select-content">
									<a-select
										@change="selChange"
										v-model:value="detail.vehicleCc"
										:options="vehicleCcOptions"
										style="width: 100%"
										placeholder="请选择排放水平"
										:disabled="isShowSel"
									/>
									<a-button style="margin-left: 50px" type="primary" @click="onDisabled" v-if="isShowSel"
										>修改</a-button
									>
								</div>
							</a-form-item>
						</a-form>
					</a-col>
				</a-row>
			</a-card>

			<a-card title="行驶证信息">
				<a-row>
					<a-col :span="12" style="padding-right: 10px">
						<a-form layout="horizontal" :label-col="{ span: 6 }">
							<a-form-item label="行驶证车辆类型：">
								<span class="form-inside-span-content">{{ detail.travelType }}</span>
							</a-form-item>
							<a-form-item label="机动车所有人地址：">
								<span class="form-inside-span-content">{{ detail.ownerAddress }}</span>
							</a-form-item>
							<a-form-item label="行驶证品牌型号：">
								<span class="form-inside-span-content">{{ detail.travelModel }}</span>
							</a-form-item>
							<a-form-item label="车辆发动机号：">
								<span class="form-inside-span-content">{{ detail.engineNum }}</span>
							</a-form-item>
							<a-form-item label="发证日期：">
								<span class="form-inside-span-content">{{ detail.issueDate }}</span>
							</a-form-item>
							<a-form-item label="核定载人数（人）：">
								<span class="form-inside-span-content">{{ detail.approvedCount }}</span>
							</a-form-item>
							<a-form-item label="整备质量（KG）：">
								<span class="form-inside-span-content">{{ detail.unladenMass }}</span>
							</a-form-item>
							<a-form-item label="准牵引质量（KG）：">
								<span class="form-inside-span-content">{{ detail.towMass }}</span>
							</a-form-item>
						</a-form>
					</a-col>
					<a-col :span="12">
						<a-form layout="horizontal" :label-col="{ span: 6 }">
							<a-form-item label="机动车所有人姓名：">
								<span class="form-inside-span-content">{{ detail.vehicleOwner }}</span>
							</a-form-item>
							<a-form-item label="车辆使用性质：">
								<span class="form-inside-span-content">{{ detail.licenseUseCharacter }}</span>
							</a-form-item>
							<a-form-item label="车辆识别代码：">
								<span class="form-inside-span-content">{{ detail.vin }}</span>
							</a-form-item>
							<a-form-item label="注册日期：">
								<span class="form-inside-span-content">{{ detail.registerDate }}</span>
							</a-form-item>
							<a-form-item label="档案编号：">
								<span class="form-inside-span-content">{{ detail.fileNum }}</span>
							</a-form-item>
							<a-form-item label="总质量（KG）：">
								<span class="form-inside-span-content">{{ detail.totalMass }}</span>
							</a-form-item>
							<a-form-item label="核定载质量（KG）：">
								<span class="form-inside-span-content">{{ detail.approvedMass }}</span>
							</a-form-item>
							<a-form-item label="外廊尺寸（mm）：">
								<span class="form-inside-span-content">{{ detail.outsideDimensions }}</span>
							</a-form-item>
						</a-form>
					</a-col>
				</a-row>
			</a-card>

			<a-card title="终端信息">
				<a-row>
					<a-col :span="12" style="padding-right: 10px">
						<a-form layout="horizontal" :label-col="{ span: 6 }">
							<a-form-item label="终端IMEI：">
								<span class="form-inside-span-content">{{ detail.imei }}</span>
							</a-form-item>
							<a-form-item label="终端ICCID：">
								<span class="form-inside-span-content">{{ detail.iccid }}</span>
							</a-form-item>
							<a-form-item label="终端制造商名称：">
								<span class="form-inside-span-content">{{ detail.terminalMfrs }}</span>
							</a-form-item>
						</a-form>
					</a-col>
					<a-col :span="12">
						<a-form layout="horizontal" :label-col="{ span: 6 }">
							<a-form-item label="报文ID：">
								<span class="form-inside-span-content">{{ detail.terminalMessageId }}</span>
							</a-form-item>
							<a-form-item label="终端型号：">
								<span class="form-inside-span-content">{{ detail.terminalModel }}</span>
							</a-form-item>
							<a-form-item label="发行时间：">
								<span class="form-inside-span-content">{{ detail.createTime }}</span>
							</a-form-item>
						</a-form>
					</a-col>
				</a-row>
			</a-card>

			<a-card title="证件信息">
				<a-row>
					<a-col :span="12" style="padding-right: 10px">
						<a-form layout="horizontal" :label-col="{ span: 6 }">
							<a-form-item label="办理人证件/营业执照：">
								<view v-for="(item, i) in photoList" :key="i">
									<a-image
										v-if="item.pictureType === '1011' || item.pictureType === '1012' || item.pictureType === '2003'"
										:src="item.fileId"
										style="width: 100px; height: 100px; margin-right: 15px"
									/>
								</view>
							</a-form-item>
							<a-form-item label="行驶证照片：">
								<view v-for="(item, i) in photoList" :key="i">
									<a-image
										v-if="item.pictureType === '3001' || item.pictureType === '3002'"
										:src="item.fileId"
										style="width: 100px; height: 100px; margin-right: 15px"
									/>
								</view>
							</a-form-item>
							<a-form-item label="车身照片：">
								<view v-for="(item, i) in photoList" :key="i">
									<a-image
										v-if="item.pictureType === '5001' || item.pictureType === '5002' || item.pictureType === '5003'"
										:src="item.fileId"
										style="width: 100px; height: 100px; margin-right: 15px"
									/>
								</view>
							</a-form-item>
						</a-form>
					</a-col>
				</a-row>
			</a-card>
			<a-row>
				<a-col :span="16"></a-col>
				<a-col :span="8" style="text-align: right">
					<a-button style="margin-right: 8px" type="primary" @click="onClose">关闭</a-button>
					<a-button
						style="margin-right: 8px"
						type="primary"
						:loading="formLoading"
						@click="onSave(detail)"
						v-if="isShowSelSave"
						>保存</a-button
					>
				</a-col>
			</a-row>
		</a-card>
	</a-spin>
</template>

<script setup name="roadDetail">
	import '@/assets/css/index.less'
	import tool from '@/utils/tool'
	import vehicleInfoApi from '@/api/basicsdata/vehicleInfoApi'
	import { cloneDeep } from 'lodash-es'
	import SanDianTu01 from '@/components/Chart/g2SanDianTu/SanDianTu01.vue'
	import Preview from '@/views/gen/preview.vue'
	import { getAllElementsRecursively } from '@antv/g2plot/lib/utils'
	const visible = ref(false)
	const emit = defineEmits({ successful: null })
	const formLoading = ref(false)
	//车辆类型
	const vehicleTypeOptions = tool.dictList('vehicleType')
	//车种
	const vehicleClassOptions = tool.dictList('vehicleClass')
	//排放水平
	const vehicleCcOptions = tool.dictList('energyType')
	//车辆来源
	const vehicleSourceOptions = tool.dictList('VEH_LOCATION_SOURCE')
	//动力类型
	const vehiclePowerOptions = tool.dictList('VEHICLE_POWER_TYPE')

	const loadSpinning = ref(false)

	let detail = ref({})
	let photoList = ref([])

	const onOpen = (record) => {
		isShowSel.value = true
		loadSpinning.value = true

		let param = {
			pkid: record.pkid
		}
		vehicleInfoApi.vehicleInfoDetail(Object.assign(param)).then((data) => {
			isShowSelSave.value = false
			if (data) {
				let recordData = cloneDeep(data)
				detail.value = Object.assign({}, recordData)
				if (detail.value.vehicleCc == 1) {
					detail.value.vehicleCc = '低排量'
				} else if (detail.value.vehicleCc == 2) {
					detail.value.vehicleCc = '标准排量'
				} else if (detail.value.vehicleCc == 3) {
					detail.value.vehicleCc = '高排量'
				}
				detail.value.createTime = formatTime(detail.value.createTime)
			}

			loadSpinning.value = false
		})
		let paramPhoto = {
			personPkid: record.personPkid,
			vehiclePkid: record.pkid
		}
		vehicleInfoApi.queryPicture(Object.assign(paramPhoto)).then((data) => {
			if (data) {
				photoList.value = cloneDeep(data)
				// for (let i = 0; i < photoList.value.length; i++) {
				// 	photoList.value[i].img = (
				// 		<a-image src="' + photoList.value[i].fileId + '" style="width: 100px; height: 100px; margin-right: 15px" />
				// 	)
				// }
			}
		})
	}

	const onClose = () => {
		visible.value = false
		emit('successful')
	}
	const onSave = (record) => {
		loadSpinning.value = true
		let param = {
			pkid: record.pkid,
			vehicleCc: record.vehicleCc
		}
		vehicleInfoApi
			.updateVehicleCc(Object.assign(param))
			.then((data) => {
				onClose()
				emit('successful')
			})
			.finally(() => {
				formLoading.value = false
				document.getElementById('pagereset').click()
			})
	}
	defineExpose({
		onOpen
	})
	const isShowSel = ref(true)
	const onDisabled = () => {
		isShowSel.value = false
	}

	const isShowSelSave = ref(false)
	const selChange = () => {
		isShowSelSave.value = true
	}

	const formatTime = (timestamp) => {
		console.info(timestamp)
		var date = new Date(timestamp * 1) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var Y = date.getFullYear() + '-'
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
		var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
		var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
		var m = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()) + ':'
		var s = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
		return Y + M + D + h + m + s
	}
</script>
