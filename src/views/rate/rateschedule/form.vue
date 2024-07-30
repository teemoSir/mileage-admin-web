<template>
	<xn-form-container
		:title="formData.id ? '编辑费率定时启动任务配置' : '增加费率定时启动任务配置'"
		:width="1000"
		:visible="visible"
		:destroy-on-close="true"
		@close="onClose"
	>
		<a-form ref="formRef" :model="formData" :rules="formRules" layout="vertical">
			<a-form-item label="费率版本ID：" name="versionId">
				<a-select
					v-model:value="formData.versionId"
					placeholder="请选择费率版本"
					:options="versionIdOptions"
					:field-names="{ label: 'versionName', value: 'versionId' }"
					allow-clear
				/>
			</a-form-item>
			<a-form-item label="任务名称：" name="taskName">
				<a-input v-model:value="formData.taskName" placeholder="请输入任务名称" allow-clear />
			</a-form-item>
			<a-form-item label="定时执行时间：" name="executeTime">
				<a-date-picker
					v-model:value="formData.executeTime"
					value-format="YYYY-MM-DD HH:mm:ss"
					show-time
					placeholder="请选择执行时间"
					style="width: 100%"
				/>
			</a-form-item>
			<a-form-item label="运行状态：" name="status" v-show="statusShow">
				<a-select v-model:value="formData.status" placeholder="请选择运行状态" :options="statusOptions" />
			</a-form-item>

			<a-form-item label="描述：" name="description">
				<a-input v-model:value="formData.description" placeholder="请输入描述" allow-clear />
			</a-form-item>
		</a-form>
		<template #footer>
			<a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
			<a-button type="primary" @click="onSubmit" :loading="submitLoading">保存</a-button>
		</template>
	</xn-form-container>
</template>

<script setup name="bdRateScheduleConfigForm">
	import tool from '@/utils/tool'
	import { cloneDeep } from 'lodash-es'
	import bdRateScheduleConfigApi from '@/api/rate/bdRateScheduleConfigApi'
	import bdRateVersionsApi from '@/api/rate/bdRateVersionsApi'
	// 抽屉状态
	const visible = ref(false)
	const emit = defineEmits({ successful: null })
	const formRef = ref()
	// 表单数据
	const formData = ref({})
	const submitLoading = ref(false)
	const statusOptions = ref([])
	const versionIdOptions = ref([])
	const statusShow = ref(true)

	// 打开抽屉
	const onOpen = (record) => {
		visible.value = true
		if (record) {
			statusShow.value = true
			let recordData = cloneDeep(record)
			formData.value = Object.assign({}, recordData)
		} else {
			statusShow.value = false
		}
		bdRateVersionsApi.getBdRateVersionIds().then((res) => {
			versionIdOptions.value = res
		})
		statusOptions.value = tool.dictList('JOB_STATUS')
	}
	// 关闭抽屉
	const onClose = () => {
		formRef.value.resetFields()
		formData.value = {}
		visible.value = false
	}
	// 默认要校验的
	const formRules = {
		versionId: [
			{
				required: true,
				message: '请选择费率版本',
				trigger: 'change'
			}
		],
		taskName: [
			{
				required: true,
				message: '请输入任务名称',
				trigger: 'change'
			}
		],
		executeTime: [
			{
				required: true,
				message: '请选择执行时间',
				trigger: 'change'
			}
		]
	}
	// 验证并提交数据
	const onSubmit = () => {
		formRef.value.validate().then(() => {
			submitLoading.value = true
			const formDataParam = cloneDeep(formData.value)
			bdRateScheduleConfigApi
				.bdRateScheduleConfigSubmitForm(formDataParam, formDataParam.id)
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
