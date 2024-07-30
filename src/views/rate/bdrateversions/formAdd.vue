<template>
	<xn-form-container
		:title="formData.versionId ? '编辑费率版本控制表' : '增加费率版本控制表'"
		:width="1000"
		:visible="visible"
		:destroy-on-close="true"
		@close="onClose"
	>
		<a-card :body-style="{ 'padding-bottom': '0px' }" class="mb-2">
			<!--			<a-col :span="7">
				<a-form-item label="费率编号" name="versionIdSelect">
					<a-select
						placeholder="请选择费率编号"
						:options="versionIdSelect"
						:allowClear=true
					/>
				</a-form-item>
			</a-col>-->
			<a-form ref="formRef" :model="formData" :rules="formRules" layout="horizontal">
				<a-row :gutter="24">
					<a-col :span="12">
						<a-form-item label="费率名称" name="rateName">
							<a-input v-model:value="formData.rateName" />
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="费率编号" name="versionId">
							<a-input :disabled="true" placeholder="自动生成" v-model:value="formData.versionId" />
						</a-form-item>
					</a-col>
					<!--					<a-col :span="12">
						<a-form-item label="有效日期起">
							<a-date-picker
								v-model:value="formData.effectiveDate"
								value-format="YYYY-MM-DD"
								placeholder="请选择日期"
								style="width: 100%"
							/>
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="有效日期止">
							<a-date-picker
								v-model:value="formData.expirationDate"
								value-format="YYYY-MM-DD"
								placeholder="请选择日期"
								style="width: 100%"
							/>
						</a-form-item>
					</a-col>-->
					<a-col :span="12">
						<a-form-item label="基准费率" name="baseRate">
							<a-input v-model:value="formData.baseRate" />
						</a-form-item>
					</a-col>
					<a-col :span="12">
						<a-form-item label="超轴数额外收费系数加成" name="extraRate">
							<a-input v-model:value="formData.extraRate" />
						</a-form-item>
					</a-col>
					<a-col :span="24">
						<a-form-item label="费率版本描述">
							<a-textarea
								v-model:value="formData.description"
								placeholder="请输入费率版本描述"
								:auto-size="{ minRows: 2, maxRows: 6 }"
								allow-clear
							/>
						</a-form-item>
					</a-col>
				</a-row>
			</a-form>
		</a-card>
		<a-card>
			<a-table :columns="columns" :data-source="tableData" :pagination="false" bordered>
				<template #bodyCell="{ column, text, record }">
					<template v-if="column.dataIndex === 'rateTypeValue'">
						<a-input
							:value="record.rateTypeValue"
							@input="(event) => handleInput(event, record)"
							@focus="() => handleFocus(record)"
							@blur="() => handleBlur(record)"
						/>
						<div role="alert" class="ant-form-item-explain-error" style="">{{ record.errorMessage }}</div>
					</template>
				</template>
			</a-table>
		</a-card>

		<template #footer>
			<a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
			<a-button type="primary" @click="onSubmit" :loading="submitLoading">保存</a-button>
		</template>
	</xn-form-container>
</template>

<script setup name="bdRateVersionsForm">
	import { cloneDeep } from 'lodash-es'
	import tool from '@/utils/tool'
	import { required, rules } from '@/utils/formRules'
	import bdTollRatesApi from '@/api/rate/bdTollRatesApi'

	// 抽屉状态
	const visible = ref(false)
	const emit = defineEmits({ successful: null })
	const formRef = ref()
	// 表单数据
	const formData = ref({})
	const submitLoading = ref(false)
	const tableData = ref([])

	const columns = [
		{
			title: '费率系数',
			dataIndex: 'rateType',
			width: 400,
			customCell: (_, index) => {
				// 使用计算后的 rowSpan
				return { rowSpan: tableData.value[index].rowSpan }
			}
		},
		{
			title: '系数类型',
			dataIndex: 'rateTypeKey',
			width: 400
		},

		{
			title: '系数值',
			dataIndex: 'rateTypeValue',
			width: 200
		}
	]

	// 在 handleInput 方法中增加更多验证逻辑
	const handleInput = (event, record) => {
		const index = tableData.value.indexOf(record)
		if (index !== -1) {
			const inputValue = event.target.value
			// 标记为已触摸
			tableData.value[index].touched = true
			// 更新输入值
			tableData.value[index].rateTypeValue = inputValue
			// 如果输入不是数字，则显示错误消息
			if (inputValue !== '' && isNaN(inputValue)) {
				tableData.value[index].isValid = false
				tableData.value[index].errorMessage = '输入必须是数字'
			} else {
				tableData.value[index].isValid = true
				tableData.value[index].errorMessage = ''
			}
		}
	}

	const handleBlur = (record) => {
		const index = tableData.value.indexOf(record)
		if (index !== -1) {
			const inputValue = tableData.value[index].rateTypeValue
			const regex = /^(?:[1-9][0-9]*\.[0-9]{1,4}$)|^(?:0?\.[0-9]{1,4}$)|(?:^[1-9][0-9]*$)|^0$/
			// 检查输入是否为空
			if (tableData.value[index].hasFocused && (inputValue === '' || inputValue === null)) {
				tableData.value[index].isValid = false
				tableData.value[index].errorMessage = '请填写对应系数值'
			} else if (!regex.test(inputValue)) {
				// 保留非数字的错误信息
				tableData.value[index].isValid = false
				tableData.value[index].errorMessage = '输入必须是正数，且小数点后最多四位'
			} else {
				// 输入有效
				tableData.value[index].isValid = true
				tableData.value[index].errorMessage = ''
			}
		}
	}

	const handleFocus = (record) => {
		const index = tableData.value.indexOf(record)
		if (index !== -1) {
			tableData.value[index].hasFocused = true
		}
	}

	// 打开抽屉
	const onOpen = (record) => {
		visible.value = true
		if (record) {
			let recordData = cloneDeep(record)
			formData.value = Object.assign({}, recordData)
		}
		const roadTypes = tool.dictTypeAndNameList('roadType')
		roadTypes.values = roadTypes.values.filter((item) => item.dictLabel !== '非收费公路')
		const energyTypes = tool.dictTypeAndNameList('energyType')
		const vehicleTypes = tool.dictTypeAndNameList('vehicleType')
		const mergedData = mergeDictData(roadTypes, energyTypes, vehicleTypes)
		tableData.value = calculateRowSpan(mergedData).map((item) => {
			return {
				...item,
				hasFocused: false, // // 初始化时设置为未聚焦
				rateTypeValue: ref(item.rateTypeValue), // 确保 rateTypeValue 是响应式的
				isValid: true, // 添加一个字段来表示验证状态
				errorMessage: '' // 存储错误信息
			}
		})
	}
	// 关闭抽屉
	const onClose = () => {
		formRef.value.resetFields()
		formData.value = {}
		visible.value = false
	}
	// 默认要校验的
	const formRules = {
		rateName: [required('请填写费率名称')],
		baseRate: [required('请填写基准费率'), rules.rate],
		extraRate: [required('请填写超轴数额外收费系数加成'), rules.rate]
	}
	// 验证并提交数据
	const onSubmit = () => {
		formRef.value.validate().then(() => {
			// 检查 tableData 中每个条目的完整性和有效性
			let isCompleteAndValid = tableData.value.every(
				(item) => item.rateTypeValue !== null && item.rateTypeValue !== '' && item.isValid
			)
			if (!isCompleteAndValid) {
				// 如果存在未完成或无效的输入，显示错误提示并阻止提交
				alert('请确保所有费率系数值都已正确填写且有效！')
				return
			}
			submitLoading.value = true
			// 初始化组装后的数据对象
			let assembledData = {
				rateName: formData.value.rateName,
				baseRate: Math.round(formData.value.baseRate * 1000) / 10000,
				extraRate: formData.value.extraRate,
				effectiveDate: formData.value.effectiveDate,
				expirationDate: formData.value.expirationDate,
				description: formData.value.description,
				vehicleType: [],
				roadType: [],
				energyType: []
			}
			tableData.value.forEach((item) => {
				if (item.rateTypeValue !== null && item.rateTypeValue !== '') {
					// 转换 typeKey 为整数
					let typeKey = parseInt(item.originalRateTypeKey, 10)
					// 转换 typeValue 为浮点数，并处理 NaN 的情况
					let typeValue = parseFloat(item.rateTypeValue)
					if (isNaN(typeValue)) {
						typeValue = 0.0 // 或其他合适的默认值
					}
					let typeEntry = {
						typeKey: typeKey, // 使用原始数字值
						typeValue: typeValue
					}
					switch (item.rateType) {
						case '道路类型':
							assembledData.roadType.push(typeEntry)
							break
						case '排放水平':
							assembledData.energyType.push(typeEntry)
							break
						case '收费车型':
							assembledData.vehicleType.push(typeEntry)
							break
					}
				}
			})
			bdTollRatesApi
				.addBatchRatesDetail(assembledData)
				.then(() => {
					onClose()
					emit('successful')
				})
				.finally(() => {
					submitLoading.value = false
				})
		})
	}

	const mergeDictData = (roadTypes, energyTypes, vehicleTypes) => {
		const createMergedArray = (dictData) => {
			return dictData.values.map((item) => ({
				rateType: dictData.name,
				rateTypeKey: item.dictValue,
				rateTypeValue: null,
				isValid: true, // 添加一个字段来表示验证状态
				errorMessage: '' // 存储错误信息
			}))
		}

		return [...createMergedArray(roadTypes), ...createMergedArray(energyTypes), ...createMergedArray(vehicleTypes)]
	}

	// 功能：计算名称列的 rowSpan
	const calculateRowSpan = (tableData) => {
		let lastValue = null
		let lastRowSpanIndex = 0

		return tableData.map((row, index) => {
			// 保存原始的 rateTypeKey 数字值
			row.originalRateTypeKey = row.rateTypeKey

			if (row.rateType === '道路类型') {
				row.rateTypeKey = tool.dictTypeData('roadType', row.rateTypeKey)
			} else if (row.rateType === '排放水平') {
				row.rateTypeKey = tool.dictTypeData('energyType', row.rateTypeKey)
			} else if (row.rateType === '收费车型') {
				row.rateTypeKey = tool.dictTypeData('vehicleType', row.rateTypeKey)
			}

			if (row.rateType !== lastValue) {
				lastValue = row.rateType
				lastRowSpanIndex = index
				row.rowSpan = 1
			} else {
				tableData[lastRowSpanIndex].rowSpan += 1
				row.rowSpan = 0
			}
			return row
		})
	}
	// 抛出函数
	defineExpose({
		onOpen
	})
</script>
