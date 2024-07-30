<template>
	<a-card :bordered="false">
		<a-form ref="searchFormRef" name="advanced_search" :model="searchFormState" class="ant-advanced-search-form">
			<a-row :gutter="20">
				<a-col :span="4">
					<a-form-item label="公路编码：" name="wayCode">
						<a-input v-model:value="searchFormState.wayCode" placeholder="请输入公路编码" />
					</a-form-item>
				</a-col>
				<a-col :span="4">
					<a-form-item label="公路名称：" name="wayName">
						<a-input v-model:value="searchFormState.wayName" placeholder="请输入公路名称" />
					</a-form-item>
				</a-col>
				<a-col :span="4">
					<a-form-item label="路段编码：" name="sectionCode">
						<a-input v-model:value="searchFormState.sectionCode" placeholder="请输入路段编码" />
					</a-form-item>
				</a-col>
				<a-col :span="4">
					<a-form-item label="路段名称：" name="sectionName">
						<a-input v-model:value="searchFormState.sectionName" placeholder="请输入路段名称" />
					</a-form-item>
				</a-col>
				<a-col :span="4">
					<a-form-item label="区间编码：" name="intervalCode">
						<a-input v-model:value="searchFormState.intervalCode" placeholder="请输入区间编码" />
					</a-form-item>
				</a-col>
				<a-col :span="4">
					<a-form-item label="区间名称：" name="intervalName">
						<a-input v-model:value="searchFormState.intervalName" placeholder="请输入区间名称" />
					</a-form-item>
				</a-col>
				<a-col :span="4">
					<a-form-item label="上下行：" name="isUpDown">
						<a-select
							allowClear
							v-model:value="searchFormState.isUpDown"
							placeholder="请选择上下行"
							:options="isUpDownOptions"
						/>
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
			bordered
			:row-key="(record) => record.pkid"
			:tool-config="toolConfig"
			:scroll="{ x: 1500, y: 750 }"
		>
			<template #bodyCell="{ column, record }">
				<template v-if="column.dataIndex === 'wayCode'">
					<span>{{ record.wayCode }}</span>
					<span>【{{ record.wayName }}】</span>
				</template>
				<template v-if="column.dataIndex === 'sectionCode'">
					<span>{{ record.sectionCode }}</span>
					<span>【{{ record.sectionName }}】</span>
				</template>
				<template v-if="column.dataIndex === 'intervalCode'">
					<span>{{ record.intervalCode }}</span>
					<span>【{{ record.intervalName }}】</span>
				</template>
				<template v-if="column.dataIndex === 'isUpDown'">
					<a-space v-if="null != record.isUpDown">
						{{ $TOOL.dictTypeData('IS_UP_DOWN', record.isUpDown.toString()) }}
					</a-space>
				</template>
			</template>
		</s-table>
	</a-card>
</template>

<script setup name="rateBasics">
	import tool from '@/utils/tool'
	import highwayfee from '@/api/highwayfee/highwayfeeRateResult'
	let searchFormState = reactive({})
	const searchFormRef = ref()
	const table = ref()
	const formRef = ref()
	const toolConfig = { refresh: true, height: true, columnSetting: false, striped: false }
	const columns = [
		{
			title: '公路',
			dataIndex: 'wayCode',
			width: 250
		},
		{
			title: '路段',
			dataIndex: 'sectionCode',
			width: 250
		},
		{
			title: '收费区间',
			dataIndex: 'intervalCode',
			width: 330
		},
		{
			title: '里程（公里）',
			dataIndex: 'mileage',
			width: 100
		},
		{
			title: '上下行',
			dataIndex: 'isUpDown',
			width: 100
		},
		{
			title: '客车收费标准(元/公里)',
			children: [
				{
					title: '一型客车',
					dataIndex: 'feeK1',
					key: 'feeK1',
					width: 100
				},
				{
					title: '二型客车',
					dataIndex: 'feeK2',
					key: 'feeK2',
					width: 100
				},
				{
					title: '三型客车',
					dataIndex: 'feeK3',
					key: 'feeK3',
					width: 100
				},
				{
					title: '四型客车',
					dataIndex: 'feeK4',
					key: 'feeK4',
					width: 100
				}
			]
		},
		{
			title: '货车收费标准(元/公里)',
			children: [
				{
					title: '一型货车',
					dataIndex: 'feeH1',
					key: 'feeH1',
					width: 100
				},
				{
					title: '二型货车',
					dataIndex: 'feeH2',
					key: 'feeH2',
					width: 100
				},
				{
					title: '三型货车',
					dataIndex: 'feeH3',
					key: 'feeH3',
					width: 100
				},
				{
					title: '四型货车',
					dataIndex: 'feeH4',
					key: 'feeH4',
					width: 100
				},
				{
					title: '五型货车',
					dataIndex: 'feeH5',
					key: 'feeH5',
					width: 100
				},
				{
					title: '六型货车',
					dataIndex: 'feeH6',
					key: 'feeH6',
					width: 100
				}
			]
		},
		{
			title: '专项作业车收费标准(元/公里)',
			children: [
				{
					title: '一型专项作业车',
					dataIndex: 'feeZ1',
					key: 'feeZ1',
					width: 120
				},
				{
					title: '二型专项作业车',
					dataIndex: 'feeZ2',
					key: 'feeZ2',
					width: 120
				},
				{
					title: '三型专项作业车',
					dataIndex: 'feeZ3',
					key: 'feeZ3',
					width: 120
				},
				{
					title: '四型专项作业车',
					dataIndex: 'feeZ4',
					key: 'feeZ4',
					width: 120
				},
				{
					title: '五型专项作业车',
					dataIndex: 'feeZ5',
					key: 'feeZ5',
					width: 120
				},
				{
					title: '六型专项作业车',
					dataIndex: 'feeZ6',
					key: 'feeZ6',
					width: 120
				}
			]
		}
	]
	const isUpDownOptions = tool.dictList('IS_UP_DOWN')
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
		return highwayfee.rateResultPage(Object.assign(parameter, searchFormParam)).then((data) => {
			return data
		})
	}
	// 重置
	const reset = () => {
		searchFormRef.value.resetFields()
		table.value.refresh(true)
	}
</script>
