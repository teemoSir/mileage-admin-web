<template>
	<a-card :bordered="false">
		<div class="data-main-home">
			<a-tabs
				style="flex: 1; border-bottom: 1px solid #eceff1; height: 40px; margin-right: 10px"
				v-model:activeKey="activeKey"
				size="large"
				@change="paneChange"
				type="card"
			>
				<a-tab-pane tab="今日数据概览" key="today">
					<span style="width: 150px">今日数据概览</span>
				</a-tab-pane>
				<a-tab-pane tab="历史数据概览" key="history">
					<span>历史数据概览</span>
				</a-tab-pane>
			</a-tabs>
			<a-form-item v-if="'history' === activeKey">
				<a-range-picker v-model:value="historyParamArray" value-format="YYYY-MM-DD" :allowClear="false" />
			</a-form-item>
			<a-form-item v-if="'history' === activeKey">
				<a-button type="primary" @click="queryDetail">查询</a-button>
			</a-form-item>
		</div>
		<DataToday ref="searchTodayRef"></DataToday>
	</a-card>
</template>

<script setup name="datapreview">
	import DataToday from './dataToday.vue'
	import { onMounted } from 'vue'
	let activeKey = ref('today')
	const searchTodayRef = ref()
	const queryParam = ref({})
	const historyParam = ref({})
	const historyParamArray = ref([])

	const onOpen = () => {}

	const paneChange = (value) => {
		queryDetail()
	}

	const queryDetail = (value) => {
		nextTick(() => {
			if ('today' === activeKey.value) {
				searchTodayRef.value.onOpen(queryParam.value, activeKey.value)
			} else if ('history' === activeKey.value) {
				historyParam.value.startTime = historyParamArray.value[0] + ' 00:00:00'
				historyParam.value.endTime = historyParamArray.value[1] + ' 23:59:59'
				searchTodayRef.value.onOpen(historyParam.value, activeKey.value)
			}
		})
	}

	const timestampToStartTime = (timestamp) => {
		var date = new Date(timestamp * 1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var Y = date.getFullYear() + '-'
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
		var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
		return Y + M + D + '00:00:00'
	}
	const timestampToEndTime = (timestamp) => {
		var date = new Date(timestamp * 1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var Y = date.getFullYear() + '-'
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
		var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' '
		return Y + M + D + '23:59:59'
		// return '2023-12-15 23:59:59'
	}

	const timestamp = new Date().getTime() / 1000
	queryParam.value.startTime = timestampToStartTime(timestamp)
	queryParam.value.endTime = timestampToEndTime(timestamp)

	const currentDate = new Date()
	currentDate.setDate(currentDate.getDate() - 6)
	const timestamp1 = currentDate.getTime() / 1000
	historyParam.value.startTime = timestampToStartTime(timestamp1)
	historyParam.value.endTime = timestampToEndTime(timestamp)

	historyParamArray.value[0] = historyParam.value.startTime.substring(0, 10)
	historyParamArray.value[1] = historyParam.value.endTime.substring(0, 10)

	onMounted(() => {
		// 进来后执行查询
		queryDetail('today')
	})
</script>

<style lang="less">
	.data-main-home {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		.ant-tabs-nav-wrap {
			background: white;
			height: 42px;
			line-height: 42px;
		}
		.ant-tabs-tab-btn {
			padding: 0 16px;
			color: #808080;
			font-size: 14px;
		}
		.ant-form-item {
			margin-bottom: 0;
		}
		.ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
			padding: 0 16px;
			//color: #00bfab;
			font-size: 14px;
		}
	}
</style>
