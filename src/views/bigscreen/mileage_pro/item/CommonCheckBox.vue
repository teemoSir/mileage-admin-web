<template>
<span>
	<span
		class="check_item"
		v-for="(item, index) in props.menu"
		:key="`${item}_chart_check_${index}`"
		@click="checkClick(index)"
		:class="{check_active: index === activeIndex}">
		{{item}}
	</span>
</span>
</template>

<script setup>
let activeIndex = ref(0)
const props = defineProps({
	menu: {
		type: Array,
		default: []
	}
})
const emit = defineEmits(['menuClick'])

const checkClick = (index) => {
	if (index !==  activeIndex) {
		activeIndex.value = index
		emit('menuClick', index)
	}
}

</script>

<style lang="less" scoped>
.check_item {
	padding: 5px 16px;
	margin: 0 4px;
	background: transparent;
	font-family: 'ab_blod';
	font-weight: bold;
	font-size: 16px;
	color: #445878;
	cursor: pointer;
}
.check_active {
	padding: 5px 16px;
	margin: 0 4px;
	background-image: url("@/assets/images/bigscreen_pro/check_select_item.png");
	background-size: cover;
	font-family: 'ab_blod';
	font-weight: bold;
	font-size: 16px;
	color: #9FBCDD;
	cursor: pointer;
}
</style>
