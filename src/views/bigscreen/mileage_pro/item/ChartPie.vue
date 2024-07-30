<template>
<div>
	<canvas :id="canvasId" class="canvas-body" :height="height" :width="width"></canvas>
</div>
</template>

<script setup>
import {onMounted} from "vue";

let canvas = null;
let ctx = null;

const props = defineProps({
	height: {
		type: Number,
		default: 120
	},
	width: {
		type: Number,
		default: 120
	},
	canvasId: {
		type: String,
		default: 'canvasId'
	},
	percent: {
		type: Number,
		default: 0.5
	},
})

watch(() => props.percent, (val) => {
	drawPie()
})

const drawPie = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
	const centerX = props.width / 2
	const centerY = props.height / 2
	const cR = (props.width / 2) - 2

	const innerR = 0.7
	const innerStockWidth = 6

	// 最外层渐变圆环
	const gradient = ctx.createLinearGradient(cR, 0, cR, props.height);
	gradient.addColorStop(0, '#92b9e7');
	gradient.addColorStop(0.5, '#92b9e7aa');
	gradient.addColorStop(0.7, '#92b9e766');
	gradient.addColorStop(1, '#92b9e711');
	ctx.strokeStyle = gradient
	ctx.lineWidth = 1
	ctx.arc(centerX, centerY, cR, -Math.PI, Math.PI, false)
	ctx.stroke()
	ctx.beginPath()

	// 画内层蓝色宽圆环
	ctx.moveTo(centerX, centerX)
	ctx.beginPath()
	ctx.strokeStyle = '#2f66db'
	ctx.lineWidth = innerStockWidth
	ctx.arc(centerX, centerY, cR*innerR, -Math.PI, Math.PI, false)
	ctx.stroke()

	// 百分比青色
	ctx.beginPath()
	ctx.strokeStyle = '#57c9e8'
	ctx.lineWidth = innerStockWidth
	ctx.arc(centerX, centerX, cR*innerR + innerStockWidth, -(Math.PI / 2), (2*Math.PI * props.percent) - (2*Math.PI * 0.25), false)
	ctx.stroke()

	// 实心扇形 百分比
	ctx.beginPath()
	ctx.moveTo(centerX, centerX)
	ctx.fillStyle = '#091224';
	ctx.lineWidth = 1
	ctx.arc(centerX, centerY, cR*innerR + 2, -(Math.PI / 2), (2*Math.PI * props.percent) - (2*Math.PI * 0.25), false); // 扇形的圆心、半径、起始角度和结束角度
	ctx.fill(); // 应用渐变填充

	// 内测 细边框 圆环
	ctx.moveTo(centerX, centerX)
	ctx.beginPath()
	ctx.strokeStyle = '#92b9e766'
	ctx.lineWidth = 1
	ctx.arc(centerX, centerY, cR*0.54, -Math.PI, Math.PI, false)
	ctx.stroke()

	// 渐变百分比
	ctx.beginPath()
	ctx.moveTo(centerX, centerX)
	const contentGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, cR*0.8);
	contentGradient.addColorStop(0, '#57c9e800'); // 圆心颜色
	contentGradient.addColorStop(1, '#57c9e855'); // 边缘颜色
	ctx.fillStyle = contentGradient;
	ctx.lineWidth = 1
	ctx.arc(centerX, centerY, cR*innerR + 2, -(Math.PI / 2), (2*Math.PI * props.percent) - (2*Math.PI * 0.25), false); // 扇形的圆心、半径、起始角度和结束角度
	ctx.fill(); // 应用渐变填充
	ctx.beginPath()
}

onMounted(() => {
	canvas = document.getElementById(props.canvasId)
	ctx=canvas.getContext('2d');
	drawPie()
})


</script>

<style lang="less" scoped>
.canvas-body {
	padding: 2px;
}
</style>
