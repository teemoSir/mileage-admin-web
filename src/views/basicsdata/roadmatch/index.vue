<template>
	<a-card :bordered="false" v-show="indexShow">
		<a-form ref="searchFormRef" name="advanced_search" :model="searchFormState" class="ant-advanced-search-form">
			<a-row :gutter="24">
				<a-col :span="4">
					<a-form-item label="道路编号" name="wayCode">
						<a-input v-model:value="searchFormState.wayCode" placeholder="请输入道路编号" />
					</a-form-item>
				</a-col>
				<a-col :span="4">
					<a-form-item label="道路名称" name="wayName">
						<a-input v-model:value="searchFormState.wayName" placeholder="请输入道路名称" />
					</a-form-item>
				</a-col>

				<a-col :span="4">
					<a-form-item label="收费道路类型" name="wayRoadType">
						<a-select
							allowClear
							v-model:value="searchFormState.wayRoadType"
							placeholder="请收费道路类型"
							:options="roadTypeOptions"
						/>
					</a-form-item>
				</a-col>

				<a-col :span="4">
					<a-form-item label="技术等级" name="wayLevel">
						<a-select
							allowClear
							v-model:value="searchFormState.wayLevel"
							placeholder="请选择技术等级"
							:options="wayLevelOptions"
						/>
					</a-form-item>
				</a-col>

				<a-col :span="4">
					<a-form-item label="行政等级" name="">
						<a-select
							allowClear
							v-model:value="searchFormState.wayAdminiHierarchy"
							placeholder="请选行政等级"
							:options="wayAdminiHierarchyOptions"
						/>
					</a-form-item>
				</a-col>
				<a-col :span="4">
					<a-button :icon="h(SearchOutlined)" type="primary" id="pagereset" @click="table.refresh(true)">查询</a-button>
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
			<template #operator class="table-operator">
				<a-space>
					<a-button type="primary" @click="formAddEdit.onOpen()" v-if="hasPerm('wayCodeHainanAdd')">
						<template #icon><plus-outlined /></template>
						新增
					</a-button>
				</a-space>
			</template>
			<template #bodyCell="{ column, record }">
				<template v-if="column.dataIndex === 'wayLevel'">
					<a-space v-if="null != record.wayLevel">
						{{ $TOOL.dictTypeData('WAY_LEVEL', record.wayLevel.toString()) }}
					</a-space>
				</template>

				<template v-if="column.dataIndex === 'action'">
					<a-space>
						<a @click="formAddEdit.onOpen(record)" v-if="hasPerm('wayCodeHainanEdit')">编辑</a>
						<a @click="showWayCodeDetail(record)">详情</a>
					</a-space>
				</template>
			</template>
		</s-table>
	</a-card>
	<!--新增、编辑跳转-->
	<Form ref="formAddEdit" @successful="table.refresh(true)" />
	<div v-show="!indexShow">
		<WayCodeDetail ref="formRef" @successful="onClose"></WayCodeDetail>
	</div>
</template>

<script setup name="WayCodeHainan">
	import tool from '@/utils/tool'
	import wayCodeApi from '@/api/basicsdata/wayCodeApi'
	import WayCodeDetail from './detail.vue'
	import Form from './form.vue'
	import { h } from 'vue'
	import { SearchOutlined } from '@ant-design/icons-vue'
	let searchFormState = reactive({})
	const searchFormRef = ref()
	const table = ref()
	const formRef = ref()
	const formAddEdit = ref()
	const columns = [
		{
			title: '公路编号',
			dataIndex: 'wayCode'
		},
		{
			title: '归属省份',
			dataIndex: ''
		},
		{
			title: '道路名称',
			dataIndex: 'wayName'
		},
		{
			title: '收费道路类型',
			dataIndex: ''
		},
		{
			title: '技术等级',
			dataIndex: 'wayLevel'
		},
		{
			title: '道路起点',
			dataIndex: 'beginAddress'
		},
		{
			title: '道路终点',
			dataIndex: 'endAddress'
		},
		{
			title: '长度（公里）',
			dataIndex: 'wayLength'
		}
	]
	// 操作栏通过权限判断是否显示
	if (hasPerm(['wayCodeEdit'])) {
		columns.push({
			title: '操作',
			dataIndex: 'action',
			align: 'center',
			width: '120px'
		})
	}
	//收费道路类型
	const roadTypeOptions = tool.dictList('roadType')
	//行政等级
	const wayAdminiHierarchyOptions = tool.dictList('adminiHierarchy')
	//技术等级
	const wayLevelOptions = tool.dictList('WAY_LEVEL')

	const loadData = (parameter) => {
		const searchFormParam = JSON.parse(JSON.stringify(searchFormState))
		return wayCodeApi.wayCodeHainanPage(Object.assign(parameter, searchFormParam)).then(
			(data) => {
				return data
			},
			//异常处理
			(e) => {
				return null
			}
		)
	}
	const indexShow = ref(true)
	const showWayCodeDetail = (record) => {
		indexShow.value = false
		formRef.value.onOpen(record)
	}
	// 重置
	const reset = () => {
		searchFormRef.value.resetFields()
		table.value.refresh(true)
	}
	const onClose = () => {
		indexShow.value = true
	}
</script>
