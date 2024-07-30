<template>
	<a-carousel class="mileage-right-card-one" autoplay arrows>
		<template #prevArrow>
			<div class="custom-slick-arrow" style="left: 10px; z-index: 1">
				<left-circle-outlined />
			</div>
		</template>
		<template #nextArrow>
			<div class="custom-slick-arrow" style="right: 10px">
				<right-circle-outlined />
			</div>
		</template>
<!--		<img-->
<!--			src="/src/assets/images/index_01.jpg"-->
<!--			class="carousel-images"-->
<!--			@click="leaveForOpen('https://www.cttic-beidou.com')"-->
<!--		/>-->
		<img
			src="/src/assets/images/index_02.jpg"
			class="carousel-images"
			@click="leaveForOpen('https://www.cttic-beidou.com')"
		/>
		<!--
			<img v-for="(item, index) in carouselList"
				:src="item.images"
				class="carousel-images"
				@click="leaveForOpen(item.url)"
			/>
			-->
	</a-carousel>
</template>

<script setup name="carousel">
	import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue'
	const carouselList = ref([
		{
			images: '/src/assets/images/index_01.jpg',
			url: 'https://www.cttic-beidou.com'
		},
		{
			images: '/src/assets/images/index_02.jpg',
			url: 'https://www.cttic-beidou.com'
		}
	])
	// 打开一个新窗口
	const leaveForOpen = (url) => {
		if (url) {
			window.open(url)
		}
	}
</script>

<style scoped>
	.carousel-images {
		height: 160px;
		width: 100%;
		cursor: pointer;
	}
	.mileage-right-card-one {
		height: 160px;
	}

	.ant-carousel :deep(.slick-slide) {
		text-align: center;
		height: 160px;
		line-height: 150px;
		background: #364d79;
		overflow: hidden;
	}

	.ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
		width: 25px;
		height: 25px;
		font-size: 25px;
		color: #fff;
		background-color: rgba(31, 45, 61, 0.11);
		opacity: 0.3;
		z-index: 1;
	}
	.ant-carousel :deep(.custom-slick-arrow:before) {
		display: none;
	}
	.ant-carousel :deep(.custom-slick-arrow:hover) {
		opacity: 0.5;
	}

	.ant-carousel :deep(.slick-slide h3) {
		color: #fff;
	}
</style>
