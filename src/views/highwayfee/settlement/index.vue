<template>
	<a-card :bordered="false" v-show="indexShow">
		<a-form ref="searchFormRef" name="advanced_search" :model="searchFormState" class="ant-advanced-search-form">
			<a-row :gutter="24">
				<a-col :span="8">
					<a-form-item label="时间类型">
						<a-select v-model:value="searchFormState.type" defaultValue="1" style="width: 23%">
							<a-select-option value="1"> 创建时间</a-select-option>
							<a-select-option value="2"> 通行时间 </a-select-option>
						</a-select>
						<a-date-picker
							v-model:value="searchFormState.startTime"
							value-format="YYYY-MM-DD HH:mm:ss"
							show-time
							:allowClear="false"
							placeholder="请选择起点时间"
							style="width: 38%"
						/>
						<a-date-picker
							v-model:value="searchFormState.endTime"
							value-format="YYYY-MM-DD HH:mm:ss"
							show-time
							:allowClear="false"
							placeholder="请选择终点时间"
							style="width: 38%"
						/>
					</a-form-item>
				</a-col>

				<a-col :span="4">
					<a-form-item label="账单编号" name="id">
						<a-input v-model:value="searchFormState.id" placeholder="请输入账单编号" />
					</a-form-item>
				</a-col>
				<a-col :span="4">
					<a-form-item label="支付状态" name="payState">
						<a-select
							v-model:value="searchFormState.payState"
							allowClear
							placeholder="请选择支付状态"
							:options="payStateOptions"
						/>
					</a-form-item>
				</a-col>
				<a-col :span="4">
					<a-form-item label="账单状态" name="state">
						<a-select
							v-model:value="searchFormState.state"
							allowClear
							placeholder="请选择账单状态"
							:options="billStateOptions"
						/>
					</a-form-item>
				</a-col>
				<a-col :span="4">
					<a-form-item label="账单周期类型" name="cycleType">
						<a-select
							v-model:value="searchFormState.cycleType"
							allowClear
							placeholder="请选择账单周期类型"
							:options="cycleTypeOptions"
						/>
					</a-form-item>
				</a-col>
				<a-col :span="4">
					<a-form-item label="车牌号" name="vehiclePlate">
						<a-input v-model:value="searchFormState.vehiclePlate" placeholder="请输入车牌号" />
					</a-form-item>
				</a-col>
				<a-col :span="4">
					<a-form-item label="车牌颜色" name="vehiclePlateColor">
						<a-select
							allowClear
							v-model:value="searchFormState.vehiclePlateColor"
							placeholder="请选择车牌颜色"
							:options="etcVehicleColorOptions"
						/>
					</a-form-item>
				</a-col>

				<a-col :span="4">
					<a-button type="primary" @click="table.refresh(true)">查询</a-button>
					<a-button style="margin: 0 8px" @click="reset">重置</a-button>
				</a-col>
			</a-row>
		</a-form>
		<s-table
			ref="table"
			:columns="columns"
			:data="loadData"
			bordered
			:row-key="(record) => record.id"
			:tool-config="toolConfig"
		>
			<template #bodyCell="{ column, record }">
				<template v-if="column.dataIndex === 'payState'">
					<div v-for="payState in payStateOptions" :key="payState.value">
						<span v-if="payState.value == record.payState">{{ payState.label }}</span>
					</div>
				</template>
				<template v-if="column.dataIndex === 'state'">
					<div v-for="state in billStateOptions" :key="state.value">
						<span v-if="state.value == record.state">{{ state.label }}</span>
					</div>
				</template>
				<template v-if="column.dataIndex === 'cycleType'">
					<div v-for="cycleType in cycleTypeOptions" :key="cycleType.value">
						<span v-if="cycleType.value == record.cycleType">{{ cycleType.label }}</span>
					</div>
				</template>
				<template v-if="column.dataIndex === 'vehiclePlate'">
					<span :class="'big-plateColor-text big-plateColor-' + record.vehiclePlateColor">{{
						record.vehiclePlate
					}}</span>
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
				<template v-if="column.dataIndex === 'payAmount'">
					<a-space>
						{{ $TOOL.changeMoney(record.payAmount) }}
					</a-space>
				</template>

				<template v-if="column.dataIndex === 'action'">
					<a-space>
						<a @click="settlementDetail(record)" v-if="hasPerm('billingSettlementDetail')">详情</a>
					</a-space>
				</template>
			</template>
		</s-table>
	</a-card>
	<div v-show="!indexShow">
		<SettlementDetail ref="formRef" @successful="onClose"></SettlementDetail>
	</div>
</template>

<script setup name="highwayfeesettlement">
	import tool from '@/utils/tool'
	import SettlementDetail from './settlementDetail.vue'
	import highwayfeeSettlementApi from '@/api/highwayfee/highwayfeeSettlementApi'
	let searchFormState = reactive({})
	const searchFormRef = ref()
	const table = ref()
	const formRef = ref()
	const toolConfig = { refresh: true, height: true, columnSetting: false, striped: false }
	const columns = [
		{
			title: '账单编号',
			dataIndex: 'id',
			ellipsis: true,
			width: '170px'
		},
		{
			title: '车牌号',
			dataIndex: 'vehiclePlate',
			width: '120px'
		},
		// {
		// 	title: '车牌颜色',
		// 	dataIndex: 'vehiclePlateColor'
		// },
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
			title: '实收金额（元）',
			dataIndex: 'payAmount'
		},
		// {
		// 	title: '支付订单号',
		// 	dataIndex: 'payOrderId'
		// },
		{
			title: '支付状态',
			dataIndex: 'payState'
		},
		{
			title: '状态',
			dataIndex: 'state'
		},
		// {
		// 	title: '支付时间',
		// 	dataIndex: 'payTime'
		// },
		{
			title: '周期类型',
			dataIndex: 'cycleType'
		},
		{
			title: '创建时间',
			dataIndex: 'createTime'
		},
		{
			title: '开始时间',
			dataIndex: 'startTime'
		},
		{
			title: '结束时间',
			dataIndex: 'endTime'
		}
	]
	// 操作栏通过权限判断是否显示
	if (hasPerm('billingSettlementDetail')) {
		columns.push({
			title: '操作',
			dataIndex: 'action',
			align: 'center',
			width: '80px'
		})
	}
	const selectedRowKeys = ref([])
	// 列表选择配置
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
	const loadData = (parameter) => {
		const searchFormParam = JSON.parse(JSON.stringify(searchFormState))
		if (searchFormParam.state == 0) {
			searchFormParam.state = null
		}
		return highwayfeeSettlementApi.page(Object.assign(parameter, searchFormParam)).then((data) => {
			return data
		})
	}
	// 重置
	const reset = () => {
		searchFormRef.value.resetFields()
		table.value.refresh(true)
	}
	const indexShow = ref(true)
	const settlementDetail = (record) => {
		indexShow.value = false
		formRef.value.onOpen(record)
	}

	const onClose = () => {
		indexShow.value = true
	}

	const payStateOptions = tool.dictList('PAY_STATE')
	const billStateOptions = tool.dictList('BILL_STATE')
	const cycleTypeOptions = tool.dictList('BILLING_CYCLE')
	const etcVehicleColorOptions = tool.dictList('etcVehicleColor')
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

	const timestamp = new Date(new Date().setDate(new Date().getDate())).getTime() / 1000
	searchFormState.startTime = timestampToStartTime(timestamp)
	searchFormState.endTime = timestampToEndTime(timestamp)
</script>
