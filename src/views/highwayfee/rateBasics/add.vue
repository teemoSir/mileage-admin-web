<template>
	<a-form
		ref="formRef"
		:model="formData"
		:rules="formRules"
		layout="horizontal"
		:label-col="{ span: 10 }"
		:wrapper-col="{ span: 10 }"
	>
		<a-input name="" v-model:value="formData.id" v-show="false" />
		<a-spin :spinning="loadSpinning">
			<a-card title="费率基础信息" :bordered="false">
				<a-row>
					<a-col :span="8" style="padding-right: 10px">
						<a-form-item name="rateName" label="费率名称：">
							<a-input name="" v-model:value="formData.rateName" placeholder="请输入费率名称" />
						</a-form-item>
						<a-form-item name="startDate" label="有效时间起：">
							<a-date-picker
								v-model:value="formData.startDate"
								value-format="YYYY-MM-DD"
								:allowClear="false"
								placeholder="请选择有效时间起"
							/>
						</a-form-item>
						<!--						<a-form-item name="status" label="状态：">-->
						<!--							<a-select v-model:value="formData.status" placeholder="请选择状态" :options="statusOptions" />-->
						<!--						</a-form-item>-->
						<a-form-item name="baseRate" label="高速计费基准费率（元/公里）：">
							<a-input name="" v-model:value="formData.baseRate" placeholder="请输入高速计费基准费率" allow-clear />
						</a-form-item>
					</a-col>
					<a-col :span="8">
						<a-form-item label="费率编号：">
							<a-input
								v-model:value="formData.rateCode"
								placeholder="费率编号自动生成"
								disabled="disabled"
								allow-clear
							/>
						</a-form-item>
						<a-form-item name="endDate" label="有效时间止：">
							<a-date-picker
								v-model:value="formData.endDate"
								value-format="YYYY-MM-DD"
								:allowClear="false"
								placeholder="请选择有效时间止"
							/>
						</a-form-item>
						<a-form-item name="extraRate" label="超轴收费系数加成：">
							<a-input v-model:value="formData.extraRate" placeholder="请输入超轴收费系数加成" allow-clear />
						</a-form-item>
					</a-col>
				</a-row>

				<div>
					<a-tabs default-active-key="1">
						<a-tab-pane key="1" tab="通用设定">
							<table id="table_report">
								<thead>
									<tr>
										<th rowspan="1">计费车型</th>
										<th rowspan="1">车型系数</th>
										<th rowspan="1">费额（元/公里）</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>一类客车</td>
										<td>
											<a-form-item name="feeK1">
												<a-input placeholder="请输入车型系数" v-model:value="formData.feeK1" style="text-align: center"
											/></a-form-item>
										</td>
										<td>
											<a-span disabled style="text-align: center">{{
												isNaN(formData.feeK1 * formData.baseRate)
													? 0
													: Math.round(formData.feeK1 * formData.baseRate * 1000) / 1000
											}}</a-span>
										</td>
									</tr>
									<tr>
										<td>二类客车</td>
										<td>
											<a-form-item name="feeK2">
												<a-input placeholder="请输入车型系数" v-model:value="formData.feeK2" style="text-align: center"
											/></a-form-item>
										</td>
										<td>
											<a-span disabled style="text-align: center">{{
												isNaN(formData.feeK2 * formData.baseRate)
													? 0
													: Math.round(formData.feeK2 * formData.baseRate * 1000) / 1000
											}}</a-span>
										</td>
									</tr>
									<tr>
										<td>三类客车</td>
										<td>
											<a-form-item name="feeK3">
												<a-input placeholder="请输入车型系数" v-model:value="formData.feeK3" style="text-align: center"
											/></a-form-item>
										</td>
										<td>
											<a-span value="" disabled style="text-align: center">{{
												isNaN(formData.feeK3 * formData.baseRate)
													? 0
													: Math.round(formData.feeK3 * formData.baseRate * 1000) / 1000
											}}</a-span>
										</td>
									</tr>
									<tr>
										<td>四类客车</td>
										<td>
											<a-form-item name="feeK4">
												<a-input placeholder="请输入车型系数" v-model:value="formData.feeK4" style="text-align: center"
											/></a-form-item>
										</td>
										<td>
											<a-span value="" disabled style="text-align: center">{{
												isNaN(formData.feeK4 * formData.baseRate)
													? 0
													: Math.round(formData.feeK4 * formData.baseRate * 1000) / 1000
											}}</a-span>
										</td>
									</tr>
									<tr>
										<td>一类货车</td>
										<td>
											<a-form-item name="feeH1">
												<a-input placeholder="请输入车型系数" v-model:value="formData.feeH1" style="text-align: center"
											/></a-form-item>
										</td>
										<td>
											<a-span value="" disabled style="text-align: center">{{
												isNaN(formData.feeH1 * formData.baseRate)
													? 0
													: Math.round(formData.feeH1 * formData.baseRate * 1000) / 1000
											}}</a-span>
										</td>
									</tr>
									<tr>
										<td>二类货车</td>
										<td>
											<a-form-item name="feeH2">
												<a-input placeholder="请输入车型系数" v-model:value="formData.feeH2" style="text-align: center"
											/></a-form-item>
										</td>
										<td>
											<a-span value="" disabled style="text-align: center">{{
												isNaN(formData.feeH2 * formData.baseRate)
													? 0
													: Math.round(formData.feeH2 * formData.baseRate * 1000) / 1000
											}}</a-span>
										</td>
									</tr>
									<tr>
										<td>三类货车</td>
										<td>
											<a-form-item name="feeH3">
												<a-input placeholder="请输入车型系数" v-model:value="formData.feeH3" style="text-align: center"
											/></a-form-item>
										</td>
										<td>
											<a-span value="" disabled style="text-align: center">{{
												isNaN(formData.feeH3 * formData.baseRate)
													? 0
													: Math.round(formData.feeH3 * formData.baseRate * 1000) / 1000
											}}</a-span>
										</td>
									</tr>
									<tr>
										<td>四类货车</td>
										<td>
											<a-form-item name="feeH4">
												<a-input placeholder="请输入车型系数" v-model:value="formData.feeH4" style="text-align: center"
											/></a-form-item>
										</td>
										<td>
											<a-span value="" disabled style="text-align: center">{{
												isNaN(formData.feeH4 * formData.baseRate)
													? 0
													: Math.round(formData.feeH4 * formData.baseRate * 1000) / 1000
											}}</a-span>
										</td>
									</tr>
									<tr>
										<td>五类货车</td>
										<td>
											<a-form-item name="feeH5">
												<a-input placeholder="请输入车型系数" v-model:value="formData.feeH5" style="text-align: center"
											/></a-form-item>
										</td>
										<td>
											<a-span value="" disabled style="text-align: center">{{
												isNaN(formData.feeH5 * formData.baseRate)
													? 0
													: Math.round(formData.feeH5 * formData.baseRate * 1000) / 1000
											}}</a-span>
										</td>
									</tr>
									<tr>
										<td>六类货车</td>
										<td>
											<a-form-item name="feeH6">
												<a-input placeholder="请输入车型系数" v-model:value="formData.feeH6" style="text-align: center"
											/></a-form-item>
										</td>
										<td>
											<a-span value="" disabled style="text-align: center">{{
												isNaN(formData.feeH6 * formData.baseRate)
													? 0
													: Math.round(formData.feeH6 * formData.baseRate * 1000) / 1000
											}}</a-span>
										</td>
									</tr>
									<tr>
										<td>一类专项作业车</td>
										<td>
											<a-form-item name="feeZ1">
												<a-input placeholder="请输入车型系数" v-model:value="formData.feeZ1" style="text-align: center"
											/></a-form-item>
										</td>
										<td>
											<a-span value="" disabled style="text-align: center">{{
												isNaN(formData.feeZ1 * formData.baseRate)
													? 0
													: Math.round(formData.feeZ1 * formData.baseRate * 1000) / 1000
											}}</a-span>
										</td>
									</tr>
									<tr></tr>
									<tr>
										<td>二类专项作业车</td>
										<td>
											<a-form-item name="feeZ2">
												<a-input placeholder="请输入车型系数" v-model:value="formData.feeZ2" style="text-align: center"
											/></a-form-item>
										</td>
										<td>
											<a-span value="" disabled style="text-align: center">{{
												isNaN(formData.feeZ2 * formData.baseRate)
													? 0
													: Math.round(formData.feeZ2 * formData.baseRate * 1000) / 1000
											}}</a-span>
										</td>
									</tr>
									<tr>
										<td>三类专项作业车</td>
										<td>
											<a-form-item name="feeZ3">
												<a-input placeholder="请输入车型系数" v-model:value="formData.feeZ3" style="text-align: center"
											/></a-form-item>
										</td>
										<td>
											<a-span value="" disabled style="text-align: center">{{
												isNaN(formData.feeZ3 * formData.baseRate)
													? 0
													: Math.round(formData.feeZ3 * formData.baseRate * 1000) / 1000
											}}</a-span>
										</td>
									</tr>
									<tr></tr>
									<tr>
										<td>四类专项作业车</td>
										<td>
											<a-form-item name="feeZ4">
												<a-input placeholder="请输入车型系数" v-model:value="formData.feeZ4" style="text-align: center"
											/></a-form-item>
										</td>
										<td>
											<a-span value="" disabled style="text-align: center">{{
												isNaN(formData.feeZ4 * formData.baseRate)
													? 0
													: Math.round(formData.feeZ4 * formData.baseRate * 1000) / 1000
											}}</a-span>
										</td>
									</tr>
									<tr></tr>
									<tr>
										<td>五类专项作业车</td>
										<td>
											<a-form-item name="feeZ5">
												<a-input placeholder="请输入车型系数" v-model:value="formData.feeZ5" style="text-align: center"
											/></a-form-item>
										</td>
										<td>
											<a-span value="" disabled style="text-align: center">{{
												isNaN(formData.feeZ5 * formData.baseRate)
													? 0
													: Math.round(formData.feeZ5 * formData.baseRate * 1000) / 1000
											}}</a-span>
										</td>
									</tr>
									<tr></tr>
									<tr>
										<td>六类专项作业车</td>
										<td>
											<a-form-item name="feeZ6">
												<a-input placeholder="请输入车型系数" v-model:value="formData.feeZ6" style="text-align: center"
											/></a-form-item>
										</td>
										<td>
											<a-span value="" disabled style="text-align: center">{{
												isNaN(formData.feeZ6 * formData.baseRate)
													? 0
													: Math.round(formData.feeZ6 * formData.baseRate * 1000) / 1000
											}}</a-span>
										</td>
									</tr>
									<tr></tr>
								</tbody>
							</table>
						</a-tab-pane>
						<!--						<a-tab-pane key="2" tab="自定义设定">-->
						<!--							<a-space style="margin-bottom: 10px">-->
						<!--								&lt;!&ndash;								<a-button type="primary" @click="zdy()"&ndash;&gt;-->
						<!--								&lt;!&ndash;									><template #icon><plus-outlined /></template>新增</a-button&ndash;&gt;-->
						<!--								&lt;!&ndash;								>&ndash;&gt;-->
						<!--							</a-space>-->
						<!--							<table id="table_report">-->
						<!--								<thead>-->
						<!--									<tr>-->
						<!--										<th rowspan="1" width="100">序号</th>-->
						<!--										<th rowspan="1" width="280">说明</th>-->
						<!--										<th rowspan="1" width="80">操作</th>-->
						<!--									</tr>-->
						<!--								</thead>-->
						<!--								<tbody>-->
						<!--									<tr>-->
						<!--										<td>1</td>-->
						<!--										<td><span>xxxxxxxxxxxx</span></td>-->
						<!--										<td><span>查看</span></td>-->
						<!--									</tr>-->
						<!--									<tr>-->
						<!--										<td>2</td>-->
						<!--										<td></td>-->
						<!--										<td></td>-->
						<!--									</tr>-->
						<!--									<tr>-->
						<!--										<td>3</td>-->
						<!--										<td></td>-->
						<!--										<td></td>-->
						<!--									</tr>-->
						<!--								</tbody>-->
						<!--							</table>-->
						<!--						</a-tab-pane>-->
					</a-tabs>
				</div>
				<a-row>
					<a-col :span="16"></a-col>
					<a-col :span="8" style="text-align: right">
						<a-button style="margin-right: 8px" type="primary" @click="onClose">关闭</a-button>
						<a-button style="margin-right: 8px" type="primary" @click="onSubmit" :loading="submitLoading"
							>保存</a-button
						>
					</a-col>
				</a-row>
			</a-card>
		</a-spin>
	</a-form>
</template>

<script setup name="rateAdd">
	import '@/assets/css/index.less'
	import tool from '@/utils/tool'
	import { required, rules } from '@/utils/formRules'
	import highwayfee from '@/api/highwayfee/highwayfeeRateBasics'
	import { cloneDeep } from 'lodash-es'
	let formData = ref({})
	const submitLoading = ref(false)
	const loadSpinning = ref(false)
	const visible = ref(false)
	const formRef = ref()
	let statusOptions = ref([])
	const onOpen = (record) => {
		statusOptions.value = tool.dictList('IS_CONFIG')
		visible.value = true
		if (record) {
			let param = {
				id: record.id
			}
			highwayfee.detail(Object.assign(param)).then((data) => {
				let recordData = cloneDeep(data)
				formData.value = Object.assign({}, recordData)
				formData.value.baseRate = Math.round(formData.value.baseRate * 1000) / 100
				const rateCoefficients = formData.value.rateCoefficients
				if (rateCoefficients) {
					for (var i = 0; i < rateCoefficients.length; i++) {
						const rc = rateCoefficients[0]
						if (rc && rc.coefficientType === 1) {
							formData.value.feeK1 = rc.feeK1
							formData.value.feeK2 = rc.feeK2
							formData.value.feeK3 = rc.feeK3
							formData.value.feeK4 = rc.feeK4
							formData.value.feeH1 = rc.feeH1
							formData.value.feeH2 = rc.feeH2
							formData.value.feeH3 = rc.feeH3
							formData.value.feeH4 = rc.feeH4
							formData.value.feeH5 = rc.feeH5
							formData.value.feeH6 = rc.feeH6
							formData.value.feeZ1 = rc.feeZ1
							formData.value.feeZ2 = rc.feeZ2
							formData.value.feeZ3 = rc.feeZ3
							formData.value.feeZ4 = rc.feeZ4
							formData.value.feeZ5 = rc.feeZ5
							formData.value.feeZ6 = rc.feeZ6
						}
					}
				}
			})
		} else {
			formData.value = ref({})
		}
	}
	defineExpose({
		onOpen
	})
	const emit = defineEmits({ successful: null })
	const onClose = () => {
		formRef.value.resetFields()
		emit('successful')
	}
	const formRules = {
		rateName: [required('请填写费率名称')],
		startDate: [required('请填写费率名称')],
		endDate: [required('请填写费率名称')],
		baseRate: [required('请填写基准费率'), rules.rate],
		extraRate: [required('请填写超轴数额外收费系数加成'), rules.rate],
		feeK1: [required('请填写车型系数'), rules.rate],
		feeK2: [required('请填写车型系数'), rules.rate],
		feeK3: [required('请填写车型系数'), rules.rate],
		feeK4: [required('请填写车型系数'), rules.rate],
		feeH1: [required('请填写车型系数'), rules.rate],
		feeH2: [required('请填写车型系数'), rules.rate],
		feeH3: [required('请填写车型系数'), rules.rate],
		feeH4: [required('请填写车型系数'), rules.rate],
		feeH5: [required('请填写车型系数'), rules.rate],
		feeH6: [required('请填写车型系数'), rules.rate],
		feeZ1: [required('请填写车型系数'), rules.rate],
		feeZ2: [required('请填写车型系数'), rules.rate],
		feeZ3: [required('请填写车型系数'), rules.rate],
		feeZ4: [required('请填写车型系数'), rules.rate],
		feeZ5: [required('请填写车型系数'), rules.rate],
		feeZ6: [required('请填写车型系数'), rules.rate]
	}
	const onSubmit = () => {
		formRef.value.validate().then(() => {
			submitLoading.value = true
			const formDataParam = cloneDeep(formData.value)
			highwayfee
				.addRate(formDataParam, formData.value.id)
				.then(() => {
					onClose()
					emit('successful')
				})
				.finally(() => {
					submitLoading.value = false
					document.getElementById('feereset').click()
				})
		})
	}
</script>
<style scoped>
	table {
		table-layout: fixed;
		word-break: break-all;
		position: sticky;
		border-collapse: collapse;
	}

	table tr,
	td {
		border: 1px solid;
		line-height: 30px;
		padding: 5px;
		text-align: center;
	}
	table th {
		border: 1px solid;
		text-align: center;
		box-sizing: border-box;
	}

	/deep/ .ant-col-10 {
		max-width: 100%;
	}
</style>
