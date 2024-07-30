<template>
	<a-card :bordered="false"  style="margin-bottom: 10px">
		<a-form ref="searchFormRef" name="advanced_search" :model="searchFormState" class="ant-advanced-search-form">
			<a-row :gutter="24">
				<a-col :span="6">
					<a-form-item label="费率版本名称" name="versionName">
						<a-input v-model:value="searchFormState.versionName" placeholder="请输入费率版本名称" />
					</a-form-item>
				</a-col>
				<a-col :span="8">
					<a-form-item label="创建时间" name="createdAt">
						<a-range-picker v-model:value="searchFormState.createdAt" value-format="YYYY-MM-DD HH:mm:ss" show-time />
					</a-form-item>
				</a-col>
				<a-col :span="6">
					<a-form-item label="状态" name="status">
						<a-select
							v-model:value="searchFormState.status"
							placeholder="请选择版本状态"
							:options="statusOptions"
						/>
					</a-form-item>
				</a-col>
				<a-col :span="4">
					<a-button type="primary" @click="table.refresh(true)">查询</a-button>
					<a-button style="margin: 0 8px" @click="reset">重置</a-button>
				</a-col>
			</a-row>
		</a-form>
	</a-card>
		<a-card :bordered="false">
		<s-table
			ref="table"
			:columns="columns"
			:data="loadData"
			bordered
			:row-key="(record) => record.versionId"
			:tool-config="toolConfig"
		>
			<template #operator class="table-operator">
				<a-space>
					<a-button type="primary" @click="formAdd.onOpen()" v-if="hasPerm('bdRateVersionsAdd')">
						<template #icon><plus-outlined /></template>
						新增
					</a-button>
<!--					<xn-batch-delete
						v-if="hasPerm('bdRateVersionsBatchDelete')"
						:selectedRowKeys="selectedRowKeys"
						@batchDelete="deleteBatchBdRateVersions"
					/>-->
				</a-space>
			</template>
			<template #bodyCell="{ column, record }">
				<template v-if="column.dataIndex === 'status'">
					{{ $TOOL.dictTypeData('rateStatus', record.status) }}
				</template>
				<template v-if="column.dataIndex === 'action'">
					<a-space>
						<a @click="detail.onOpen(record)">详情</a>
						<a @click="formRef.onOpen(record)" v-if="hasPerm('bdRateVersionsEdit')">编辑</a>
<!--						<a-divider type="vertical" v-if="hasPerm(['bdRateVersionsEdit', 'bdRateVersionsDelete'], 'and')" />
						<a-popconfirm title="确定要删除吗？" @confirm="deleteBdRateVersions(record)">
							<a-button type="link" danger size="small" v-if="hasPerm('bdRateVersionsDelete')">删除</a-button>
						</a-popconfirm>-->
					</a-space>
				</template>
			</template>
		</s-table>
	</a-card>
	<Form ref="formRef" @successful="table.refresh(true)" />
	<FormAdd ref="formAdd" @successful="table.refresh(true)" />
	<rateDetail ref="detail"/>
</template>

<script setup name="bdrateversions">
	import Form from './form.vue'
	import FormAdd from './formAdd.vue'
	import RateDetail from './rateDetail.vue'
	import bdRateVersionsApi from '@/api/rate/bdRateVersionsApi'
	import tool from "@/utils/tool";
	let searchFormState = reactive({})
	const searchFormRef = ref()
	const table = ref()
	const formRef = ref()
	const formAdd = ref()
	const detail = ref()
	const toolConfig = { refresh: true, height: true, columnSetting: false, striped: false }
	const columns = [
		{
			title: '费率编号',
			dataIndex: 'versionId'
		},
		{
			title: '费率版本名称',
			dataIndex: 'versionName'
		},
		/*{
			title: '有效日期起',
			dataIndex: 'effectiveDate',
			ellipsis: true

		},
		{
			title: '有效日期止',
			dataIndex: 'expirationDate',
			ellipsis: true
		},*/
		{
			title: '版本状态',
			dataIndex: 'status',
			ellipsis: true
		},
		{
			title: '录入人',
			dataIndex: 'createUser',
			ellipsis: true
		},
		{
			title: '创建时间',
			dataIndex: 'createAt',
			ellipsis: true
		}
	]
	// 操作栏通过权限判断是否显示
	if (hasPerm(['bdRateVersionsEdit'])) {
		columns.push({
			title: '操作',
			dataIndex: 'action',
			align: 'center',
			width: '220px'
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
		// createdAt范围查询条件重载
		if (searchFormParam.createdAt) {
			searchFormParam.startCreateAt = searchFormParam.createdAt[0]
			searchFormParam.endCreateAt = searchFormParam.createdAt[1]
			delete searchFormParam.createdAt
		}
		return bdRateVersionsApi.bdRateVersionsPage(Object.assign(parameter, searchFormParam)).then((data) => {
			return data
		})
	}
	// 重置
	const reset = () => {
		searchFormRef.value.resetFields()
		table.value.refresh(true)
	}
	// 删除
	const deleteBdRateVersions = (record) => {
		let params = [
			{
				versionId: record.versionId
			}
		]
		bdRateVersionsApi.bdRateVersionsDelete(params).then(() => {
			table.value.refresh(true)
		})
	}
	// 批量删除
	const deleteBatchBdRateVersions = (params) => {
		bdRateVersionsApi.bdRateVersionsDelete(params).then(() => {
			table.value.clearRefreshSelected()
		})
	}
	const statusOptions = tool.dictList('rateStatus')
</script>
