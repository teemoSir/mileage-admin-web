<template>
	<!--	<a-card title="今日车辆上线情况">-->
	<!--		-->
	<!--	</a-card>-->
	<div class="newStatistics-box">
		<div class="new-title" style="background-size: 50% 100%">
			<span>平台车辆概况</span>
		</div>
		<div class="beidou-title">
			<a-row>
				<a-col :span="24">
					<div class="common-card">
						<span>已接入车辆数（辆）</span>
						<span>{{ tool.groupSeparator(datapreview.allVehicleCountAccess) }}</span>
					</div>
				</a-col>
			</a-row>
			<a-divider />
			<a-row>
				<a-col :span="12" style="text-align: center;">
					<a-row style="text-align: center;">
						<a-col :span="24" style="text-align: center;">
							<a-progress type="circle" :percent="numberFormate(datapreview.fxzdCountAccess/datapreview.allVehicleCountAccess)" :width="100">
								<template #format="percent">
									<span style="font-size: 20px">{{ tool.groupSeparator(datapreview.fxzdCountAccess) }} </span>
								</template>
							</a-progress>
						</a-col>
					</a-row >
					<a-row>
						<a-col :span="24" style="text-align: center; font-size: 15px;">发行终端车辆</a-col>
					</a-row>
				</a-col>
				<a-col :span="12" style="text-align: center;">
					<a-row style="text-align: center;">
						<a-col :span="24" style="text-align: center;">
							<a-progress type="circle" :percent="numberFormate(datapreview.hyptCountAccess/datapreview.allVehicleCountAccess)" :width="100">
								<template #format="percent">
									<span style="font-size: 20px">{{ tool.groupSeparator(datapreview.hyptCountAccess) }} </span>
								</template>
							</a-progress>
						</a-col>
					</a-row >
					<a-row>
						<a-col :span="24" style="text-align: center; font-size: 15px;">货运平台车辆</a-col>
					</a-row>
				</a-col>
			</a-row>

			<a-row style="padding-top: 20px;">
				<a-col :span="12" style="text-align: center;">
					<a-row style="text-align: center;">
						<a-col :span="24" style="text-align: center;">
							<a-progress type="circle" :percent="numberFormate(datapreview.lwlkCountAccess/datapreview.allVehicleCountAccess)" :width="100">
								<template #format="percent">
									<span style="font-size: 20px">{{ tool.groupSeparator(datapreview.lwlkCountAccess) }} </span>
								</template>
							</a-progress>
						</a-col>
					</a-row >
					<a-row>
						<a-col :span="24" style="text-align: center; font-size: 15px;">联网联控车辆</a-col>
					</a-row>
				</a-col>
				<a-col :span="12" style="text-align: center;">
					<a-row style="text-align: center;">
						<a-col :span="24" style="text-align: center;">
							<a-progress type="circle" :percent="numberFormate(datapreview.xnyCountAccess/datapreview.allVehicleCountAccess)" :width="100">
								<template #format="percent">
									<span style="font-size: 20px">{{ tool.groupSeparator(datapreview.xnyCountAccess) }} </span>
								</template>
							</a-progress>
						</a-col>
					</a-row >
					<a-row>
						<a-col :span="24" style="text-align: center; font-size: 15px;">新能源车辆</a-col>
					</a-row>
				</a-col>
			</a-row>

		</div>
	</div>
</template>

<script setup name="vehicleSum">
import tool from "@/utils/tool";
import datapreviewApi from "@/api/billing/datapreviewApi";
import {onMounted} from "vue";
const queryParam = ref({})
const datapreview = ref({})

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

const numberFormate = (value) => {
	return Math.ceil(value * 100)
}

onMounted(() => {
	// 进来后执行查询
	queryDetail('today')
})

const queryDetail = (value) => {
	nextTick(() => {
		onOpen(queryParam.value)
	})
}

const onOpen = (record) => {
	/**
	 * 车辆上线状况
	 */
	datapreviewApi.queryVehicleOnline(record).then((data) => {
		if (data) {
			//车辆上线数：联网联控，1
			datapreview.value.lwlkCount = data.lwlkCount
			//"车辆上线数：货运平台，2
			datapreview.value.hyptCount = data.hyptCount
			//车辆上线数：终端发行，3
			datapreview.value.fxzdCount = data.fxzdCount
			//车辆上线数：新能源，4
			datapreview.value.xnyCount = data.xnyCount

			datapreview.value.allVehicleCount = data.lwlkCount + data.hyptCount + data.fxzdCount + data.xnyCount

			//车辆接入数：联网联控，1
			datapreview.value.lwlkCountAccess = data.lwlkCountAccess
			//"车辆接入数：货运平台，2
			datapreview.value.hyptCountAccess = data.hyptCountAccess
			//车辆接入数：终端发行，3
			datapreview.value.fxzdCountAccess = data.fxzdCountAccess
			//车辆接入数：新能源，4
			datapreview.value.xnyCountAccess = data.xnyCountAccess

			datapreview.value.allVehicleCountAccess =
				data.lwlkCountAccess + data.hyptCountAccess + data.fxzdCountAccess + data.xnyCountAccess
		}
	})
}
</script>

<style scoped>

.newStatistics-box {
	background: #fff;
	border-radius: 5px;
	padding: 0px 10px 10px 0px;
//margin-top: 10px;
}

.new-title {
	background-image: url('../../../assets/images/bigscreen/left_top_bg@2x.png');
	background-repeat: no-repeat;
	position: relative;
	span {
		font-size: 20px;
		font-weight: bold;
		color: #4976e4;
		line-height: 30px;
		margin-left: 10px;
	}
}

.beidou-title {
	margin: 0 10px;
	padding: 10px 0 10px 10px;
	font-size: 18px;
	p {
		color: rgba(255, 192, 96, 1);
	}
}

.common-card {
	display: flex;
	height: 40px;
	align-items: baseline;
	margin-top: 5px;
	padding-left: 15px;
	:first-child {
		font-size: 15px;
		color: black;
	}
	:last-child {
		font-size: 42px;
		font-weight: bold;
		color: black;
		margin-left: 50px;
	}
}

</style>
