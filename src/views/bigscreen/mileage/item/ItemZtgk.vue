<template>
	<a-spin :spinning="loadSpinning">
		<div class="car-total-box" :style="{ height: `${boxHeigth}px` }">
			<div class="online-car-box tab-box border-box bg-blue-white">
				<div class="icon-box">
					<BranchesOutlined />
				</div>
				<div>
					<h1>行程</h1>
					<p class="number">{{ bigScreenZtgk.xcCount }} <span>笔</span></p>
				</div>
			</div>
			<div class="registered tab-box border-box bg-blue-white">
				<div class="icon-box"><CreditCardOutlined /></div>
				<div>
					<h1>账单</h1>
					<p class="number">{{ bigScreenZtgk.zdCount }} <span>笔</span></p>
				</div>
			</div>
			<div class="bg-blue-white bottom-box">
				<div class="onlined tab-box" style="width: 40%">
					<div class="icon-box"><CarOutlined /></div>
					<div>
						<h1>平台接入车辆数</h1>
						<p class="number">{{ bigScreenZtgk.vehicleCount }} <span>辆</span></p>
					</div>
				</div>
				<div style="width: 62%; margin-top: 10px">
					<BingZhuangTu03 ref="BingZhuangTu03Ref"></BingZhuangTu03>
				</div>
			</div>
		</div>
	</a-spin>
</template>

<script setup name="itemZtgk">
	import bigscreenApi from '@/api/billing/bigscreenApi'
	import BingZhuangTu03 from './BingZhuangTu03.vue'
	const BingZhuangTu03Ref = ref()
	const loadSpinning = ref(false)
	const bigScreenZtgk = ref({})
	const queryParam = ref()
	const boxHeigth = ref()

	const onOpen = (record) => {
		loadSpinning.value = true
		boxHeigth.value = record.boxHeigth - 50

		queryParam.value = record
		// 需要打开的
		queryBigScreenZtgk()
		window.setInterval(function () {
			queryBigScreenZtgk()
		}, 5000)
	}

	const queryBigScreenZtgk = () => {
		bigscreenApi.queryBigScreenZtgk(queryParam.value).then((data) => {
			if (data) {
				bigScreenZtgk.value = data
				BingZhuangTu03Ref.value.onOpen(data)
			}
			loadSpinning.value = false
		})
	}

	defineExpose({
		onOpen
	})
</script>
<style lang="less">
	.car-total-box {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		cursor: pointer;
		box-sizing: border-box;
		margin-top: 5px;
		.bg-blue-white {
			background: linear-gradient(to right, #1890ff22, #1890ff11, #1890ff00) left top no-repeat;
		}
		.border-box.bg-blue-white {
			background: linear-gradient(to right, #589efc, #589efc) left top no-repeat,
				linear-gradient(to bottom, #589efc, #589efc) left top no-repeat,
				linear-gradient(to left, #589efc, #589efc) right top no-repeat,
				linear-gradient(to bottom, #589efc, #589efc) right top no-repeat,
				linear-gradient(to right, #589efc, #589efc) left bottom no-repeat,
				linear-gradient(to top, #589efc, #589efc) left bottom no-repeat,
				linear-gradient(to left, #589efc, #589efc) right bottom no-repeat,
				linear-gradient(to left, #589efc, #589efc) right bottom no-repeat,
				linear-gradient(to right, #1890ff22, #1890ff11, #1890ff00) left top no-repeat;
			background-size: 2px 10px, 10px 2px, 2px 10px, 10px 2px, 2px 10px, 10px 2px, 2px 10px, 10px 2px, 100%;
		}
		.tab-box {
			box-sizing: border-box;
			display: flex;
			align-items: center;
			width: 48%;
			padding-left: 12px;
			height: 86px;
			.icon-box {
				margin-right: 20px;
				width: 50px;
				height: 50px;
				background: #589efc;
				border-radius: 50%;
				line-height: 50px;
				font-size: 20px;
				text-align: center;
				color: white;
			}
			h1 {
				font-size: 14px;
				font-weight: bold;
				color: #666666fc;
				line-height: 24px;
				margin-bottom: 5px;
			}
			p.number {
				font-size: 35px;
				font-family: DIN;
				font-weight: 500;
				color: black;
				line-height: 32px;
				white-space: nowrap;
				margin: 0;
				span {
					font-size: 14px;
					font-weight: 500;
					color: #333333fc;
					line-height: 24px;
				}
			}
		}
		.bottom-box {
			width: 100%;
			vertical-align: middle;
			margin-bottom: 25px;
			display: flex;
			align-items: center;
			.tab-box {
				padding-left: 12px;
				.icon-box {
					box-sizing: content-box;
					border-radius: 0%;
					border: double;
					color: #589efc;
					background: linear-gradient(to right, #589efc, #589efc) left top no-repeat,
						linear-gradient(to bottom, #589efc, #589efc) left top no-repeat,
						linear-gradient(to left, #589efc, #589efc) right top no-repeat,
						linear-gradient(to bottom, #589efc, #589efc) right top no-repeat,
						linear-gradient(to right, #589efc, #589efc) left bottom no-repeat,
						linear-gradient(to top, #589efc, #589efc) left bottom no-repeat,
						linear-gradient(to left, #589efc, #589efc) right bottom no-repeat,
						linear-gradient(to left, #589efc, #589efc) right bottom no-repeat,
						linear-gradient(to right, white, white) left no-repeat;
					background-size: 1px 5px, 5px 1px, 1px 5px, 5px 1px, 1px 5px, 5px 1px, 1px 5px, 5px 1px, 100%;
				}
			}
		}
	}
</style>
