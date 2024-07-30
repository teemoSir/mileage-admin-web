<template>
	<a-spin :spinning="loadSpinning" v-show="settlementShow">
		<a-card :bordered="false" :visible="visible">
			<a-card title="账单基础信息">
				<a-row>
					<a-col :span="12" style="padding-right: 15px">
						<a-form layout="horizontal" :label-col="{ span: 6 }">
							<a-form-item label="账单编号：">
								<span class="form-inside-span-content">{{ detail.id }}</span>
							</a-form-item>
							<a-form-item label="车牌号：">
								<div class="form-inside-div-content">
									<span :class="'big-plateColor-text big-plateColor-' + detail.vehiclePlateColor">{{
										detail.vehiclePlate
									}}</span>
								</div>
							</a-form-item>
							<a-form-item label="计费金额（元）：">
								<span class="form-inside-span-content">{{ $TOOL.changeMoney(detail.chargeAmount) }}</span>
							</a-form-item>
							<a-form-item label="应收金额（元）：">
								<span class="form-inside-span-content">{{ $TOOL.changeMoney(detail.actualAmount) }}</span>
							</a-form-item>
							<a-form-item label="账单周期类型：">
								<div class="form-inside-for-content" v-for="cycleType in cycleTypeOptions" :key="cycleType.value">
									<a-tag v-if="cycleType.value == detail.cycleType">{{ cycleType.label }}</a-tag>
								</div>
							</a-form-item>

							<a-form-item label="统计周期起：">
								<span class="form-inside-span-content">{{ detail.startTime }}</span>
							</a-form-item>

							<a-form-item label="支付状态：">
								<div class="form-inside-div-content">
									<a-space v-if="null != detail.payState">
										{{ $TOOL.dictTypeData('PAY_STATE', detail.payState.toString()) }}
									</a-space>
								</div>
							</a-form-item>
							<a-form-item label="账单状态：">
								<span class="form-inside-span-content">{{ $TOOL.dictTypeData('BILL_STATE', detail.state + '') }}</span>
							</a-form-item>
						</a-form>
					</a-col>
					<a-col :span="12">
						<a-form layout="horizontal" :label-col="{ span: 6 }">
							<a-form-item label="计费车型：">
								<span class="form-inside-span-content">{{
									$TOOL.dictTypeData('vehicleType', detail.vehicleType + '')
								}}</span>
							</a-form-item>
							<a-form-item label="计费里程（公里）：">
								<span class="form-inside-span-content">{{ $TOOL.changgeKilometers(detail.chargeDistance) }}</span>
							</a-form-item>
							<a-form-item label="优惠金额（元）：">
								<span class="form-inside-span-content">{{ $TOOL.changeMoney(detail.discountAmount) }}</span>
							</a-form-item>
							<a-form-item label="实收金额（元）：">
								<span class="form-inside-span-content">{{ $TOOL.changeMoney(detail.payAmount) }}</span>
							</a-form-item>
							<a-form-item label="支付订单号：">
								<span class="form-inside-span-content">{{ detail.payOrderId }}</span>
							</a-form-item>
							<a-form-item label="统计周期止：">
								<span class="form-inside-span-content">{{ detail.endTime }}</span>
							</a-form-item>
							<a-form-item label="支付时间：">
								<span class="form-inside-span-content">{{ detail.payTime }}</span>
							</a-form-item>
							<a-form-item label="创建时间：">
								<span class="form-inside-span-content">{{ detail.createTime }}</span>
							</a-form-item>
						</a-form>
					</a-col>
				</a-row>
			</a-card>
			<a-row>&nbsp;</a-row>
			<a-card title="通行记录信息">
				<a-form
					ref="searchFormRef"
					name="advanced_search"
					:model="searchFormState"
					class="ant-advanced-search-form"
					v-show="false"
				>
					<a-form-item name="flag">
						<a-input v-model:value="searchFormState.flag" />
					</a-form-item>
					<a-form-item name="settlementId">
						<a-input v-model:value="searchFormState.settlementId" />
					</a-form-item>
					<a-col :span="6">
						<a-button type="primary" id="pageclick" @click="table.refresh(true)">查询</a-button>
					</a-col>
				</a-form>
				<s-table ref="table" :columns="columns" :data="loadData" :row-key="(record) => record.id">
					<template #bodyCell="{ column, record }">
						<template v-if="column.dataIndex === 'vehicleType'">
							<a-space v-if="null != record.vehicleType">
								{{ $TOOL.dictTypeData('vehicleType', record.vehicleType.toString()) }}
							</a-space>
						</template>
						<template v-if="column.dataIndex === 'chargeDistance'">
							<a-space>
								{{ $TOOL.changgeKilometers(record.chargeDistance) }}
							</a-space>
						</template>
						<template v-if="column.dataIndex === 'chargeAmount'">
							<a-space>
								{{ $TOOL.changeMoney(record.chargeAmount) }}
							</a-space>
						</template>
						<template v-if="column.dataIndex === 'actualAmount'">
							<a-space>
								{{ $TOOL.changeMoney(record.actualAmount) }}
							</a-space>
						</template>
						<template v-if="column.dataIndex === 'yearMileage'">
							<a-space>
								{{ $TOOL.changgeKilometers(record.yearMileage) }}
							</a-space>
						</template>
						<template v-if="column.dataIndex === 'action'">
							<a-space>
								<a @click="showTrafficDetail1(record)">详情</a>
							</a-space>
						</template>
					</template>
				</s-table>
			</a-card>
			<a-row>
				<a-col :span="16"></a-col>
				<a-col :span="8" style="text-align: right">
					<a-button style="margin-right: 8px" type="primary" @click="onClose1">关闭</a-button>
				</a-col>
			</a-row>
		</a-card>
	</a-spin>
	<a-modal
		v-model:visible="detailDialogVisible"
		:closable="false"
		:footer="null"
		width="80%"
		centered
		@ok="detailDialogVisible = false"
	>
		<TrafficDetail :record="currentRecord" v-show="false" ref="trafficDetailRef" @successful="onClose"></TrafficDetail>
	</a-modal>
</template>

<script setup name="feesettlementDetail">
	import '@/assets/css/index.less'
	import tool from '@/utils/tool'
	import highwayfeeSettlementApi from '@/api/highwayfee/highwayfeeSettlementApi'
	import { cloneDeep } from 'lodash-es'
	import highwayfeeTrafficRecordApi from '@/api/highwayfee/highwayfeeTrafficRecordApi'
	import TrafficDetail from '@/views/highwayfee/trafficrecord/trafficDetail.vue'
	const visible = ref(false)
	const emit = defineEmits({ successful: null })
	const searchFormRef = ref()
	let searchFormState = reactive({})
	const trafficDetailRef = ref()
	let currentRecord = reactive({})
	const detailDialogVisible = ref(false)
	const table = ref()
	const toolConfig = { refresh: true, height: true, columnSetting: true, striped: false }
	const columns = [
		{
			title: '通行记录编号',
			dataIndex: 'traRecId'
		},
		{
			title: '计费车型',
			dataIndex: 'vehicleType'
		},
		{
			title: '计费里程(公里）',
			dataIndex: 'chargeDistance'
		},
		{
			title: '计费金额（元）',
			dataIndex: 'chargeAmount'
		},
		{
			title: '优惠金额（元）',
			dataIndex: 'discountAmount'
		},
		{
			title: '应收金额（元）',
			dataIndex: 'actualAmount'
		},
		{
			title: '本年里程累计（公里）',
			dataIndex: 'yearMileage'
		},
		{
			title: '起点时间',
			dataIndex: 'startTime'
		},
		{
			title: '终点时间',
			dataIndex: 'endTime'
		}
	]
	// 操作栏通过权限判断是否显示

	columns.push({
		title: '操作',
		dataIndex: 'action',
		align: 'center',
		width: '150px'
	})
	const loadData = (parameter) => {
		if (searchFormState.flag) {
			const searchFormParam = JSON.parse(JSON.stringify(searchFormState))
			return highwayfeeTrafficRecordApi.trafficRecordPage(Object.assign(parameter, searchFormParam)).then((data) => {
				return data
			})
		}
	}

	//车辆类型
	const vehicleTypeOptions = tool.dictList('vehicleType')
	//车辆颜色
	const cycleTypeOptions = tool.dictList('BILLING_CYCLE')

	const loadSpinning = ref(false)

	let detail = ref({})

	const onOpen = (record) => {
		settlementShow.value = true
		loadSpinning.value = true
		let param = {
			id: record.id
		}
		highwayfeeSettlementApi.detail(Object.assign(param)).then((data) => {
			if (data) {
				let recordData = cloneDeep(data)
				detail.value = Object.assign({}, recordData)
			}
			loadSpinning.value = false
		})
		searchFormState.flag = true
		searchFormState.settlementId = record.id

		document.getElementById('pageclick').click()
	}
	const onClose1 = () => {
		emit('successful')
	}
	const onClose = () => {
		detailDialogVisible.value = false
	}
	defineExpose({
		onOpen
	})

	const options = {
		// columns数字类型字段加入 needTotal: true 可以勾选自动算账
		alert: {
			show: true,
			clear: () => {
				selectedRowKeys.value = ref([])
			}
		},
		rowSelection: {
			onChange: (selectedRowKey, selectedRows) => {
				selectedRowKeys.value = selectedRowKey
			}
		}
	}
	const showTrafficDetail1 = (record) => {
		currentRecord.value = record
		detailDialogVisible.value = true
		setTimeout(() => {
			trafficDetailRef.value.onOpen()
		}, 100)
	}
	const settlementShow = ref(false)
	const trafficShow = ref(false)
</script>
