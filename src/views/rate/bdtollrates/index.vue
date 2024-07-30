<template>
	<a-card>
		<a-form>
			<a-row :gutter="16">
				<a-col>
					<a-form-item label="费率名称">
						<a-input :disabled="true"/>
					</a-form-item>
				</a-col>
				<a-col>
					<a-form-item label="费率编号" name="versionId">
						<a-input :disabled="true"/>
					</a-form-item>
				</a-col>
				<a-col>
					<a-form-item label="有效日期起" name="versionId">
						<a-input :disabled="true"/>
					</a-form-item>
				</a-col>
				<a-col>
					<a-form-item label="有效日期止" name="versionId">
						<a-input :disabled="true"/>
					</a-form-item>
				</a-col>
				<a-col>
					<a-form-item label="基准费率" name="versionId">
						<a-input :disabled="true"/>
					</a-form-item>
				</a-col>
				<a-col>
					<a-form-item label="超轴数额外收费系数加成" name="versionId">
						<a-input :disabled="true"/>
					</a-form-item>
				</a-col>
				<a-col>
					<a-form-item label="状态" name="versionId">
						<a-input :disabled="true"/>
					</a-form-item>
				</a-col>
			</a-row>
		</a-form>
	</a-card>
	<a-card>
		<a-table :columns="columns" :data-source="data" :pagination="false" bordered>
		</a-table>
	</a-card>
</template>
<script setup name="bdtollrates">
import {ref, onMounted} from 'vue';
import bdTollRatesApi from '@/api/rate/bdTollRatesApi'
import tool from '@/utils/tool'

// 功能：计算名称列的 rowSpan
const calculateRowSpan = (data) => {
	let lastValue = null;
	let lastRowSpanIndex = 0;

	return data.map((row, index) => {
		if (row.rateType !== lastValue) {
			lastValue = row.rateType;
			lastRowSpanIndex = index;
			row.rowSpan = 1;
		} else {
			data[lastRowSpanIndex].rowSpan += 1;
			row.rowSpan = 0;
		}
		if (row.rateType === '道路类型') {
			row.rateTypeKey = tool.dictTypeData('roadType', row.rateTypeKey)

		} else if (row.rateType === '排放水平') {
			row.rateTypeKey = tool.dictTypeData('energyType', row.rateTypeKey)
		} else if (row.rateType === '收费车型') {
			row.rateTypeKey = tool.dictTypeData('vehicleType', row.rateTypeKey)
		}
		return row;
	});
};


// 使用 calculateRowSpan 处理原始数据以计算 rowSpan
// 计算 rowSpan 时，确保数据已加载
const data = ref([]);

const loadData = async (parameter) => {
	const response = await bdTollRatesApi.bdTollRates(parameter);
	data.value = calculateRowSpan(response);
};


onMounted(() => {
	loadData();
});


const columns = [
	{
		title: '费率系数',
		dataIndex: 'rateType',
		customCell: (_, index) => {
// 使用计算后的 rowSpan
			return {rowSpan: data.value[index].rowSpan};
		},
	},
	{
		title: '系数类型',
		dataIndex: 'rateTypeKey'
	},

	{
		title: '系数值',
		dataIndex: 'rateTypeValue',
	},
];
const onOpen = (record) => {
	visible = true
	formData.value = record
}
defineExpose({
	onOpen
})
</script>
