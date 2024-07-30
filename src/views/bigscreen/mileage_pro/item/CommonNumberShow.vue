<template>
<div class="chart-show-number">
	<div class="item">
		<div class="title left-title"><span>实时计费</span></div>
		<div class="number-value left-title-unit">{{ showNumber(chargeAmount) }}</div>
	</div>
	<div class="item">
		<div class="title right-title">实时公里</div>
		<div class="number-value  right-title-unit">{{ showNumber(chargeDistance) }}</div>
	</div>
</div>
</template>

<script setup>
import tool from '@/utils/tool'
import bigscreenApi from "@/api/billing/bigscreenApi";
const loadSpinning = ref(false)
const showNumber = (number) => {
	const tempNumber = Number(number).toFixed(2)
	const fixNumberLength = tempNumber.toString().length
	return tool.groupSeparator(`${Array(14-fixNumberLength).join('0')}${tempNumber}`).toString()
}

let requestParam = null
let interval = null

let chargeAmount = ref(0)
let chargeDistance = ref(0)

const onOpen = (param) => {
	loadSpinning.value = true
	requestParam = param
	queryBillingHz()
	if (interval !== null) {
		clearInterval(interval)
	}
	interval = setInterval(function () {
		queryBillingHz()
	}, 5000)
}

const queryBillingHz = () => {
	bigscreenApi.billingHz(requestParam).then((data) => {
		if (data) {
			chargeAmount.value = data.chargeAmount
			chargeDistance.value = data.chargeDistance
		}
		loadSpinning.value = false
	})
}

defineExpose({
	onOpen
})

</script>

<style lang="less" scoped>
.chart-show-number {
	display: flex;
	flex-direction: row;
	height: 100%;
	.item {
		padding: 10px 20px;
		flex: 1;
		align-items: center;
		.title {
			text-align: left;
			font-size: 22px;
			font-family: 'sm';
			padding-left: 12px;
			padding-top: 0;
			color: #d6eafd;
		}
		.left-title {
			background-image: url("@/assets/images/bigscreen_pro/show_number_left.png"); /* 替换为自己的图片路径 */
			background-repeat: no-repeat;
			background-position: left top;
		}
		.right-title {
			background-image: url("@/assets/images/bigscreen_pro/show_number_right.png"); /* 替换为自己的图片路径 */
			background-repeat: no-repeat;
			background-position: left top;
		}
	}
	.number-value {
		font-size: 44px;
		font-weight: bold;
		font-family: 'dr';
		margin-left: 10px;
		position: absolute;
	}
	.left-title-unit {
		background: linear-gradient(to top, #92CBFF, #ffffff);
		-webkit-background-clip: text; /* Safari/Chrome需要添加此属性才能正常显示背景渐变效果 */
		color: transparent; /* 将文本设置为透明，只保留背景渐变效果 */
		&::after {
			content: '元';
			font-weight: bold;
			font-family: 'dr';
			color: #F6F9FC;
			font-size: 14px;
			margin-left: 6px;
		}
	}
	.right-title-unit {
		background: linear-gradient(to top, #97FEEC, #ffffff);
		-webkit-background-clip: text; /* Safari/Chrome需要添加此属性才能正常显示背景渐变效果 */
		color: transparent; /* 将文本设置为透明，只保留背景渐变效果 */
		&::after {
			content: '公里';
			font-weight: bold;
			font-family: 'dr';
			color: #F6F9FC;
			font-size: 14px;
			margin-left: 6px;
		}
	}
}
</style>
