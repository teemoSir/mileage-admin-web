<template>
	<s-table
		ref="table"
		:columns="columns"
		:data="loadData"
		bordered
		:customRow="rowClick"
		:row-key="(record) => record.id"
		size="5"
		pageSizeOptions="['5', '10', '20', '50', '100']"
	>
		<template #bodyCell="{ column, record }">
			<template v-if="column.dataIndex === 'chargeDistance'">
				<a-space v-if="null != record.chargeDistance">
					{{ $TOOL.changgeKilometers(record.chargeDistance) }} 公里
				</a-space>
			</template>
			<template v-if="column.dataIndex === 'roadCode'">
				<span v-if="record.roadname != null && '' != record.roadname"
					>{{ record.roadCode }}【{{ record.roadname }}】</span
				>
				<span v-else="record.roadname == null">{{ record.roadCode }}</span>
			</template>
			<template v-if="column.dataIndex === 'chargeAmount'">
				<a-space v-if="null != record.chargeAmount"> {{ $TOOL.changeMoney(record.chargeAmount) }} 元 </a-space>
			</template>
			<template v-if="column.dataIndex === 'rateValue'">
				<a-space v-if="null != record.rateValue"> {{ $TOOL.changeRate(record.rateValue) }} 元/公里 </a-space>
			</template>
			<template v-if="column.dataIndex === 'startTime'">
				<a-space v-if="null != record.startTime">
					{{ record.startTime.substring(11) }}
				</a-space>
			</template>
			<template v-if="column.dataIndex === 'endTime'">
				<a-space v-if="null != record.endTime">
					{{ record.endTime.substring(11) }}
				</a-space>
			</template>
		</template>
	</s-table>
</template>

<script setup name="roadTab">
	import bdBillingRoadDetailApi from '@/api/billing/bdBillingRoadDetailApi'
	const table = ref()
	const trafficId = ref()
	const emit = defineEmits({ doubleClickOp: null })
	const columns = [
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
			title: '计费里程',
			dataIndex: 'chargeDistance'
		},
		{
			title: '计费费率',
			dataIndex: 'rateValue'
		},
		{
			title: '计费金额',
			dataIndex: 'chargeAmount'
		},
		{
			title: '起始时间',
			dataIndex: 'startTime'
		},
		{
			title: '结束时间',
			dataIndex: 'endTime'
		}
	]

	const searchFormState = ref({})
	const onOpen = (record) => {
		searchFormState.value.trafficId = record.traRecId
		table.value.refresh(true)
	}

	const loadData = (parameter) => {
		if (null != searchFormState.value.trafficId) {
			searchFormState.value.sort = 1
			return bdBillingRoadDetailApi
				.bdBillingRoadDetailPage(Object.assign(parameter, searchFormState.value))
				.then((data) => {
					searchFormState.value.first = false
					return data
				})
		}
	}

	const rowClick = (record, index) => {
		return {
			onClick: (event) => {
				emit('rowClick', record)
			}
		}
	}

	// 抛出函数
	defineExpose({
		onOpen
	})
</script>
