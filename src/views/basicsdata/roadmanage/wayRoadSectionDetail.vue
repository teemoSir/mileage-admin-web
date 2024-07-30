<template>
	<a-spin :spinning="loadSpinning" v-show="sectionShow">
		<a-card :bordered="false" :visible="visible" :destroy-on-close="true" @close="onClose">
			<span class="titleItem"><b>路段信息</b></span>
			<a-row>
				<a-col :span="12" style="padding-right: 10px">
					<a-form layout="horizontal" :label-col="{ span: 6 }">
						<a-form-item label="道路编码：">
							<span class="form-inside-span-content">{{ detail.roadCode }}</span>
						</a-form-item>
						<a-form-item label="路段编码：">
							<span class="form-inside-span-content">{{ detail.sectionCode }}</span>
						</a-form-item>
						<a-form-item label="长度（公里）：">
							<span class="form-inside-span-content">{{ detail.length }}</span>
						</a-form-item>
						<a-form-item label="设计时速：">
							<span class="form-inside-span-content">{{ detail.speed }}</span>
						</a-form-item>
						<a-form-item label="是否隧道：">
							<span class="form-inside-span-content"></span>
						</a-form-item>
						<a-form-item label="路段方向：">
							<span class="form-inside-span-content"></span>
						</a-form-item>
						<a-form-item label="路段起点：">
							<span class="form-inside-span-content">{{ detail.beginAddress }}</span>
						</a-form-item>
						<a-form-item label="起点位置桩号：">
							<span class="form-inside-span-content">{{ detail.beginPositionId }}</span>
						</a-form-item>
						<a-form-item label="起点位置经度：">
							<span class="form-inside-span-content">{{ detail.beginLongitude }}</span>
						</a-form-item>
					</a-form>
				</a-col>
				<a-col :span="12">
					<a-form layout="horizontal" :label-col="{ span: 6 }">
						<a-form-item label="道路名称：">
							<span class="form-inside-span-content">{{ detail.roadName }}</span>
						</a-form-item>
						<a-form-item label="路段名称：">
							<span class="form-inside-span-content">{{ detail.sectionName }}</span>
						</a-form-item>
						<a-form-item label="收费道路类型：">
							<span class="form-inside-span-content">{{ chargeTypeNum }}</span>
						</a-form-item>
						<a-form-item label="设计流量：">
							<span class="form-inside-span-content">{{ detail.flow }}</span>
						</a-form-item>
						<a-form-item label="是否桥梁：">
							<span class="form-inside-span-content"></span>
						</a-form-item>
						<a-form-item label="所属行政区划：">
							<span class="form-inside-span-content"></span>
						</a-form-item>
						<a-form-item label="路段终点：">
							<span class="form-inside-span-content">{{ detail.endAddress }}</span>
						</a-form-item>
						<a-form-item label="终点位置桩号：">
							<span class="form-inside-span-content">{{ detail.endPositionId }}</span>
						</a-form-item>
						<a-form-item label="终点位置经度：">
							<span class="form-inside-span-content">{{ detail.endLatitude }}</span>
						</a-form-item>
					</a-form>
				</a-col>
			</a-row>
			<span class="titleItem"><b>关联信息</b></span>
			<a-tabs v-model:activeKey="activeKey" type="card">
				<a-tab-pane key="1" tab="GIS数据"> </a-tab-pane>
				<a-tab-pane key="2" tab="路测设施">Content of Tab Pane 2</a-tab-pane>
				<a-tab-pane key="3" tab="附属设施"> </a-tab-pane>
				<a-tab-pane key="4" tab="道路交叉管理"> </a-tab-pane>
			</a-tabs>
			<!--GIS数据-->
			<div v-show="activeKey == '1'">
				<!--<s-table ref="table" :columns="columns" :data="loadData" bordered :row-key="(record) => record.id"> </s-table>-->
			</div>
			<!--附属设施-->
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
							{{ $TOOL.dictTypeData("facilityType", record.type) }}
						</template>
						<template v-if="column.dataIndex === 'action'">
							<a-space>
								<a @click="showWayReleFacilitiesDetail(record)">详情</a>
							</a-space>
						</template>
					</template>
				</s-table>
			</div>
			<!--道路交叉管理-->
			<div v-show="activeKey == '4'">
				<a-form
					ref="searchCrossFormRef"
					name="advanced_search"
					:model="searchFormCross"
					class="ant-advanced-search-form"
					v-show="false"
				>
					<a-form-item name="roadsectionCode">
						<a-input v-model:value="searchFormCross.roadsectionCode" />
					</a-form-item>
				</a-form>
				<s-table
					ref="crossTable"
					:columns="crossColumns"
					:data="loadCrossData"
					bordered
					:row-key="(record) => record.id"
				>
					<template #bodyCell="{ column, record }">
						<template v-if="column.dataIndex === 'type'">
							{{ $TOOL.dictTypeData("crossType", record.type) }}
						</template>
						<template v-if="column.dataIndex === 'action'">
							<a-space>
								<a @click="showWayCrossDetail(record)">详情</a>
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
	<!--道路交叉管理-->
	<div v-show="roadCrossShow">
		<WayRoadCrossDetail ref="wayCrossRef" @wayCrossDetail="wayCrossDetail" @successful="onClose"> </WayRoadCrossDetail>
	</div>
	<!--附属设施-->
	<div v-show="relefacilitiesShow">
		<WayReleFacilitiesDetail
			ref="facilitiesRef"
			@facilitiesDetail="facilitiesDetail"
			@successful="onClose"
		></WayReleFacilitiesDetail>
	</div>
</template>

<script setup name="SectionInformationDetail">
	import '@/assets/css/index.less'
	import waySectionApi from '@/api/basicsdata/waySectionApi'
	import wayCodeApi from '@/api/basicsdata/wayCodeApi'
	import WayReleFacilitiesDetail from '@/views/basicsdata/roadmatch/wayReleFacilitiesDetail.vue'
	import WayRoadCrossDetail from '@/views/basicsdata/roadmatch/wayRoadCrossDetail.vue'
	import { cloneDeep } from 'lodash-es'
	import { ref } from 'vue'
	import tool from '@/utils/tool'
	//下拉列表赋值
	const handleChange = (value) => {
		searchFormState.chargeType = `${value}`
	}
	const facilitiesRef = ref()
	const wayCrossRef = ref()
	const relefacilitiesShow = ref(false)
	const roadCrossShow = ref(false)
	const sectionShow = ref(true)
	//附属设施变量
	let searchFormFacilities = reactive({})
	const activeKey = ref('1')
	let searchFormState = reactive({})
	let searchFormCross = reactive({})
	let detail = ref({})
	//table变量声明
	const table = ref()
	const crossTable = ref()
	const facilitiesTable = ref()
	const loadSpinning = ref(false)
	let chargeTypeNum = ref([])
	//收费道路类型
	const chargeRoadTypeOptions = tool.dictList('chargeRoadType')
	const onOpen = (record) => {
		chargeTypeNum.value = ''
		let param = {
			id: record.id
		}
		waySectionApi.findWayCodeSectionDetail(Object.assign(param)).then((data) => {
			let recordData = cloneDeep(data)
			detail.value = Object.assign({}, recordData)
		})
		/*下拉取值*/
		searchFormState.roadsectionCode = record.sectionCode
		/*道路交叉管理传值*/
		searchFormCross.roadsectionCode = record.sectionCode
		/*附属设施管理传值*/
		searchFormFacilities.roadsectionId = record.sectionCode
		/*处理下拉显示*/
		let typeStuats = record.chargeType.split(',')
		typeStuats.forEach(function (type, index) {
			chargeTypeNum.value += chargeRoadTypeOptions[type].label
			// 移除最后一个逗号
			if (index < typeStuats.length - 1) {
				chargeTypeNum.value += ','
			}
		})
		//刷新页签
		/*table.value.refresh(true)*/
		facilitiesTable.value.refresh(true)
		crossTable.value.refresh(true)
	}

	const columns = [
		{
			title: '路段编码',
			dataIndex: 'roadsectionCode'
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
	//道路交叉管理
	const crossColumns = [
		{
			title: '道路道路交叉管理编码',
			dataIndex: 'code'
		},
		{
			title: '道路道路交叉管理名称',
			dataIndex: 'name'
		},
		{
			title: '道路交叉类型',
			dataIndex: 'type'
		},
		{
			title: '所属道路',
			dataIndex: 'roadName'
		},
		{
			title: '所属路段',
			dataIndex: 'sectionName'
		},
		{
			title: '关联GIS数据数量',
			dataIndex: ''
		}
	]
	//操作栏通过权限判断是否显示
	crossColumns.push({
		title: '操作',
		dataIndex: 'action',
		align: 'center',
		width: '120px'
	})
	//附属设施列表
	const facilitiesColumns = [
		{
			title: '关联路段编码',
			dataIndex: 'roadsectionId'
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
	/*const loadData = (parameter) => {
		const searchFormParam = JSON.parse(JSON.stringify(searchFormState))
		return waySectionApi.findWayCodeHainanSection(Object.assign(parameter, searchFormParam)).then((data) => {
			return data
		})
	}*/
	//道路交叉管理函数
	const loadCrossData = (parameter) => {
		const searchFormParam = JSON.parse(JSON.stringify(searchFormCross))
		return wayCodeApi.wayCodeHainanCrossPage(Object.assign(parameter, searchFormParam)).then((data) => {
			return data
		})
	}
	//道路交叉管理详情
	const showWayCrossDetail = (record) => {
		sectionShow.value = false
		relefacilitiesShow.value = false
		roadCrossShow.value = true
		wayCrossRef.value.onOpen(record)
	}
	//附属设施函数
	const loadFacilitiesData = (parameter) => {
		const searchFormParam = JSON.parse(JSON.stringify(searchFormFacilities))
		return wayCodeApi.wayCodeHainanFacilitiesPage(Object.assign(parameter, searchFormParam)).then((data) => {
			return data
		})
	}
	//附属设施详情
	const showWayReleFacilitiesDetail = (record) => {
		sectionShow.value = false
		roadCrossShow.value = false
		relefacilitiesShow.value = true
		facilitiesRef.value.onOpen(record)
	}

	// 返回列表页
	const emits = defineEmits(['sectionDetail'])
	const onClose = () => {
		emits('sectionDetail', true)
	}
	//定义wayReleFacilitiesDetail页面传值
	const facilitiesDetail = (payload) => {
		if (payload) {
			sectionShow.value = true
			relefacilitiesShow.value = false
			roadCrossShow.value = false
		}
	}

	//定义wayRoadCrossDetail页面传值
	const wayCrossDetail = (payload) => {
		if (payload) {
			sectionShow.value = true
			relefacilitiesShow.value = false
			roadCrossShow.value = false
		}
	}

	defineExpose({
		onOpen
	})
</script>
