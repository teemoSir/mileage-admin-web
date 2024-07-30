<template>
	<xn-form-container
		:title="formData.rateId ? '编辑车辆通行费率表' : '增加车辆通行费率表'"
		:width="700"
		:visible="visible"
		:destroy-on-close="true"
		@close="onClose"
	>
		<a-form ref="formRef" :model="formData" :rules="formRules" layout="horizontal">
			<a-row :gutter="16">
				<a-col :span="12">
					<a-form-item label="费率版本ID" name="versionId">
						<a-input v-model:value="formData.versionId" placeholder="请输入费率版本ID" allow-clear default-value="1722892874504101890"/>
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="车辆类型" name="vehicleType">
						<a-select v-model:value="formData.vehicleType" placeholder="请选择车辆类型" :options="vehicleTypeOptions" />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="车型系数" name="vehicleCoefficient">
						<a-input v-model:value="formData.vehicleCoefficient" placeholder="请输入车型系数" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="道路类型" name="roadType">
						<a-select v-model:value="formData.roadType" placeholder="请选择道路类型" :options="roadTypeOptions" />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="道路类型系数" name="roadCoefficient">
						<a-input v-model:value="formData.roadCoefficient" placeholder="请输入道路类型系数" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="能源类型" name="energyType">
						<a-select v-model:value="formData.energyType" placeholder="请选择能源类型" :options="energyTypeOptions" />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="能源类型折扣" name="energyDiscount">
						<a-input v-model:value="formData.energyDiscount" placeholder="请输入能源类型折扣" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="基础费率常数(元/公里)" name="baseRate">
						<a-input v-model:value="formData.baseRate" placeholder="请输入基础费率常数(元/公里)" allow-clear />
					</a-form-item>
				</a-col>
				<!--				<a-col :span="12">
					<a-form-item label="记录创建时间：" name="createdAt">
						<a-date-picker
							v-model:value="formData.createdAt"
							value-format="YYYY-MM-DD HH:mm:ss"
							show-time
							placeholder="请选择记录创建时间"
							style="width: 100%"
						/>
					</a-form-item>
				</a-col>-->
				<!--				<a-col :span="12">
					<a-form-item label="记录更新时间：" name="updatedAt">
						<a-date-picker
							v-model:value="formData.updatedAt"
							value-format="YYYY-MM-DD HH:mm:ss"
							show-time
							placeholder="请选择记录更新时间"
							style="width: 100%"
						/>
					</a-form-item>
				</a-col>-->
				<!--				<a-col :span="12">
					<a-form-item label="最终费率结果，单位元/公里：" name="finalRate">
						<a-input v-model:value="formData.finalRate" placeholder="请输入最终费率结果，单位元/公里" allow-clear />
					</a-form-item>
				</a-col>-->
			</a-row>
		</a-form>
		<template #footer>
			<a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
			<a-button type="primary" @click="onSubmit" :loading="submitLoading">保存</a-button>
		</template>
	</xn-form-container>
</template>

<script setup name="bdTollRatesForm">
	import tool from '@/utils/tool'
	import { cloneDeep } from 'lodash-es'
	import { required } from '@/utils/formRules'
	import bdTollRatesApi from '@/api/rate/bdTollRatesApi'
	// 抽屉状态
	const visible = ref(false)
	const emit = defineEmits({ successful: null })
	const formRef = ref()
	// 表单数据
	const formData = ref({})
	const submitLoading = ref(false)
	const vehicleTypeOptions = ref([])
	const roadTypeOptions = ref([])
	const energyTypeOptions = ref([])

	// 打开抽屉
	const onOpen = (record) => {
		visible.value = true
		if (record) {
			let recordData = cloneDeep(record)
			formData.value = Object.assign({}, recordData)
		}
		vehicleTypeOptions.value = tool.dictList('vehicleType')
		roadTypeOptions.value = tool.dictList('roadType')
		energyTypeOptions.value = tool.dictList('energyType')
	}
	// 关闭抽屉
	const onClose = () => {
		formRef.value.resetFields()
		formData.value = {}
		visible.value = false
	}
	// 默认要校验的
	const formRules = {}
	// 验证并提交数据
	const onSubmit = () => {
		formRef.value.validate().then(() => {
			submitLoading.value = true
			const formDataParam = cloneDeep(formData.value)
			formDataParam.versionId='1722892874504101890'
			bdTollRatesApi
				.bdTollRatesSubmitForm(formDataParam, formDataParam.rateId)
				.then(() => {
					onClose()
					emit('successful')
				})
				.finally(() => {
					submitLoading.value = false
				})
		})
	}
	// 抛出函数
	defineExpose({
		onOpen
	})
</script>
