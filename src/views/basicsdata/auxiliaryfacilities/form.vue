<template>
	<xn-form-container
		:title="formData.id ? '编辑附属设施信息' : '增加附属设施信息'"
		:width="700"
		:visible="visible"
		:destroy-on-close="true"
		@close="onClose"
	>
		<a-form ref="formRef" :model="formData" :rules="formRules" layout="vertical">
			<a-row>
				<a-col :span="9">
					<a-form-item label="路段编号：" name="roadsectionId">
						<a-input v-model:value="formData.roadsectionId" placeholder="请输入路段编号" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="4"></a-col>
				<a-col :span="9">
					<a-form-item label="上下行：" name="upDown">
						<a-input v-model:value="formData.upDown" placeholder="请输入上下行" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row>
				<a-col :span="9">
					<a-form-item label="设施类型：" name="type">
						<a-select
							v-model:value="formData.type"
							placeholder="请输入设施类型"
							:options="facilityTypeOptions"
							allow-clear
						/>
					</a-form-item>
				</a-col>
				<a-col :span="4"></a-col>
				<a-col :span="9">
					<a-form-item label="所属区域：" name="viaArea">
						<a-input v-model:value="formData.viaArea" placeholder="请输入所属区域" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row>
				<a-col :span="9">
					<a-form-item label="设施名称：" name="name">
						<a-input v-model:value="formData.name" placeholder="请输入设施名称" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="4"></a-col>
				<a-col :span="9">
					<a-form-item label="设施位置经度：" name="longitude">
						<a-input v-model:value="formData.longitude" placeholder="请输入设施位置经度" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row>
				<a-col :span="9">
					<a-form-item label="设施位置纬度：" name="latitude">
						<a-input v-model:value="formData.latitude" placeholder="请输入设施位置纬度" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="4"></a-col>
				<a-col :span="9">
					<a-form-item label="设施位置桩号：" name="facilitiesId">
						<a-input v-model:value="formData.facilitiesId" placeholder="请输入设施位置桩号" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>

			<a-row>
				<a-col :span="9">
					<a-form-item label="设施服务范围：" name="serviceScope">
						<a-input v-model:value="formData.serviceScope" placeholder="请输入设施服务范围" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="4"></a-col>
				<a-col :span="9">
					<a-form-item label="有无补能设施：" name="energyReplenishment">
						<a-input v-model:value="formData.energyReplenishment" placeholder="请输入有无补能设施" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>

			<a-row>
				<a-col :span="9">
					<a-form-item label="关联补能设施编码：" name="replenishmentFid">
						<a-input v-model:value="formData.replenishmentFid" placeholder="请输入关联补能设施编码" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="4"></a-col>
				<a-col :span="9">
					<a-form-item label="业主编号：" name="ownerId">
						<a-input v-model:value="formData.ownerId" placeholder="请输入业主编号" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>

			<a-row>
				<a-col :span="9">
					<a-form-item label="起始日期：" name="beginDatetime">
						<a-date-picker v-model:value="formData.beginDatetime" value-format="YYYY-MM-DD" placeholder="年/月/日" />
					</a-form-item>
				</a-col>
				<a-col :span="4"></a-col>
				<a-col :span="9">
					<a-form-item label="终止日期：" name="endDatetime">
						<a-date-picker
							v-model:value="formData.endDatetime"
							value-format="YYYY-MM-DD"
							:allowClear="false"
							placeholder="年/月/日"
						/>
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

<script setup name="wayCodeFacilitiesbmitForm">
	import { required } from '@/utils/formRules'
	import tool from '@/utils/tool'
	import { cloneDeep } from 'lodash-es'
	import wayFacilitiesApi from '@/api/basicsdata/wayFacilitiesApi'
	// 抽屉状态
	const visible = ref(false)
	const emit = defineEmits({ successful: null })
	const formRef = ref()
	// 表单数据
	const formData = ref({})
	const submitLoading = ref(false)
	const roadTypeOptions = ref([])

	// 打开抽屉
	const onOpen = (record) => {
		visible.value = true
		if (record) {
			let param = {
				id: record.id
			}
			wayFacilitiesApi.findWayCodeHainanFacilitiesDetail(Object.assign(param)).then((data) => {
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
	//收费道路类型
	const facilityTypeOptions = tool.dictList('facilityType')
	// 默认要校验的
	const formRules = {
		roadsectionId: [required('请输入路段编码')]
	}
	// 验证并提交数据
	const onSubmit = () => {
		formRef.value.validate().then(() => {
			submitLoading.value = true
			const formDataParam = cloneDeep(formData.value)
			wayFacilitiesApi
				.wayCodeFacilitiesbmitForm(formDataParam, formDataParam.id)
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
