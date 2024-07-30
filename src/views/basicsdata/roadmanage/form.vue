<template>
	<xn-form-container
		:title="formData.id ? '编辑路段信息' : '增加路段信息'"
		:width="700"
		:visible="visible"
		:destroy-on-close="true"
		@close="onClose"
	>
		<a-form ref="formRef" :model="formData" :rules="formRules" layout="vertical">
			<a-row>
				<a-col :span="9">
					<a-form-item label="路段编号：" name="roadCode;">
						<a-input v-model:value="formData.roadCode" placeholder="请输入路段编号" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="4"></a-col>
				<a-col :span="9">
					<a-form-item label="路段顺序码：" name="roadsectionNumber">
						<a-input v-model:value="formData.roadsectionNumber" placeholder="请输入路段顺序码" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row>
				<a-col :span="9">
					<a-form-item label="路段编码：" name="roadsectionCode">
						<a-input v-model:value="formData.roadsectionCode" placeholder="请输入路段编码" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="4"></a-col>
				<a-col :span="9">
					<a-form-item label="路段名称：" name="name">
						<a-input v-model:value="formData.name" placeholder="请输入互通名称" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row>
				<a-col :span="9">
					<a-form-item label="业主编号：" name="accountNumber">
						<a-input v-model:value="formData.accountNumber" placeholder="请输入业主编号" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="4"></a-col>
				<a-col :span="9">
					<a-form-item label="是否收费：" name="isCharge">
						<a-select
							allowClear
							v-model:value="formData.isCharge"
							placeholder="请选择是否收费"
							:options="whetherTypeOptions"
						/>
					</a-form-item>
				</a-col>
			</a-row>
			<a-row>
				<a-col :span="9">
					<a-form-item label="收费道路类型" name="chargeType">
						<a-select
							mode="multiple"
							style="width: 180px"
							placeholder="请选择"
							v-model:value="chargeTypeNum"
							@change="handleChange"
						>
							<a-select-option v-for="item in chargeTypeOptions" :key="item.value" :value="item.value">{{
								item.label
							}}</a-select-option>
						</a-select>
					</a-form-item>
				</a-col>
				<a-col :span="4"></a-col>
				<a-col :span="9">
					<a-form-item label="长度：" name="length">
						<a-input v-model:value="formData.length" placeholder="请输入长度" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>

			<a-row>
				<a-col :span="9">
					<a-form-item label="路段性质：" name="roadsectionType">
						<a-input v-model:value="formData.roadsectionType" placeholder="请输入路段性质" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="4"></a-col>
				<a-col :span="9">
					<a-form-item label="起点交叉口编号（互通)：" name="beginCrossNumber">
						<a-input v-model:value="formData.beginCrossNumber" placeholder="请输入起点交叉口编号" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row>
				<a-col :span="9">
					<a-form-item label="终点交叉口编号（互通）：" name="endCrossNumber">
						<a-input v-model:value="formData.endCrossNumber" placeholder="请输入终点交叉口编号" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="4"></a-col>
				<a-col :span="9">
					<a-form-item label="途径区域：" name="viaArea">
						<a-input v-model:value="formData.viaArea" placeholder="请输入途径区域" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row>
				<a-col :span="9">
					<a-form-item label="起点位置地址：" name="beginAddress">
						<a-input v-model:value="formData.beginAddress" placeholder="请输入起点位置地址" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="4"></a-col>
				<a-col :span="9">
					<a-form-item label="起点位置桩号" name="beginPositionId">
						<a-input v-model:value="formData.beginPositionId" placeholder="请输入起点位置桩号" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row>
				<a-col :span="9">
					<a-form-item label="起点位置经度：" name="beginLongitude">
						<a-input v-model:value="formData.beginLongitude" placeholder="请输入起点位置经度" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="4"></a-col>
				<a-col :span="9">
					<a-form-item label="起点位置纬度" name="beginLatitude">
						<a-input v-model:value="formData.beginLatitude" placeholder="请输入起点位置纬度" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row>
				<a-col :span="9">
					<a-form-item label="终点位置地址：" name="endAddress">
						<a-input v-model:value="formData.endAddress" placeholder="请输入终点位置地址" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="4"></a-col>
				<a-col :span="9">
					<a-form-item label="终点位置桩号" name="endPositionId">
						<a-input v-model:value="formData.endPositionId" placeholder="请输入终点位置桩号" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row>
				<a-col :span="9">
					<a-form-item label="终点位置纬度：" name="endLongitude">
						<a-input v-model:value="formData.endLongitude" placeholder="请输入终点位置纬度" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="4"></a-col>
				<a-col :span="9">
					<a-form-item label="终点位置经度" name="endLatitude">
						<a-input v-model:value="formData.endLatitude" placeholder="请输入终点位置经度" allow-clear />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row>
				<a-col :span="9">
					<a-form-item label="设计速度：" name="speed">
						<a-input v-model:value="formData.speed" placeholder="请输入设计速度" allow-clear />
					</a-form-item>
				</a-col>
				<a-col :span="4"></a-col>
				<a-col :span="9">
					<a-form-item label="设计流量" name="flow">
						<a-input v-model:value="formData.flow" placeholder="请输入设计流量" allow-clear />
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
	import waySectionApi from '@/api/basicsdata/waySectionApi'
	import { ref } from 'vue'
	//下拉列表:初始化
	const chargeTypeNum = ref([])
	// 抽屉状态
	const visible = ref(false)
	const emit = defineEmits({ successful: null })
	const formRef = ref()
	// 表单数据
	const formData = ref({})
	const submitLoading = ref(false)
	const roadTypeOptions = ref([])
	//收费道路类型
	const chargeTypeOptions = tool.dictList('chargeType')
	//是否收费
	const whetherTypeOptions = tool.dictList('whetherType')
	// 打开抽屉
	const onOpen = (record) => {
		visible.value = true
		if (record) {
			let param = {
				id: record.id
			}
			waySectionApi.findWayCodeSectionSearch(Object.assign(param)).then((data) => {
				if (data) {
					let recordData = cloneDeep(data)
					formData.value = Object.assign({}, recordData)
				}
				//下拉列表:编辑时回显的选项下拉
				/*处理下拉显示回显多个选项*/
				let typeStuats = formData.value.chargeType.split(',')
				chargeTypeNum.value = typeStuats
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
		roadCode: [required('请输入路段编号')],
		name: [required('请输入路段名称')],
		roadsectionCode: [required('请输入路段编码')]
	}
	//下拉列表:下拉列表赋值
	const handleChange = (value) => {
		formData.value.chargeType = `${value}`
	}
	// 验证并提交数据
	const onSubmit = () => {
		formRef.value.validate().then(() => {
			submitLoading.value = true
			const formDataParam = cloneDeep(formData.value)
			//下拉列表:重新选择下拉列表值上传多选参数
			formData.value.chargeType = chargeTypeNum.value
			waySectionApi
				.wayCodeSectionsubmitForm(formDataParam, formDataParam.id)
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
