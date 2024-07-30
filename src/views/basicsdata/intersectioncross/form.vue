<template>
	<xn-form-container
		:title="formData.id ? '编辑交叉口信息' : '增加交叉口信息'"
		:width="700"
		:visible="visible"
		:destroy-on-close="true"
		@close="onClose"
	>
		<a-form ref="formRef" :model="formData" :rules="formRules" layout="vertical">
			<a-row>
				<a-col :span="9">
					<a-form-item label="路段编号：" name="roadsectionCode">
						<a-input v-model:value="formData.roadsectionCode" placeholder="请输入路段编号" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="4"></a-col>
				<a-col :span="9">
					<a-form-item label="互通顺序号：" name="intersectionNumber">
						<a-input v-model:value="formData.intersectionNumber" placeholder="请输入互通顺序号" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row>
				<a-col :span="9">
					<a-form-item label="完整编码：" name="code">
						<a-input v-model:value="formData.code" placeholder="请输入完整编码" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="4"></a-col>
				<a-col :span="9">
					<a-form-item label="互通名称：" name="name">
						<a-input v-model:value="formData.name" placeholder="请输入互通名称" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row>
				<a-col :span="9">
					<a-form-item label="所属区域：" name="viaArea">
						<a-input v-model:value="formData.viaArea" placeholder="请输入所属区域" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="4"></a-col>
				<a-col :span="9">
					<a-form-item label="交叉口类型：" name="type">
						<a-select
							v-model:value="formData.type"
							placeholder="请输入交叉口类型"
							:options="crossTypeOptions"
							allow-clear
						/>
					</a-form-item>
				</a-col>
			</a-row>
			<a-row>
				<a-col :span="9">
					<a-form-item label="互通中心纬度：" name="latitude">
						<a-input v-model:value="formData.latitude" placeholder="请输入互通中心纬度" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="4"></a-col>
				<a-col :span="9">
					<a-form-item label="互通中心经度：" name="longitude">
						<a-input v-model:value="formData.longitude" placeholder="请输入互通中心经度" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>

			<a-row>
				<a-col :span="9">
					<a-form-item label="中心位置桩号：" name="positionId">
						<a-input v-model:value="formData.positionId" placeholder="请输入中心位置桩号" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="4"></a-col>
				<a-col :span="9">
					<a-form-item label="上行距离：" name="upLength">
						<a-input v-model:value="formData.upLength" placeholder="请输入上行距离" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>

			<a-row>
				<a-col :span="9">
					<a-form-item label="下行距离：" name="downLength">
						<a-input v-model:value="formData.downLength" placeholder="请输入下行距离" allow-clear />
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

<script setup name="wayCodeCrosssubmitForm">
	import { required } from '@/utils/formRules'
	import tool from '@/utils/tool'
	import { cloneDeep } from 'lodash-es'
	import wayCrossApi from '@/api/basicsdata/wayCrossApi'
	// 抽屉状态
	const visible = ref(false)
	const emit = defineEmits({ successful: null })
	const formRef = ref()
	// 表单数据
	const formData = ref({})
	const submitLoading = ref(false)
	const roadTypeOptions = ref([])
	//道路交叉类型
	const crossTypeOptions = tool.dictList('crossType')
	// 打开抽屉
	const onOpen = (record) => {
		visible.value = true
		if (record) {
			let param = {
				id: record.id
			}
			wayCrossApi.findWayCodeCrossDetail(Object.assign(param)).then((data) => {
				if (data) {
					let recordData = cloneDeep(data)
					formData.value = Object.assign({}, recordData)
				}
				roadTypeOptions.value = tool.dictList('roadType')
			})
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
		roadsectionCode: [required('请输入路段编号')],
		code: [required('请输入完整编码')],
		type: [required('请选择交叉类型')]
	}
	// 验证并提交数据
	const onSubmit = () => {
		formRef.value.validate().then(() => {
			submitLoading.value = true
			const formDataParam = cloneDeep(formData.value)
			wayCrossApi
				.wayCodeCrosssubmitForm(formDataParam, formDataParam.id)
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
