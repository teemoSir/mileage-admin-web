<template>
	<xn-form-container :width="1000" :visible="visible" :destroy-on-close="true" @close="onClose">
		<a-card :body-style="{ 'padding-bottom': '0px' }" class="mb-2">
			<a-form>
				<a-row :gutter="24">
					<a-col :span="12">
						<a-form-item label="费率名称">
							<a-input :disabled="true" v-model:value="formData.versionName" />
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="费率编号">
							<a-input :disabled="true" v-model:value="formData.versionId" />
						</a-form-item>
					</a-col>
					<!--					<a-col :span="12">
						<a-form-item label="有效日期起">
							<a-input :disabled="true" v-model:value="formData.effectiveDate"/>
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="有效日期止">
							<a-input :disabled="true" v-model:value="formData.expirationDate"/>
						</a-form-item>
					</a-col>-->
					<a-col :span="6">
						<a-form-item label="基准费率">
							<a-input :disabled="true" v-model:value="formData.baseRate" />
						</a-form-item>
					</a-col>
					<a-col :span="8">
						<a-form-item label="超轴数额外收费系数加成">
							<a-input :disabled="true" v-model:value="formData.extraRate" />
						</a-form-item>
					</a-col>
					<a-col :span="6">
						<a-form-item label="状态">
							<a-select :disabled="true" v-model:value="formData.status" :options="statusOptions" />
						</a-form-item>
					</a-col>
					<a-col :span="24">
						<a-form-item label="费率版本描述">
							<a-textarea
								v-model:value="formData.description"
								placeholder="请输入费率版本描述"
								:auto-size="{ minRows: 2, maxRows: 6 }"
								allow-clear
								:disabled="true"
							/>
						</a-form-item>
					</a-col>
				</a-row>
			</a-form>
		</a-card>
		<a-card>
			<a-table :columns="columns" :data-source="data" :pagination="false" bordered> </a-table>
		</a-card>
	</xn-form-container>
</template>
<script setup name="bdtollrates">
	import { ref, onMounted } from 'vue'
	import bdTollRatesApi from '@/api/rate/bdTollRatesApi'
	import tool from '@/utils/tool'
	import { cloneDeep } from 'lodash-es'
	import userApi from '@/api/sys/userApi'

	const formData = ref({})
	const visible = ref(false)
	const statusOptions = ref([])

	// 功能：计算名称列的 rowSpan
	const calculateRowSpan = (data) => {
		let lastValue = null
		let lastRowSpanIndex = 0

		return data.map((row, index) => {
			if (row.rateType !== lastValue) {
				lastValue = row.rateType
				lastRowSpanIndex = index
				row.rowSpan = 1
			} else {
				data[lastRowSpanIndex].rowSpan += 1
				row.rowSpan = 0
			}
			if (row.rateType === '道路类型') {
				row.rateTypeKey = tool.dictTypeData('roadType', row.rateTypeKey)
			} else if (row.rateType === '排放水平') {
				row.rateTypeKey = tool.dictTypeData('energyType', row.rateTypeKey)
			} else if (row.rateType === '收费车型') {
				row.rateTypeKey = tool.dictTypeData('vehicleType', row.rateTypeKey)
			}
			return row
		})
	}

	// 使用 calculateRowSpan 处理原始数据以计算 rowSpan
	// 计算 rowSpan 时，确保数据已加载
	const data = ref([])
	const versionId = ref('')
	const loadData = async () => {
		const param = {
			versionId: versionId.value
		}
		const response = await bdTollRatesApi.bdTollRates(param)
		data.value = calculateRowSpan(response)
	}

	const columns = [
		{
			title: '费率系数',
			dataIndex: 'rateType',
			customCell: (_, index) => {
				// 使用计算后的 rowSpan
				return { rowSpan: data.value[index].rowSpan }
			}
		},
		{
			title: '系数类型',
			dataIndex: 'rateTypeKey'
		},

		{
			title: '系数值',
			dataIndex: 'rateTypeValue'
		}
	]
	const onOpen = (record) => {
		visible.value = true
		if (record) {
			let recordData = cloneDeep(record)
			formData.value = Object.assign({}, recordData)
			formData.value.baseRate = Math.round(formData.value.baseRate * 10000) / 1000
			versionId.value = record.versionId
			loadData()
		}
		statusOptions.value = tool.dictList('rateStatus')
	}
	defineExpose({
		onOpen
	})
	// 关闭抽屉
	const onClose = () => {
		visible.value = false
	}
</script>
