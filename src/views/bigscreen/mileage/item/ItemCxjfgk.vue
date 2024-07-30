<template>
	<a-spin :spinning="loadSpinning">
		<a-row>
			<a-col :span="16">
				<div id="ZhuZhuangTu01" :style="{ height: `${boxHeigth}px` }"></div>
			</a-col>
			<a-col :span="8">
				<div style="padding: 0px 10px 10px 0px">
					<div v-for="item in jfDataList" :key="item.title" class="title">
						<div
							class="title-top"
							:style="{
								background: `linear-gradient(to right, ${item.color}33, white)`,
								color: item.color
							}"
						>
							<div
								class="component"
								:style="{
									border: `solid ${item.color}33 2px`
								}"
							>
								<component :is="item.component" />
							</div>
							<h5 :style="{ color: item.color }">{{ item.title }}</h5>
						</div>
						<div class="legend-box">
							<a-space class="spanValue"
								><span>{{ item.vehicle }} </span></a-space
							><a-space class="spanValueDw">元</a-space>
						</div>
					</div>
				</div>
			</a-col>
		</a-row>
	</a-spin>
</template>

<script setup name="itemCxjfgk">
	import bigscreenApi from '@/api/billing/bigscreenApi'
	import { Column } from '@antv/g2plot'
	import tool from '@/utils/tool'
	const loadSpinning = ref(false)
	const jfDataList = ref([])
	const boxHeigth = ref()

	const vehicleTypeOptions = tool.dictList('vehicleType')
	const onOpen = (record) => {
		loadSpinning.value = true

		boxHeigth.value = record.boxHeigth - 80

		let kcBilling = 0
		let hcBilling = 0
		let zxBilling = 0
		let hj = 0

		console.log(boxHeigth)

		bigscreenApi.queryBillingByRoadType(record).then((data) => {
			let dataArray = []
			let num = 0
			if (data) {
				// data.forEach((v) => {
				// 	vehicleTypeOptions.forEach((value) => {
				// 		if (v.type == value.value) {
				// 			dataArray.push({ name: value.label, value: v.billing })
				// 		}
				// 	})
				//
				// 	if (v.type < 10) {
				// 		kcBilling = kcBilling + v.billing
				// 	} else if (v.type < 20) {
				// 		hcBilling = hcBilling + v.billing
				// 	} else if (v.type < 30) {
				// 		zxBilling = zxBilling + v.billing
				// 	}
				// })

				vehicleTypeOptions.forEach((value) => {
					data.forEach((v) => {
						if (v.type == value.value) {
							if (value.label.includes('专项作业车')) {
								num += v.billing
							} else {
								dataArray.push({ name: value.label, value: v.billing })
							}
						}
					})
				})

				data.forEach((v) => {
					if (v.type < 10) {
						kcBilling = kcBilling + v.billing
					} else if (v.type < 20) {
						hcBilling = hcBilling + v.billing
					} else if (v.type < 30) {
						zxBilling = zxBilling + v.billing
					}
				})
				// if (num > 0) {
				dataArray.push({ name: '专项作业车', value: num })
				// }

				createZzt(dataArray)

				hj = kcBilling + hcBilling + zxBilling
				jfDataList.value = [
					{
						title: '客车',
						vehicle: kcBilling.toFixed(2),
						ratio: ((kcBilling / hj) * 100).toFixed(2),
						color: '#5ea2fc',
						component: 'CarOutlined'
					},
					{
						title: '货车',
						vehicle: hcBilling.toFixed(2),
						ratio: ((hcBilling / hj) * 100).toFixed(2),
						color: '#00c297',
						component: 'SplitCellsOutlined'
					},
					{
						title: '专项作业车',
						vehicle: zxBilling.toFixed(2),
						ratio: ((zxBilling / hj) * 100).toFixed(2),
						color: '#f59a23',
						component: 'AlertOutlined'
					}
				]
			}
			loadSpinning.value = false
		})
	}
	const createZzt = (data) => {
		document.getElementById('ZhuZhuangTu01').innerHTML = ''
		const columnPlot = new Column('ZhuZhuangTu01', {
			data,
			xField: 'name',
			yField: 'value',
			autoFit: false,
			height: boxHeigth.value,
			maxColumnWidth: 15,
			label: {},
			xAxis: {
				label: {
					fill: 'linear-gradient(to right, #33ccff, #ff99cc)',
					autoHide: false,
					autoRotate: true
				}
			},
			meta: {
				type: {
					alias: '计费车型'
				},
				sales: {
					alias: '计费金额'
				}
			},
			tooltip: {
				trigger: 'item',
				formatter: (v) => ({
					// name: v.name,
					name: '计费金额',
					value: v.value + ' 元'
				})
			}
		})

		columnPlot.render()
	}

	defineExpose({
		onOpen
	})
</script>
<style lang="less">
	.title {
		.title-top {
			* {
				display: inline-block;
			}
			margin-top: 10px;
			height: 30px;
			line-height: 30px;
			h5 {
				padding-left: 10px;
			}
			.component {
				border: solid white 2px;
				font-size: 16px;
				height: 30px;
				width: 30px;
				text-align: center;
				background: linear-gradient(to right, white, white) left center no-repeat,
					linear-gradient(to bottom, white, white) top center no-repeat,
					linear-gradient(to left, white, white) right center no-repeat,
					linear-gradient(to bottom, white, white) bottom center no-repeat;
				background-size: 2px 22px, 22px 2px, 2px 22px, 22px 2px;
			}
		}
		.legend-box {
			height: 30px;
			line-height: 30px;
			text-align: center;
			padding-top: 5px;
			.spanValue {
				font-size: 18px;
			}

			.spanValueDw {
				font-size: 15px;
			}
		}
	}
</style>
