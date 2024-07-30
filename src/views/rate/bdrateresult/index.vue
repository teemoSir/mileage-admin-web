<template>
	<a-card>
		<a-table :columns="columns" :data-source="data" :pagination="false" bordered>
			<template #bodyCell="{ column, record }">
				<template v-if="column.dataIndex === 'vehicleType'">
					{{ $TOOL.dictTypeData('vehicleType', record.vehicleType + '') }}
				</template>
			</template>
		</a-table>
	</a-card>
</template>
<script setup name="ratesresult">
	import bdTollRatesApi from '@/api/rate/bdTollRatesApi'
	import { onMounted, ref } from 'vue'
	import tool from '@/utils/tool'
	const data = ref([])
	const loadData = async () => {
		data.value = await bdTollRatesApi.rateResultTable()
	}

	onMounted(() => {
		loadData()
	})

	const dictLabelToDataIndex = {
		低排量: 'Low',
		标准排量: 'Standard',
		高排量: 'High'
	}
	const createGSColumns = (energyTypes) => {
		return energyTypes.values.map((energyType) => {
			const englishLabel = dictLabelToDataIndex[energyType.dictLabel] || energyType.dictLabel
			return {
				title: energyType.dictLabel,
				align: 'center',
				dataIndex: `gs${englishLabel}FinalRate`
			}
		})
	}
	const energyTypes = tool.dictTypeAndNameList('energyType')
	const createGLColumns = (energyTypes) => {
		return energyTypes.values.map((energyType) => {
			const englishLabel = dictLabelToDataIndex[energyType.dictLabel] || energyType.dictLabel
			return {
				title: energyType.dictLabel,
				align: 'center',
				dataIndex: `gl${englishLabel}FinalRate`
			}
		})
	}
	const gsColumns = createGSColumns(energyTypes)
	const glColumns = createGLColumns(energyTypes)

	const columns = [
		{
			title: '车型分类',
			dataIndex: 'vehicleType',
			align: 'center' // 设置列内容居中
		},
		{
			title: '高速公路',
			children: gsColumns
		},
		{
			title: '普通公路',
			children: glColumns
		}
	]
</script>
