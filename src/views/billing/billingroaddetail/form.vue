<template>
	<xn-form-container
		:title="formData.id ? '编辑道路计费明细表' : '增加道路计费明细表'"
		:width="700"
		:visible="visible"
		:destroy-on-close="true"
		@close="onClose"
	>
		<a-form ref="formRef" :model="formData" :rules="formRules" layout="horizontal">
			<a-form-item label="计费明细编码：" name="id">
				<a-input v-model:value="formData.id" />
			</a-form-item>
			<a-form-item label="通行记录编号：" name="trafficId">
				<a-input v-model:value="formData.trafficId" />
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
			<a-form-item label="道路编码：" name="roadCode">
				<a-input v-model:value="formData.roadCode" placeholder="请输入道路编码" allow-clear />
			</a-form-item>
			<a-form-item label="路段编码：" name="sectionCode">
				<a-input v-model:value="formData.sectionCode" placeholder="请输入路段编码" allow-clear />
			</a-form-item>
			<a-form-item label="收费道路类型：" name="roadType">
				<a-input v-model:value="formData.roadType" placeholder="请输入收费道路类型" allow-clear />
			</a-form-item>
			<a-form-item label="是否收费：" name="chargeType">
				<a-input v-model:value="formData.chargeType" placeholder="请输入是否收费" allow-clear />
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
			<a-form-item label="计费依据" name="feeBasis">
				<a-input v-model:value="formData.feeBasis" placeholder="请输入计费依据，1轨迹，2视频，3轨迹+视频" allow-clear />
			</a-form-item>
			<a-form-item label="起点" name="startAddress">
				<a-input v-model:value="formData.startAddress" />
			</a-form-item>
			<a-form-item label="终点" name="endAddress">
				<a-input v-model:value="formData.endAddress" />
			</a-form-item>
			<a-form-item label="费率编码" name="rateCode">
				<a-input v-model:value="formData.rateCode" />
			</a-form-item>
			<a-form-item label="计费费率（元/公里）" name="rateValue">
				<a-input v-model:value="formData.rateValue" />
			</a-form-item>
			<a-form-item label="优惠编码" name="discountCode">
				<a-input v-model:value="formData.discountCode" />
			</a-form-item>
			<a-form-item label="优惠类型" name="discountType">
				<a-input v-model:value="formData.discountType" />
			</a-form-item>
			<a-form-item label="起点时间：" name="startTime">
				<a-date-picker
					v-model:value="formData.startTime"
					value-format="YYYY-MM-DD HH:mm:ss"
					show-time
					placeholder="请选择起点时间"
					style="width: 100%"
				/>
			</a-form-item>
			<a-form-item label="终点时间：" name="endTime">
				<a-date-picker
					v-model:value="formData.endTime"
					value-format="YYYY-MM-DD HH:mm:ss"
					show-time
					placeholder="请选择终点时间"
					style="width: 100%"
				/>
			</a-form-item>
			<a-form-item label="创建时间：" name="createTime">
				<a-date-picker
					v-model:value="formData.createTime"
					value-format="YYYY-MM-DD HH:mm:ss"
					show-time
					placeholder="请选择终点时间"
					style="width: 100%"
				/>
			</a-form-item>
		</a-form>
		<template #footer>
			<a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
			<a-button type="primary" @click="onSubmit" :loading="submitLoading">保存</a-button>
		</template>
	</xn-form-container>
</template>

<script setup name="bdBillingRoadDetailForm">
	import { cloneDeep } from 'lodash-es'
	import { required } from '@/utils/formRules'
	import bdBillingRoadDetailApi from '@/api/billing/bdBillingRoadDetailApi'
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
			id: record.id
		}
		bdBillingRoadDetailApi.bdBillingRoadDetailDetail(Object.assign(param)).then((data) => {
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
			bdBillingRoadDetailApi
				.bdBillingRoadDetailSubmitForm(formDataParam, formDataParam.id)
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
