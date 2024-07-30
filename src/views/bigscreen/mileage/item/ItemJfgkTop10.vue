<template>
	<div style="background: #6699ff; width: 100%">
		<a-row style="text-align: center; font-size: 14px; color: #ffffff; padding: 4px 0">
			<a-col :span="3">排名</a-col>
			<a-col :span="11">道路</a-col>
			<a-col :span="7">计费金额(元)</a-col>
			<a-col :span="3">车次</a-col>
		</a-row>
	</div>
	<div class="b_list" :style="{ height: `${boxHeigth}px` }">
		<div v-for="(item, acindex) in tableArray" :key="acindex" style="font-size: 14px">
			<a-row style="text-align: center; padding-bottom: 8px">
				<a-col :span="3" :style="{ fontWeight: 'bold', color: ['#00c297', '#5ea2fc', '#f59a23'][acindex] || '#999' }"
					>NO.{{ acindex + 1 }}</a-col
				>
				<a-col :span="11">{{ item.roadname }}</a-col>
				<a-col :span="7">{{ item.amount }}</a-col>
				<a-col :span="3">{{ item.count }}</a-col>
			</a-row>
		</div>
	</div>
</template>

<script setup name="ItemJfgkTop10">
	import bigscreenApi from '@/api/billing/bigscreenApi'
	import color from '@/utils/color'
	import { onMounted } from 'vue'
	const loadSpinning = ref(false)
	const tableArray = ref([])
	const boxHeigth = ref()

	const columns = [
		{ title: '排名', dataIndex: 'index' },
		{ title: '道路', dataIndex: 'roadname' },
		{ title: '计费金额（元）', dataIndex: 'amount' },
		{ title: '车次', dataIndex: 'count' }
	]

	// const windowOnload = () => {
	// 	let winHeight = 0
	// 	if (window.innerHeight) {
	// 		winHeight = window.innerHeight
	// 	} else if (document.body && document.body.clientHeight) {
	// 		winHeight = document.body.clientHeight
	// 	}
	// 	let sjHeight = (winHeight - 120) / 3
	// 	if (sjHeight > 350) {
	// 		boxHeigth.value = sjHeight
	// 	} else {
	// 		boxHeigth.value = 350
	// 	}
	//
	// 	boxHeigth.value = boxHeigth.value - 100
	// }

	// onMounted(() => {
	// 	windowOnload()
	// })

	const onOpen = (record) => {
		loadSpinning.value = true
		tableArray.value = []
		boxHeigth.value = record.boxHeigth - 100
		console.log(boxHeigth.value)
		bigscreenApi.queryBigScreenJfgkTop(record).then((data) => {
			if (data) {
				tableArray.value = data
				let i = 1
				tableArray.value.forEach((v) => {
					v.index = i++
				})
			}
			loadSpinning.value = false
		})
	}

	defineExpose({
		onOpen
	})
</script>
<style lang="less">
	.b_list {
		//margin-top: -10px;
		height: 19rem;
		overflow: hidden;
		//overflow: auto;
	}
</style>
