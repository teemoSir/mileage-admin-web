<template>
	<a-card :bordered="false" v-show="indexShow">
		<a-form ref="searchFormRef" name="advanced_search" :model="searchFormState" class="ant-advanced-search-form">
			<a-row :gutter="24">
				<a-col :span="4">
					<a-form-item label="所属道路" name="roadName">
						<a-input style="width: 190px" v-model:value="searchFormState.roadName" placeholder="请输入设施编码" />
					</a-form-item>
				</a-col>
				<a-col :span="2"></a-col>
				<a-col :span="4">
					<a-form-item label="设施编码" name="wayName">
						<a-input style="width: 190px" v-model:value="searchFormState.wayName" placeholder="请输入设施编码" />
					</a-form-item>
				</a-col>
				<a-col :span="2"></a-col>
				<a-col :span="4">
					<a-form-item label="设施类型" name="type">
						<a-select
							style="width: 190px"
							allowClear
							v-model:value="searchFormState.type"
							placeholder="请输入设施类型"
							:options="facilityTypeOptions"
						/>
					</a-form-item>
				</a-col>
				<a-col :span="2"></a-col>
				<a-col :span="4">
					<a-button :icon="h(SearchOutlined)" type="primary" id="pagereset" @click="tableRef.refresh(true)">查询</a-button>
					<a-button style="margin: 0 8px" @click="reset">重置</a-button>
				</a-col>
			</a-row>
		</a-form>

		<a-row>
			<a-col :span="24">
				<a-space>
					<a-button type="primary" @click="formAddEdit.onOpen()" v-if="hasPerm('wayCodeFacilitiesAdd')">
						<template #icon><plus-outlined /></template>
						新增
					</a-button>
				</a-space>
			</a-col>
		</a-row>

		<a-row>
			<a-col :span="4">
				<a-tabs v-model:activeKey="activeKey">
					<a-tab-pane key="1" tab="按道路"> </a-tab-pane>
					<a-tab-pane key="2" tab="按区划"> </a-tab-pane>
				</a-tabs>
				<div v-show="activeKey === '1'">
					<a-tree v-model:expandedKeys="expandedKeys" @select="treeSelect" :tree-data="treeData"> </a-tree>
				</div>
				<div v-show="activeKey === '2'">
					<a-tree
						v-model:expandedKeys="expandedKeysAdmin"
						@select="treeSelect"
						:tree-data="treeDataAdmin"
						:height="600"
					>
					</a-tree>
				</div>
			</a-col>
			<a-col :span="20">
				<s-table
					ref="tableRef"
					:columns="columns"
					:data="loadData"
					bordered
					:row-key="(record) => record.id"
					:tool-config="toolConfig"
				>
					<template #bodyCell="{ column, record }">
						<template v-if="column.dataIndex === 'type'">
							{{ $TOOL.dictTypeData('facilityType', record.type) }}
						</template>
						<template v-if="column.dataIndex === 'action'">
							<a-space>
								<a @click="formAddEdit.onOpen(record)" v-if="hasPerm('wayCodeFacilitiesEdit')">编辑</a>
								<a-popconfirm title="是否确定删除！" @confirm="removeOrg(record)" @cancel="cancel">
									<a type="primary">删除</a>
								</a-popconfirm>
								<a @click="showWayRoadCodeDetail(record)">详情</a>
							</a-space>
						</template>
					</template>
				</s-table>
			</a-col>
		</a-row>
	</a-card>
	<!--新增、编辑跳转-->
	<Form ref="formAddEdit" @successful="tableRef.refresh(true)" />
	<div v-show="facilitiesShow">
		<WayRoadRoadFacilitiesDetail
			ref="facilitiesRef"
			@decreeDetail="decreeDetail"
			@successful="onClose"
		></WayRoadRoadFacilitiesDetail>
	</div>
</template>

<script setup name="WayCodeHainan">
	import tool from '@/utils/tool'
	import wayFacilitiesApi from '@/api/basicsdata/wayFacilitiesApi'
	import { admin } from '@/views/basicsdata/map/data'
	import WayRoadRoadFacilitiesDetail from './wayRoadFacilitiesDetail.vue'
	import Form from './form.vue'
	import { message } from 'ant-design-vue'
	import { h } from 'vue'
	import { SearchOutlined } from '@ant-design/icons-vue'
	const defaultExpandedKeys = ref([])
	const searchFormState = reactive({})
	const searchFormRef = ref()
	const facilitiesShow = ref(false)
	const tableRef = ref()
	const facilitiesRef = ref()
	const formAddEdit = ref()
	const expandedKeysAdmin = ref(['0-0'])
	const expandedKeys = ref(['0-0'])
	const activeKey = ref('1')
	const columns = [
		{
			title: '所属道路编码',
			dataIndex: 'roadCode'
		},
		{
			title: '所属道路名称',
			dataIndex: 'roadName'
		},
		{
			title: '所属路段编码',
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
			title: '设施类型',
			dataIndex: 'type'
		}
	]
	columns.push({
		title: '操作',
		dataIndex: 'action',
		align: 'center',
		width: '120px'
	})
	//收费道路类型
	const facilityTypeOptions = tool.dictList('facilityType')
	const loadData = (parameter) => {
		const searchFormParam = JSON.parse(JSON.stringify(searchFormState))
		return wayFacilitiesApi.wayCodeHainanFacilitiesPage(Object.assign(parameter, searchFormParam)).then((data) => {
				return data
			},
			//异常处理
			(e) => {
				return null
			}
		)
	}
	// 获得道路类型
	let roadtypes = ref({
		GS: [],
		GD: [],
		SD: [],
		XD: [],
		YD: []
	})
	const MOCK_DATA = {
		G: [],
		S: [],
		X: [],
		Y: []
	}
	// 关联树
	const treeData = ref([
		{
			title: '全部',
			key: '0-0',
			children: [
				{
					title: '高速公路',
					key: '0-0-1',
					children: []
				},
				{
					title: '国道',
					key: '0-0-2',
					children: []
				},
				{
					title: '省道',
					key: '0-0-3',
					children: []
				},
				{
					title: '县道',
					key: '0-0-4',
					children: []
				},
				{
					title: '乡道',
					key: '0-0-5',
					children: []
				},
				{
					title: '村道',
					key: '0-0-6',
					children: []
				},
				{
					title: '专用公路',
					key: '0-0-7',
					children: []
				},
				{
					title: '城市道路',
					key: '0-0-8',
					children: []
				},
				{
					title: '未分类道路',
					key: '0-0-9',
					children: []
				}
			]
		}
	])
	// 区划 树
	const treeDataAdmin = ref([
		{
			title: '海南省',
			key: '0-0',
			children: []
		}
	])
	const loadAdminList = () => {
		admin.forEach((ad) => {
			let city = []
			ad.children &&
				ad.children.forEach((cd) => {
					city.push({
						title: cd.name,
						key: `0-0-${ad.name}-${cd.name}`
					})
				})
			treeDataAdmin.value[0].children.push({
				title: ad.name,
				key: `0-0-${ad.name}`,
				children: city
			})
		})
	}
	//调用api数据处理
	wayFacilitiesApi.findwayCodeTree().then((data) => {
		// 行政
		loadAdminList()
		data.forEach((item) => {
			// 国家高速
			if ((item.ref.length == 3 || item.ref.length == 5) && item.ref.indexOf('G') > -1) {
				roadtypes.value.GS.push(item.ref)
				MOCK_DATA.G.push(item.ref)
			}
			// 省级高速
			if (item.ref.length == 3 && item.ref.indexOf('S') > -1) {
				roadtypes.value.GS.push(item.ref)
				MOCK_DATA.G.push(item.ref)
			}

			// 国道
			if (item.ref.length != 3 && item.ref.length != 5 && item.ref.indexOf('G') > -1) {
				roadtypes.value.GD.push(item.ref)
				MOCK_DATA.G.push(item.ref)
			}

			// 省道
			if (item.ref.indexOf('S') > -1) {
				roadtypes.value.SD.push(item.ref)
				MOCK_DATA.S.push(item.ref)
			}

			// 县道
			if (item.ref.indexOf('X') > -1) {
				roadtypes.value.XD.push(item.ref)
				MOCK_DATA.X.push(item.ref)
			}
			// 乡道
			if (item.ref.indexOf('Y') > -1) {
				roadtypes.value.YD.push(item.ref)
				MOCK_DATA.Y.push(item.ref)
			}
		})
		let index = 0
		let math = []
		for (let a in roadtypes.value) {
			for (let i = 0; i < roadtypes.value[a].length; i++) {
				let k = roadtypes.value[a][i]
				treeData.value[0].children[index].children.push({
					key: k,
					title: roadtypes.value[a][i]
				})
				math.push(k)
			}
			index++
		}
	})

	const indexShow = ref(true)
	const showWayRoadCodeDetail = (record) => {
		indexShow.value = false
		facilitiesShow.value = true
		facilitiesRef.value.onOpen(record)
	}
	// 重置
	const reset = () => {
		searchFormRef.value.resetFields()
		tableRef.value.refresh(true)
	}
	const onClose = () => {
		indexShow.value = true
	}
	// 点击树查询
	const treeSelect = (selectedKeys) => {
		if (selectedKeys.length > 0) {
			let num = padLetterAndNumber(selectedKeys.toString())
			searchFormState.wayCode = num
			tableRef.value.refresh(true)
		} else {
			delete searchFormState.wayCode
		}
	}
	//字母和数字组合的字符串不足四位时，在前面补零
	function padLetterAndNumber(str) {
		const match = str.match(/^([a-zA-Z]+)(\d{1,4})$/)
		if (match) {
			const paddedNumber = match[2].padStart(4, '0')
			return match[1] + paddedNumber
		}
		return str
	}
	const decreeDetail = (payload) => {
		if (payload) {
			indexShow.value = true
			facilitiesShow.value = false
		}
	}

	//删除
	const removeOrg = (record) => {
		let params = [
			{
				id: record.id
			}
		]
		wayFacilitiesApi.facilitiesDelete(params).then(() => {
			message.success('删除成功！')
			tableRef.value.refresh(true)
		})
	}
</script>
