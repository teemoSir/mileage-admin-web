<template>
	<xn-form-container
		:title="formData.versionId ? '编辑费率版本控制表' : '增加费率版本控制表'"
		:width="700"
		:visible="visible"
		:destroy-on-close="true"
		@close="onClose"
	>
		<a-form ref="formRef" :model="formData" :rules="formRules" layout="horizontal">
			<a-row :gutter="16">
				<a-col :span="12">
					<a-form-item label="费率版本名称：" name="versionName">
						<a-input v-model:value="formData.versionName" placeholder="请输入费率版本名称" allow-clear />
					</a-form-item>
				</a-col>
<!--				<a-col :span="12">
					<a-form-item label="生效日期：" name="effectiveDate">
						<a-date-picker
							v-model:value="formData.effectiveDate"
							value-format="YYYY-MM-DD"
							placeholder="请选择日期"
							style="width: 100%"
						/>
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="失效日期：" name="expirationDate">
						<a-date-picker
							v-model:value="formData.expirationDate"
							value-format="YYYY-MM-DD"
							placeholder="请选择日期"
							style="width: 100%"
						/>
					</a-form-item>
				</a-col>-->
				<a-col :span="12">
					<a-form-item label="版本状态：" name="status">
						<a-select v-model:value="formData.status" placeholder="请选择版本状态" :options="statusOptions" />
					</a-form-item>
				</a-col>
				<!--<a-col :span="12">
					<a-form-item label="创建时间：" name="createdAt">
						<a-date-picker
							v-model:value="formData.createdAt"
							value-format="YYYY-MM-DD HH:mm:ss"
							show-time
							placeholder="请选择创建时间"
							style="width: 100%"
						/>
					</a-form-item>
				</a-col>
				<a-col :span="12">
					<a-form-item label="更新时间：" name="updatedAt">
						<a-date-picker
							v-model:value="formData.updatedAt"
							value-format="YYYY-MM-DD HH:mm:ss"
							show-time
							placeholder="请选择更新时间"
							style="width: 100%"
						/>
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

<script setup name="bdRateVersionsForm">
	import { cloneDeep } from 'lodash-es'
	import tool from '@/utils/tool'
	import { required } from '@/utils/formRules'
	import bdRateVersionsApi from '@/api/rate/bdRateVersionsApi'
	// 抽屉状态
	const visible = ref(false)
	const emit = defineEmits({ successful: null })
	const formRef = ref()
	// 表单数据
	const formData = ref({})
	const submitLoading = ref(false)
	const statusOptions = ref([])

	// 打开抽屉
	const onOpen = (record) => {
		visible.value = true
		if (record) {
			let recordData = cloneDeep(record)
			formData.value = Object.assign({}, recordData)
		}
		statusOptions.value = tool.dictList('rateStatus')
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
			bdRateVersionsApi
				.bdRateVersionsSubmitForm(formDataParam, formDataParam.versionId)
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
