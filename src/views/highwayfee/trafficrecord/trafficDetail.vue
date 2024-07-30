<template>
	<a-card class="record-detail" :bordered="false" :destroy-on-close="true" @close="onClose">
		<div style="padding-bottom: 2px; display: flex; justify-content: space-between">
			<span class="title">通行记录明细</span>
			<a-button style="margin-right: 8px" @click="onClose">返回</a-button>
		</div>
		<a-row :gutter="20">
			<a-col :span="7">
				<div class="detail-top">
					<div class="plate-number">
						<span :class="'big-plateColor-text big-plateColor-' + detailData.vehiclePlateColor">{{
							detailData.vehiclePlate
						}}</span>
						<span style="font-size: 14px; color: #001529">
							<span>全年累计</span>
							<span style="color: #00a897; font-size: 26px; font-weight: bold">{{
								$TOOL.changgeKilometers(detailData.yearMileage)
							}}</span>
							<span> 公里</span>
						</span>
					</div>
					<div style="padding-top: 10px">
						<span v-for="vehicleType in vehicleTypeOptions" :key="vehicleType.value">
							<span class="common-tag" v-if="`${vehicleType.value}` === `${detailData.vehicleType}`">{{
								vehicleType.label
							}}</span>
						</span>
						<span v-for="vehicleClass in vehicleClassOptions" :key="vehicleClass.value">
							<span class="common-tag" v-if="`${vehicleClass.value}` === `${detailData.vehicleClass}`">{{
								vehicleClass.label
							}}</span>
						</span>
					</div>
					<div class="radio-choose-father">
						<a-radio-group class="radio-choose-fee" v-model:value="radioContent" button-style="solid">
							<a-radio-button class="radio-choose-fee-item" value="fee_info">费用明细</a-radio-button>
							<a-radio-button class="radio-choose-fee-item" value="record_info">通行记录</a-radio-button>
						</a-radio-group>
					</div>
				</div>
				<!--费用明细tab页-->
				<div v-if="radioContent === 'fee_info'" class="radio-left">
					<div class="left-title">通行记录详情</div>
					<div style="padding: 10px 0; border-bottom: 0.5px solid #e8eef3">
						<div class="left-key-value">
							<span class="left-common-key">通行记录编号</span
							><span class="left-common-value">{{ detailData.traRecId || '--' }}</span>
						</div>
						<div class="left-key-value">
							<span class="left-common-key">账单编号</span
							><span class="left-common-value">{{ detailData.settlementId || '--' }}</span>
						</div>
						<div class="left-key-value">
							<span class="left-common-key">计费里程（公里）</span
							><span class="left-common-value">{{ $TOOL.changgeKilometers(detailData.chargeDistance) }}</span>
						</div>
						<div class="left-key-value">
							<span class="left-common-key">计费金额（元）</span
							><span class="left-common-value">{{ $TOOL.changeMoney(detailData.chargeAmount) }}</span>
						</div>
						<div class="left-key-value">
							<span class="left-common-key">优惠金额（元）</span
							><span class="left-common-value">{{ $TOOL.changeMoney(detailData.discountAmount) }}</span>
						</div>
						<div class="left-key-value">
							<span class="left-common-key">应收金额（元）</span
							><span style="font-size: 16px" class="left-common-value">{{
								$TOOL.changeMoney(detailData.actualAmount)
							}}</span>
						</div>
						<div class="left-key-value">
							<span class="left-common-key">创建时间</span
							><span class="left-common-value">{{ detailData.createTime || '--' }}</span>
						</div>
						<div class="left-key-value">
							<span class="left-common-key">终端报文ID</span
							><span class="left-common-value">{{ detailData.terminalMessageId || '--' }}</span>
						</div>
					</div>
					<div class="left-title">起止详情</div>
					<div style="padding: 20px 0 10px 0">
						<div class="left-key-value driver">
							<span style="flex: 1"><span class="show-pointer" /><span class="left-common-key">计费起点</span></span
							><span class="left-common-value">{{ detailData.startAddress || '--' }}</span>
						</div>
						<div class="left-key-value driver">
							<span style="margin-left: 14px" class="left-common-key">开始时间</span
							><span class="left-common-value">{{ detailData.startTime || '--' }}</span>
						</div>
						<div style="height: 24px"></div>
						<div class="left-key-value driver">
							<span style="flex: 1"
								><span style="background: #fe9344" class="show-pointer" /><span class="left-common-key"
									>计费终点</span
								></span
							><span class="left-common-value">{{ detailData.endAddress || '--' }}</span>
						</div>
						<div class="left-key-value driver">
							<span style="margin-left: 14px" class="left-common-key">结束时间</span
							><span class="left-common-value">{{ detailData.endTime || '--' }}</span>
						</div>
					</div>
				</div>
				<!--通行记录tab页-->
				<div style="padding: 10px 0" v-if="radioContent === 'record_info'" class="radio-left">
					<a-list
						class="radio-left-list"
						item-layout="horizontal"
						:data-source="listRecordData"
						:pagination="pagination"
						:split="false"
					>
						<template #renderItem="{ item }">
							<a-list-item class="left-list-item">
								<div @click="addRoadHighlight(item.vehicleId, item.startTime, item.endTime)">
									<div style="display: flex; align-items: center; justify-content: space-between; width: 100%">
										<span>
											<img class="list-icon" src="/src/assets/images/uiUpdate/icon_navigation.png" alt="" />
											<span class="list-title">{{ item.intervalCode || item.crossCode }}</span>
											<span class="list-title">{{ item.intervalName || item.crossName }}</span>
										</span>
										<a-button @click="showDetail(item.id)" style="width: 20%" type="link">查看详情</a-button>
									</div>
									<div class="time-show">
										<span style="margin-left: 12px"
											><a-tag color="#009900" style="width: 40px">{{
												$TOOL.dictTypeData('highwayType', item.highwayType.toString())
											}}</a-tag></span
										>
										<span style="margin-left: 12px"
											><a-tag color="#2db7f5" style="width: 40px">{{
												$TOOL.dictTypeData('feeBasis', item.feeBasis.toString())
											}}</a-tag></span
										>
										<span style="margin-left: 12px" v-if="item.direction"
											><a-tag color="#108ee9" style="width: 40px">{{
												$TOOL.dictTypeData('IS_UP_DOWN', item.direction.toString())
											}}</a-tag></span
										>
										<span style="margin-left: 30px"
											>起止时间：{{ timeChange(item.startTime) }}-{{ timeChange(item.endTime) }}</span
										>
									</div>
									<div class="money-father">
										<div class="content">
											<div class="con-title">计费里程(公里)</div>
											<div>{{ $TOOL.changgeKilometers(item.chargeDistance) }}</div>
										</div>
										<div class="content">
											<div class="con-title">优惠金额(元)</div>
											<div>{{ $TOOL.changeMoney(item.discountAmount) }}</div>
										</div>
										<div class="content">
											<div class="con-title">计费费率(元/公里)</div>
											<div>{{ $TOOL.changeRate(item.rateValue) }}</div>
										</div>
										<div class="content">
											<div class="con-title">计费金额(元)</div>
											<div>{{ $TOOL.changeMoney(item.chargeAmount) }}</div>
										</div>
									</div>
								</div>
							</a-list-item>
						</template>
					</a-list>
				</div>
			</a-col>
			<a-col style="height: 732px; padding: 0" :span="17">
				<gaode-map style="height: 650px; width: 100%" ref="map" api-key="94bd11195a06ec51f597ee0fd4205332" />

				<div style="height: 80px; padding-top: 10px">
					<div style="color: #4d4d4d; padding-bottom: 4px; font-size: 14px">轨迹回放</div>
					<a-button type="primary" @click="markerCARmoveAnimation('move')">开始回放</a-button>
					<a-button style="margin-left: 20px" type="primary" @click="markerCARmoveAnimation('pauseMove')"
						>暂停回放</a-button
					>
					<a-button style="margin-left: 20px" type="primary" @click="markerCARmoveAnimation('resumeMove')"
						>继续播放</a-button
					>
					<a-button style="margin-left: 20px" type="primary" @click="markerCARmoveAnimation('stopMove')"
						>停止回放</a-button
					>
					<a-radio-group
						button-style="solid"
						v-model:value="radioSpeedType"
						style="margin-left: 40px"
						@change="paneChangeRoadType"
					>
						<a-radio-button value="0">低速</a-radio-button>
						<a-radio-button value="1">中速</a-radio-button>
						<a-radio-button value="2">高速</a-radio-button>
					</a-radio-group>
				</div>
			</a-col>
		</a-row>
	</a-card>
	<RoadDetail ref="formRef" />
</template>

<script setup name="billingtrafficDetail">
	import highwayfeeTrafficRecordApi from '@/api/highwayfee/highwayfeeTrafficRecordApi'
	import highwayfeeroad from '@/api/highwayfee/highwayfeeroad'
	import RoadDetail from '@/views/highwayfee/road/detail2.vue'
	import tool from '@/utils/tool'
	import moment from 'moment'
	import { message } from 'ant-design-vue'
	const radioContent = ref('fee_info') // 费用明细 和 通行记录 选择
	const listRecordParams = {
		current: 1,
		size: 3,
		first: true,
		sort: 1,
		trafficId: ''
	} // 通行记录列表数据
	const formRef = ref() // 侧拉 详情
	const isShowTable = ref(true)
	const listRecordData = ref([]) // 通行记录列表数据
	let detailData = ref({}) // 详情数据
	const vehicleTypeOptions = tool.dictList('vehicleType') //车辆类型
	const vehicleClassOptions = tool.dictList('vehicleClass') //车种
	const etcVehicleColorOptions = tool.dictList('etcVehicleColor') //车辆颜色
	const lineArr = ref([]) // 轨迹点 集合
	const map = ref(null) // 地图 实例
	import wgs84togcj02 from '@/api/billing/wgs84togcj02'
	const emit = defineEmits({ successful: null })
	const radioSpeedType = ref(0) //轨迹回放的速度
	const onClose = () => {
		settlementShow.value = false
		emit('successful')
	}
	const settlementShow = ref(true)
	const props = defineProps({
		record: {
			type: Object,
			default: () => ({})
		}
	})

	const paneChangeRoadType = (speed) => {
		radioSpeedType.value = speed.target.value
	}

	const onOpen = () => {
		radioContent.value = 'fee_info'
		map.value.init()
		// 接口获取详情数据
		highwayfeeTrafficRecordApi
			.trafficRecordDetail({
				id: props.record.value.traRecId
			})
			.then((data) => {
				if (data) {
					detailData.value = data
					// 通行记录
					listRecordParams.trafficId = props.record.value.traRecId
					getBillingRoadDetailPage()
				}
			})
		setTimeout(() => {
			queryPoint(props.record.value)
		}, 1000)
	}

	const addRoadHighlight = (vehicleId, startTime, endTime) => {
		if (startTime == null || endTime == null || vehicleId == null) {
			return
		}
		highwayfeeTrafficRecordApi
			.trafficRecordQueryMatchTracks({
				vehicleId: vehicleId,
				startTime: startTime,
				endTime: endTime
			})
			.then((data) => {
				if (null != data && data.length > 0) {
					let lineArr = []
					data.forEach((v) => {
						lineArr.push({ position: wgs84togcj02.wgs84togcj02(v.oriLon, v.oriLat) })
					})
					if (lineArr.length <= 1) {
						message.warning('仅有一个定位点，无法设置高亮')
					}
					//轨迹绘制
					map.value.renderPolylineRoad(lineArr, { strokeColor: 'blue', strokeWeight: 5 })
				}
			})
	}
	let pagination = {
		showSizeChanger: false,
		total: 0,
		onChange: (page) => {
			listRecordParams.current = page
			getBillingRoadDetailPage()
		},
		pageSize: 3
	}
	// 获取明细列表
	const getBillingRoadDetailPage = () => {
		listRecordParams.sort = 2
		highwayfeeroad.page(listRecordParams).then((data) => {
			listRecordParams.first = false
			listRecordData.value = data.records
			pagination.total = data.total
		})
	}
	// 侧拉 详情
	const showDetail = (id) => {
		isShowTable.value = false
		formRef.value.onOpen({ id })
	}

	// 查询地图轨迹
	const queryPoint = (record) => {
		let endaddr = '终点'
		let fontSize = '12px'
		if (!record.endTime) {
			endaddr = '行驶中'
			fontSize = '10px'
		}
		highwayfeeTrafficRecordApi
			.trafficRecordQueryMatchTracks({
				vehicleId: record.vehicleId,
				startTime: record.startTime,
				endTime: record.endTime,
				source: record.vehicleSource
			})
			.then((data) => {
				if (null != data && data.length > 0) {
					lineArr.value = data.map((ma) => wgs84togcj02.wgs84togcj02(ma.oriLon, ma.oriLat))
					setTimeout(() => {
						//轨迹绘制
						map.value.renderPolyline(lineArr.value, { strokeColor: 'red', strokeWeight: 10 })
					}, 500)

					if (lineArr.value.length === 1) {
						map.value.renderSimpleMarker([
							{
								position: lineArr.value[0],
								label: '单点',
								labelStyle: { color: '#fff', fontSize: '12px' },
								style: 'red'
							}
						])
					} else {
						map.value.renderSimpleMarker([
							{
								position: lineArr.value[0],
								label: '起点',
								labelStyle: { color: '#fff', fontSize: '12px' },
								style: 'green'
							},
							{
								position: lineArr.value[lineArr.value.length - 1],
								label: endaddr,
								labelStyle: { color: '#fff', fontSize: fontSize },
								style: 'red'
							}
						])
					}
				}
			})
	}

	// 轨迹回放
	const markerCARmoveAnimation = (value) => {
		if ('move' === value) {
			map.value.remove()
			//轨迹绘制
			map.value.renderSimpleMarkerCAR(lineArr.value[0])
		}
		map.value.markerCARmoveAnimation(value, lineArr.value, radioSpeedType.value)
	}

	/**
	 * 费率分米转换元公里
	 */
	const timeChange = (value) => {
		if (value) {
			return moment(String(value)).format('HH:mm:ss')
		}
	}

	defineExpose({
		onOpen
	})
</script>

<style lang="less" scoped>
	.ant-col-7 {
		display: block;
		flex: 0 0 40%;
		max-width: 40%;
	}
	.ant-col-17 {
		display: block;
		flex: 0 0 60%;
		max-width: 60%;
	}
	.record-detail {
		height: 106%;
		padding-right: 20px;
		.title {
			font-size: 15px;
			color: #3e5061;
			font-weight: bold;
			padding-bottom: 12px;
		}
		.title::before {
			content: '';
			margin-right: 5px;
			border-left: 3px solid #57e8c8;
			font-size: 12px;
		}
		.detail-top {
			background-image: url('/src/assets/images/uiUpdate/pic_carcard_detail.png');
			background-size: 100% 100%;
			border-radius: 6px;
			padding: 12px 22px 20px 22px;
			.plate-number {
				display: flex;
				justify-content: space-between;
				align-items: baseline;
			}
			.common-tag {
				background: white;
				border-radius: 4px;
				color: #55677e;
				padding: 2px 6px;
				margin-right: 8px;
			}
			.radio-choose-father {
				margin-top: 24px;
				background: white;
				padding: 4px 8px;
				.radio-choose-fee {
					width: 100%;
					.radio-choose-fee-item {
						width: 50%;
						text-align: center;
						border: none;
					}
					.radio-choose-fee-item:hover {
						color: black;
						font-weight: bold;
					}
					.ant-radio-button-wrapper-checked {
						background: linear-gradient(to right, #00000000, #d7f2fa, #00000000);
						color: black;
						border: none;
						font-weight: bold;
					}
					.ant-radio-button-wrapper-checked::before {
						background: #e8eef3;
					}
				}
			}
		}
		.radio-left {
			border: 0.5px solid #e8eef3;
			border-radius: 8px;
			margin-top: 12px;
			height: 546px;
			overflow: hidden;
			.left-title {
				color: #333333;
				border-bottom: 0.5px solid #e8eef3;
				padding: 10px 0 10px 16px;
				font-weight: bold;
				font-size: 15px;
			}
			.left-key-value {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 5px 16px;
				font-size: 13px;
				.left-common-key {
					color: #8c8c8c;
					flex: 1;
				}
				.left-common-value {
					color: black;
					font-weight: 500;
					overflow: hidden;
					text-overflow: ellipsis;
					flex: 2;
					word-break: break-word;
					text-align: end;
				}
				.show-pointer {
					display: inline-block;
					background: #25cb86;
					width: 10px;
					height: 10px;
					border-radius: 5px;
					margin-right: 4px;
				}
			}
			.driver {
				padding: 0 16px;
			}
			.radio-left-list {
				height: 346px;
				padding: 3px 18px;
				width: 100%;
				.left-list-item {
					padding-bottom: 0;
					padding-top: 10px;
					cursor: pointer;
					.list-icon {
						width: 20px;
						height: 20px;
					}
					.list-title {
						font-size: 15px;
						font-weight: bold;
						color: #001529;
						margin-left: 6px;
						overflow: hidden;
						text-overflow: ellipsis;
					}
					.time-show {
						margin-left: 15px;
						font-size: 14px;
						color: #8c8c8c;
					}
					.money-father {
						display: flex;
						text-align: center;
						width: 100%;
						font-size: 14px;
						padding: 3px 0;
						margin: 4px 0 0 0;
						.content {
							flex: 1;
							border: 1px solid #edeff2;
							border-radius: 4px;
							margin: 0 1px;
							padding: 2px;
							.con-title {
								background: #f5f9fc;
								border-radius: 2px;
								color: #8c8c8c;
								font-size: 12px;
								padding: 3px 0;
							}
						}
					}
				}
			}
		}
		.ant-list * {
			width: 100%;
		}
	}
</style>
