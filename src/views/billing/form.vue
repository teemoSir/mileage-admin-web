<template>
	<xn-form-container
		:title="formData.pkid ? '编辑账单周期配置' : '增加账单周期配置'"
		:width="700"
		:visible="visible"
		:destroy-on-close="true"
		@close="onClose"
	>
		<a-form ref="formRef" :model="formData" :rules="formRules" layout="horizontal">
			<span class="top-date-check">
				<span v-if="formData.cycleType == 1">每天</span>
				<span v-if="formData.cycleType == 2"
					>每
					<a-select v-model:value="formData.execRuleWeek" :options="weekConfigOptions">
						<a-select-option value="1"> 周一 </a-select-option>
						<a-select-option value="2"> 周二 </a-select-option>
						<a-select-option value="3"> 周三 </a-select-option>
						<a-select-option value="4"> 周四 </a-select-option>
						<a-select-option value="5"> 周五 </a-select-option>
						<a-select-option value="6"> 周六 </a-select-option>
						<a-select-option value="7"> 周日 </a-select-option>
					</a-select>
				</span>
				<span v-if="formData.cycleType == 3"
					>每月
					<a-select v-model:value="formData.execRuleMon" :options="weekConfigOptions">
						<a-select-option value="1"> 01 </a-select-option>
						<a-select-option value="2"> 02 </a-select-option>
						<a-select-option value="3"> 03 </a-select-option>
						<a-select-option value="4"> 04 </a-select-option>
						<a-select-option value="5"> 05 </a-select-option>
						<a-select-option value="6"> 06 </a-select-option>
						<a-select-option value="7"> 07 </a-select-option>
						<a-select-option value="8"> 08 </a-select-option>
						<a-select-option value="9"> 09</a-select-option>
						<a-select-option value="10"> 10 </a-select-option>
						<a-select-option value="11"> 11 </a-select-option>
						<a-select-option value="12"> 12 </a-select-option>
						<a-select-option value="13"> 13 </a-select-option>
						<a-select-option value="14"> 14 </a-select-option>
						<a-select-option value="15"> 15 </a-select-option>
						<a-select-option value="16"> 16 </a-select-option>
						<a-select-option value="17"> 17 </a-select-option>
						<a-select-option value="18"> 18 </a-select-option>
						<a-select-option value="19"> 19</a-select-option>
						<a-select-option value="20"> 20</a-select-option>
						<a-select-option value="21"> 21 </a-select-option>
						<a-select-option value="22"> 22 </a-select-option>
						<a-select-option value="23"> 23 </a-select-option>
						<a-select-option value="24"> 24 </a-select-option>
						<a-select-option value="25"> 25 </a-select-option>
						<a-select-option value="26"> 26 </a-select-option>
						<a-select-option value="27"> 27 </a-select-option>
						<a-select-option value="28"> 28 </a-select-option>
						<a-select-option value="29"> 29</a-select-option>
						<a-select-option value="30"> 30</a-select-option>
						<a-select-option value="31"> 31</a-select-option> </a-select
					>日，
				</span>
				<a-select v-model:value="formData.execRuleDay" :options="execRuleConfigOptions">
					<a-select-option value="00"> 00 </a-select-option>
					<a-select-option value="01"> 01 </a-select-option>
					<a-select-option value="02"> 02 </a-select-option>
					<a-select-option value="03"> 03 </a-select-option>
					<a-select-option value="04"> 04 </a-select-option>
					<a-select-option value="05"> 05 </a-select-option>
					<a-select-option value="06"> 06 </a-select-option>
					<a-select-option value="07"> 07 </a-select-option>
					<a-select-option value="08"> 08 </a-select-option>
					<a-select-option value="09"> 09 </a-select-option>
					<a-select-option value="10"> 10 </a-select-option>
					<a-select-option value="11"> 11 </a-select-option>
					<a-select-option value="12"> 12 </a-select-option>
					<a-select-option value="13"> 13 </a-select-option>
					<a-select-option value="14"> 14 </a-select-option>
					<a-select-option value="15"> 15 </a-select-option>
					<a-select-option value="16"> 16 </a-select-option>
					<a-select-option value="17"> 17 </a-select-option>
					<a-select-option value="18"> 18 </a-select-option>
					<a-select-option value="19"> 19 </a-select-option>
					<a-select-option value="20"> 20 </a-select-option>
					<a-select-option value="21"> 21 </a-select-option>
					<a-select-option value="22"> 22 </a-select-option>
					<a-select-option value="23"> 23 </a-select-option>
				</a-select>
				<span style="margin-left: 8px">点执行一次</span>
			</span>
			<a-form-item label="是否默认配置" name="defaultConfig">
				<a-select v-model:value="formData.defaultConfig" :options="defaultConfigOptions">
					<a-select-option value="1"> 是 </a-select-option>
					<a-select-option value="2"> 否 </a-select-option>
				</a-select>
			</a-form-item>
			<a-form-item label="是否用户可配置" name="userConfig">
				<a-select v-model:value="formData.userConfig" :options="userConfigOptions">
					<a-select-option value="1"> 是 </a-select-option>
					<a-select-option value="2"> 否 </a-select-option>
				</a-select>
			</a-form-item>
			<a-form-item label="执行规则说明：" name="execRuleExplain">
				<a-input v-model:value="formData.execRuleExplain" placeholder="请输入执行规则说明" allow-clear />
			</a-form-item>
		</a-form>
		<template #footer>
			<a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
			<a-button type="primary" @click="onSubmit" :loading="submitLoading">保存</a-button>
		</template>
	</xn-form-container>
</template>

<script setup name="billingCycleConfigForm">
	import tool from '@/utils/tool'
	import { cloneDeep } from 'lodash-es'
	import { required } from '@/utils/formRules'
	import billingCycleConfigApi from '@/api/billing/billingCycleConfigApi'
	// 抽屉状态
	const visible = ref(false)
	const emit = defineEmits({ successful: null })
	const formRef = ref()
	// 表单数据
	const formData = ref({})
	const submitLoading = ref(false)

	// 打开抽屉
	const onOpen = (record) => {
		visible.value = true
		if (record) {
			let recordData = cloneDeep(record)
			formData.value = Object.assign({}, recordData)
			if (formData.value.cycleType == 2) {
				formData.value.execRuleWeek = formData.value.execRule.split('_')[0]
				formData.value.execRuleDay = formData.value.execRule.split('_')[1]
			}
			if (formData.value.cycleType == 1) {
				formData.value.execRuleDay = formData.value.execRule
			}
			if (formData.value.cycleType == 3) {
				formData.value.execRuleMon = formData.value.execRule.split('_')[0]
				formData.value.execRuleDay = formData.value.execRule.split('_')[1]
			}
			if (formData.value.userConfig == 1) {
				formData.value.userConfig = '是'
			} else {
				formData.value.userConfig = '否'
			}
			if (formData.value.defaultConfig == 1) {
				formData.value.defaultConfig = '是'
			} else {
				formData.value.defaultConfig = '否'
			}
		}
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
			if (formData.value.cycleType == 1) {
				formData.value.execRule = formData.value.execRuleDay
			}
			if (formData.value.cycleType == 2) {
				formData.value.execRule = formData.value.execRuleWeek + '_' + formData.value.execRuleDay
			}
			if (formData.value.cycleType == 3) {
				formData.value.execRule = formData.value.execRuleMon + '_' + formData.value.execRuleDay
			}
			const formDataParam = cloneDeep(formData.value)
			if (formData.value.defaultConfig == '是') {
				formDataParam.defaultConfig = 1
			} else if (formData.value.defaultConfig == '否') {
				formDataParam.defaultConfig = 2
			}
			if (formData.value.userConfig == '是') {
				formDataParam.userConfig = 1
			} else if (formData.value.userConfig == '否') {
				formDataParam.userConfig = 2
			}
			billingCycleConfigApi
				.billingCycleConfigSubmitForm(formDataParam, formDataParam.pkid)
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

<style lang="less" scoped>
	.top-date-check {
		display: flex;
		align-items: last baseline;
		> span {
			margin-right: 8px;
		}
		margin-bottom: 30px;
	}
</style>
