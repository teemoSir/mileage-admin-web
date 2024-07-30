<template>
	<a-card>
		<a-form ref="searchFormRef" class="ant-advanced-search-form">
			<a-row>
				<a-col class="grid-content"><span>统计时间：</span></a-col>
				<a-col>
					<a-form-item>
						<a-date-picker
							v-model:value="startTime"
							value-format="YYYY-MM-DD"
							:allowClear="false"
							placeholder="年/月/日"
						/>
					</a-form-item>
				</a-col>
				<a-col class="grid-content"><span>&nbsp;至&nbsp;</span></a-col>
				<a-col>
					<a-form-item>
						<a-date-picker
							v-model:value="endTime"
							value-format="YYYY-MM-DD"
							:allowClear="false"
							placeholder="年/月/日"
						/>
					</a-form-item>
				</a-col>
				<a-col>
					&nbsp;<a-button style="background-color: #1890ff; color: white"  :icon="h(SearchOutlined)" @click="searchData"> 查询 </a-button>
					&nbsp;<a-button @click="exportDataEvent"> <UploadOutlined /> 导出Excel</a-button>
				</a-col>
			</a-row>
		</a-form>
		<table id="table_report">
			<thead>
				<tr style="border: none">
					<th colspan="16" Style="text-align: center;font-size: 30px;font-weight: bold;border:none;">
						平台运营统计报表
					</th>
				</tr>
				<tr style="border: none">
					<th style="border: none; width: 7%">统计时间：</th>
					<th Style="text-align: left;border:none;font-weight: normal" colspan="15" v-if="(startTime, endTime)">
						{{ startTime.toString().replace('-', '年').replace('-', '月') + '日' }} -
						{{ endTime.toString().replace('-', '年').replace('-', '月') + '日' }}
					</th>
				</tr>
				<tr>
					<th rowspan="2" style="width: 7%">分类</th>
					<th rowspan="2" style="width: 10%">项目/类别</th>
					<th rowspan="2">账单（笔）</th>
					<th rowspan="2">行程（笔）</th>
					<th colspan="3" style="width: 18%">总计费里程（公里）</th>
					<th colspan="3" style="width: 18%">总计费金额（元）</th>
					<th rowspan="2">上线车辆数（辆）</th>
					<th rowspan="2">收费道路车辆数（辆）</th>
					<th rowspan="2" style="width: 7%">车辆平均计费里程（公里）</th>
					<th rowspan="2" style="width: 7%">车辆平均计费金额（元）</th>
					<th rowspan="2">新增车辆数（辆）</th>
					<th rowspan="2" style="width: 7%">已接入车辆数（辆）</th>
				</tr>
				<tr>
					<th style="font-weight: bold">总计</th>
					<th>高速公路</th>
					<th>普通公路</th>
					<th>总计</th>
					<th>高速公路</th>
					<th>普通公路</th>
				</tr>
				<tr v-if="loading === true">
					<td colspan="15">
						<a-spin :loading="loading" tip="加载中..."></a-spin>
					</td>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(item, index) in dataNum" :key="index">
					<td v-if="index === 0" colspan="2" style="font-weight: bold">总计</td>
					<td v-if="index === 1" rowspan="12">按照车型</td>
					<td v-if="index === 1">1类客车</td>
					<td v-if="index === 2">2类客车</td>
					<td v-if="index === 3">3类客车</td>
					<td v-if="index === 4">4类客车</td>
					<td v-if="index === 5" style="font-weight: bold">客车合计</td>
					<td v-if="index === 6">1类货车</td>
					<td v-if="index === 7">2类货车</td>
					<td v-if="index === 8">3类货车</td>
					<td v-if="index === 9">4类货车</td>
					<td v-if="index === 10">5类货车</td>
					<td v-if="index === 11">6类货车</td>
					<td v-if="index === 12" style="font-weight: bold">货车合计</td>
					<td v-if="index === 13" rowspan="2">按照动力类型</td>
					<td v-if="index === 13">燃油汽车</td>
					<td v-if="index === 14">清洁能源汽车</td>
					<td>{{ item.billNum }}</td>
					<td>{{ item.tripNum }}</td>
					<td>{{ item.mileage_z }}</td>
					<td>{{ item.mileage_g }}</td>
					<td>{{ item.mileage_p }}</td>
					<td>{{ item.bill_z }}</td>
					<td>{{ item.bill_g }}</td>
					<td>{{ item.bill_p }}</td>
					<td>{{ item.veh_z }}</td>
					<td>{{ item.road_z }}</td>
					<td>{{ item.vehAvMileage_z }}</td>
					<td>{{ item.vehAvBill_z }}</td>
					<td>{{ item.joinVeh_n }}</td>
					<td>{{ item.joinVeh_z }}</td>
				</tr>
			</tbody>
		</table>
	</a-card>
</template>
<script setup>
	import oprateCollectReportApi from '@/api/report/oprateCollectReportApi'
	import { ref } from 'vue'
	import dayjs from 'dayjs'
	import { SearchOutlined,UploadOutlined } from '@ant-design/icons-vue'
	import { h } from 'vue'
	//响应式数据 中可通过ref调用
	const dataNum = ref([])
	//初始化变量
	const startTime = ref()
	const endTime = ref()
	//轻量级的JavaScript日期库,专注于解决处理日期和时间的问题
	const currentDate = dayjs()
	/**
	 * 平台运营统计报表data数据获取
	 */
	const loading = ref(false)
	const searchData = () => {
		loading.value = true
		//查询之前清空data数据
		dataNum.value = ''
		//时间非空校验
		if (!startTime.value) {
			loading.value = false
			alert('请输入开始日期！')
			return
		} else if (!endTime.value) {
			loading.value = false
			alert('请输入结束日期！')
			return
		}
		//后端传参赋值
		let param = {
			startTime: startTime.value,
			endTime: endTime.value
		}
		//调用api数据处理
		oprateCollectReportApi.oprateCollectReportApi(param).then(
			(data) => {
				loading.value = false
				dataNum.value = data
			},
			//异常处理
			(e) => {
				loading.value = false
				dataNum.value = ''
			}
		)
	}

	//导出excel
	const exportDataEvent = () => {
		//获取表格
		var exportFileContent = document.getElementById('table_report').outerHTML
		//解决中文乱码问题
		var blob = new Blob([exportFileContent], { type: 'text/plain;charset=utf-8' })
		blob = new Blob([String.fromCharCode(0xfeff), blob], { type: blob.type })
		//设置链接
		var link = window.URL.createObjectURL(blob)
		var a = document.createElement('a') //创建标签
		a.download = '平台运营统计报表.xls' //设置被下载的超链接目标（文件名）
		a.href = link
		document.body.appendChild(a) //标签添加到页面
		a.click() //设置a标签触发单击事件
		document.body.removeChild(a) //移除标签
	}
	//打开页面自动加载默认7天时间
	onMounted(() => {
		const start = new Date()
		start.setTime(start.getTime() - 3600 * 1000 * 24 * 6)
		let originalDate = dayjs(start)
		endTime.value = currentDate.format('YYYY-MM-DD')
		startTime.value = originalDate.format('YYYY-MM-DD')
		//调用查询赋值
		searchData()
	})

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
