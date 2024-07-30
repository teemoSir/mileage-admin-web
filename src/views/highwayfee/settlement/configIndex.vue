<template>
	<a-card :bordered="false">
		<s-table
			ref="table"
			:columns="columns"
			:data="loadData"
			bordered
			:row-key="(record) => record.pkid"
			:tool-config="toolConfig"
		>
			<template #operator class="table-operator">
				<a-space>
					<a-button type="primary" @click="formRef.onOpen()" v-if="hasPerm('highwayfeeSettlementConfigEdit')">
						<template #icon><plus-outlined /></template>
						新增
					</a-button>
					<xn-batch-delete
						v-if="hasPerm('billingCycleConfigBatchDelete')"
						:selectedRowKeys="selectedRowKeys"
						@batchDelete="deleteBatchBillingCycleConfig"
					/>
				</a-space>
			</template>
			<template #bodyCell="{ column, record }">
				<template v-if="column.dataIndex === 'defaultConfig'">
					<a-space v-if="null != record.defaultConfig">
						{{ $TOOL.dictTypeData('IS_CONFIG', record.defaultConfig.toString()) }}
					</a-space>
				</template>
				<template v-if="column.dataIndex === 'userConfig'">
					<a-space v-if="null != record.userConfig">
						{{ $TOOL.dictTypeData('IS_CONFIG', record.userConfig.toString()) }}
					</a-space>
				</template>
				<template v-if="column.dataIndex === 'ownerType'">
					<a-space v-if="null != record.ownerType">
						{{ $TOOL.dictTypeData('VEHCILE_OWNER_TYPE', record.ownerType.toString()) }}
					</a-space>
				</template>
				<template v-if="column.dataIndex === 'cycleType'">
					<a-space v-if="null != record.cycleType">
						{{ $TOOL.dictTypeData('BILLING_CYCLE', record.cycleType.toString()) }}
					</a-space>
				</template>
				<template v-if="column.dataIndex === 'action'">
					<a-space>
						<a @click="formRef.onOpen(record)" v-if="hasPerm('highwayfeeSettlementConfigEdit')">配置</a>
					</a-space>
				</template>
			</template>
		</s-table>
	</a-card>
	<Form ref="formRef" @successful="table.refresh(true)" />
</template>

<script setup name="billingcycleconfig">
	import Form from './configDetail.vue'
	import highwayfeeSettlementConfigApi from '@/api/highwayfee/highwayfeeSettlementConfigApi'
	const table = ref()
	const formRef = ref()
	const toolConfig = { refresh: true, height: true, columnSetting: false, striped: false }
	const columns = [
		{
			title: '车辆归属类型',
			dataIndex: 'ownerType'
		},
		{
			title: '周期类型',
			dataIndex: 'cycleType'
		},
		{
			title: '是否默认配置',
			dataIndex: 'defaultConfig'
		},
		{
			title: '是否用户可配置',
			dataIndex: 'userConfig'
		},
		{
			title: '执行规则说明',
			dataIndex: 'execRuleExplain'
		}
	]
	// 操作栏通过权限判断是否显示
	if (hasPerm(['highwayfeeSettlementConfigEdit'])) {
		columns.push({
			title: '操作',
			dataIndex: 'action',
			align: 'center',
			width: '150px'
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
		return highwayfeeSettlementConfigApi.page(parameter).then((data) => {
			return data
		})
	}
	// 重置
	const reset = () => {
		searchFormRef.value.resetFields()
		table.value.refresh(true)
	}
</script>
