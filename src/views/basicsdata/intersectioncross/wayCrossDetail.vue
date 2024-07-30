<template>
	<a-spin :spinning="loadSpinning">
		<a-card :bordered="false" :visible="visible" :destroy-on-close="true" @close="onClose">
			<span class="titleItem"><b>道路交叉基本信息</b></span>
			<a-card>
				<a-form layout="horizontal">
					<a-row>
						<a-col :span="4"></a-col>
						<a-col :span="8">
							<a-form-item label="道路交叉口编码：">
								<span class="form-inside-span-content">{{ detail.code }}</span>
							</a-form-item>
						</a-col>
						<a-col :span="8">
							<a-form-item label="道路交叉口名称">
								<span class="form-inside-span-content">{{ detail.name }}</span>
							</a-form-item>
						</a-col>
					</a-row>
					<a-row>
						<a-col :span="4"></a-col>
						<a-col :span="8">
							<a-form-item label="交叉口类型：" name="type">
								<a-select
									:bordered="false"
									:disabled="true"
									:showArrow="false"
									v-model:value="detail.type"
									:options="crossTypeOptions"
								/>
							</a-form-item>
						</a-col>
						<a-col :span="8">
							<a-form-item label="所属道路：">
								<span class="form-inside-span-content">{{ detail.roadCode }}</span>
							</a-form-item>
						</a-col>
					</a-row>
					<a-row>
						<a-col :span="4"></a-col>
						<a-col :span="8">
							<a-form-item label="所属路段：">
								<span class="form-inside-span-content">{{ detail.roadsectionCode }}</span>
							</a-form-item>
						</a-col>
						<a-col :span="8">
							<a-form-item label="桩号：">
								<span class="form-inside-span-content">{{ detail.positionId }}</span>
							</a-form-item>
						</a-col>
					</a-row>
					<a-row>
						<a-col :span="4"></a-col>
						<a-col :span="8">
							<a-form-item label="道路交叉口中心坐标：">
								<span class="form-inside-span-content">{{ detail.longitude }} {{ detail.latitude }} </span>
							</a-form-item>
						</a-col>
						<a-col :span="8"> </a-col>
					</a-row>
				</a-form>
			</a-card>
			<span class="titleItem"><b>GIS数据关联关系</b></span>
			<a-card>
				<s-table ref="tableRef" :columns="columns" :data="loadData" bordered :row-key="(record) => record.id">
				</s-table>
			</a-card>
		</a-card>
	</a-spin>
	<a-row>
		<a-col :span="16"></a-col>
		<a-col :span="8" style="text-align: right">
			<a-button style="margin-right: 8px" type="primary" @click="onClose">关闭</a-button>
		</a-col>
	</a-row>
</template>
<script setup name="CrossformationDetail">
	import '@/assets/css/index.less'
	import wayCrossApi from '@/api/basicsdata/wayCrossApi'
	import { ref } from 'vue'
	import tool from '@/utils/tool'
	const tableRef = ref()
	let detail = ref({})
	const loadSpinning = ref(false)
	const onOpen = (record) => {
		console.log(record)
		let param = {
			id: record.id,
			roadsectionCode: record.sectionCode
		}
		wayCrossApi.findWayCodeCrossDetail(param).then((data) => {
			detail.value = data
		})
	}
	const columns = [
		{
			title: '数据编号',
			dataIndex: ''
		},

		{
			title: 'osm编号',
			dataIndex: ''
		},
		{
			title: 'osm编号',
			dataIndex: 'length'
		},
		{
			title: 'GIS道路分级',
			dataIndex: ''
		},
		{
			title: '关联道路编号',
			dataIndex: ''
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
			title: '收费道路类型',
			dataIndex: ''
		}
	]
	//道路交叉类型
	const crossTypeOptions = tool.dictList('crossType')
	//关联路段
	const loadData = ref([])
	loadData.value = (parameter) => {
		return loadData
	}
	const emits = defineEmits(['wayCrossDetail'])
	const onClose = () => {
		emits('wayCrossDetail', true)
	}
	defineExpose({
		onOpen
	})
</script>
<style>
	.titleItem {
		font-size: 15px;
		font-weight: bold;
		color: black;
		padding-left: 4px;
		border-left: 3px solid lightseagreen;
	}
</style>
