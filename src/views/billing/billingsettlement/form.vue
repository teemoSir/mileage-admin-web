<template>
	<xn-form-container title="账单基础信息" :width="700" :visible="visible" :destroy-on-close="true" @close="onClose">
		<a-form ref="formRef" :model="formData" :rules="formRules" layout="horizontal">
			<a-form-item label="车牌号：" name="vehiclePlate">
				<a-input v-model:value="formData.vehiclePlate" placeholder="请输入" allow-clear />
			</a-form-item>
			<a-form-item label="车牌颜色：" name="vehicleId">
				<a-input v-model:value="formData.vehiclePlateColor" placeholder="请输入车辆id" allow-clear />
			</a-form-item>
			<a-form-item label="计费里程(公里）：" name="chargeDistance">
				<a-input v-model:value="formData.chargeDistance" placeholder="请输入计费里程(公里）" allow-clear />
			</a-form-item>
			<a-form-item label="计费金额（元）：" name="chargeAmount">
				<a-input v-model:value="formData.chargeAmount" placeholder="请输入计费金额（元）" allow-clear />
			</a-form-item>
			<a-form-item label="优惠金额（元）：" name="discountAmount">
				<a-input v-model:value="formData.discountAmount" placeholder="请输入优惠金额（元）" allow-clear />
			</a-form-item>
			<a-form-item label="应收金额（元）：" name="actualAmount">
				<a-input v-model:value="formData.actualAmount" placeholder="请输入应收金额（元）" allow-clear />
			</a-form-item>
			<a-form-item label="实收金额（元）：" name="payAmount">
				<a-input v-model:value="formData.payAmount" placeholder="请输入实收金额（元）" allow-clear />
			</a-form-item>
			<a-form-item label="支付订单号：" name="payOrderId">
				<a-input v-model:value="formData.payOrderId" placeholder="请输入支付订单号" allow-clear />
			</a-form-item>
			<a-form-item label="支付状态：" name="payState">
				<a-select v-model:value="formData.payState" placeholder="请选择支付状态" :options="payStateOptions" />
			</a-form-item>
			<a-form-item label="支付时间：" name="payTime">
				<a-date-picker
					v-model:value="formData.payTime"
					value-format="YYYY-MM-DD HH:mm:ss"
					show-time
					placeholder="请选择支付时间"
					style="width: 100%"
				/>
			</a-form-item>
			<a-form-item label="账单周期类型：" name="cycleType">
				<a-select v-model:value="formData.cycleType" placeholder="请选择账单周期类型" :options="cycleTypeOptions" />
			</a-form-item>
			<a-form-item label="开始时间：" name="startTime">
				<a-date-picker
					v-model:value="formData.startTime"
					value-format="YYYY-MM-DD HH:mm:ss"
					show-time
					placeholder="请选择开始时间"
					style="width: 100%"
				/>
			</a-form-item>
			<a-form-item label="结束时间：" name="endTime">
				<a-date-picker
					v-model:value="formData.endTime"
					value-format="YYYY-MM-DD HH:mm:ss"
					show-time
					placeholder="请选择结束时间"
					style="width: 100%"
				/>
			</a-form-item>
		</a-form>
		<template #footer>
			<a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
		</template>
	</xn-form-container>
</template>

<script setup name="billingSettlementForm">
	import tool from '@/utils/tool'
	import { cloneDeep } from 'lodash-es'
	import { required } from '@/utils/formRules'
	import billingSettlementApi from '@/api/billing/billingSettlementApi'
	// 抽屉状态
	const visible = ref(false)
	const emit = defineEmits({ successful: null })
	const formRef = ref()
	// 表单数据
	const formData = ref({})
	const submitLoading = ref(false)
	const payStateOptions = ref([])
	const cycleTypeOptions = ref([])

	// 打开抽屉
	const onOpen = (record) => {
		visible.value = true
		if (record) {
			let recordData = cloneDeep(record)
			formData.value = Object.assign({}, recordData)
		}
		payStateOptions.value = tool.dictList('PAY_STATE')
		cycleTypeOptions.value = tool.dictList('BILLING_CYCLE')
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
			billingSettlementApi
				.billingSettlementSubmitForm(formDataParam, formDataParam.id)
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
