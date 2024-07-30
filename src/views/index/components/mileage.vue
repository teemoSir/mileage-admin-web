<template>
	<a-card title="收费路网覆盖范围" :bordered="false">
		<a-card title="高速公路" :bordered="false">
			<div style="width: 85%">
				<a-progress :percent="numberFormate(gsgl / (gsgl + lvgl + gdgl + sdgl + xdgl))">
					<template #format="percent">
						<span style="font-size: 20px"> {{ gsgl }} 公里 </span>
					</template>
				</a-progress>
			</div>
		</a-card>
		<a-card title="旅游公路" :bordered="false">
			<div style="width: 85%">
				<a-progress :percent="numberFormate(lvgl / (gsgl + lvgl + gdgl + sdgl + xdgl))">
					<template #format="percent">
						<span style="font-size: 20px"> {{ lvgl }} 公里 </span>
					</template>
				</a-progress>
			</div>
		</a-card>
		<a-card title="国道公路" :bordered="false">
			<div style="width: 85%">
				<a-progress :percent="numberFormate(gdgl / (gsgl + lvgl + gdgl + sdgl + xdgl))">
					<template #format="percent">
						<span style="font-size: 20px"> {{ gdgl }} 公里 </span>
					</template>
				</a-progress>
			</div>
		</a-card>
		<a-card title="省道公路" :bordered="false">
			<div style="width: 85%">
				<a-progress :percent="numberFormate(sdgl / (gsgl + lvgl + gdgl + sdgl + xdgl))">
					<template #format="percent">
						<span style="font-size: 20px"> {{ sdgl }} 公里 </span>
					</template>
				</a-progress>
			</div>
		</a-card>
		<a-card title="县道公路" :bordered="false">
			<div style="width: 85%">
				<a-progress :percent="numberFormate(xdgl / (gsgl + lvgl + gdgl + sdgl + xdgl))">
					<template #format="percent">
						<span style="font-size: 20px"> {{ xdgl }} 公里 </span>
					</template>
				</a-progress>
			</div>
		</a-card>
	</a-card>
</template>

<script setup name="indexMileage">
	const gsgl = ref()
	const lvgl = ref()
	const gdgl = ref()
	const sdgl = ref()
	const xdgl = ref()

	gsgl.value = 1400.84
	lvgl.value = 1366.93
	gdgl.value = 1072.14
	sdgl.value = 1271.19
	xdgl.value = 1129

	const numberFormate = (value) => {
		return Math.ceil(value * 100)
	}
</script>
<style scoped></style>
