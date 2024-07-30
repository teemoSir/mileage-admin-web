<template>
	<div id="DoughnutChartWithRoundedCorner1today"></div>
</template>
<!--ec官网：https://echarts.apache.org/zh/index.html-->
<script setup name="DoughnutChartWithRoundedCornertoday">
	import { onMounted } from 'vue'
	import * as echarts from 'echarts'
	import tool from '@/utils/tool'

	onMounted(() => {})

	const onOpen = (dataArray, roadType, hj) => {
		queryBillingByRoadType(dataArray, roadType, hj)
	}

	const dataTotal = ref(0)

	const queryBillingByRoadType = (dataArray, roadType, hj) => {

    let centerTitile = "总计"
    if(10 == roadType){
      centerTitile = tool.dictTypeData('roadType', roadType) + '\n计费合计'
    } else if(20 == roadType){
      centerTitile = tool.dictTypeData('roadType', roadType) + '\n计费合计'
    }



		let Echarts = echarts.init(document.getElementById('DoughnutChartWithRoundedCorner1today'))

		for (let i = 0; i < dataArray.length; i++) {
			dataTotal.value += dataArray[i].value || 0
		}
		const option = {
			tooltip: {
				trigger: 'item',
				formatter: function (dataArray) {
					const percent = ((dataArray.value / dataTotal.value) * 100).toFixed(2) + '%'
					return (
						'<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:' +
						dataArray.color +
						';"></span>' +
						dataArray.name +
						'    ' +
						dataArray.value +
						' 元  ' +
						percent
					)
				}
			},
			series: [
				{
					type: 'pie',
					radius: ['30%', '50%'],
					avoidLabelOverlap: false,
					itemStyle: {
						borderColor: '#fff',
						borderRadius: 0,
						borderWidth: 0
					},
					label: {
						show: true,
						position: 'center',
						fontSize: '12',
						formatter: function (params) {
							// return [params.name, params.value].join(': ') + ' 元\n   ' + percent
              return `{a|${centerTitile}}\n\n{b|${hj}元}`
            },
						rich: {
              a: {
                color: '#111928',
                fontSize: 20,
                fontWeight: 900,
              },
              b: {
                fontSize: 16,
                fontWeight: 700,
                color: '#6B7280'
              }
						}
					},
					emphasis: {
						label: {
							show: true,
							fontSize: '12'
						}
					},
					labelLine: {
						show: true,
						lineStyle: {
							width: 1,
							color: '#999'
						}
					},
					data: dataArray
				}
			]
		}
		// 绘制图表
		Echarts.setOption(option)
	}

	defineExpose({
		onOpen
	})
</script>
