<template>
	<a-spin :spinning="loadSpinning" v-show="indexShow">
		<a-card :bordered="false" :visible="visible">
			<span class="titleItem"><b>道路基础信息</b></span>
			<a-row>
				<a-col :span="12" style="padding-right: 10px">
					<a-form layout="horizontal" :label-col="{ span: 6 }">
						<a-form-item label="道路编码：">
							<span class="form-inside-span-content">{{ wayCode }}</span>
						</a-form-item>
						<a-form-item label="收费道路类型：">
							<template v-for="roadType in roadTypeOptions" :key="roadType.value"
								><div v-if="roadType.value == detail.roadType">{{ roadType.label }}</div></template
							>
							<span class="form-inside-span-content"></span>
						</a-form-item>
						<a-form-item label="技术等级：">
							<template v-for="wayLevel in wayLevelOptions" :key="wayLevel.value"
								><div v-if="wayLevel.value == detail.wayLevel">{{ wayLevel.label }}</div></template
							>
						</a-form-item>
						<a-form-item label="道路起点：">
							<span class="form-inside-span-content">{{ detail.beginAddress }}</span>
						</a-form-item>
						<a-form-item label="起点桩号：">
							<span class="form-inside-span-content">{{ detail.beginId }}</span>
						</a-form-item>
						<a-form-item label="道路起点经纬度：">
							<span class="form-inside-span-content">{{ detail.beginLatitude }}</span>
						</a-form-item>
					</a-form>
				</a-col>
				<a-col :span="12">
					<a-form layout="horizontal" :label-col="{ span: 6 }">
						<a-form-item label="道路名称：">
							<span class="form-inside-span-content">{{ wayName }}</span>
						</a-form-item>
						<a-form-item label="长度（公里）：">
							<span class="form-inside-span-content">{{ detail.wayLength }}</span>
						</a-form-item>
						<a-form-item label="行政等级：">
							<template v-for="adminiHierarchy in wayAdminiHierarchyOptions" :key="adminiHierarchy.value"
								><div v-if="adminiHierarchy.value == detail.wayLevel">{{ adminiHierarchy.label }}</div></template
							>
						</a-form-item>
						<a-form-item label="道路终点：">
							<span class="form-inside-span-content">{{ detail.endAddress }}</span>
						</a-form-item>
						<a-form-item label="终点桩号：">
							<span class="form-inside-span-content">{{ detail.endId }}</span>
						</a-form-item>
						<a-form-item label="道路终点经纬度：">
							<span class="form-inside-span-content">{{ detail.endLongitude }}</span>
						</a-form-item>
					</a-form>
				</a-col>
			</a-row>
			<a-tabs v-model:activeKey="activeKey" type="card">
				<a-tab-pane key="1" tab="关联路段"> </a-tab-pane>
				<a-tab-pane key="2" tab="路测设施"> </a-tab-pane>
				<a-tab-pane key="3" tab="附属设施"> </a-tab-pane>
			</a-tabs>
			<div v-show="activeKey == '1'">
				<a-form
					ref="searchFormRef"
					name="advanced_search"
					:model="searchFormState"
					class="ant-advanced-search-form"
					v-show="false"
				>
					<a-form-item name="roadCode">
						<a-input v-model:value="searchFormState.roadCode" />
					</a-form-item>
				</a-form>
				<s-table ref="table" :columns="columns" :data="loadData" bordered :row-key="(record) => record.id">
					<template #bodyCell="{ column, record }">
						<template v-if="column.dataIndex === 'action'">
							<a-space>
								<a @click="showWayRoadCodeDetail(record)">详情</a>
							</a-space>
						</template>
					</template>
				</s-table>
			</div>
			<div v-show="activeKey == '2'">
				<a-form
					ref="searchRoadTestFormRef"
					name="advanced_search"
					:model="searchFormRoadTest"
					class="ant-advanced-search-form"
					v-show="false"
				>
					<a-form-item name="roadsectionId">
						<a-input v-model:value="searchFormRoadTest.roadsectionId" />
					</a-form-item>
				</a-form>
				<!--<s-table
					ref="roadTestTable"
					:columns="roadTestColumns"
					:data="loadRoadTestData"
					bordered
					:row-key="(record) => record.id"
				>
					<template #bodyCell="{ column, record }">
						<template v-if="column.dataIndex === 'action'">
							<a-space>
								<a @click="showWayRoadTestDetail(record)">详情</a>
							</a-space>
						</template>
					</template>
				</s-table>-->
			</div>
			<div v-show="activeKey == '3'">
				<a-form
					ref="searchFacilitiesFormRef"
					name="advanced_search"
					:model="searchFormFacilities"
					class="ant-advanced-search-form"
					v-show="false"
				>
					<a-form-item name="roadsectionId">
						<a-input v-model:value="searchFormFacilities.roadsectionId" />
					</a-form-item>
				</a-form>
				<s-table
					ref="facilitiesTable"
					:columns="facilitiesColumns"
					:data="loadFacilitiesData"
					bordered
					:row-key="(record) => record.id"
				>
					<template #bodyCell="{ column, record }">
						<template v-if="column.dataIndex === 'type'">
							{{ $TOOL.dictTypeData('facilityType', record.type) }}
						</template>
						<template v-if="column.dataIndex === 'action'">
							<a-space>
								<a @click="showWayFacilitiesDetail(record)">详情</a>
							</a-space>
						</template>
					</template>
				</s-table>
			</div>
			<a-row>
				<a-col :span="16"></a-col>
				<a-col :span="8" style="text-align: right">
					<a-button style="margin-right: 8px" type="primary" @click="onClose">关闭</a-button>
				</a-col>
			</a-row>
		</a-card>
	</a-spin>
	<div v-show="roadCodeShow">
		<WayRoadCodeDetail ref="formRef" @decreeDetail="decreeDetail" @successful="onClose"></WayRoadCodeDetail>
	</div>
	<div v-show="facilitiesShow">
		<WayFacilitiesDetail ref="facilitiesRef" @decreeDetail="decreeDetail" @successful="onClose"></WayFacilitiesDetail>
	</div>
</template>

<script setup name="WayCodeDetail">
	import '@/assets/css/index.less'
	import wayCodeApi from '@/api/basicsdata/wayCodeApi'
	import WayRoadCodeDetail from './wayRoadCodeDetail.vue'
	import WayFacilitiesDetail from './wayFacilitiesDetail.vue'
	import { cloneDeep } from 'lodash-es'
	import { ref } from 'vue'
	import tool from '@/utils/tool'
	const activeKey = ref('1')
	const wayCode = ref()
	const wayName = ref()
	//关联路段变量
	const searchFormRef = ref()
	let searchFormState = reactive({})
	const table = ref()
	const roadCodeShow = ref(false)
	//附属设施变量
	const searchRoadTestFormRef = ref()
	let searchFormFacilities = reactive({})
	const roadTestTable = ref()
	const facilitiesShow = ref(false)
	//附属设施变量
	let searchFormRoadTest = reactive({})
	const searchFacilitiesFormRef = ref()
	const facilitiesTable = ref()
	//关闭页面from
	const formRef = ref()
	const facilitiesRef = ref()
	let detail = ref({})
	const loadSpinning = ref(false)
	const onOpen = (record) => {
		let param = {
			id: record.id
		}
		wayCodeApi.findWayCodeHainan(Object.assign(param)).then((data) => {
			let recordData = cloneDeep(data)
			detail.value = Object.assign({}, recordData)
			console.log(data)
		})
		wayCode.value = record.roadCode
		wayName.value = record.roadName
		//转参赋值
		searchFormState.roadCode = record.roadCode
		searchFormFacilities.roadsectionId = record.sectionCode
		//刷新页签
		table.value.refresh(true)
		facilitiesTable.value.refresh(true)
	}

	const columns = [
		{
			title: '路段编码',
			dataIndex: 'sectionCode'
		},
		{
			title: '方向',
			dataIndex: ''
		},
		{
			title: '长度（公里）',
			dataIndex: 'length'
		},
		{
			title: '是否桥梁',
			dataIndex: ''
		},
		{
			title: '是否隧道',
			dataIndex: ''
		},
		{
			title: '所属市县',
			dataIndex: ''
		}
	]
	//操作栏通过权限判断是否显示
	columns.push({
		title: '操作',
		dataIndex: 'action',
		align: 'center',
		width: '120px'
	})
	//关联路段
	const loadData = (parameter) => {
		const searchFormParam = JSON.parse(JSON.stringify(searchFormState))
		return wayCodeApi.wayCodeHainanSectionPage(Object.assign(parameter, searchFormParam)).then((data) => {
			return data
		})
	}

	//路测设施
	const roadTestColumns = [
		{
			title: '关联路段编码',
			dataIndex: ''
		},
		{
			title: '设施编码',
			dataIndex: ''
		},
		{
			title: '设施类型',
			dataIndex: ''
		},
		{
			title: '方向',
			dataIndex: ''
		},
		{
			title: '经度',
			dataIndex: ''
		},
		{
			title: '纬度',
			dataIndex: ''
		}
	]
	//操作栏通过权限判断是否显示
	roadTestColumns.push({
		title: '操作',
		dataIndex: 'action',
		align: 'center',
		width: '120px'
	})

	//附属设施函数
	const loadRoadTestData = ref([])
	//附属设施列表
	const facilitiesColumns = [
		{
			title: '关联路段编码',
			dataIndex: 'sectionCode'
		},
		{
			title: '设施编码',
			dataIndex: ''
		},
		{
			title: '设施名称',
			dataIndex: 'name'
		},
		{
			title: '附属设施类型',
			dataIndex: 'type'
		},
		{
			title: '方向',
			dataIndex: ''
		},
		{
			title: '经度',
			dataIndex: 'longitude'
		},
		{
			title: '纬度',
			dataIndex: 'latitude'
		}
	]
	//操作栏通过权限判断是否显示
	facilitiesColumns.push({
		title: '操作',
		dataIndex: 'action',
		align: 'center',
		width: '120px'
	})

	//附属设施函数
	const loadFacilitiesData = ref([])
	loadFacilitiesData.value = (parameter) => {
		const searchFormParam = JSON.parse(JSON.stringify(searchFormFacilities))
		return wayCodeApi.wayCodeHainanFacilitiesPage(Object.assign(parameter, searchFormParam)).then((data) => {
			return data
		})
	}
	//关联路段详情
	const indexShow = ref(true)
	const showWayRoadCodeDetail = (record) => {
		indexShow.value = false
		roadCodeShow.value = true
		formRef.value.onOpen(record)
	}
	//附属设施详情
	const showWayFacilitiesDetail = (record) => {
		indexShow.value = false
		facilitiesShow.value = true
		facilitiesRef.value.onOpen(record)
	}
	const emit = defineEmits({ successful: null })
	const onClose = () => {
		indexShow.value = true
		roadCodeShow.value = false
		facilitiesShow.value = false
		emit('successful')
	}
	//收费道路类型
	const roadTypeOptions = tool.dictList('roadType')
	//行政等级
	const wayAdminiHierarchyOptions = tool.dictList('adminiHierarchy')
	//技术等级
	const wayLevelOptions = tool.dictList('WAY_LEVEL')
	// wayRoadCodeDetail二级页面给一级页面传值
	//定义的方法  wayRoadCodeDetail 定义了方法并且给decreeDetail赋值和传值
	const decreeDetail = (payload) => {
		if (payload) {
			indexShow.value = true
			roadCodeShow.value = false
			facilitiesShow.value = false
		}
	}

	defineExpose({
		onOpen
	})
</script>
