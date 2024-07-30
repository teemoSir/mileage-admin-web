<template>
	<xn-form-container :title="'详情'" :width="700" :visible="visible" :destroy-on-close="true" @close="onClose">
		<a-form ref="formRef" :model="formData" :rules="formRules" layout="horizontal">
			<a-form-item label="通行记录编号：" name="traRecId">
				<a-input v-model:value="formData.traRecId" />
			</a-form-item>
			<a-form-item label="车牌号：" name="vehiclePlate">
				<a-input v-model:value="formData.vehiclePlate" />
			</a-form-item>
			<a-form-item label="车牌颜色：" name="vehiclePlateColor">
				<a-input v-model:value="formData.vehiclePlateColor" />
			</a-form-item>
			<a-form-item label="车型：" name="vehicleType">
				<a-input v-model:value="formData.vehicleType" />
			</a-form-item>
			<a-form-item label="车种：" name="vehicleClass">
				<a-input v-model:value="formData.vehicleClass" />
			</a-form-item>
			<a-form-item label="终端报文ID：" name="terminalMessageId">
				<a-input v-model:value="formData.terminalMessageId" />
			</a-form-item>
			<a-form-item label="计费里程(公里）：" name="chargeDistance">
				<a-input v-model:value="formData.chargeDistance" />
			</a-form-item>
			<a-form-item label="计费金额（元）：" name="chargeAmount">
				<a-input v-model:value="formData.chargeAmount" />
			</a-form-item>
			<a-form-item label="优惠金额（元）：" name="discountAmount">
				<a-input v-model:value="formData.discountAmount" />
			</a-form-item>
			<a-form-item label="应收金额（元）：" name="actualAmount">
				<a-input v-model:value="formData.actualAmount" />
			</a-form-item>
			<a-form-item label="本年里程累计（公里）：" name="yearMileage">
				<a-input v-model:value="formData.yearMileage" />
			</a-form-item>
			<a-form-item label="起点时间：" name="startTime">
				<a-date-picker
					v-model:value="formData.startTime"
					value-format="YYYY-MM-DD HH:mm:ss"
					show-time
					style="width: 100%"
				/>
			</a-form-item>
			<a-form-item label="终点时间：" name="endTime">
				<a-date-picker
					v-model:value="formData.endTime"
					value-format="YYYY-MM-DD HH:mm:ss"
					show-time
					style="width: 100%"
				/>
			</a-form-item>
			<a-form-item label="创建时间：" name="createTime">
				<a-date-picker
					v-model:value="formData.createTime"
					value-format="YYYY-MM-DD HH:mm:ss"
					show-time
					style="width: 100%"
				/>
			</a-form-item>
		</a-form>
		<template #footer>
			<a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
		</template>
	</xn-form-container>
</template>

<script setup name="bdBillingTrafficRecordForm">
	import { cloneDeep } from 'lodash-es'
	import { required } from '@/utils/formRules'
	import bdBillingTrafficRecordApi from '@/api/billing/bdBillingTrafficRecordApi'
	// 抽屉状态
	const visible = ref(false)
	const emit = defineEmits({ successful: null })
	const formRef = ref()
	// 表单数据
	const formData = ref({})
	const submitLoading = ref(false)

	// 打开抽屉
	const onOpen = (record) => {
		let param = {
			id: record.traRecId
		}
		bdBillingTrafficRecordApi.bdBillingTrafficRecordDetail(Object.assign(param)).then((data) => {
			visible.value = true
			if (data) {
				let recordData = cloneDeep(data)
				formData.value = Object.assign({}, recordData)
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
	const formRules = {}
	// 验证并提交数据
	const onSubmit = () => {
		formRef.value.validate().then(() => {
			submitLoading.value = true
			const formDataParam = cloneDeep(formData.value)
			bdBillingTrafficRecordApi
				.bdBillingTrafficRecordSubmitForm(formDataParam, formDataParam.id)
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
