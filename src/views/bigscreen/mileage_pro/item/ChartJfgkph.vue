<template>
	<div>
		<CommonTitle title="计费概况排行" />
		<div class="gkph-title">
			<a-row style="text-align: center; font-size: 14px; color: #ffffff; padding: 4px 0">
				<a-col :span="3"><span class="title-item">排名</span></a-col>
				<a-col :span="11"><span class="title-item">道路</span></a-col>
				<a-col :span="7"><span class="title-item title-item-rmb">计费金额</span></a-col>
				<a-col :span="3"><span class="title-item">车次</span></a-col>
			</a-row>
		</div>
		<div class="b_list"  :style="{ height: `${height}px`}" id="scrollOutSide">
			<div id="scrollInSide">
				<a-row class="jfgk_item" v-for="(item, acindex) in tableArray" :key="`${acindex}_jfgkph`">
					<a-col :span="3" :class="{
						itemOne: acindex === 0,
						itemTwo: acindex === 1,
						itemThree: acindex === 2,
						itemOther: acindex > 2,
					}">{{ acindex + 1 }}</a-col>
					<a-col style="color: #9fbcdd;" :span="11">{{ item.roadname }}</a-col>
					<a-col style="color: #57e0f0;" :span="7">{{ item.amount }}</a-col>
					<a-col style="color: #9fbcdd;" :span="3">{{ item.count }}</a-col>
				</a-row>
			</div>
		</div>
	</div>
</template>

<script setup name="ChartJfgkph">
import bigscreenApi from '@/api/billing/bigscreenApi'
import CommonTitle from "@/views/bigscreen/mileage_pro/item/CommonTitle.vue";
const loadSpinning = ref(false)
const tableArray = ref([])
const boxHeigth = ref()
const timer = ref()

const props = defineProps({
	height: {
		type: Number,
		default: ''
	}
})

const columns = [
	{ title: '排名', dataIndex: 'index' },
	{ title: '道路', dataIndex: 'roadname' },
	{ title: '计费金额（元）', dataIndex: 'amount' },
	{ title: '车次', dataIndex: 'count' }
]

const onOpen = (record) => {
	loadSpinning.value = true
	tableArray.value = []
	boxHeigth.value = record.boxHeigth
	bigscreenApi.queryBigScreenJfgkTop(record).then((data) => {
		if (data) {
			tableArray.value = data
			let i = 1
			tableArray.value.forEach((v) => {
				v.index = i++
			})
			nextTick(() => {
				rollUp()
			})
		}
		loadSpinning.value = false
	})
}

const rollUp = () => {
	let outSide = document.getElementById('scrollOutSide')
	let inSide = document.getElementById('scrollInSide')
	outSide.scrollTop = 0
	let maxTop = -1
	function rollStart() {
		if (outSide.scrollTop === maxTop) {
			outSide.scrollTop = 0
		}
		if (outSide.scrollTop >= inSide.scrollHeight) {
			outSide.scrollTop = 0
		} else {
			maxTop = outSide.scrollTop
			outSide.scrollTop++
		}
	}
	if (timer.value) {
		clearInterval(timer.value)
	}
	timer.value = setInterval(rollStart, 50)
}

onUnmounted(() => {
	// 清除定时器
	if (timer.value) {
		clearInterval(timer.value)
	}
});

defineExpose({
	onOpen
})
</script>
<style lang="less">
.b_list {
	overflow: hidden;
	height: 330px;
	//overflow: auto;
	.jfgk_item {
		text-align: center;
		margin: 6px 0;
		padding: 12px 40px;
		background-image: url("@/assets/images/bigscreen_pro/scroll_item_bg.png"); /* 替换为自己的图片路径 */
		background-repeat: no-repeat;
		background-position: center top;
		background-size: 90% 90%;
		font-size: 16px;
		font-family: 'sm';
		.itemOne {
			font-weight: bold;
			color: #ffffff;
			background-image: url("@/assets/images/bigscreen_pro/bg_ph_one.png"); /* 替换为自己的图片路径 */
			background-repeat: no-repeat;
			background-position: center top;
			background-size: 60% 100%;
		}
		.itemTwo {
			font-weight: bold;
			color: #ffffff;
			background-image: url("@/assets/images/bigscreen_pro/bg_ph_two.png"); /* 替换为自己的图片路径 */
			background-repeat: no-repeat;
			background-position: center top;
			background-size: 60% 100%;
		}
		.itemThree {
			font-weight: bold;
			color: #ffffff;
			background-image: url("@/assets/images/bigscreen_pro/bg_ph_three.png"); /* 替换为自己的图片路径 */
			background-repeat: no-repeat;
			background-position: center top;
			background-size: 60% 100%;
		}
		.itemOther {
			font-weight: bold;
			color: #ffffff;
			background-image: url("@/assets/images/bigscreen_pro/bg_ph_other.png"); /* 替换为自己的图片路径 */
			background-repeat: no-repeat;
			background-position: center top;
			background-size: 60% 100%;
		}
	}
}
.gkph-title {
	width: 90%;
	margin-left: 5%;
	text-align: center;
	.title-item {
		// background: linear-gradient(to right, #185eb2aa, #185eb288, #185eb200);
		background-image: url("@/assets/images/bigscreen_pro/table_title.png");
		background-size: 100% 100%;
		padding: 2px 12px;
		border-radius: 4px;
		font-size: 16px;
	}
	.title-item-rmb::after {
		content: '(元)';
		font-size: 12px;
	}
}
</style>
