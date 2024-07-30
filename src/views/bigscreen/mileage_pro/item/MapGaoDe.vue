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
let pointSimplifierIns = null
const initPage = () => {
	pointSimplifierIns = new AMapUI.PointSimplifier({
		map: mapIns, //所属的地图实例
		autoSetFitView: false, //禁止自动更新地图视野
		zIndex: 110,
		getHoverTitle: function(dataItem, idx) {
			return null;
		},
		getPosition: function(item) {
			if (!item) {
				return null;
			}
			let parts = item.split(',');
			//返回经纬度
			return [parseFloat(parts[0]), parseFloat(parts[1])];
		},
		renderOptions: {
			//点的样式
			pointStyle: {
				content: 'circle',
				width: 1,
				height: 1,
				lineWidth: 0,
				strokeStyle: 'rgba(0,0,0,0)',
				fillStyle:'#57c9e8'
			},
			pointHoverStyle: {
				width: 0,
				height: 0,
				content: 'none'
			},
			//TopN区域
			topNAreaStyle: {
				autoGlobalAlphaAlpha: false,
				content: 'rect',
				fillStyle: '#00000000',
				lineWidth: 1,
				strokeStyle: 'rgba(0,0,0,0)'
			},
		}
	});

	let distCluster = new AMapUI.DistrictCluster({
		zIndex: 100,
		map: mapIns, //所属的地图实例
		autoSetFitView: false,
		getPosition: function(item) {
			if (!item) {
				return null;
			}
			let parts = item.split(',');
			//返回经纬度
			return [parseFloat(parts[0]), parseFloat(parts[1])];
		},
		renderOptions: {
			//显示在所辖数据点的平均位置
			getClusterMarkerPosition: AMapUI.DistrictCluster.ClusterMarkerPositionStrategy.CENTER,
			getClusterMarker: function(feature, dataItems, recycledMarker) {
				let name = feature.properties.name
				name = name.length > 2 ? name.substring(0, 2) : name
				//label内容
				const htmlBody = dataItems.length > 0 ? `<div style="width: 200px;">
								<span style="background: white;padding: 2px 4px;border-radius: 2px">${name}</span>
								<span style="background: #0171D9;padding: 4px 12px;border-radius: 2px;color: white;font-size: 16px">${dataItems.length}</span>
								</div>` : `<div></div>`
				//存在可回收利用的marker
				if (recycledMarker) {
					//直接更新内容返回
					recycledMarker.setContent(htmlBody);
					return recycledMarker;
				}
				//返回一个新的Marker
				return new AMap.Marker({
					offset: new AMap.Pixel(-20, -30),
					content: htmlBody,
				});
			},
			//基础样式
			featureStyle: {
				fillStyle: 'rgba(102,170,0,0)', //填充色
				lineWidth: 2, //描边线宽
				strokeStyle: 'rgba(31, 119, 180, 1)', //描边色
				//鼠标Hover后的样式
				hoverOptions: {
					fillStyle: 'rgba(255,255,255,0)'
				}
			},
			getFeatureStyle: function(feature, dataItems) {
				return {
					fillStyle: 'rgba(102,170,0,0)'
				};
			}
		}
	});

	window.distCluster = distCluster;

	function refresh() {
		let zoom = mapIns.getZoom();
		//获取 pointStyle
		let pointStyle = pointSimplifierIns.getRenderOptions().pointStyle;
		//根据当前zoom调整点的尺寸
		// pointStyle.width = pointStyle.height = 2 * Math.pow(1.24, zoom - 3);
		pointStyle.width = pointStyle.height = 1 * Math.pow(1.2, zoom - 3);
	}

	mapIns.on('zoomend', function() {
		refresh();
	});

	refresh();
	bigscreenApi.nowVehicleLocation().then(res => {
		const resData = res.map(ma => {
			let values = ma.split(",")
			return `${values[0]},${values[1]}`
		})
		distCluster.setData(resData);
		pointSimplifierIns.setData(resData);
	})
	netData()
}

const netTimer = ref()
const netData = () => {
	if (netTimer.value) {
		clearInterval(netTimer.value)
	}
	netTimer.value = setInterval(function () {
		bigscreenApi.nowVehicleLocation().then(res => {
			const resData = res.map(ma => {
				let values = ma.split(",")
				return `${values[0]},${values[1]}`
			})
			distCluster.setData(resData);
			pointSimplifierIns.setData(resData);
		})
	}, 60000)
}

onUnmounted(() => {
	// 清除定时器
	if (netTimer.value) {
		clearInterval(netTimer.value)
	}
});

/* 渲染地图 */
const renderMap = () => {
	AMapLoader.load({
		// key: '94bd11195a06ec51f597ee0fd4205332',//你申请的高德地图key
		key: '363eb3be8a5ac5f520c1d79e1195afff',//你申请的高德地图key
		version: '2.0',
		AMapUI: {
			//是否加载 AMapUI，缺省不加载
			version: "1.1", //AMapUI 版本
			plugins: ["geo/DistrictCluster","misc/PointSimplifier"], //需要加载的 AMapUI ui 插件
		},
		plugins: ['AMap.InfoWindow', 'AMap.Marker', 'AMap.MarkerClusterer', 'AMap.DistrictSearch']
	}).then((AMap) => {

		// 渲染地图
		mapIns = new AMap.Map(mapRef.value, {
			zoom: 8.56, // 初缩放级别
			mapStyle: 'amap://styles/ca77183aeb60f483d0af4dbcf0bf3a88',
			animateEnable: true,
			// zooms: [8.56, 14],
			center: [109.726658, 19.087961] // 初始中心点
		});

		//加载相关组件
		initPage();


		// let points =[]
		// // 添加标记点
		// res.forEach(item => {
		// 	let point ={
		// 		weight:1,
		// 		lnglat:[item.longitude, item.latitude],
		// 	}
		// 	points.push(point)
		// })
		// let count = points.length;
		// let _renderClusterMarker = function (context) {
		// 	let div = document.createElement('div');
		// 	div.style.backgroundImage = `url(${markerPoint})`
		// 	div.style.backgroundRepeat = 'no-repeat'
		// 	let size = Math.round(44 + Math.pow(context.count / count, 1 / 5) * 20);
		// 	div.style.width = size + 'px';
		// 	div.style.height = size + 'px';
		// 	div.style.backgroundSize = '100% 100%';
		// 	div.style.textAlign = 'center';
		//
		// 	let span = document.createElement('span');
		// 	span.innerHTML = context.count;
		// 	div.appendChild(span);
		// 	span.style.lineHeight = (size - 6) + 'px';
		// 	span.style.color = '#ffffff';
		// 	span.style.fontSize = '14px';
		// 	span.style.textAlign = 'center';
		//
		// 	context.marker.setOffset(new AMap.Pixel(-size / 2, -size / 2));
		// 	context.marker.setContent(div)
		// };
		// let _renderMarker = function(context) {
		// 	let div = document.createElement('div');
		// 	div.style.backgroundImage = `url(${markerCar})`
		// 	div.style.backgroundRepeat = 'no-repeat'
		// 	let size = Math.round(38 + Math.pow(context.count / count, 1 / 5) * 20);
		// 	div.style.width = size + 'px';
		// 	div.style.height = size + 6 + 'px';
		// 	div.style.backgroundSize = '100% 100%';
		// 	let offset = new AMap.Pixel(-9, -9);
		// 	context.marker.setContent(div)
		// 	context.marker.setOffset(offset)
		// }
		// mapIns.plugin(["AMap.MarkerClusterer"], () => {
		// 	new AMap.MarkerClusterer(mapIns, points, {
		// 		gridSize: 80,
		// 		renderClusterMarker: _renderClusterMarker,
		// 		renderMarker: _renderMarker
		// 	});
		// });

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
