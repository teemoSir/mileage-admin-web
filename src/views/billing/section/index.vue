<template>
	<a-card :bordered="false" v-show="ishowTable">
		<a-form ref="searchFormRef" name="advanced_search" :model="searchFormState" class="ant-advanced-search-form">
			<a-row :gutter="24">
				<a-col :span="6">
					<a-form-item label="通行时间：">
						<a-date-picker
							v-model:value="searchFormState.startTime"
							value-format="YYYY-MM-DD HH:mm:ss"
							show-time
							:allowClear="false"
							placeholder="请选择起点时间"
							style="width: 50%"
						/>
						<a-date-picker
							v-model:value="searchFormState.endTime"
							value-format="YYYY-MM-DD HH:mm:ss"
							show-time
							:allowClear="false"
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
				<a-col :span="3">
					<a-form-item label="道路编码" name="roadCode">
						<a-input v-model:value="searchFormState.roadCode" placeholder="请输入道路编码" />
					</a-form-item>
				</a-col>
				<a-col :span="3">
					<a-form-item label="是否收费" name="chargeType">
						<a-select
							allowClear
							v-model:value="searchFormState.chargeType"
							placeholder="请选择是否收费"
							:options="chargeTypes"
						/>
					</a-form-item>
				</a-col>
				<a-col :span="5">
					<a-form-item label="通行记录编号" name="trafficId">
						<a-input v-model:value="searchFormState.trafficId" placeholder="请输入通行记录编码" />
					</a-form-item>
				</a-col>
			</a-row>
			<a-row :gutter="24">
				<a-col :span="5">
					<a-form-item label="车牌号码" name="vehiclePlate">
						<a-input v-model:value="searchFormState.vehiclePlate" placeholder="请输入车牌号码" />
					</a-form-item>
				</a-col>
				<a-col :span="5">
					<a-form-item label="车牌颜色" name="vehiclePlateColor">
						<a-select
							allowClear
							v-model:value="searchFormState.vehiclePlateColor"
							placeholder="请选择车牌颜色"
							:options="etcVehicleColorOptions"
						/>
					</a-form-item>
				</a-col>
				<a-col :span="5">
					<a-form-item label="计费车型" name="vehicleType">
						<a-select
							allowClear
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
		<s-table
			ref="table"
			:columns="columns"
			:data="loadData"
			bordered
			:row-key="(record) => record.id"
			:tool-config="toolConfig"
		>
			<template #bodyCell="{ column, record }">
				<template v-if="column.dataIndex === 'vehiclePlateColor'">
					<div v-for="etcVehicleColor in etcVehicleColorOptions" :key="etcVehicleColor.value">
						<span v-if="etcVehicleColor.value == record.vehiclePlateColor">{{ etcVehicleColor.label }}</span>
					</div>
				</template>
				<template v-if="column.dataIndex === 'vehicleType'">
					<div v-for="vehicleType in vehicleTypeOptions" :key="vehicleType.value">
						<span v-if="vehicleType.value == record.vehicleType">{{ vehicleType.label }}</span>
					</div>
				</template>
				<template v-if="column.dataIndex === 'roadCode'">
					<span v-if="record.roadCode != null && 'null' != record.roadCode && '' != record.roadCode">{{
						record.roadCode
					}}</span>
					<span v-if="record.roadname != null && 'null' != record.roadname && '' != record.roadname"
						>【{{ record.roadname }}】</span
					>
				</template>
				<template v-if="column.dataIndex === 'chargeType'">
					<div v-if="record.chargeType == 1">是</div>
					<div v-else>否</div>
				</template>
				<template v-if="column.dataIndex === 'roadType'">
					<div v-for="roadType in roadTypeOptions" :key="roadType.value">
						<span v-if="roadType.value == record.roadType">{{ roadType.label }}</span>
					</div>
				</template>
				<template v-if="column.dataIndex === 'feeBasis'">
					<div v-if="record.feeBasis == 1">轨迹</div>
					<div v-else-if="record.feeBasis == 2">视频</div>
					<div v-else-if="record.feeBasis == 3">轨迹+视频</div>
					<div v-else>其他</div>
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
				<template v-if="column.dataIndex === 'discountAmount'">
					<a-space>
						{{ $TOOL.changeMoney(record.discountAmount) }}
					</a-space>
				</template>
				<template v-if="column.dataIndex === 'yearMileage'">
					<a-space>
						{{ $TOOL.changgeKilometers(record.yearMileage) }}
					</a-space>
				</template>
				<template v-if="column.dataIndex === 'rateValue'">
					<a-space>
						{{ $TOOL.changeRate(record.rateValue) }}
					</a-space>
				</template>
				<template v-if="column.dataIndex === 'action'">
					<a-space>
						<a @click="showDetail(record)">详情</a>
					</a-space>
				</template>
				<template v-if="column.dataIndex === 'vehiclePlate'">
					<span :class="'big-plateColor-text big-plateColor-' + record.vehiclePlateColor">{{
						record.vehiclePlate
					}}</span>
				</template>
			</template>
		</s-table>
	</a-card>
	<RoadDetail v-show="!ishowTable" ref="formRef" @successful="onClose"></RoadDetail>
</template>

<script setup name="billingroadsection">
	import '@/assets/css/index.less'
	import RoadDetail from './roadDetail.vue'
	import bdBillingRoadSectionApi from '@/api/billing/bdBillingRoadSectionApi'
	let searchFormState = reactive({})
	import tool from '@/utils/tool'
	const searchFormRef = ref()
	const table = ref()
	const formRef = ref()
	const toolConfig = { refresh: true, height: true, columnSetting: false, striped: false }
	const columns = [
		{
			title: '道路计费明细编号',
			dataIndex: 'id'
		},
		{
			title: '通行记录编号',
			dataIndex: 'trafficId'
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
			title: '道路编码【名称】',
			dataIndex: 'roadCode'
		},
		{
			title: '路段编码',
			dataIndex: 'sectionCode'
		},
		{
			title: '收费道路类型',
			dataIndex: 'roadType'
		},
		{
			title: '是否收费',
			dataIndex: 'chargeType'
		},
		{
			title: '计费里程(公里)',
			dataIndex: 'chargeDistance'
		},
		{
			title: '计费费率（元/公里）',
			dataIndex: 'rateValue'
		},
		{
			title: '计费金额(元)',
			dataIndex: 'chargeAmount'
		},
		{
			title: '优惠金额(元)',
			dataIndex: 'discountAmount'
		},
		{
			title: '计费依据',
			dataIndex: 'feeBasis'
		},
		{
			title: '起点时间',
			dataIndex: 'startTime'
		},
		{
			title: '终点时间',
			dataIndex: 'endTime'
		}
	]
	// 操作栏通过权限判断是否显示
	columns.push({
		title: '操作',
		dataIndex: 'action',
		align: 'center',
		width: '80px'
	})

	const chargeTypes = [
		{ value: 1, label: '是' },
		{ value: 2, label: '否' }
	]

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
		return bdBillingRoadSectionApi.page(Object.assign(parameter, searchFormParam)).then((data) => {
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

	//车辆类型
	const vehicleTypeOptions = tool.dictList('vehicleType')
	//车种
	const vehicleClassOptions = tool.dictList('vehicleClass')
	//车辆颜色
	const etcVehicleColorOptions = tool.dictList('etcVehicleColor')
	//道路类型
	const roadTypeOptions = tool.dictList('roadType')

	const ishowTable = ref(true)
	const showDetail = (record) => {
		ishowTable.value = false
		formRef.value.onOpen(record)
	}

	const onClose = () => {
		ishowTable.value = true
	}
</script>
