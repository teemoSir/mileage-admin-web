<template>
	<a-card :bordered="false">
		<a-form ref="searchFormRef" name="advanced_search" :model="searchFormState" class="ant-advanced-search-form">
			<a-row :gutter="24">
				<a-col :span="6">
					<a-form-item label="费率版本ID" name="versionId">
						<a-input v-model:value="searchFormState.versionId" placeholder="请输入费率版本ID" />
					</a-form-item>
				</a-col>
				<a-col :span="6">
					<a-form-item label="运行状态" name="status">
						<a-select v-model:value="searchFormState.status" placeholder="请选择运行状态" :options="statusOptions" />
					</a-form-item>
				</a-col>
				<a-col :span="6">
					<a-button type="primary" @click="table.refresh(true)">查询</a-button>
					<a-button style="margin: 0 8px" @click="reset">重置</a-button>
				</a-col>
			</a-row>
		</a-form>
		<s-table
			ref="table"
			:columns="columns"
			:data="loadData"
			:alert="options.alert.show"
			bordered
			:row-key="(record) => record.id"
			:tool-config="toolConfig"
			:row-selection="options.rowSelection"
		>
			<template #operator class="table-operator">
				<a-space>
					<a-button type="primary" @click="formRef.onOpen()" v-if="hasPerm('bdRateScheduleConfigAdd')">
						<template #icon><plus-outlined /></template>
						新增
					</a-button>
					<xn-batch-delete
						v-if="hasPerm('bdRateScheduleConfigBatchDelete')"
						:selectedRowKeys="selectedRowKeys"
						@batchDelete="deleteBatchBdRateScheduleConfig"
					/>
				</a-space>
			</template>
			<template #bodyCell="{ column, record }">
				<template v-if="column.dataIndex === 'status'">
					{{ $TOOL.dictTypeData('JOB_STATUS', record.status) }}
				</template>
				<template v-if="column.dataIndex === 'action'">
					<template v-if="record.status === 'EXECUTED'">
						<a-space>
							<a-popconfirm title="确定要删除吗？" @confirm="deleteBdRateScheduleConfig(record)">
								<a-button type="link" danger size="small" v-if="hasPerm('bdRateScheduleConfigDelete')">删除</a-button>
							</a-popconfirm>
						</a-space>
					</template>
					<template v-if="record.status !== 'EXECUTED'">
						<a-space>
							<a @click="formRef.onOpen(record)" v-if="hasPerm('bdRateScheduleConfigEdit')">编辑</a>
							<a-divider
								type="vertical"
								v-if="hasPerm(['bdRateScheduleConfigEdit', 'bdRateScheduleConfigDelete'], 'and')"
							/>
							<a-popconfirm title="确定要删除吗？" @confirm="deleteBdRateScheduleConfig(record)">
								<a-button type="link" danger size="small" v-if="hasPerm('bdRateScheduleConfigDelete')">删除</a-button>
							</a-popconfirm>
						</a-space>
					</template>
				</template>
			</template>
		</s-table>
	</a-card>
	<Form ref="formRef" @successful="table.refresh(true)" />
</template>

<script setup name="rateschedule">
	import tool from '@/utils/tool'
	import Form from './form.vue'
	import bdRateScheduleConfigApi from '@/api/rate/bdRateScheduleConfigApi'
	let searchFormState = reactive({})
	const searchFormRef = ref()
	const table = ref()
	const formRef = ref()
	const toolConfig = { refresh: true, height: true, columnSetting: true, striped: false }
	const columns = [
		{
			title: '费率版本ID',
			dataIndex: 'versionId'
		},
		{
			title: '任务名称',
			dataIndex: 'taskName'
		},
		{
			title: '定时执行时间',
			dataIndex: 'executeTime'
		},
		{
			title: '运行状态',
			dataIndex: 'status'
		},
		{
			title: '创建时间',
			dataIndex: 'createAt'
		},
		{
			title: '更新时间',
			dataIndex: 'updateAt'
		},
		{
			title: '创建人',
			dataIndex: 'createUser'
		},
		{
			title: '描述',
			dataIndex: 'description'
		}
	]
	// 操作栏通过权限判断是否显示
	if (hasPerm(['bdRateScheduleConfigEdit', 'bdRateScheduleConfigDelete'])) {
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
		const searchFormParam = JSON.parse(JSON.stringify(searchFormState))
		return bdRateScheduleConfigApi.bdRateScheduleConfigPage(Object.assign(parameter, searchFormParam)).then((data) => {
			return data
		})
	}
	// 重置
	const reset = () => {
		searchFormRef.value.resetFields()
		table.value.refresh(true)
	}
	// 删除
	const deleteBdRateScheduleConfig = (record) => {
		let params = [
			{
				id: record.id
			}
		]
		bdRateScheduleConfigApi.bdRateScheduleConfigDelete(params).then(() => {
			table.value.refresh(true)
		})
	}
	// 批量删除
	const deleteBatchBdRateScheduleConfig = (params) => {
		bdRateScheduleConfigApi.bdRateScheduleConfigDelete(params).then(() => {
			table.value.clearRefreshSelected()
		})
	}
	const statusOptions = tool.dictList('JOB_STATUS')
</script>
