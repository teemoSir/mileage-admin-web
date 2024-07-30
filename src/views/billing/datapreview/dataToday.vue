<template>
	<a-row style="margin-top: 22px" :gutter="20">
		<a-col :span="12">
			<span class="titleItem">{{ 'today' === timeTypeValue ? '今日计费概况' : '历史计费概况' }}</span>
			<a-card class="card-common" style="height: 270px">
				<div class="common-card">
					<span>计费金额（元）</span>
					<span>{{ tool.groupSeparator(datapreview.chargeAmount) }}</span>
				</div>
				<a-divider />
				<a-row style="padding-left: 15px">
					<a-col :span="13">
						<div class="sub_content">
							<div class="sub_content_down">计费里程（公里）</div>
							<div class="sub_content_up">{{ tool.groupSeparator(datapreview.chargeDistance) }}</div>
						</div>
					</a-col>
					<a-col :span="11">
						<div class="sub_content">
							<div class="sub_content_down">
								<span style="position: relative">
									计费明细（笔）
									<a-tooltip placement="top">
										<template #title>
											<span>车辆在收费道路行驶产生的计费明细数量</span>
										</template>
										<div style="position: absolute; top: -12px; right: -10px">
											<img
												src="/img/quesion.png"
												style="width: 13px; height: 13px; margin-right: 5px; cursor: pointer"
											/>
										</div>
									</a-tooltip>
								</span>
							</div>
							<div class="sub_content_up">{{ tool.groupSeparator(datapreview.billingDetailCount) }}</div>
						</div>
					</a-col>
					<a-col :span="13">
						<div class="sub_content">
							<div class="sub_content_down">
								<span style="position: relative">
									通行记录（笔）
									<a-tooltip placement="top">
										<template #title>
											<span>车辆每次驶入驶出收费道路产生的通行记录总数量</span>
										</template>
										<div style="position: absolute; top: -12px; right: -10px">
											<img
												src="/img/quesion.png"
												style="width: 13px; height: 13px; margin-right: 5px; cursor: pointer"
											/>
										</div>
									</a-tooltip>
								</span>
							</div>
							<div class="sub_content_up">
								{{ tool.groupSeparator(datapreview.trafficRecordCount) }}
							</div>
						</div>
					</a-col>
					<a-col :span="11">
						<div class="sub_content">
							<div class="sub_content_down">
								<span style="position: relative">
									账单（笔）
									<a-tooltip placement="top">
										<template #title>
											<span>统计时间范围内车辆在收费道路行驶产生的计费账单数量</span>
										</template>
										<div style="position: absolute; top: -12px; right: -10px">
											<img
												src="/img/quesion.png"
												style="width: 13px; height: 13px; margin-right: 5px; cursor: pointer"
											/>
										</div>
									</a-tooltip>
								</span>
							</div>
							<div class="sub_content_up">
								{{ tool.groupSeparator(datapreview.billingCount) }}
							</div>
						</div>
					</a-col>
				</a-row>
			</a-card>
		</a-col>

		<a-col :span="12">
			<span class="titleItem">{{ 'today' === timeTypeValue ? '车辆上线概况' : '平台车辆概况' }}</span>
			<a-card class="card-common" style="height: 270px">

				<a-row>
					<a-col :span="14" v-if="1 == vehicleType">
						<div class="common-card">
							<span>已上线车辆数（辆）</span>
							<span>{{ tool.groupSeparator(datapreview.allVehicleCount) }}</span>
						</div>
					</a-col>
					<a-col :span="14" v-if="2 == vehicleType">
						<div class="common-card">
							<span>已接入车辆数（辆）</span>
							<span>{{ tool.groupSeparator(datapreview.allVehicleCountAccess) }}</span>
						</div>
					</a-col>
					<a-col :span="10">
						<div v-if="'history' === timeTypeValue" style="display: flex; justify-content: flex-end; margin-right: 30px; max-height: 60px;">
							<a-radio-group
								button-style="solid"
								v-model:value="vehicleType"
								style="margin-right: 10px"
								@change="changeVehicleType"
							>
								<a-radio-button value="1">已上线车辆</a-radio-button>
								<a-radio-button value="2">已接入车辆</a-radio-button>
							</a-radio-group>
						</div>
					</a-col>
				</a-row>

				<div v-if="1 == vehicleType">
					<a-divider />
					<a-row style="padding-left: 15px">
						<a-col :span="12">
							<div class="sub_content">
								<div class="sub_content_down">发行终端车辆（辆）</div>
								<div class="sub_content_up sub_content_ml">{{ tool.groupSeparator(datapreview.fxzdCount) }}</div>
							</div>
						</a-col>
						<a-col :span="12">
							<div class="sub_content">
								<div class="sub_content_down">货运平台车辆（辆）</div>
								<div class="sub_content_up sub_content_ml">{{ tool.groupSeparator(datapreview.hyptCount) }}</div>
							</div>
						</a-col>
						<a-col :span="12">
							<div class="sub_content">
								<div class="sub_content_down">联网联控车辆（辆）</div>
								<div class="sub_content_up sub_content_ml">{{ tool.groupSeparator(datapreview.lwlkCount) }}</div>
							</div>
						</a-col>
						<a-col :span="12">
							<div class="sub_content">
								<div class="sub_content_down">新能源车辆（辆）</div>
								<div class="sub_content_up sub_content_ml">{{ tool.groupSeparator(datapreview.xnyCount) }}</div>
							</div>
						</a-col>
					</a-row>
				</div>
				<div v-if="2 == vehicleType">
					<a-divider />
					<a-row style="padding-left: 15px">
						<a-col :span="12">
							<div class="sub_content">
								<div class="sub_content_down">发行终端车辆（辆）</div>
								<div class="sub_content_up sub_content_ml">{{ tool.groupSeparator(datapreview.fxzdCountAccess) }}</div>
							</div>
						</a-col>
						<a-col :span="12">
							<div class="sub_content">
								<div class="sub_content_down">货运平台车辆（辆）</div>
								<div class="sub_content_up sub_content_ml">{{ tool.groupSeparator(datapreview.hyptCountAccess) }}</div>
							</div>
						</a-col>
						<a-col :span="12">
							<div class="sub_content">
								<div class="sub_content_down">联网联控车辆（辆）</div>
								<div class="sub_content_up sub_content_ml">{{ tool.groupSeparator(datapreview.lwlkCountAccess) }}</div>
							</div>
						</a-col>
						<a-col :span="12">
							<div class="sub_content">
								<div class="sub_content_down">新能源车辆（辆）</div>
								<div class="sub_content_up sub_content_ml">{{ tool.groupSeparator(datapreview.xnyCountAccess) }}</div>
							</div>
						</a-col>
					</a-row>
				</div>
			</a-card>
		</a-col>
	</a-row>

	<a-row :gutter="20" style="margin-top: 22px">
		<a-col :span="12">
			<span class="titleItem"><b>车型计费概况</b></span>
			<a-card style="height: 450px; margin-top: 10px">
				<div style="display: flex; justify-content: flex-end; margin-right: 30px">
					<a-radio-group
						button-style="solid"
						v-model:value="radioRoadType"
						style="margin-right: 10px"
						@change="paneChangeRoadType"
					>
						<a-radio-button value="1">全部</a-radio-button>
						<a-radio-button value="10">高速公路</a-radio-button>
						<a-radio-button value="20">普通公路</a-radio-button>
					</a-radio-group>
				</div>
				<a-row :gutter="20">
					<a-col :span="18">
						<DoughnutChartVehicle ref="doughnutChartVehicleRef" style="height: 450px" />
					</a-col>
					<a-col :span="6" style="padding-left: 1px; padding-top: 30px">
						<div v-for="item in jfDataList" :key="item.title">
							<a-row style="margin-top: 30px"
								><span>{{ item.title }}</span></a-row
							>
							<a-row>
								<a-space class="spanValue">{{ item.vehicle }}</a-space
								><a-space>元</a-space><a-space class="spanValue" style="margin-left: 20px">{{ item.ratio }}</a-space
								><a-space>%</a-space>
							</a-row>
						</div>
					</a-col>
				</a-row>
			</a-card>
		</a-col>
		<a-col :span="12">
			<span class="titleItem"><b>各数据源计费概况</b></span>
			<a-card style="height: 450px; margin-top: 10px">
				<ZhuZhuangTu02SjyJf ref="ZhuZhuangTu02SjyJfRef"></ZhuZhuangTu02SjyJf>
			</a-card>
		</a-col>
	</a-row>

	<a-row>&nbsp;</a-row>

	<a-row :gutter="20" style="margin-top: 22px">
		<a-col :span="12">
			<span class="titleItem"><b>收费道路车辆分布概况</b></span>
			<a-card style="height: 500px; margin-top: 10px">
				<div style="display: flex; justify-content: flex-end; margin-right: 30px">
					<a-radio-group
						button-style="solid"
						v-model:value="radioVehicleFromType"
						style="margin-right: 10px"
						@change="paneChangeVehicleype"
					>
						<a-radio-button value="1">按计费车型</a-radio-button>
						<a-radio-button value="2">按数据来源</a-radio-button>
					</a-radio-group>
				</div>
				<a-row :gutter="20" v-if="1 == radioVehicleFromType">
					<a-col :span="18">
						<DoughnutChartRoad ref="DoughnutChartRoadRef" style="height: 450px" />
					</a-col>
					<a-col :span="6" style="padding-left: 1px; padding-top: 30px">
						<div v-for="item in dlDataList" :key="item.title">
							<a-row style="margin-top: 30px"
								><span>{{ item.title }}</span></a-row
							>
							<a-row
								><a-space class="spanValue">{{ item.vehicle }}</a-space
								><a-space>辆</a-space><a-space class="spanValue" style="margin-left: 20px">{{ item.ratio }}</a-space
								><a-space>%</a-space></a-row
							>
						</div>
					</a-col>
				</a-row>
				<a-row :gutter="20" v-if="2 == radioVehicleFromType" style="text-align: center">
					<BingZhuangTu02 ref="BingZhuangTu02Ref" style="height: 450px; width: 100%"></BingZhuangTu02>
				</a-row>
			</a-card>
		</a-col>
		<a-col :span="12">
			<span class="titleItem"><b>计费排行Top 10</b></span>
			<a-card style="height: 500px; margin-top: 10px">
				<div style="display: flex; justify-content: flex-end; margin-right: 30px">
					<a-radio-group
						button-style="solid"
						v-model:value="radioRoadAddressType"
						style="margin-right: 10px"
						@change="paneChangeRoadAddressType"
					>
						<a-radio-button value="1">按道路</a-radio-button>
						<a-radio-button value="2">按区域</a-radio-button>
					</a-radio-group>
				</div>
				<a-row v-if="1 == radioRoadAddressType">
					<TiaoXingTuTop ref="TiaoXingTuTopRef" style="width: 100%" />
				</a-row>
				<a-row v-if="2 == radioRoadAddressType"> 按区域统计正在开发中。。。。。。敬请期待 </a-row>
			</a-card>
		</a-col>
	</a-row>
</template>

<script setup name="datapreviewToday">
	import DoughnutChartVehicle from '@/views/billing/datapreview/modules/DoughnutChartVehicle.vue'
	import DoughnutChartRoad from '@/views/billing/datapreview/modules/DoughnutChartRoad.vue'
	import ZhuZhuangTu02SjyJf from '@/views/billing/datapreview/modules/ZhuZhuangTu02SjyJf.vue'
	import TiaoXingTuTop from '@/views/billing/datapreview/modules/TiaoXingTuTop.vue'
	import BingZhuangTu02 from '@/views/billing/datapreview/modules/BingZhuangTu02.vue'
	import datapreviewApi from '@/api/billing/datapreviewApi'
	import { onMounted } from 'vue'

	const datapreview = ref({})
	let radioRoadType = ref('1')
	let vehicleType = ref('1')
	let radioVehicleFromType = ref('1')
	let radioRoadAddressType = ref('1')
	const doughnutChartVehicleRef = ref()
	const ZhuZhuangTu02SjyJfRef = ref()
	const DoughnutChartRoadRef = ref()
	const BingZhuangTu02Ref = ref()
	const TiaoXingTuTopRef = ref()
	const QueryParam = ref()
	import tool from '@/utils/tool'
	import { required } from '@/utils/formRules'
	const timeTypeValue = ref('today')

	const onOpen = (record, timeType) => {
		QueryParam.value = record
		timeTypeValue.value = timeType

		/**
		 * 计费概况
		 */
		if ('today' == timeType) {
			datapreviewApi.bdBillingProfile(record).then((data) => {
				if (data) {
					//计费金额
					datapreview.value.chargeAmount = data.chargeAmount
					//计费里程
					datapreview.value.chargeDistance = data.chargeDistance
					//计费明细（笔）
					datapreview.value.billingDetailCount = data.billingDetailCount
					//通行记录（笔）
					datapreview.value.trafficRecordCount = data.trafficRecordCount
					//账单（笔）
					datapreview.value.billingCount = data.billingCount
				}
			})
		} else if ('history' == timeType) {
			datapreviewApi.bdBillingProfileHistry(record).then((data) => {
				if (data) {
					//计费金额
					datapreview.value.chargeAmount = data.chargeAmount
					//计费里程
					datapreview.value.chargeDistance = data.chargeDistance
					//计费明细（笔）
					datapreview.value.billingDetailCount = data.billingDetailCount
					//通行记录（笔）
					datapreview.value.trafficRecordCount = data.trafficRecordCount
					//账单（笔）
					datapreview.value.billingCount = data.billingCount
				}
			})
		}

		record.type = timeType
		/**
		 * 车辆上线状况
		 */
		datapreviewApi.queryVehicleOnline(record).then((data) => {
			if (data) {
				//车辆上线数：联网联控，1
				datapreview.value.lwlkCount = data.lwlkCount
				//"车辆上线数：货运平台，2
				datapreview.value.hyptCount = data.hyptCount
				//车辆上线数：终端发行，3
				datapreview.value.fxzdCount = data.fxzdCount
				//车辆上线数：新能源，4
				datapreview.value.xnyCount = data.xnyCount

				datapreview.value.allVehicleCount = data.lwlkCount + data.hyptCount + data.fxzdCount + data.xnyCount

				//车辆接入数：联网联控，1
				datapreview.value.lwlkCountAccess = data.lwlkCountAccess
				//"车辆接入数：货运平台，2
				datapreview.value.hyptCountAccess = data.hyptCountAccess
				//车辆接入数：终端发行，3
				datapreview.value.fxzdCountAccess = data.fxzdCountAccess
				//车辆接入数：新能源，4
				datapreview.value.xnyCountAccess = data.xnyCountAccess

				datapreview.value.allVehicleCountAccess =
					data.lwlkCountAccess + data.hyptCountAccess + data.fxzdCountAccess + data.xnyCountAccess
			}
		})

		/**
		 * 车辆计费状况
		 */
		queryBillingByRoadType(record)

		/**
		 * 各数据源统计状况
		 */
		queryBillingByRoadVehicleType(record)

		/**
		 * 收费道路车辆分布状况
		 */
		queryBillingVehicleByType(record)

		//按数据来源
		queryBillingVehicleBySource(record)

		/**
		 * 计费排行Top 10
		 */
		queryBillingByRoad(record)
	}

	/**
	 * 车辆计费状况，切换
	 */
	const paneChangeRoadType = () => {
		let record = QueryParam.value
		record.roadType = radioRoadType.value
		queryBillingByRoadType(record)
	}

	const jfDataList = ref([])
	//车辆类型
	const vehicleTypeOptions = tool.dictList('vehicleType')
	const vehicleSourceOptions = tool.dictList('VEH_LOCATION_SOURCE')
	const queryBillingByRoadType = (record) => {
		let kcBilling = 0
		let hcBilling = 0
		let zxBilling = 0
		let hj = 0
		datapreviewApi.queryBillingByRoadType(record).then((data) => {
			let dataArray = []
      let hj = 0
			if (data) {
				data.forEach((v) => {
					vehicleTypeOptions.forEach((value) => {
						if (v.type == value.value) {
							dataArray.push({ name: value.label, value: v.billing })
						}
					})

					if (v.type < 10) {
						kcBilling = kcBilling + v.billing
					} else if (v.type < 20) {
						hcBilling = hcBilling + v.billing
					} else if (v.type < 30) {
						zxBilling = zxBilling + v.billing
					}

          hj += v.billing

				})

        hj = hj.toFixed(2)

				doughnutChartVehicleRef.value.onOpen(dataArray, record.roadType, hj)

				hj = kcBilling + hcBilling + zxBilling
				jfDataList.value = [
					{ title: '客车', vehicle: kcBilling.toFixed(2), ratio: ((kcBilling / hj) * 100).toFixed(2) },
					{ title: '货车', vehicle: hcBilling.toFixed(2), ratio: ((hcBilling / hj) * 100).toFixed(2) },
					{ title: '专项作业车', vehicle: zxBilling.toFixed(2), ratio: ((zxBilling / hj) * 100).toFixed(2) }
				]
			}
		})
	}

	/**
	 * 各数据源统计状况
	 */
	const queryBillingByRoadVehicleType = (record) => {
		datapreviewApi.queryBillingByRoadVehicleType(record).then((data) => {
			if (data) {
				ZhuZhuangTu02SjyJfRef.value.onOpen(data)
			}
		})
	}

	/**
	 * 收费道路车辆分布状况 -- 按计费车型
	 */
	let dlDataList = ref([])
	const queryBillingVehicleByType = (record) => {
		let kcCount = 0
		let hcCount = 0
		let zxCount = 0
		let hj = 0
		datapreviewApi.queryBillingVehicleByType(record).then((data) => {
			if (data) {
				let dataArray = []
				data.forEach((v) => {
					vehicleTypeOptions.forEach((value) => {
						if (v.type == value.value) {
							dataArray.push({ name: value.label, value: v.count })
						}
					})

					if (v.type < 10) {
						kcCount = kcCount + v.count
					} else if (v.type < 20) {
						hcCount = hcCount + v.count
					} else if (v.type < 30) {
						zxCount = zxCount + v.count
					}
				})
				DoughnutChartRoadRef.value.onOpen(dataArray)

				hj = kcCount + hcCount + zxCount
				dlDataList.value = [
					{ title: '客车', vehicle: kcCount, ratio: ((kcCount / hj) * 100).toFixed(2) },
					{ title: '货车', vehicle: hcCount, ratio: ((hcCount / hj) * 100).toFixed(2) },
					{ title: '专项作业车', vehicle: zxCount, ratio: ((zxCount / hj) * 100).toFixed(2) }
				]
			}
		})
	}

	/**
	 * 收费道路车辆分布状况 -- 按数据来源
	 */
	const queryBillingVehicleBySource = (record) => {
		datapreviewApi.queryBillingVehicleBySource(record).then((data) => {
			if (data) {
				let dataArray = []
				data.forEach((v) => {
					vehicleSourceOptions.forEach((value) => {
						if (v.source == value.value) {
							dataArray.push({ type: value.label, value: v.count })
						}
					})
				})
				BingZhuangTu02Ref.value.onOpen(dataArray)
			}
		})
	}

	/**
	 * 计费排行Top 10
	 */
	const queryBillingByRoad = (record) => {
		datapreviewApi.queryBillingByRoad(record).then((data) => {
			if (data) {
				TiaoXingTuTopRef.value.onOpen(data)
			}
		})
	}

	const paneChangeVehicleype = () => {
		let record = QueryParam.value
		if (1 == radioVehicleFromType.value) {
			//按计费车型
			queryBillingVehicleByType(record)
		} else if (2 == radioVehicleFromType.value) {
			//按数据来源
			queryBillingVehicleBySource(record)
		}
	}

	const paneChangeRoadAddressType = () => {
		let record = QueryParam.value
		if (1 == radioRoadAddressType.value) {
			queryBillingByRoad(record)
		}
	}

	onMounted(() => {})

	defineExpose({
		onOpen
	})
</script>
<style>
	.titleItem {
		font-size: 15px;
		font-weight: bold;
		color: black;
		padding-left: 4px;
		border-left: 3px solid lightseagreen;
	}
	.card-common {
		margin-top: 10px;
		border-radius: 8px;
		padding-bottom: 26px;
		.ant-card-body {
			padding: 10px;
		}
		.ant-divider-horizontal {
			margin: 10px 0 0 0;
		}
		.common-card {
			display: flex;
			height: 60px;
			align-items: baseline;
			margin-top: 10px;
			padding-left: 15px;
			:first-child {
				font-size: 15px;
				color: black;
			}
			:last-child {
				font-size: 42px;
				font-weight: bold;
				color: black;
				margin-left: 50px;
			}
		}
		.sub_content {
			text-align: center;
			margin-top: 20px;
			display: flex;
			align-items: last baseline;
			flex-wrap: wrap;
			.sub_content_up {
				font-size: 32px;
				font-weight: bold;
				color: black;
				margin-left: 15px;
				display: flex;
				align-items: flex-end;
			}
			.sub_content_down {
				font-size: 14px;
				color: black;
				display: block;
				min-width: 142px;
				text-align: start;
				margin-left: 0;
			}
			.sub_content_ml {
				margin-left: 50px;
			}
		}
	}
	.spanTitleKey {
		font-size: 14px;
	}
	.spanTitleValue {
		font-size: 25px;
	}
	.spanKey {
		font-size: 15px;
	}
	.spanValue {
		font-size: 20px;
		//position: relative;
		//top: 50%;
		transform: translateY(-10%);
		//display: table-cell;
		//vertical-align: middle;
	}
</style>
