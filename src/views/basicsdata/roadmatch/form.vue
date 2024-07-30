<template>
	<xn-form-container
		:title="formData.id ? '编辑道路基础信息' : '增加道路基础信息'"
		:width="700"
		:visible="visible"
		:destroy-on-close="true"
		@close="onClose"
	>
		<a-form ref="formRef" :model="formData" :rules="formRules" layout="vertical">
			<a-row>
				<a-col :span="9">
					<a-form-item label="道路编码：" name="wayCode">
						<a-input v-model:value="formData.wayCode" placeholder="请输入道路编码" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="4"></a-col>
				<a-col :span="9">
					<a-form-item label="道路名称：" name="wayName">
						<a-input v-model:value="formData.wayName" placeholder="请输入道路名称" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row>
				<a-col :span="9">
					<a-form-item label="收费道路类型：" name="wayRoadType">
						<a-select
							v-model:value="formData.wayRoadType"
							placeholder="收费道路类型"
							:options="roadTypeOptions"
							allow-clear
						/>
					</a-form-item>
				</a-col>
				<a-col :span="4"></a-col>
				<a-col :span="9">
					<a-form-item label="长度（公里）：" name="wayLength">
						<a-input v-model:value="formData.wayLength" placeholder="请输入长度（公里）" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row>
				<a-col :span="9">
					<a-form-item label="技术等级：" name="wayLevel">
						<a-select
							v-model:value="formData.wayLevel"
							:options="wayLevelOptions"
							placeholder="请输入技术等级"
							allow-clear
						/>
					</a-form-item>
				</a-col>
				<a-col :span="4"></a-col>
				<a-col :span="9">
					<a-form-item label="道路起点：" name="beginAddress">
						<a-input v-model:value="formData.beginAddress" placeholder="请输入道路起点" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row>
				<a-col :span="9">
					<a-form-item label="道路终点：" name="endAddress">
						<a-input v-model:value="formData.endAddress" placeholder="请输入道路终点" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="4"></a-col>
				<a-col :span="9">
					<a-form-item label="起点桩号：" name="beginId">
						<a-input v-model:value="formData.beginId" placeholder="请输入起点桩号" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>

			<a-row>
				<a-col :span="9">
					<a-form-item label="道路起点经纬度：" name="beginLatitude">
						<a-input v-model:value="formData.beginLatitude" placeholder="请输入道路起点经纬度" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="4"></a-col>
				<a-col :span="9">
					<a-form-item label="道路终点经纬度：" name="beginLongitude">
						<a-input v-model:value="formData.beginLongitude" placeholder="请输入道路终点经纬度" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>
		</a-form>
		<template #footer>
			<a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
			<a-button type="primary" @click="onSubmit" :loading="submitLoading">保存</a-button>
		</template>
	</xn-form-container>
</template>

<script setup name="wayCodeHainanSubmitForm">
	import { required } from '@/utils/formRules'
	import tool from '@/utils/tool'
	import { cloneDeep } from 'lodash-es'
	import wayCodeApi from '@/api/basicsdata/wayCodeApi'
	// 抽屉状态
	const visible = ref(false)
	const emit = defineEmits({ successful: null })
	const formRef = ref()
	// 表单数据
	const formData = ref({})
	const submitLoading = ref(false)
	//收费道路类型
	const roadTypeOptions = tool.dictList('roadType')
	//行政等级
	const wayAdminiHierarchyOptions = tool.dictList('adminiHierarchy')
	//技术等级
	const wayLevelOptions = tool.dictList('WAY_LEVEL')

	// 打开抽屉
	const onOpen = (record) => {
		visible.value = true
		if (record) {
			let recordData = cloneDeep(record)
			formData.value = Object.assign({}, recordData)
		}
	}
	// 关闭抽屉
	const onClose = () => {
		formRef.value.resetFields()
		formData.value = {}
		visible.value = false
	}
	// 默认要校验的
	const formRules = {
		wayCode: [required('请输入道路编码')],
		wayName: [required('请输入道路名称')]
	}
	// 验证并提交数据
	const onSubmit = () => {
		formRef.value.validate().then(() => {
			submitLoading.value = true
			const formDataParam = cloneDeep(formData.value)
			wayCodeApi
				.wayCodeHainanSubmitForm(formDataParam, formDataParam.id)
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
