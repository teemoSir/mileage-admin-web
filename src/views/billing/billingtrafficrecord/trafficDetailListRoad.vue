<template>
	<a-card :bordered="false" style="width: 100%">
		<a-table ref="table" size="small" :columns="columns" :data-source="tableData" bordered :pagination="false">
			<template #bodyCell="{ column, record }">
				<template v-if="column.dataIndex === 'chargeDistance'">
					<div class="form-inside-div-content">
						<a-space v-if="null != record.chargeDistance">
							{{ $TOOL.changgeKilometers(record.chargeDistance) }} 公里
						</a-space>
					</div>
				</template>
				<template v-if="column.dataIndex === 'roadCode'">
					<span class="form-inside-span-content" v-if="record.roadname != null && '' != record.roadname"
						>{{ record.roadCode }}【{{ record.roadname }}】</span
					>
					<span class="form-inside-span-content" v-else="record.roadname == null">{{ record.roadCode }}</span>
				</template>
				<template v-if="column.dataIndex === 'roadType'">
					<div class="form-inside-div-content" v-for="roadType in roadTypeOptions" :key="roadType.value">
						<a-tag color="#108ee9" v-if="roadType.value == record.roadType">{{ roadType.label }}</a-tag>
					</div>
				</template>
				<template v-if="column.dataIndex === 'chargeType'">
					<div class="form-inside-div-content" v-if="record.chargeType == 1">是</div>
					<div class="form-inside-div-content" v-else>否</div>
				</template>
				<template v-if="column.dataIndex === 'feeBasis'">
					<div class="form-inside-div-content" v-if="record.feeBasis == 1">轨迹</div>
					<div class="form-inside-div-content" v-else-if="record.feeBasis == 2">视频</div>
					<div class="form-inside-div-content" v-else-if="record.feeBasis == 3">轨迹+视频</div>
					<div class="form-inside-div-content" v-else>其他</div>
				</template>
				<template v-if="column.dataIndex === 'chargeAmount'">
					<a-space>
						{{ $TOOL.changeMoney(record.chargeAmount) }}
					</a-space>
				</template>
				<template v-if="column.dataIndex === 'actualAmount'">
					<a-space>
						{{ $TOOL.changeMoney(record.actualAmount) }}
					</a-space>
				</template>
				<template v-if="column.dataIndex === 'yearMileage'">
					<a-space>
						{{ $TOOL.changgeKilometers(record.yearMileage) }}
					</a-space>
				</template>
				<template v-if="column.dataIndex === 'rateValue'">
					<a-space>
						{{ $TOOL.changeRate(record.rateValue) }}
					</a-space>
				</template>
				<template v-if="column.dataIndex === 'action'">
					<a-space>
						<a @click="showDetail(record)">详情</a>
					</a-space>
				</template>
			</template>
		</a-table>
	</a-card>
	<RoadDetail ref="formRef" @successful="onClose"></RoadDetail>
</template>

<script setup name="roadTab">
	import bdBillingRoadDetailApi from '@/api/billing/bdBillingRoadDetailApi'
	import tool from '@/utils/tool'
	import RoadDetail from '@/views/billing/billingroaddetail/roadDetail2.vue'
	const table = ref()
	const traRecId = ref()
	const columns = [
		{
			title: '计费明细编号',
			dataIndex: 'id'
		},
		{
			title: '道路编码【名称】',
			dataIndex: 'roadCode'
		},
		// {
		// 	title: '路段编号',
		// 	dataIndex: 'sectionCode'
		// },
		// {
		// 	title: '道路名称',
		// 	dataIndex: 'roadname'
		// },
		{
			title: '收费道路类型',
			dataIndex: 'roadType'
		},
		{
			title: '是否收费',
			dataIndex: 'chargeType'
		},
		{
			title: '计费里程(公里）',
			dataIndex: 'chargeDistance'
		},
		{
			title: '计费费率',
			dataIndex: 'rateValue'
		},
		{
			title: '计费金额（元）',
			dataIndex: 'chargeAmount'
		},
		{
			title: '优惠金额（元）',
			dataIndex: 'discountAmount'
		},
		{
			title: '计费依据',
			dataIndex: 'feeBasis'
		},
		{
			title: '起始时间',
			dataIndex: 'startTime'
		},
		{
			title: '结束时间',
			dataIndex: 'endTime'
		},
		{
			title: '创建时间',
			dataIndex: 'createTime'
		}
	]

	columns.push({
		title: '操作',
		dataIndex: 'action',
		align: 'center',
		width: '80px'
	})

	const onOpen = (record) => {
		traRecId.value = record.traRecId
		loadData()
	}

	const tableData = ref([])
	const loadData = (parameter) => {
		tableData.value = []
		if (null != traRecId.value) {
			let param = {
				traRecId: traRecId.value
			}
			bdBillingRoadDetailApi.bdBillingRoadDetailTrafficId(param).then((data) => {
				tableData.value = data
			})
		}
	}

	const ishowTable = ref(true)
	const formRef = ref()
	const showDetail = (record) => {
		ishowTable.value = false
		formRef.value.onOpen(record)
	}

	const roadTypeOptions = tool.dictList('roadType')

	// 抛出函数
	defineExpose({
		onOpen
	})

	const onClose = () => {
		ishowTable.value = true
	}
</script>
