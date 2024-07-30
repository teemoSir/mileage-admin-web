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
				<a-col :span="3">
					<a-form-item label="收费区间编码" name="intervalCode">
						<a-input v-model:value="searchFormState.intervalCode" placeholder="请输入收费区间编码" />
					</a-form-item>
				</a-col>
				<a-col :span="3">
					<a-form-item label="交叉口编码" name="crossCode">
						<a-input v-model:value="searchFormState.crossCode" placeholder="请输入交叉口编码" />
					</a-form-item>
				</a-col>
				<a-col :span="4">
					<a-form-item label="通行记录编号" name="trafficId">
						<a-input v-model:value="searchFormState.trafficId" placeholder="请输入通行记录编码" />
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
							allowClear
							v-model:value="searchFormState.vehiclePlateColor"
							placeholder="请选择车牌颜色"
							:options="vehicleColorOptions"
						/>
					</a-form-item>
				</a-col>
				<a-col :span="4">
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
					<a-form-item label="收费公路类型" name="highwayType">
						<a-select
							allowClear
							v-model:value="searchFormState.highwayType"
							placeholder="请选择公路类型"
							:options="highwayTypeOptions"
						/>
					</a-form-item>
				</a-col>
				<a-col :span="4">
					<a-form-item label="收费制式" name="chargeMode">
						<a-select
							allowClear
							v-model:value="searchFormState.chargeMode"
							placeholder="请选择收费制式"
							:options="chargeModeOptions"
						/>
					</a-form-item>
				</a-col>
				<a-col :span="4">
					<a-form-item label="计费依据" name="feeBasis">
						<a-select
							allowClear
							v-model:value="searchFormState.feeBasis"
							placeholder="请选择计费依据"
							:options="feeBasisOptions"
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
			:row-key="(record) => record.pkid"
			:tool-config="toolConfig"
		>
			<template #bodyCell="{ column, record }">
				<template v-if="column.dataIndex === 'vehiclePlate'">
					<span :class="'big-plateColor-text big-plateColor-' + record.vehiclePlateColor">{{
						record.vehiclePlate
					}}</span>
				</template>
				<template v-if="column.dataIndex === 'intervalCode'">
					<span>{{ record.intervalCode }}</span>
					<span>{{ record.intervalName }}</span>
					<span>{{ record.crossCode }}</span>
					<span>{{ record.crossName }}</span>
				</template>
				<template v-if="column.dataIndex === 'vehicleType'">
					<a-space v-if="null != record.vehicleType">
						{{ $TOOL.dictTypeData('vehicleType', record.vehicleType.toString()) }}
					</a-space>
				</template>
				<template v-if="column.dataIndex === 'highwayType'">
					<a-space v-if="null != record.highwayType">
						{{ $TOOL.dictTypeData('highwayType', record.highwayType.toString()) }}
					</a-space>
				</template>
				<template v-if="column.dataIndex === 'chargeMode'">
					<a-space v-if="null != record.chargeMode">
						{{ $TOOL.dictTypeData('chargeMode', record.chargeMode.toString()) }}
					</a-space>
				</template>
				<template v-if="column.dataIndex === 'feeBasis'">
					<a-space v-if="null != record.feeBasis">
						{{ $TOOL.dictTypeData('feeBasis', record.feeBasis.toString()) }}
					</a-space>
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
				<template v-if="column.dataIndex === 'action'">
					<a-space>
						<a @click="showDetail(record)">详情</a>
					</a-space>
				</template>
			</template>
		</s-table>
	</a-card>
	<roadDetail v-show="!ishowTable" ref="formDetailRef" @successful="onClose"></roadDetail>
</template>

<script setup name="highwayroad">
	import tool from '@/utils/tool'
	import highwayfee from '@/api/highwayfee/highwayfeeroad'
	import roadDetail from './detail.vue'
	let searchFormState = reactive({})
	const searchFormRef = ref()
	const table = ref()
	const formDetailRef = ref()
	const toolConfig = { refresh: true, height: true, columnSetting: false, striped: false }
	const columns = [
		{
			title: '通行记录编号',
			dataIndex: 'trafficId',
			width: 150
		},
		{
			title: '计费明细编号',
			dataIndex: 'id',
			width: 150
		},
		{
			title: '车牌号',
			dataIndex: 'vehiclePlate',
			width: 100
		},
		{
			title: '计费车型',
			dataIndex: 'vehicleType',
			width: 80
		},
		{
			title: '收费区间',
			dataIndex: 'intervalCode',
			width: 250
		},
		{
			title: '收费公路类型',
			dataIndex: 'highwayType',
			width: 70
		},
		{
			title: '收费制式',
			dataIndex: 'chargeMode',
			width: 80
		},
		{
			title: '计费里程(公里）',
			dataIndex: 'chargeDistance',
			width: 80
		},
		{
			title: '计费金额（元）',
			dataIndex: 'chargeAmount',
			width: 80
		},
		{
			title: '优惠金额（元）',
			dataIndex: 'discountAmount',
			width: 80
		},
		{
			title: '计费依据',
			dataIndex: 'feeBasis',
			width: 80
		},
		{
			title: '起点时间',
			dataIndex: 'startTime',
			width: 120
		},
		{
			title: '终点时间',
			dataIndex: 'endTime',
			width: 120
		}
	]
	// 操作栏通过权限判断是否显示
	columns.push({
		title: '操作',
		dataIndex: 'action',
		align: 'center',
		width: '80px'
	})
	const vehicleColorOptions = tool.dictList('etcVehicleColor')
	const vehicleTypeOptions = tool.dictList('vehicleType')
	const highwayTypeOptions = tool.dictList('highwayType')
	const chargeModeOptions = tool.dictList('chargeMode')
	const feeBasisOptions = tool.dictList('feeBasis')

	const selectedRowKeys = ref([])
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
		searchFormState.sort = 1
		const searchFormParam = JSON.parse(JSON.stringify(searchFormState))
		return highwayfee.page(Object.assign(parameter, searchFormParam)).then((data) => {
			return data
		})
	}
	// 重置
	const reset = () => {
		searchFormRef.value.resetFields()
		table.value.refresh(true)
	}
	const ishowTable = ref(true)
	const showDetail = (record) => {
		ishowTable.value = false
		formDetailRef.value.onOpen(record)
	}

	const onClose = () => {
		ishowTable.value = true
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
</script>
