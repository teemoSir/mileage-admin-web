<template>
	<a-spin :spinning="loadSpinning">
		<gaode-map
			ref="map"
			api-key="94bd11195a06ec51f597ee0fd4205332"
			@complete="handleComplete"
		/>
	</a-spin>
</template>

<script setup name="hainanMapTrack">
	import wgs84togcj02 from '@/api/billing/wgs84togcj02'
	import GaodeMap from '@/components/Map/gaodeMap/index3.vue'
	const map = ref(null)

	const loadSpinning = ref(false)
	const onOpen = (record) => {
		loadSpinning.value = true

		loadSpinning.value = false
	}

	const handleComplete = () => {
		//queryTracks(detail.value)
	}

	defineExpose({
		onOpen
	})
</script>
<style lang="less" scoped>
	#container {
		height: calc(100% - 88px);
		//height: 800px;
		//position: absolute;
		left: 0;
		right: 0;
		top: 0px;
		bottom: 0;
		//background: transparent !important;
	}

	.el-table .warning-row {
		background: oldlace;
	}

	.el-table .success-row {
		background: #f0f9eb;
	}
</style>
