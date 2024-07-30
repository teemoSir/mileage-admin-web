<template>
	<a-form ref="formRef" :model="formData" :rules="formRules" layout="horizontal">
		<a-spin :spinning="loadSpinning">
			<a-card title="费率基础信息" :bordered="false">
				<a-row>
					<a-col :span="6" style="padding-right: 10px">
						<a-form-item label="费率名称：">
							<a-input v-model:value="formData.rateName" disabled />
						</a-form-item>
						<a-form-item label="有效时间起：">
							<a-date-picker v-model:value="formData.startDate" value-format="YYYY-MM-DD" disabled />
						</a-form-item>
						<a-form-item label="状态：">
							<a-select v-model:value="formData.status" disabled :options="statusOptions" />
						</a-form-item>
						<a-form-item label="高速基准费率（元/公里）：">
							<a-input v-model:value="formData.baseRate" disabled />
						</a-form-item>
					</a-col>
					<a-col :span="6">
						<a-form-item label="费率编号：">
							<a-input v-model:value="formData.rateCode" placeholder="费率编号自动生成" disabled="disabled" />
						</a-form-item>
						<a-form-item label="有效时间止：">
							<a-date-picker v-model:value="formData.endDate" value-format="YYYY-MM-DD" disabled />
						</a-form-item>
						<a-form-item label="超轴数额外收费系数加成：">
							<a-input v-model:value="formData.extraRate" disabled />
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
										<th rowspan="1">费率（元/公里）</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>一类客车</td>
										<td>
											<a-input disabled v-model:value="formData.feeK1" style="text-align: center" />
										</td>
										<td>
											<a-span disabled style="text-align: center">{{ formData.feeK1 * formData.baseRate }}</a-span>
										</td>
									</tr>
									<tr>
										<td>二类客车</td>
										<td>
											<a-input disabled v-model:value="formData.feeK2" style="text-align: center" />
										</td>
										<td>
											<a-span disabled style="text-align: center">{{ formData.feeK2 * formData.baseRate }}</a-span>
										</td>
									</tr>
									<tr>
										<td>三类客车</td>
										<td>
											<a-input disabled v-model:value="formData.feeK3" style="text-align: center" />
										</td>
										<td>
											<a-span disabled style="text-align: center">{{ formData.feeK3 * formData.baseRate }}</a-span>
										</td>
									</tr>
									<tr>
										<td>四类客车</td>
										<td>
											<a-input disabled v-model:value="formData.feeK4" style="text-align: center" />
										</td>
										<td>
											<a-span disabled style="text-align: center">{{ formData.feeK4 * formData.baseRate }}</a-span>
										</td>
									</tr>
									<tr>
										<td>一类货车</td>
										<td>
											<a-input disabled v-model:value="formData.feeH1" style="text-align: center" />
										</td>
										<td>
											<a-span disabled style="text-align: center">{{ formData.feeH1 * formData.baseRate }}</a-span>
										</td>
									</tr>
									<tr>
										<td>二类货车</td>
										<td>
											<a-input disabled v-model:value="formData.feeH2" style="text-align: center" />
										</td>
										<td>
											<a-span disabled style="text-align: center">{{ formData.feeH2 * formData.baseRate }}</a-span>
										</td>
									</tr>
									<tr>
										<td>三类货车</td>
										<td>
											<a-input disabled v-model:value="formData.feeH3" style="text-align: center" />
										</td>
										<td>
											<a-span disabled style="text-align: center">{{ formData.feeH3 * formData.baseRate }}</a-span>
										</td>
									</tr>
									<tr>
										<td>四类货车</td>
										<td>
											<a-input disabled v-model:value="formData.feeH4" style="text-align: center" />
										</td>
										<td>
											<a-span disabled style="text-align: center">{{ formData.feeH4 * formData.baseRate }}</a-span>
										</td>
									</tr>
									<tr>
										<td>五类货车</td>
										<td>
											<a-input disabled v-model:value="formData.feeH5" style="text-align: center" />
										</td>
										<td>
											<a-span disabled style="text-align: center">{{ formData.feeH5 * formData.baseRate }}</a-span>
										</td>
									</tr>
									<tr>
										<td>六类货车</td>
										<td>
											<a-input disabled v-model:value="formData.feeH6" style="text-align: center" />
										</td>
										<td>
											<a-span disabled style="text-align: center">{{ formData.feeH6 * formData.baseRate }}</a-span>
										</td>
									</tr>
									<tr>
										<td>一类专项作业车</td>
										<td>
											<a-input disabled v-model:value="formData.feeZ1" style="text-align: center" />
										</td>
										<td>
											<a-span disabled style="text-align: center">{{ formData.feeZ1 * formData.baseRate }}</a-span>
										</td>
									</tr>
									<tr></tr>
									<tr>
										<td>二类专项作业车</td>
										<td>
											<a-input disabled v-model:value="formData.feeZ2" style="text-align: center" />
										</td>
										<td>
											<a-span disabled style="text-align: center">{{ formData.feeZ2 * formData.baseRate }}</a-span>
										</td>
									</tr>
									<tr>
										<td>三类专项作业车</td>
										<td>
											<a-input disabled v-model:value="formData.feeZ3" style="text-align: center" />
										</td>
										<td>
											<a-span disabled style="text-align: center">{{ formData.feeZ3 * formData.baseRate }}</a-span>
										</td>
									</tr>
									<tr></tr>
									<tr>
										<td>四类专项作业车</td>
										<td>
											<a-input disabled v-model:value="formData.feeZ4" style="text-align: center" />
										</td>
										<td>
											<a-span disabled style="text-align: center">{{ formData.feeZ4 * formData.baseRate }}</a-span>
										</td>
									</tr>
									<tr></tr>
									<tr>
										<td>五类专项作业车</td>
										<td>
											<a-input disabled v-model:value="formData.feeZ5" style="text-align: center" />
										</td>
										<td>
											<a-span disabled style="text-align: center">{{ formData.feeZ5 * formData.baseRate }}</a-span>
										</td>
									</tr>
									<tr></tr>
									<tr>
										<td>六类专项作业车</td>
										<td>
											<a-input disabled v-model:value="formData.feeZ6" style="text-align: center" />
										</td>
										<td>
											<a-span disabled style="text-align: center">{{ formData.feeZ6 * formData.baseRate }}</a-span>
										</td>
									</tr>
									<tr></tr>
								</tbody>
							</table>
						</a-tab-pane>
						<!--						<a-tab-pane key="2" tab="自定义设定">-->
						<!--							<a-space style="margin-bottom: 10px">-->
						<!--								<a-button type="primary" @click="zdy()"-->
						<!--									><template #icon><plus-outlined /></template>新增</a-button-->
						<!--								>-->
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
					</a-col>
				</a-row>
			</a-card>
		</a-spin>
	</a-form>
</template>

<script setup name="rateAdd">
	import '@/assets/css/index.less'
	import tool from '@/utils/tool'
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
	const formRules = {}
	defineExpose({
		onOpen
	})
	const emit = defineEmits({ successful: null })
	const onClose = () => {
		emit('successful')
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
	.grid-content {
		min-height: 36px;
		margin-top: -11px;
		margin-bottom: 8px;
		text-align: center;
		padding: 16px 0;
	}
</style>
