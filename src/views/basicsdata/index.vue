<template>
	<a-card :bordered="false" v-show="ishowTable">
		<a-form ref="searchFormRef" name="advanced_search" :model="searchFormState" class="ant-advanced-search-form">
			<a-row :gutter="24">
				<a-col :span="4">
					<a-form-item label="车牌号码" name="vehiclePlate">
						<a-input v-model:value="searchFormState.vehiclePlate" placeholder="请输入车牌号码" />
					</a-form-item>
				</a-col>

				<a-col :span="4">
					<a-form-item label="车牌颜色" name="vehiclePlateColor">
						<a-select allowClear
							v-model:value="searchFormState.vehiclePlateColor"
							placeholder="请选择车牌颜色"
							:options="etcVehicleColorOptions"
						/>
					</a-form-item>
				</a-col>

				<a-col :span="4">
					<a-form-item label="计费车型" name="vehicleType">
						<a-select allowClear
							v-model:value="searchFormState.vehicleType"
							placeholder="请选择计费车型"
							:options="vehicleTypeOptions"
						/>
					</a-form-item>
				</a-col>
				<a-col :span="4">
					<a-form-item label="排放水平" name="vehicleCc">
						<a-select allowClear
							v-model:value="searchFormState.vehicleCc"
							placeholder="请选择排放水平"
							:options="vehicleCcOptions"
						/>
					</a-form-item>
				</a-col>
				<a-col :span="4">
					<a-form-item label="数据来源" name="vehicleSource">
						<a-select allowClear
							v-model:value="searchFormState.vehicleSource"
							placeholder="请选择数据来源"
							:options="vehicleSourceOptions"
						/>
					</a-form-item>
				</a-col>

				<a-col :span="4">
					<a-form-item label="办理人姓名" name="vehicleOwner">
						<a-input v-model:value="searchFormState.vehicleOwner" placeholder="请输入机动车所有人姓名" />
					</a-form-item>
				</a-col>
				<a-col :span="6">
					<a-button type="primary" id="pagereset" @click="table.refresh(true)">查询</a-button>
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
				<template v-if="column.dataIndex === 'infoFlag'">
					<a-space v-if="null != record.infoFlag">
						{{ $TOOL.dictTypeData('VEHCILE_OWNER_TYPE', record.infoFlag.toString()) }}
					</a-space>
				</template>

				<template v-if="column.dataIndex === 'vehicleCc'">
					<a-space v-if="null != record.vehicleCc">
						{{ $TOOL.dictTypeData('energyType', record.vehicleCc.toString()) }}
					</a-space>
				</template>

				<template v-if="column.dataIndex === 'vehicleSource'">
					<a-space v-if="null != record.vehicleSource">
						{{ $TOOL.dictTypeData('VEH_LOCATION_SOURCE', record.vehicleSource.toString()) }}
					</a-space>
				</template>

				<template v-if="column.dataIndex === 'vehiclePower'">
					<a-space v-if="null != record.vehiclePower">
						{{ $TOOL.dictTypeData('VEHICLE_POWER_TYPE', record.vehiclePower.toString()) }}
					</a-space>
				</template>

				<template v-if="column.dataIndex === 'action'">
					<a-space>
						<a @click="vehicleDetail(record)">详情</a>
					</a-space>
				</template>
			</template>
		</s-table>
	</a-card>
    <VehicleDetail v-show="!ishowTable" ref="formRef" @successful="onClose"></VehicleDetail>
</template>

<script setup name="VehicleInfo">
	import tool from '@/utils/tool'
	import Form from './form.vue'
	import vehicleInfoApi from '@/api/basicsdata/vehicleInfoApi'
	import VehicleDetail from './detail.vue'
	let searchFormState = reactive({})
	const searchFormRef = ref()
	const table = ref()
	const formRef = ref()
	const toolConfig = { refresh: true, height: true, columnSetting: false, striped: false }
	const columns = [
		{
			title: '办理人姓名',
			dataIndex: 'vehicleOwner'
		},
		{
			title: '车牌号码',
			dataIndex: 'vehiclePlate'
		},
		{
			title: '车牌颜色',
			dataIndex: 'vehiclePlateColor'
		},
		{
			title: '收费车型',
			dataIndex: 'vehicleType'
		},
		{
			title: '车轴数',
			dataIndex: 'axleCount'
		},
		{
			title: '个人企业标识',
			dataIndex: 'infoFlag'
		},
		{
			title: '车辆动力',
			dataIndex: 'vehiclePower'
		},
		{
			title: '汽车排量',
			dataIndex: 'vehicleCc'
		},
		{
			title: '车辆来源',
			dataIndex: 'vehicleSource'
		}
	]
	// 操作栏通过权限判断是否显示
	columns.push({
		title: '操作',
		dataIndex: 'action',
		align: 'center',
		width: '80px'
	})

	//车辆颜色
	const etcVehicleColorOptions = tool.dictList('etcVehicleColor')
	//车辆类型
	const vehicleTypeOptions = tool.dictList('vehicleType')
	//排放水平
	const vehicleCcOptions = tool.dictList('energyType')
	const vehicleSourceOptions = tool.dictList('VEH_LOCATION_SOURCE')

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
		return vehicleInfoApi.vehicleInfoPage(Object.assign(parameter, searchFormParam)).then((data) => {
			return data
		})
	}
	// 重置
	const reset = () => {
		searchFormRef.value.resetFields()
		table.value.refresh(true)
	}
	// 删除
	const deleteVehicleInfo = (record) => {
		let params = [
			{
				pkid: record.pkid
			}
		]
		vehicleInfoApi.vehicleInfoDelete(params).then(() => {
			table.value.refresh(true)
		})
	}
	// 批量删除
	const deleteBatchVehicleInfo = (params) => {
		vehicleInfoApi.vehicleInfoDelete(params).then(() => {
			table.value.clearRefreshSelected()
		})
	}
	const ishowTable = ref(true)
	const vehicleDetail = (record) => {
		ishowTable.value = false
		formRef.value.onOpen(record)
	}

	const onClose = () => {
		ishowTable.value = true
	}

</script>
