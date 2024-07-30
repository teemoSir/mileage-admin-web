<template>
	<a-card :bordered="false" v-show="ishowTable">
		<a-form ref="searchFormRef" name="advanced_search" :model="searchFormState" class="ant-advanced-search-form">
			<a-row :gutter="20">
				<a-col :span="4">
					<a-form-item label="费率名称：" name="rateName">
						<a-input v-model:value="searchFormState.rateName" placeholder="请输入费率名称" />
					</a-form-item>
				</a-col>
				<a-col :span="4">
					<a-form-item label="有效时间起：">
						<a-date-picker
							v-model:value="searchFormState.startDate"
							value-format="YYYY-MM-DD"
							show-time
							:allowClear="false"
							placeholder="请选择有效时间起"
						/>
					</a-form-item>
				</a-col>
				<a-col :span="4">
					<a-form-item label="有效时间止：">
						<a-date-picker
							v-model:value="searchFormState.endDate"
							value-format="YYYY-MM-DD"
							show-time
							:allowClear="false"
							placeholder="请选择有效时间止"
						/>
					</a-form-item>
				</a-col>
				<a-col :span="4">
					<a-form-item label="是否启用：" name="status">
						<a-select
							allowClear
							v-model:value="searchFormState.status"
							placeholder="请选择是否启用"
							:options="statusOptions"
						/>
					</a-form-item>
				</a-col>
				<a-col :span="6">
					<a-button type="primary" id="feereset" @click="table.refresh(true)">查询</a-button>
					<a-button style="margin: 0 8px" @click="reset">重置</a-button>
				</a-col>
			</a-row>
		</a-form>
		<s-table
			ref="table"
			:columns="columns"
			:data="loadData"
			bordered
			:row-key="(record) => record.pkid"
			:tool-config="toolConfig"
		>
			<template #operator>
				<a-space>
					<a-button type="primary" @click="rateAdd()" v-if="hasPerm('rateAdd')">
						<template #icon><plus-outlined /></template>
						新增
					</a-button>
				</a-space>
			</template>
			<template #bodyCell="{ column, record }">
				<template v-if="column.dataIndex === 'status'">
					<a-space v-if="null != record.status">
						{{ $TOOL.dictTypeData('IS_CONFIG', record.status.toString()) }}
					</a-space>
				</template>

				<template v-if="column.dataIndex === 'action'">
					<a-space>
						<a @click="rateAdd(record)" v-if="hasPerm('rateAdd')">编辑</a>
						<a @click="enableStatus(record)" v-if="record.status === 2">启用</a>
						<a @click="rateDetail(record)">详情</a>
					</a-space>
				</template>
			</template>
		</s-table>
	</a-card>
	<RateDetail v-show="ishowDetail" ref="formRef" @successful="onClose"></RateDetail>
	<RateAdd v-show="ishowAdd" ref="formRefAdd" @successful="onClose"></RateAdd>
</template>

<script setup name="rateBasics">
	import tool from '@/utils/tool'
	import highwayfee from '@/api/highwayfee/highwayfeeRateBasics'
	import RateDetail from './detail.vue'
	import RateAdd from './add.vue'
	let searchFormState = reactive({})
	const searchFormRef = ref()
	const table = ref()
	const formRef = ref()
	const formRefAdd = ref()
	const toolConfig = { refresh: true, height: true, columnSetting: false, striped: false }
	const columns = [
		{
			title: '费率编号',
			dataIndex: 'rateCode'
		},
		{
			title: '费率名称',
			dataIndex: 'rateName'
		},
		{
			title: '有效时间起',
			dataIndex: 'startDate'
		},
		{
			title: '有效时间止',
			dataIndex: 'endDate'
		},
		{
			title: '是否启用',
			dataIndex: 'status'
		},
		{
			title: '录入人',
			dataIndex: 'createUser'
		},
		{
			title: '创建时间',
			dataIndex: 'createTime'
		}
	]
	// 操作栏通过权限判断是否显示
	if (hasPerm(['rateAdd'])) {
		columns.push({
			title: '操作',
			dataIndex: 'action',
			align: 'center',
			width: '220px'
		})
	}

	//车辆颜色
	const statusOptions = tool.dictList('IS_CONFIG')

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
		return highwayfee.rateBasicsPage(Object.assign(parameter, searchFormParam)).then((data) => {
			return data
		})
	}
	// 重置
	const reset = () => {
		searchFormRef.value.resetFields()
		table.value.refresh(true)
	}
	const onClose = () => {
		ishowTable.value = true
		ishowDetail.value = false
		ishowAdd.value = false
	}
	const rateDetail = (record) => {
		ishowTable.value = false
		ishowDetail.value = true
		formRef.value.onOpen(record)
	}
	const enableStatus = (record) => {
		let param = {
			id: record.id
		}
		highwayfee
			.enableStatus(Object.assign(param))
			.then(() => {})
			.finally(() => {
				document.getElementById('feereset').click()
			})
	}
	const ishowTable = ref(true)
	const ishowDetail = ref(false)
	const ishowAdd = ref(false)

	const rateAdd = (record) => {
		ishowTable.value = false
		ishowAdd.value = true
		formRefAdd.value.onOpen(record)
	}
</script>
