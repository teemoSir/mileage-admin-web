<template>
	<a-card :bordered="false" v-show="indexShow">
		<a-form ref="searchFormRef" name="advanced_search" :model="searchFormState" class="ant-advanced-search-form">
			<a-row :gutter="24">
				<a-col :span="4">
					<a-form-item label="道路编码：" name="roadCode">
						<a-input style="width: auto" v-model:value="searchFormState.roadCode" placeholder="请输入道路编码" />
					</a-form-item>
				</a-col>
				<a-col :span="2"></a-col>
				<a-col :span="4">
					<a-form-item label="路段编码：" name="roadsectionCode">
						<a-input style="width: auto" v-model:value="searchFormState.roadsectionCode" placeholder="请输入路段编码" />
					</a-form-item>
				</a-col>
				<a-col :span="2"></a-col>
				<a-col :span="4">
					<a-form-item label="收费道路类型" name="chargeType">
						<a-select
							style="width: 150px"
							mode="multiple"
							allowClear
							v-model:value="chargeTypeNum"
							placeholder="请输入道路交叉口类型"
							:options="chargeRoadTypeOptions"
							@change="handleChange"
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
					<a-button type="primary" @click="formAddEdit.onOpen()" v-if="hasPerm('wayCodeCrossAdd')">
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
						<template v-if="column.dataIndex === 'chargeType'">
							<span v-for="item in record.chargeType.split(',')">
								<div v-if="item === '0'">
									{{ '无' }}
								</div>
								<div v-if="item === '1'">
									{{ '高速公路收费' }}
								</div>
								<div v-if="item === '2'">
									{{ '里程税收费' }}
								</div>
								<div v-if="item === '3'">
									{{ '里程费收费' }}
								</div>
								<div v-if="item === '4'">
									{{ '拥堵收费' }}
								</div>
								<div v-if="item === '5'">
									{{ '停车收费' }}
								</div>
							</span>
						</template>
						<template v-if="column.dataIndex === 'action'">
							<a-space>
								<a @click="formAddEdit.onOpen(record)" v-if="hasPerm('wayCodeCrossEdit')">编辑</a>
								<a-popconfirm
									title="是否确定删除！"
									v-if="hasPerm('wayCodeCrossDelete')"
									@confirm="removeOrg(record)"
									@cancel="cancel"
								>
									<a type="primary">删除</a>
								</a-popconfirm>
								<a @click="showSectionDetail(record)">详情</a>
							</a-space>
						</template>
					</template>
				</s-table>
			</a-col>
		</a-row>
	</a-card>
	<!--新增、编辑跳转-->
	<Form ref="formAddEdit" @successful="tableRef.refresh(true)" />
	<div v-show="sectionShow">
		<WaySectionDetail ref="sectionRef" @sectionDetail="sectionDetail" @successful="onClose"></WaySectionDetail>
	</div>
</template>

<script setup name="WayCodeHainanSection">
	import tool from '@/utils/tool'
	import waySectionApi from '@/api/basicsdata/waySectionApi'
	import WaySectionDetail from './wayRoadSectionDetail.vue'
	import { admin } from '@/views/basicsdata/map/data'
	import { message } from 'ant-design-vue'
	import Form from './form.vue'
	import { ref } from 'vue'
	import { h } from 'vue'
	import { SearchOutlined } from '@ant-design/icons-vue'
	const defaultExpandedKeys = ref([])
	const searchFormState = reactive({})
	const searchFormRef = ref()
	const sectionShow = ref(false)
	const tableRef = ref()
	const sectionRef = ref()
	const formAddEdit = ref()
	const expandedKeysAdmin = ref(['0-0'])
	const expandedKeys = ref(['0-0'])
	const activeKey = ref('1')
	const chargeTypeNum = ref()
	const columns = [
		{
			title: '道路编码',
			dataIndex: 'roadCode'
		},
		{
			title: '道路名称',
			dataIndex: 'roadName'
		},
		{
			title: '路段编码',
			dataIndex: 'sectionCode'
		},
		{
			title: '路段名称',
			dataIndex: 'sectionName'
		},
		{
			title: '收费道路类型',
			dataIndex: 'chargeType'
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
	columns.push({
		title: '操作',
		dataIndex: 'action',
		align: 'center',
		width: '120px'
	})
	//收费道路类型
	const chargeRoadTypeOptions = tool.dictList('chargeRoadType')
	const loadData = (parameter) => {
		const searchFormParam = JSON.parse(JSON.stringify(searchFormState))
		return waySectionApi.wayCodeHainanroadsectionPage(Object.assign(parameter, searchFormParam)).then(
			(data) => {
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
	waySectionApi.findwayCodeTree().then((data) => {
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
	const showSectionDetail = (record) => {
		indexShow.value = false
		sectionShow.value = true
		sectionRef.value.onOpen(record)
	}
	//下拉列表赋值
	const handleChange = (value) => {
		searchFormState.chargeType = `${value}`
	}
	// 重置
	const reset = () => {
		//清空下拉框中值
		chargeTypeNum.value = []
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
	const sectionDetail = (payload) => {
		if (payload) {
			indexShow.value = true
			sectionShow.value = false
		}
	}

	//删除
	const removeOrg = (record) => {
		let params = [
			{
				id: record.id
			}
		]
		waySectionApi.sectionDelete(params).then(() => {
			message.success('删除成功！')
			tableRef.value.refresh(true)
		})
	}
</script>
