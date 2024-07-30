<template>
	<a-spin :spinning="loadSpinning">
		<a-card :bordered="false" :visible="visible">
			<span class="titleItem"><b>道路信息</b></span>
			<a-card>
				<a-form layout="horizontal">
					<a-row>
						<a-col :span="6"></a-col>
						<a-col :span="9">
							<a-form-item label="所属道路：">
								<span class="form-inside-span-content">{{ detail.roadName }}</span>
							</a-form-item>
						</a-col>
						<a-col :span="9">
							<a-form-item label="所属路段：">
								<span class="form-inside-span-content">{{ detail.sectionName }}</span>
							</a-form-item>
						</a-col>
					</a-row>
					<a-row>
						<a-col :span="6"></a-col>
						<a-col :span="9">
							<a-form-item label="所属市/县：">
								<span class="form-inside-span-content"></span>
							</a-form-item>
						</a-col>
						<a-col :span="9">
							<a-form-item label="方向：">
								<span class="form-inside-span-content">{{ detail.upDown }}</span>
							</a-form-item>
						</a-col>
					</a-row>
				</a-form>
			</a-card>
			<span class="titleItem"><b>附属设施信息</b></span>
			<a-card>
				<a-form layout="horizontal">
					<a-row>
						<a-col :span="6"> </a-col>
						<a-col :span="9">
							<a-form-item label="设施编码：">
								<span class="form-inside-span-content">{{ detail.upDown }}</span>
							</a-form-item>
						</a-col>
						<a-col :span="9">
							<a-form-item label="附属设施名称：">
								<span class="form-inside-span-content">{{ detail.name }}</span>
							</a-form-item>
						</a-col>
					</a-row>
					<a-row>
						<a-col :span="6"></a-col>
						<a-col :span="9">
							<a-form-item label="设施类型：">
								<span class="form-inside-span-content">{{ detail.type }}</span>
							</a-form-item>
						</a-col>
						<a-col :span="9">
							<a-form-item label="经纬度：">
								<span class="form-inside-span-content">{{ detail.longitude }},{{ detail.latitude }}</span>
							</a-form-item>
						</a-col>
					</a-row>
					<a-row>
						<a-col :span="6"></a-col>
						<a-col :span="9">
							<a-form-item label="联系人：">
								<span class="form-inside-span-content"></span>
							</a-form-item>
						</a-col>
						<a-col :span="9">
							<a-form-item label="联系电话：">
								<span class="form-inside-span-content"></span>
							</a-form-item>
						</a-col>
					</a-row>
					<a-row :gutter="14">
						<a-col :span="6"></a-col>
						<a-col :span="14">
							<a-form-item label="服务范围：">
								<a-textarea allow-clear :disabled="true">
									<span class="form-inside-span-content">{{ detail.serviceScope }}</span>
								</a-textarea>
							</a-form-item>
						</a-col>
					</a-row>
				</a-form>
			</a-card>
			<a-card>
				<a-row>
					<a-col :span="3"></a-col>
					<a-col :span="17">
						<gaode-map style="height: 450px; width: 100%" ref="map" api-key="94bd11195a06ec51f597ee0fd4205332" />
					</a-col>
					<RoadDetail ref="formRef" />
				</a-row>
			</a-card>
			<a-row>
				<a-col :span="16"></a-col>
				<a-col :span="8" style="text-align: right">
					<a-button style="margin-right: 8px" type="primary" @click="onClose">关闭</a-button>
				</a-col>
			</a-row>
		</a-card>
	</a-spin>
</template>
<script setup name="billingtrafficMap">
	import '@/assets/css/index.less'
	import tool from '@/utils/tool'
	import wayCodeApi from '@/api/basicsdata/wayCodeApi'
	import RoadDetail from '@/views/billing/billingroaddetail/roadDetail2.vue'
	const visible = ref(false)
	const loadSpinning = ref(false)
	const trafficDetailMapTrackRef = ref()
	let detail = ref({})
	const lineArr = ref([]) // 轨迹点 集合
	const map = ref(null) // 地图 实例
	const onOpen = (record) => {
		let param = {
			roadsectionId: record.roadsectionId,
			Id: record.id
		}
		//调用api数据处理
		wayCodeApi.findwayCodeHainanFacilities(param).then((data) => {
			detail.value = data
		})
	}
	defineExpose({
		onOpen
	})
	// 返回列表页
	const emits = defineEmits(['decreeDetail'])
	const onClose = () => {
		emits('decreeDetail', true)
	}
</script>
<style>
	.titleItem {
		font-size: 15px;
		font-weight: bold;
		color: black;
		padding-left: 4px;
		border-left: 3px solid lightseagreen;
	}
</style>
