<template>
	<div class="map-body" ref="mapRef"></div>
</template>

<script setup>

window._AMapSecurityConfig = {
	securityJsCode: 'd4e0ad1775e2c55abfbaad52c2be50bd',
}

import { ref, onMounted, onUnmounted } from 'vue';
import AMapLoader from '@amap/amap-jsapi-loader';
//获取标注点数据
import bigscreenApi from "@/api/billing/bigscreenApi";
const mapRef = ref(null);
// 地图实例
let mapIns;
let district;
let polygon;

import markerPoint from '@/assets/images/bigscreen_pro/marker_point.png'
import markerCar from '@/assets/images/bigscreen_pro/car.png'

/* 渲染地图 */
const renderMap = () => {
	bigscreenApi.nowVehicleLocation().then(res => {
		AMapLoader.load({
			// key: '94bd11195a06ec51f597ee0fd4205332',//你申请的高德地图key
			key: '363eb3be8a5ac5f520c1d79e1195afff',//你申请的高德地图key
			version: '2.0',
			plugins: ['AMap.InfoWindow', 'AMap.Marker', 'AMap.MarkerClusterer', 'AMap.DistrictSearch']
		}).then((AMap) => {

			// 渲染地图
			mapIns = new AMap.Map(mapRef.value, {
				zoom: 8.56, // 初缩放级别
				mapStyle: 'amap://styles/ca77183aeb60f483d0af4dbcf0bf3a88',
				viewMode:'3D',
				// zooms: [8.56, 14],
				center: [109.726658, 19.087961] // 初始中心点
			});
			let points =[]
			// 添加标记点
			res.forEach(item => {
				let point ={
					weight:1,
					lnglat:[item.longitude, item.latitude],
				}
				points.push(point)
			})
			let count = points.length;
			let _renderClusterMarker = function (context) {
				let div = document.createElement('div');
				div.style.backgroundImage = `url(${markerPoint})`
				div.style.backgroundRepeat = 'no-repeat'
				let size = Math.round(44 + Math.pow(context.count / count, 1 / 5) * 20);
				div.style.width = size + 'px';
				div.style.height = size + 'px';
				div.style.backgroundSize = '100% 100%';
				div.style.textAlign = 'center';

				let span = document.createElement('span');
				span.innerHTML = context.count;
				div.appendChild(span);
				span.style.lineHeight = (size - 6) + 'px';
				span.style.color = '#ffffff';
				span.style.fontSize = '14px';
				span.style.textAlign = 'center';

				context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
				context.marker.setContent(div)
			};
			let _renderMarker = function(context) {
				let div = document.createElement('div');
				div.style.backgroundImage = `url(${markerCar})`
				div.style.backgroundRepeat = 'no-repeat'
				let size = Math.round(38 + Math.pow(context.count / count, 1 / 5) * 20);
				div.style.width = size + 'px';
				div.style.height = size + 6 + 'px';
				div.style.backgroundSize = '100% 100%';
				let offset = new AMap.Pixel(-9, -9);
				context.marker.setContent(div)
				context.marker.setOffset(offset)
			}
			mapIns.plugin(["AMap.MarkerClusterer"], () => {
				new AMap.MarkerClusterer(mapIns, points, {
					gridSize: 80,
					renderClusterMarker: _renderClusterMarker,
					renderMarker: _renderMarker
				});
			});

			mapIns.plugin(["AMap.DistrictSearch"], () => {

				let opts = {
					subdistrict: 0,
					extensions: 'all',
					level: 'city'
				};
				district = new AMap.DistrictSearch(opts);

				district.search('中国', function(status, result) {
					if (status === 'complete' && result.districtList && result.districtList.length) {
						let bounds = result.districtList[0].boundaries;
						let mask = []
						for(let i =0;i<bounds.length;i+=1){
							mask.push([bounds[i]])
						}
						mapIns.setMask(mask);
					}
				});
			});
		}).catch(e => {
			console.error(e);
		});
	})

};

/* 渲染地图 */
onMounted(() => {
	renderMap();
});

/* 销毁地图 */
onUnmounted(() => {
	if (mapIns) {
		mapIns.destroy();
	}
});
</script>
<style scoped>
.map-body {
	height: 59.66% !important;
	width: 100%;
	background: #00000000 !important;
}

:deep() .amap-logo {
	display: none !important;
}
:deep() .amap-copyright {
	display: none !important;
}
</style>
