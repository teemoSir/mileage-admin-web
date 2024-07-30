<template>
<div class="chart-title">
	<div class="chart-title-body">
		<span class="title">{{props.title}}</span>
		<CommonCheckBox @menu-click="menuClick" :menu="props.menu" class="chart-check"/>
	</div>
</div>
</template>

<script setup>
import CommonCheckBox from "@/views/bigscreen/mileage_pro/item/CommonCheckBox.vue";

const emit = defineEmits(['menuClick'])

const props = defineProps({
	title: {
		type: String,
		default: ''
	},
	menu: {
		type: Array,
		default: []
	}
})

const menuClick = (index) => {
	emit('menuClick', index)
}

</script>

<style scoped lang="less">
.chart-title {
	height: 42px;
	color: white;
	padding: 0 20px;
	.chart-title-body {
		height: 42px;
		width: 100%;
		background-image: url("@/assets/images/bigscreen_pro/title_bg.png"); /* 替换为自己的图片路径 */
		background-size: 100% 90%;
		background-repeat: no-repeat;
		background-position: center top;
		display: flex;
		justify-content: space-between;
		.title {
			background: linear-gradient(to right, #B7DCFF, #F6F9FC); /* 从左到右渐变 */
			-webkit-background-clip: text; /* Safari/Chrome需要添加此属性才能正常显示背景渐变效果 */
			color: transparent; /* 将文本设置为透明，只保留背景渐变效果 */
			font-size: 17px;
			padding-left: 46px;
			font-weight: bold;
			font-family: 'ab_blod';
		}
		.chart-check {
			margin-right: 30px;
			margin-top: 2px;
		}
	}
}
</style>
