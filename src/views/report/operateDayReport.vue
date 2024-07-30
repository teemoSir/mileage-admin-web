<template>
	<div>
		<vxe-form ref="myForm">
			<vxe-form-item title="统计时间：" :item-render="{}">
				<vxe-input v-model="dateTimeVal" placeholder="月选择" type="month" valueFormat="yyyy-MM"></vxe-input>
			</vxe-form-item>
			<vxe-form-item>
				<vxe-button type="search" status="primary" content="查询" @click="getTableData"></vxe-button>
				<a-button style="margin: 0 8px" @click="exportDataEvent">导出Excel</a-button>
			</vxe-form-item>
		</vxe-form>
		<vxe-table
			ref="tableRef"
			height="800"
			border="border"
			:loading="loading"
			:show-overflow="showOverflow"
			:row-config="{ isHover: true }"
			:export-config="{}"
			:data="tableData"
			style="--vxe-table-border-color: #a2a4a5; margin-top: 20px"
		>
			>
			<vxe-colgroup title="平台运营日报表">
				<vxe-column header-align="left" align="right" field="day" title="日期" width="110" fixed="left"></vxe-column>
				<vxe-column header-align="left" align="right" field="billNum" title="账单（笔）" width="110"></vxe-column>
				<vxe-colgroup title="行程（笔)">
					<vxe-column header-align="left" align="right" field="tripNum_z" title="总计" width="110"></vxe-column>
					<vxe-colgroup title="按车型">
						<vxe-column header-align="left" align="right" field="tripNum_h" title="货车" width="110"></vxe-column>
						<vxe-column header-align="left" align="right" field="tripNum_k" title="客车" width="110"></vxe-column>
					</vxe-colgroup>
					<vxe-colgroup title="按动力类型">
						<vxe-column header-align="left" align="right" field="tripNum_r" title="燃油汽车" width="110"></vxe-column>
						<vxe-column
							header-align="left"
							align="right"
							field="tripNum_q"
							title="清洁能源汽车"
							width="120"
						></vxe-column>
					</vxe-colgroup>
				</vxe-colgroup>
				<vxe-colgroup title="总计费里程（公里）">
					<vxe-column header-align="left" align="right" field="mileage_z" title="总计" width="110"></vxe-column>
					<vxe-colgroup title="按车型">
						<vxe-column header-align="left" align="right" field="mileage_h" title="货车" width="110"></vxe-column>
						<vxe-column header-align="left" align="right" field="mileage_k" title="客车" width="110"></vxe-column>
					</vxe-colgroup>
					<vxe-colgroup title="按动力类型">
						<vxe-column header-align="left" align="right" field="mileage_r" title="燃油汽车" width="110"></vxe-column>
						<vxe-column
							header-align="left"
							align="right"
							field="mileage_q"
							title="清洁能源汽车"
							width="120"
						></vxe-column>
					</vxe-colgroup>
					<vxe-colgroup title="按道路类型">
						<vxe-column header-align="left" align="right" field="mileage_p" title="普通公路" width="110"></vxe-column>
						<vxe-column header-align="left" align="right" field="mileage_g" title="高速公路" width="120"></vxe-column>
					</vxe-colgroup>
				</vxe-colgroup>
				<vxe-colgroup title="总计费金额（元）">
					<vxe-column header-align="left" align="right" field="bill_z" title="总计" width="110"></vxe-column>
					<vxe-colgroup title="按车型">
						<vxe-column header-align="left" align="right" field="bill_h" title="货车" width="110"></vxe-column>
						<vxe-column header-align="left" align="right" field="bill_k" title="客车" width="110"></vxe-column>
					</vxe-colgroup>
					<vxe-colgroup title="按动力类型">
						<vxe-column header-align="left" align="right" field="bill_r" title="燃油汽车" width="110"></vxe-column>
						<vxe-column header-align="left" align="right" field="bill_q" title="清洁能源汽车" width="120"></vxe-column>
					</vxe-colgroup>
					<vxe-colgroup title="按道路类型">
						<vxe-column header-align="left" align="right" field="bill_p" title="普通公路" width="110"></vxe-column>
						<vxe-column header-align="left" align="right" field="bill_g" title="高速公路" width="120"></vxe-column>
					</vxe-colgroup>
				</vxe-colgroup>

				<vxe-colgroup title="上线车辆数（辆）">
					<vxe-column header-align="left" align="right" field="veh_z" title="总计" width="110"></vxe-column>
					<vxe-colgroup title="按车型">
						<vxe-column header-align="left" align="right" field="veh_h" title="货车" width="110"></vxe-column>
						<vxe-column header-align="left" align="right" field="veh_k" title="客车" width="110"></vxe-column>
					</vxe-colgroup>
					<vxe-colgroup title="按动力类型">
						<vxe-column header-align="left" align="right" field="veh_r" title="燃油汽车" width="110"></vxe-column>
						<vxe-column header-align="left" align="right" field="veh_q" title="清洁能源汽车" width="120"></vxe-column>
					</vxe-colgroup>
				</vxe-colgroup>
				<vxe-colgroup title="收费道路车辆数（辆）">
					<vxe-column header-align="left" align="right" field="road_z" title="总计" width="110"></vxe-column>
					<vxe-colgroup title="按车型">
						<vxe-column header-align="left" align="right" field="road_h" title="货车" width="110"></vxe-column>
						<vxe-column header-align="left" align="right" field="road_k" title="客车" width="110"></vxe-column>
					</vxe-colgroup>
					<vxe-colgroup title="按动力类型">
						<vxe-column header-align="left" align="right" field="road_r" title="燃油汽车" width="110"></vxe-column>
						<vxe-column header-align="left" align="right" field="road_q" title="清洁能源汽车" width="120"></vxe-column>
					</vxe-colgroup>
				</vxe-colgroup>
				<vxe-colgroup title="车辆平均计费里程（公里）">
					<vxe-column header-align="left" align="right" field="vehAvMileage_z" title="均值" width="110"></vxe-column>
					<vxe-colgroup title="按车型">
						<vxe-column header-align="left" align="right" field="vehAvMileage_h" title="货车" width="110"></vxe-column>
						<vxe-column header-align="left" align="right" field="vehAvMileage_k" title="客车" width="110"></vxe-column>
					</vxe-colgroup>
					<vxe-colgroup title="按动力类型">
						<vxe-column
							header-align="left"
							align="right"
							field="vehAvMileage_r"
							title="燃油汽车"
							width="110"
						></vxe-column>
						<vxe-column
							header-align="left"
							align="right"
							field="vehAvMileage_q"
							title="清洁能源汽车"
							width="120"
						></vxe-column>
					</vxe-colgroup>
				</vxe-colgroup>
				<vxe-colgroup title="车辆平均计费金额（元）">
					<vxe-column header-align="left" align="right" field="vehAvBill_z" title="均值" width="110"></vxe-column>
					<vxe-colgroup title="按车型">
						<vxe-column header-align="left" align="right" field="vehAvBill_h" title="货车" width="110"></vxe-column>
						<vxe-column header-align="left" align="right" field="vehAvBill_k" title="客车" width="110"></vxe-column>
					</vxe-colgroup>
					<vxe-colgroup title="按动力类型">
						<vxe-column header-align="left" align="right" field="vehAvBill_r" title="燃油汽车" width="110"></vxe-column>
						<vxe-column
							header-align="left"
							align="right"
							field="vehAvBill_q"
							title="清洁能源汽车"
							width="120"
						></vxe-column>
					</vxe-colgroup>
				</vxe-colgroup>
				<vxe-colgroup title="已接入车辆数（辆）">
					<vxe-column header-align="left" align="right" field="joinVeh_z" title="总计" width="110"></vxe-column>
					<vxe-colgroup title="按车型">
						<vxe-column header-align="left" align="right" field="joinVeh_h" title="货车" width="110"></vxe-column>
						<vxe-column header-align="left" align="right" field="joinVeh_k" title="客车" width="110"></vxe-column>
					</vxe-colgroup>
					<vxe-colgroup title="按动力类型">
						<vxe-column header-align="left" align="right" field="joinVeh_r" title="燃油汽车" width="110"></vxe-column>
						<vxe-column
							header-align="left"
							align="right"
							field="joinVeh_q"
							title="清洁能源汽车"
							width="120"
						></vxe-column>
					</vxe-colgroup>
					<vxe-column header-align="left" align="right" field="joinVeh_n" title="新增" width="110"></vxe-column>
				</vxe-colgroup>
				<vxe-colgroup title="平台覆盖路网范围（公里）">
					<vxe-column header-align="left" align="right" field="roadMileage_z" title="总计" width="110"></vxe-column>
					<vxe-colgroup title="按道路类型">
						<vxe-column
							header-align="left"
							align="right"
							field="roadMileage_g"
							title="高速公路"
							width="110"
						></vxe-column>
						<vxe-column
							header-align="left"
							align="right"
							field="roadMileage_p"
							title="普通公路"
							width="110"
						></vxe-column>
					</vxe-colgroup>
					<vxe-column header-align="left" align="right" field="roadMileage_n" title="新增" width="110"></vxe-column>
				</vxe-colgroup>
			</vxe-colgroup>
		</vxe-table>
	</div>
</template>

<script setup>
	import { ref } from 'vue'
	import operateDayReportApi from '@/api/report/operateDayReportApi'
	import 'vxe-table/lib/style.css'
	import XEUtils from 'xe-utils'

	const tableRef = ref()
	const showOverflow = ref(false)
	const tableData = ref()
	const loading = ref(false)
	const dateTimeVal = ref()
	const getTableData = () => {
		loading.value = true
		dateTimeVal.value = XEUtils.toValueString(dateTimeVal.value)
		if (dateTimeVal.value === null || dateTimeVal.value === '') {
			var date = new Date()
			var Y = date.getFullYear() + '-'
			var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
			var day = date.getDate()
			var D = (day < 10 ? '0' + day : day) + ' '
			dateTimeVal.value = Y + M + D
		} else {
			dateTimeVal.value = dateTimeVal.value + '-01'
		}
		let param = {
			datetime: dateTimeVal.value
		}
		operateDayReportApi.operateDayReportApi(param).then((data) => {
			loading.value = false
			tableData.value = data
		})
	}
	const exportDataEvent = () => {
		const $table = tableRef.value
		let titleName = '平台运营日报表'
		if ($table) {
			$table.exportData({
				filename: titleName,
				sheetName: 'Sheet1',
				type: 'xlsx',
				types: ['xlsx', 'csv', 'html', 'xml', 'txt'],
				useStyle: true, //是否导出样式
				isFooter: false //是否导出表尾（比如合计）
			})
		}
	}
	getTableData()
</script>
