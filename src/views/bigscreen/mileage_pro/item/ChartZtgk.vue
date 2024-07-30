<template>
<div class="ztgk-body">
	<CommonTitle  title="总体概况" />
	<div class="number-show">
		<div class="number-show-item" v-for="(item, index) in numberShowData" :key="`${index}_show_item`">
			<a-image
				style="height: 84px"
				:src="item.icon"
				:preview="false"
			/>
			<span class="right-content">
				<div class="right-title">{{item.title}}</div>
				<div class="right-value">{{tool.groupSeparator(item.number)}}</div>
			</span>
		</div>
	</div>
	<div class="number-show-gk">
		<div class="gk-left">
			<div>
				<span class="cat-title-up">平台接入车辆</span>
				<span class="car-number">{{tool.groupSeparator(vehicleCount)}}</span>
				<span class="car-unit">辆</span>
			</div>
			<div style="margin-top: 18px">
				<span class="cat-title-down">在线车辆数</span>
				<span class="car-number">{{tool.groupSeparator(onlineCount)}}</span>
				<span class="car-unit">辆</span>
			</div>
		</div>
		<ChartPie :percent="percent" class="pie-chart"/>
		<div class="pie-data">
			<div class="pie-data-up">
				<div>
					<span class="pie-data-title">收费道路</span>
					<span class="pie-data-value" style="border: 1px solid #57e0f0; padding: 1px; color: #57e0f0">{{sfdlRate}}</span>
				</div>
				<div>
					<span class="up-value">{{ tool.groupSeparator(sfdlVehicleCount) }}</span>
					<span class="pie-data-unit">辆</span>
				</div>
			</div>
			<div class="pie-data-down">
				<div>
					<span class="pie-data-title">非收费道路</span>
					<span class="pie-data-value" style="border: 1px solid #2f66db; padding: 1px; color: #2f66db">{{fsfdlRate}}</span>
				</div>
				<div>
					<span class="down-value">{{ tool.groupSeparator(fsfdlVehicleCount) }}</span>
					<span class="pie-data-unit">辆</span>
				</div>
			</div>
		</div>
	</div>
</div>
</template>

<script setup>
import CommonTitle from "@/views/bigscreen/mileage_pro/item/CommonTitle.vue";
import bgBook from '@/assets/images/bigscreen_pro/bg_book.png'
import bgPosition from '@/assets/images/bigscreen_pro/bg_position.png'

import tool from '@/utils/tool'
import ChartPie from "@/views/bigscreen/mileage_pro/item/ChartPie.vue";
import bigscreenApi from "@/api/billing/bigscreenApi";

const loadSpinning = ref(false)
const queryParam = ref()
const sfdlVehicleCount = ref()
const sfdlRate = ref()
const fsfdlVehicleCount = ref()
const fsfdlRate = ref()
const onlineCount = ref()
const vehicleCount = ref()
const percent = ref(0.5)
let interval = null

const numberShowData = ref([
	{
		icon: bgPosition,
		title: '行程(笔)',
		number: 0
	},
	{
		icon: bgBook,
		title: '账单(笔)',
		number: 0
	}
])

const onOpen = (record) => {
	loadSpinning.value = true
	queryParam.value = record
	// 需要打开的
	queryBigScreenZtgk()
	if (interval !== null) {
		clearInterval(interval)
	}
	interval = setInterval(function () {
		queryBigScreenZtgk()
	}, 5000)
}

const queryBigScreenZtgk = () => {
	bigscreenApi.queryBigScreenZtgk(queryParam.value).then((data) => {
		if (data) {
			numberShowData.value[0].number = data.xcCount
			numberShowData.value[1].number = data.zdCount
			vehicleCount.value = data.vehicleCount
			onlineCount.value = data.onlineCount
			sfdlVehicleCount.value = data.sfdlVehicleCount
			fsfdlVehicleCount.value = data.fsfdlVehicleCount
			if (`${data.sfdlVehicleCount}` === `${data.fsfdlVehicleCount}`) {
				sfdlRate.value = '50%'
				fsfdlRate.value = '50%'
			} else {
				const sf = Number(data.sfdlVehicleCount)
				const fsf = Number(data.fsfdlVehicleCount)
				const total = sf + fsf
				percent.value = (sf / total).toFixed(2)
				const sfRa = Math.round((sf / total).toFixed(2) * 100)
				sfdlRate.value = `${sfRa}%`
				fsfdlRate.value = `${100 - sfRa}%`
			}
		}
		loadSpinning.value = false
	})
}

defineExpose({
	onOpen
})

</script>

<style lang="less" scoped>
.ztgk-body {
	.number-show {
		display: flex;
		flex-direction: row;
		margin-top: 10px;
		padding: 10px 20px;
		.number-show-item {
			height: 84px;
			flex: 1;
			display: flex;
			.right-content {
				flex: 1;
				width: 100%;
				margin-left: 10px;
				background-image: url("@/assets/images/bigscreen_pro/bg_number.png"); /* 替换为自己的图片路径 */
				background-size: 100% 100%;
				background-attachment: fixed;
				display: flex;
				flex-direction: column;
				align-items: start;
				padding-left: 10px;
				font-family: 'dr';
				.right-title {
					color: #9fbcdd; /* 将文本设置为透明，只保留背景渐变效果 */
					font-size: 16px;
					margin-top: 4px;
				}
				.right-value {
					background: linear-gradient(to top, #92CBFF, #ffffff);
					-webkit-background-clip: text; /* Safari/Chrome需要添加此属性才能正常显示背景渐变效果 */
					color: transparent; /* 将文本设置为透明，只保留背景渐变效果 */
					font-size: 32px;
					font-weight: bold;
				}
			}
		}
	}
	.number-show-gk {
		height: 100%;
		background-image: url("@/assets/images/bigscreen_pro/bg_number_big.png"); /* 替换为自己的图片路径 */
		background-repeat: no-repeat;
		background-size: 70% 100%;
		background-attachment: fixed;
		margin: 16px 20px 0 20px;
		display: flex;
		flex-direction: row;
		align-items: center;
		.gk-left {
			padding: 24px 20px 24px 10px;
			.cat-title-up {
				color: #9fbcdd;
				font-size: 16px;
				margin-top: 4px;
				font-family: 'sm';
			}
			.cat-title-down {
				color: #ffffff;
				font-size: 16px;
				margin-top: 4px;
				font-family: 'sm';
				padding: 0 7px;
				background-image: url("@/assets/images/bigscreen_pro/icon_online_car.png"); /* 替换为自己的图片路径 */
				background-repeat: no-repeat;
				background-size: 100% 100%;
				background-attachment: fixed;
			}
			.car-number {
				background: linear-gradient(to top, #92CBFF, #ffffff);
				-webkit-background-clip: text; /* Safari/Chrome需要添加此属性才能正常显示背景渐变效果 */
				color: transparent; /* 将文本设置为透明，只保留背景渐变效果 */
				font-size: 28px;
				font-weight: bold;
				font-family: 'dr';
				margin: 0 8px;
			}
			.car-unit {
				color: #9fbcdd;
				font-size: 16px;
				margin-top: 4px;
			}
		}
		.pie-chart {
			margin-top: 8px;
		}
		.pie-data {
			padding-left: 20px;
			display: flex;
			flex-direction: column;
			.pie-data-title {
				color: #9fbcdd;
				font-size: 16px;
			}
			.pie-data-value {
				font-size: 12px;
				margin-left: 4px;
				border-radius: 2px;
				padding: 1px 4px;
			}
			.pie-data-unit {
				font-size: 16px;
				color: #9fbcdd;
				margin-left: 6px;
			}
			.pie-data-up {
				flex: 1;
				.up-value {
					color: #57e0f0;
					font-size: 26px;
					font-weight: bold;
					font-family: 'dr';
				}
			}
			.pie-data-down {
				flex: 1;
				margin-top: 6px;
				.down-value {
					background: linear-gradient(to top, #92CBFF, #ffffff);
					-webkit-background-clip: text; /* Safari/Chrome需要添加此属性才能正常显示背景渐变效果 */
					color: transparent; /* 将文本设置为透明，只保留背景渐变效果 */
					font-size: 26px;
					font-weight: bold;
					font-family: 'dr';
				}
			}
		}
	}
}
</style>
