<template>
	<a-spin :spinning="loadSpinning">
		<div class="headBilling">
			<div class="headBillingItemDiv" v-for="(item, index) in '' + billingHz.chargeAmount" :key="index">
				<div class="headBillingItemFh" v-if="item == ',' || item == '.'">{{ item }}</div>
				<div class="headBillingItem" v-else>{{ item }}</div>
			</div>
			<div class="headBillingItemDw">元</div>
		</div>
		<div class="headMileage">
			<div class="headBillingItemDiv" v-for="(item, index) in '' + billingHz.chargeDistance" :key="index">
				<div class="headBillingItemFh" v-if="item == ',' || item == '.'">{{ item }}</div>
				<div class="headBillingItem" v-else>{{ item }}</div>
			</div>
			<div class="headBillingItemDw">公里</div>
		</div>
	</a-spin>
</template>

<script setup name="ItemHead">
	import bigscreenApi from '@/api/billing/bigscreenApi'
	const billingHz = ref({})
	const loadSpinning = ref(false)
	const queryParam = ref()

	const onOpen = (param) => {
		loadSpinning.value = true
		queryParam.value = param

		queryBillingHz()

		window.setInterval(function () {
			queryBillingHz()
			console.log('每隔3秒钟执行一次')
		}, 3000)
	}

	const queryBillingHz = () => {
		bigscreenApi.billingHz(queryParam.value).then((data) => {
			if (data) {
				console.log(data)
				// billingHz.value = data
				billingHz.value.chargeAmount = addCommas(PrefixInteger(data.chargeAmount.toFixed(2), 13))
				billingHz.value.chargeDistance = addCommas(PrefixInteger(data.chargeDistance.toFixed(2), 13))
			}
			loadSpinning.value = false
		})
	}

	const PrefixInteger = (num, length) => {
		if (num.length > length) {
			length = num.length
		}
		return (Array(length).join('0') + num).slice(-length)
	}

	const addCommas = (num) => {
		return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
	}

	defineExpose({
		onOpen
	})
</script>
<style lang="less">
	.headBilling {
		z-index: 100;
		position: absolute;
		top: 48px;
		left: 20px;
	}

	.headMileage {
		z-index: 100;
		position: absolute;
		top: 48px;
		right: 20px;
	}

	.headBillingItemDiv {
		height: 45px;
		text-align: center;
		margin-left: 3px;
		display: inline-block;
		vertical-align: middle;
		font-weight: bold;
		font-size: 30px;
	}

	.headBillingItem {
		background: #fff;
		border-radius: 3px;
		width: 38px;
		height: 45px;
		line-height: 45px;
		color: #589efc;
		font-weight: bold;
		font-size: 45px;
	}

	.headBillingItemFh {
		width: 8px;
		color: #ffffff;
		font-weight: bold;
		font-size: 30px;
	}

	.headBillingItemDw {
		height: 45px;
		margin-left: 8px;
		display: inline-block;
		color: #589efc;
		font-weight: bold;
		font-size: 14px;
		color: #fff;
		line-height: 70px;
		vertical-align: bottom;
	}
</style>
