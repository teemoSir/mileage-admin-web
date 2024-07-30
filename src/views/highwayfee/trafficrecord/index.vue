<template>
	<a-card :bordered="false" v-show="isShowTable">
		<a-form ref="searchFormRef" name="advanced_search" :model="searchFormState" class="ant-advanced-search-form">
			<a-row :gutter="24">
				<a-col :span="6">
					<a-form-item label="通行时间：">
						<a-date-picker
							v-model:value="searchFormState.startTime"
							value-format="YYYY-MM-DD HH:mm:ss"
							show-time
							placeholder="请选择起点时间"
							style="width: 50%"
						/>
						<a-date-picker
							v-model:value="searchFormState.endTime"
							value-format="YYYY-MM-DD HH:mm:ss"
							show-time
							placeholder="请选择终点时间"
							style="width: 50%"
						/>
					</a-form-item>
				</a-col>
				<a-col :span="6">
					<a-form-item label="创建时间：">
						<a-date-picker
							v-model:value="searchFormState.createTimeStart"
							value-format="YYYY-MM-DD HH:mm:ss"
							show-time
							:allowClear="false"
							placeholder="请选择起点时间"
							style="width: 50%"
						/>
						<a-date-picker
							v-model:value="searchFormState.createTimeEnd"
							value-format="YYYY-MM-DD HH:mm:ss"
							show-time
							:allowClear="false"
							placeholder="请选择终点时间"
							style="width: 50%"
						/>
					</a-form-item>
				</a-col>
				<a-col :span="4">
					<a-form-item label="通行记录编号" name="id">
						<a-input v-model:value="searchFormState.id" placeholder="请输入通行记录编号" />
					</a-form-item>
				</a-col>
				<a-col :span="4">
					<a-form-item label="账单编号" name="settlementId">
						<a-input v-model:value="searchFormState.settlementId" placeholder="账单编号" />
					</a-form-item>
				</a-col>
				<a-col :span="4">
					<a-form-item label="车牌号码" name="vehiclePlate">
						<a-input v-model:value="searchFormState.vehiclePlate" placeholder="请输入车牌号码" />
					</a-form-item>
				</a-col>

				<a-col :span="4">
					<a-form-item label="车牌颜色" name="vehiclePlateColor">
						<a-select
							v-model:value="searchFormState.vehiclePlateColor"
							placeholder="请选择车牌颜色"
							:options="etcVehicleColorOptions"
						/>
					</a-form-item>
				</a-col>

				<a-col :span="4">
					<a-form-item label="计费车型" name="vehicleType">
						<a-select
							v-model:value="searchFormState.vehicleType"
							placeholder="请选择计费车型"
							:options="vehicleTypeOptions"
						/>
					</a-form-item>
				</a-col>

				<a-col :span="4">
					<a-button type="primary" @click="table.refresh(true)">查询</a-button>
					<a-button style="margin: 0 8px" @click="reset">重置</a-button>
				</a-col>
			</a-row>
		</a-form>
		<s-table ref="table" :columns="columns" :data="loadData" bordered :row-key="(record) => record.id">
			<template #bodyCell="{ column, record }">
				<template v-if="column.dataIndex === 'vehiclePlateColor'">
					<a-space v-if="null != record.vehiclePlateColor">
						{{ $TOOL.dictTypeData('etcVehicleColor', record.vehiclePlateColor.toString()) }}
					</a-space>
				</template>
				<template v-if="column.dataIndex === 'vehicleType'">
					<a-space v-if="null != record.vehicleType">
						{{ $TOOL.dictTypeData('vehicleType', record.vehicleType.toString()) }}
					</a-space>
				</template>
				<template v-if="column.dataIndex === 'vehiclePlate'">
					<span :class="'big-plateColor-text big-plateColor-' + record.vehiclePlateColor">{{
						record.vehiclePlate
					}}</span>
				</template>
				<template v-if="column.dataIndex === 'chargeDistance'">
					<a-space>
						{{ $TOOL.changgeKilometers(record.chargeDistance) }}
					</a-space>
				</template>
				<template v-if="column.dataIndex === 'chargeAmount'">
					<a-space>
						{{ $TOOL.changeMoney(record.chargeAmount) }}
					</a-space>
				</template>
				<template v-if="column.dataIndex === 'actualAmount'">
					<a-space>
						{{ $TOOL.changeMoney(record.actualAmount) }}
					</a-space>
				</template>
				<template v-if="column.dataIndex === 'yearMileage'">
					<a-space>
						{{ $TOOL.changgeKilometers(record.yearMileage) }}
					</a-space>
				</template>
				<template v-if="column.dataIndex === 'action'">
					<a-space>
						<a @click="showTrafficDetail(record)">详情</a>
					</a-space>
				</template>
			</template>
		</s-table>
	</a-card>
	<a-modal
		v-model:visible="detailDialogVisible"
		:closable="false"
		:footer="null"
		width="80%"
		centered
		@ok="detailDialogVisible = false"
	>
		<TrafficDetail :record="currentRecord" v-show="false" ref="trafficDetailRef" @successful="onClose"></TrafficDetail>
	</a-modal>
</template>

<script setup name="trafficrecord">
	import '@/assets/css/index.less'
	import tool from '@/utils/tool'
	import highwayfeeTrafficRecordApi from '@/api/highwayfee/highwayfeeTrafficRecordApi'
	import TrafficDetail from './trafficDetail.vue'
	let searchFormState = reactive({})
	let currentRecord = reactive({})
	const searchFormRef = ref()
	const detailDialogVisible = ref(false)
	const table = ref()
	const columns = [
		{
			title: '通行记录编号',
			dataIndex: 'traRecId',
			ellipsis: true,
			width: '170px'
		},
		{
			title: '账单编号',
			dataIndex: 'settlementId',
			width: '170px'
		},
		{
			title: '车牌号',
			dataIndex: 'vehiclePlate',
			width: '120px'
		},
		// {
		// 	title: '车牌颜色',
		// 	dataIndex: 'vehiclePlateColor'
		// },
		{
			title: '计费车型',
			dataIndex: 'vehicleType'
		},
		{
			title: '计费里程(公里）',
			dataIndex: 'chargeDistance',
			width: '80px'
		},
		{
			title: '计费金额（元）',
			dataIndex: 'chargeAmount',
			width: '80px'
		},
		{
			title: '优惠金额（元）',
			dataIndex: 'discountAmount',
			width: '80px'
		},
		{
			title: '应收金额（元）',
			dataIndex: 'actualAmount',
			width: '80px'
		},
		{
			title: '本年里程累计（公里）',
			dataIndex: 'yearMileage',
			width: '80px'
		},
		{
			title: '起点时间',
			dataIndex: 'startTime',
			ellipsis: true
		},
		{
			title: '终点时间',
			dataIndex: 'endTime',
			ellipsis: true
		},
		{
			title: '创建时间',
			dataIndex: 'createTime',
			ellipsis: true
		}
	]

	// 操作栏通过权限判断是否显示
	//if (hasPerm(['bdBillingTrafficRecordEdit', 'bdBillingTrafficRecordDelete'])) {
	columns.push({
		title: '操作',
		dataIndex: 'action',
		align: 'center',
		width: '70px'
	})

	//}
	const selectedRowKeys = ref([])
	// 列表选择配置
	const options = {
		// columns数字类型字段加入 needTotal: true 可以勾选自动算账
		alert: {
			show: true,
			clear: () => {
				selectedRowKeys.value = ref([])
			}
		},
		rowSelection: {
			onChange: (selectedRowKey, selectedRows) => {
				selectedRowKeys.value = selectedRowKey
			}
		}
	}
	const loadData = (parameter) => {
		const searchFormParam = JSON.parse(JSON.stringify(searchFormState))
		return highwayfeeTrafficRecordApi.trafficRecordPage(Object.assign(parameter, searchFormParam)).then((data) => {
			return data
		})
	}
	// 重置
	const reset = () => {
		searchFormRef.value.resetFields()
		table.value.refresh(true)
	}

	const timestampToStartTime = (timestamp) => {
		var date = new Date(timestamp * 1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var Y = date.getFullYear() + '-'
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
		var day = date.getDate()
		var D = (day < 10 ? '0' + day : day) + ' '
		// var h = (date.getHours() < 10 ? '0'+date.getHours():date.getHours())+ ':';
		// var m = (date.getMinutes() < 10 ? '0'+date.getMinutes():date.getMinutes()) + ':';
		// var s = date.getSeconds() < 10 ? '0'+date.getSeconds():date.getSeconds();
		return Y + M + D + '00:00:00'
	}
	const timestampToEndTime = (timestamp) => {
		var date = new Date(timestamp * 1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var Y = date.getFullYear() + '-'
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
		var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
		return Y + M + D + '23:59:59'
	}

	const timestamp = new Date().getTime() / 1000
	searchFormState.startTime = timestampToStartTime(timestamp)
	searchFormState.endTime = timestampToEndTime(timestamp)

	searchFormState.createTimeStart = timestampToStartTime(timestamp)
	searchFormState.createTimeEnd = timestampToEndTime(timestamp)

	//车辆颜色
	const etcVehicleColorOptions = tool.dictList('etcVehicleColor')
	//车辆类型
	const vehicleTypeOptions = tool.dictList('vehicleType')
	const trafficDetailRef = ref()
	const isShowTable = ref(true)
	const showTrafficDetail = (record) => {
		currentRecord.value = record
		detailDialogVisible.value = true
		setTimeout(() => {
			trafficDetailRef.value.onOpen()
		}, 100)

		// isShowTable.value = false
	}

	const onClose = () => {
		detailDialogVisible.value = false
		// isShowTable.value = true
	}
</script>

<style lang="less" scoped>
	.ant-advanced-search-form {
		display: flex;
		flex-wrap: wrap;
		.item {
			margin-left: 10px;
		}
	}
</style>
