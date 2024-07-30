<template>
  <a-card class="page">
    <div class="map" id="map"></div>
    <!--图例-->
    <!-- <div class="right-tl">
      <a-card title="">
        <a-card-grid style="width: 100%" :hoverable="true">
          <div class="tuli">图例</div>

          <a-row>
            <a-col :span="12" v-for="itme in mapdata.tuli" :key="itme.id">
              <a-row>
                <a-col :span="9" style="display: flex; align-items: center">
                  <div
                    :style="{
                      border: '3px solid ' + itme.color,
                      width: '100%',
                    }"
                  ></div>
                </a-col>
                <a-col :span="2"></a-col>
                <a-col :span="13">
                  {{ itme.name }}
                </a-col
                >
              </a-row>
            </a-col>
          </a-row>
        </a-card-grid>
      </a-card>
    </div> -->

    <!--图层列表-->
    <div class="right-layer" v-if="mapdata.rightLayer.value">
      <a-card title="图层" v-show="machine != 'mercator'">
        <a-card-grid
          v-for="item in mapdata.layers"
          class=""
          :key="item.id"
          :style="{
            width: '25%',
            textAlign: 'center',
            display: item.projection ? 'block' : 'none',
          }"
        >
          <img
            :src="item.url"
            style="width: 100%; height: 60px; border-radius: 1.5px"
            @click="switchTile(item)"
          />
          {{ item.name }}
        </a-card-grid>
        <a-card-grid
          :style="{
            width: '25%',
            textAlign: 'center',
          }"
        >
          <div style="padding: 8px 0; font-weight: 1000">矢量<br />注记</div>

          <a-switch
            v-model:checked="state.ZJiSHow"
            checked-children="显示"
            un-checked-children="隐藏"
          />
        </a-card-grid>
      </a-card>
      <a-card title="" v-show="machine == 'mercator'">
        <a-card-grid
          v-for="item in mapdata.layers"
          :key="item.id"
          :style="{
            width: '25%',
            textAlign: 'center',
            display: !item.projection ? 'block' : 'none',
          }"
          @click="switchTile(item)"
        >
          <img :src="item.url" style="width: 100%; height: 60px; border-radius: 1.5px" />
          {{ item.name }}
        </a-card-grid>

        <a-card-grid
          :style="{
            width: '25%',
            textAlign: 'center',
          }"
        >
          <div style="padding: 8px 0; font-weight: 1000">矢量<br />注记</div>

          <a-switch
            v-model:checked="state.ZJiSHow"
            checked-children="显示"
            un-checked-children="隐藏"
          />
        </a-card-grid>
      </a-card>
    </div>
    <!--数据树-->
    <div class="left-menu">
      <a-card title="" :bordered="false" style="height: calc(100% - 30px)">
        <a-typography-title :level="5">道路列表</a-typography-title>
        <a-tabs v-model:activeKey="activeKey">
          <a-tab-pane key="road" tab="按道路"> </a-tab-pane>
          <a-tab-pane key="admin" tab="按区划" force-render> </a-tab-pane>
        </a-tabs>
        <a-mentions
          v-model:value="valuev"
          placeholder="输入 G/S/X/Y 或输入名称或编码"
          :prefix="['G', 'S', 'X', 'Y']"
          :options="optionsv"
          @search="onSearch"
        >
        </a-mentions>

        <!-- <a-input placeholder="请输入名称或编码">
              <template #addonBefore>
                <a-select style="width: 5vw" placeholder="按道路">
                  <a-select-option value="0">按道路</a-select-option>
                  <a-select-option value="1">按路段</a-select-option>
                  <a-select-option value="2">按数据</a-select-option>
                </a-select>
              </template>
              <template #suffix>
                <a-tooltip title="查询">
                  <SearchOutlined style="color: rgba(0, 0, 0, 0.45)" />
                </a-tooltip>
              </template>
            </a-input> -->
        <p v-if="activeKey == 'road'">
          <br />
          <a-tree
            v-model:expandedKeys="expandedKeys"
            v-model:selectedKeys="selectedKeys"
            v-model:checkedKeys="checkedKeys"
            checkable
            :tree-data="treeData"
            :height="600"
          >
            <!-- <template #title="{ title, key }">
              <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ title }}</span>
              <template v-else>{{ title }}</template>
            </template> -->
          </a-tree>
        </p>
        <p v-if="activeKey == 'admin'">
          <br />
          <a-tree
            v-model:expandedKeys="expandedKeysAdmin"
            v-model:selectedKeys="selectedKeysAdmin"
            v-model:checkedKeys="checkedKeysAdmin"
            checkable
            :tree-data="treeDataAdmin"
            :height="600"
          >
          </a-tree>
        </p>
      </a-card>
    </div>

    <!-- <div class="mapdata-tool">
      <a-row>
        <a-col :span="24">
          <a-radio-group
            v-model:value="numeAcross"
            size="large"
            button-style="solid"
            style="float: right"
          >
            <a-tooltip placement="bottom" v-if="noShow">
              <template #title>
                <span>路段关联</span>
              </template>
              <a-radio-button value="a"> <ShareAltOutlined /> 路段关联</a-radio-button>
            </a-tooltip>
            <a-tooltip placement="bottom" v-if="noShow">
              <template #title>
                <span>交叉管理</span>
              </template>
              <a-radio-button value="b"
                ><DeploymentUnitOutlined /> 交叉口管理</a-radio-button
              >
            </a-tooltip>
            <a-tooltip placement="bottom">
              <template #title>
                <span>交叉管理</span>
              </template>
              <a-radio-button v-model:value="noShow" @click="noShow = !noShow"
                ><DeploymentUnitOutlined /> 数据关联</a-radio-button
              >
            </a-tooltip>
            <a-tooltip placement="bottom">
              <template #title>
                <span>线路规划</span>
              </template>
              <a-radio-button value="c" :disabled="noShow"
                ><NodeIndexOutlined /> 线路规划</a-radio-button
              >
            </a-tooltip>
          </a-radio-group>
        </a-col>
      </a-row>
    </div> -->

    <!--业务菜单-->
    <div class="center-right">
      <a-tooltip :title="!noShow ? '启用编辑模式' : '关闭编辑模式'" placement="left">
        <a-button
          shape="circle"
          style="width: 55px; height: 55px; margin-top: 0.6vh"
          v-model:value="noShow"
          @click="noShow = !noShow"
          ><EditFilled v-if="!noShow" /> <CloseOutlined v-else />
        </a-button>
      </a-tooltip>

      <a-tooltip title="路段管理" placement="left" v-if="noShow">
        <a-button shape="circle" style="width: 55px; height: 55px; margin-top: 0.6vh"
          ><img style="height: 25px" :src="c3"
        /></a-button>
      </a-tooltip>
      <a-tooltip title="交叉口管理" placement="left" v-if="noShow">
        <a-button shape="circle" style="width: 55px; height: 55px; margin-top: 0.6vh"
          ><img style="height: 25px" :src="c4"
        /></a-button>
      </a-tooltip>

      <a-tooltip :title="edit.name" placement="left" v-for="edit in edits" :key="edit.id">
        <a-button
          shape="circle"
          style="width: 55px; height: 55px; margin-top: 0.6vh"
          v-if="!noShow"
          ><img style="height: 25px" :src="edit.icon"
        /></a-button>
      </a-tooltip>
    </div>

    <!--地图工具栏-->
    <div class="right-tool">
      <a-tooltip title="底图图层切换" placement="left">
        <img style="height: 38px; cursor: pointer" :src="c7" @click="switchLayer()" />
      </a-tooltip>
      <br />
      <br />
      <a-tooltip title="重置视角 鼠标右键旋转地图" placement="left">
        <img style="height: 38px; cursor: pointer" :src="c2" @click="Zero()" />
      </a-tooltip>
      <br />
      <br />
      <a-tooltip placement="leftTop">
        <template #title>
          <span>放大</span>
        </template>
        <a-button @click="zoomIn()" size="large"><PlusOutlined /></a-button>
      </a-tooltip>
      <a-tooltip placement="leftTop">
        <template #title>
          <span>缩小</span>
        </template>
        <a-button @click="zoomOut()" size="large"><MinusOutlined /></a-button>
      </a-tooltip>
      <!-- <a-tooltip placement="leftTop">
        <template #title>
          <span>视角重置</span>
        </template>
        <a-button @click="Zero()" style="padding: 0 2.8px" size="large"
          ><img :src="north" height="30" />
        </a-button>
      </a-tooltip> -->
      <br />

      <br />
      <a-tooltip placement="leftTop">
        <template #title>
          <span>二三维切换</span>
        </template>
        <a-button @click="threeD()" style="padding: 0 2.8px" size="large">
          <img :src="machine == 'mercator' ? d3 : d2" height="30" />
        </a-button>
      </a-tooltip>

      <a-tooltip placement="leftTop">
        <template #title>
          <span>返回最佳视野</span>
        </template>
        <a-button @click="fitCenter()" size="large"><AimOutlined /></a-button>
      </a-tooltip>
      <!-- <a-tooltip placement="leftTop">
        <template #title>
          <span>底图图层切换</span>
        </template>
        <a-button @click="switchLayer()" size="large"><MenuOutlined /></a-button>
      </a-tooltip> -->
      <!-- <a-tooltip placement="leftTop">
        <template #title>
          <span>兴趣点检索</span>
        </template>
        <a-button @click="switchLayer()"> <FunnelPlotOutlined /></a-button>
      </a-tooltip> -->

      <!-- <a-mentions
        style="width: 150px; position: absolute; right: 50px; top: 0"
        v-model:value="value"
        autofocus
        :options="options"
        @select="onSelect"
        :prefix="[' ', '  ']"
      ></a-mentions> -->
    </div>
  </a-card>
</template>

<script setup name="Waymap">
import "./../../../../public/mapboxgl/mapbox-gl-js-3.0.1/mapbox-gl.css";
import "./../../../../public/mapboxgl/mapbox-gl-js-3.0.1/mapbox-gl";
import "./../../../../public/mapboxgl/pulgins/rasterTileLayer";
import config from "../../../config/mapServeConfig";
import { admin } from "./data";

import { layers, waySpec } from "./map";
import d2 from "@/assets/images/map/icon-2d-b.png";
import d3 from "@/assets/images/map/icon-3d-b.png";
import north from "@/assets/images/map/north-b.png";
import c1 from "@/assets/images/map/c1.svg";
import c2 from "@/assets/images/map/c2.svg";
import c3 from "@/assets/images/map/c3.svg";
import c4 from "@/assets/images/map/c4.svg";
import c5 from "@/assets/images/map/c5.svg";
import c6 from "@/assets/images/map/c6.svg";
import c7 from "@/assets/images/map/c7.svg";
import c8 from "@/assets/images/map/c8.svg";
import c9 from "@/assets/images/map/c9.svg";
import c10 from "@/assets/images/map/c10.svg";
import c11 from "@/assets/images/map/c11.svg";
import c12 from "@/assets/images/map/c12.svg";
// import AnimatedPopup from "mapbox-gl-animated-popup";
import { message } from "ant-design-vue";

const MOCK_DATA = {
  G: [],
  S: [],
  X: [],
  Y: [],
};

const prefix = ref("@");
const valuev = ref("");
const optionsv = computed(() => {
  return (MOCK_DATA[prefix.value] || []).map((value) => ({
    key: value,
    value,
    label: value,
  }));
});
const onSearch = (_, val) => {
  prefix.value = val;
};

// 目录标签
const activeKey = ref("road");

// watch(activeKey, () => {
//   // resetSyle();
//   console.log(activeKey.value);
//   // activeKey.value == "road" ? changeRoad() : changeAdmin();
//   console.log("======================");
//   console.log(checkedKeys.value);
//   console.log(checkedKeysAdmin.value);
//   console.log("======================");
// });

const edits = [
  { id: 2, name: "线路规划", icon: c1 },
  { id: 3, name: "交叉口", icon: c5 },
  { id: 5, name: "交通枢纽", icon: c9 },
  { id: 6, name: "服务区", icon: c10 },
  { id: 7, name: "路测设施", icon: c11 },
  { id: 8, name: "附属设施", icon: c12 },
];

const noShow = ref(false);
watch(noShow, () => {
  message.success(noShow.value ? "进入编辑模式" : "退出编辑模式", 3);
});
// 菜单选中
const numeAcross = ref("a");

const state = reactive({
  ZJiSHow: true,
});

watch(state, () => {
  [
    "POI_WORLD_1",
    "POI_WORLD_2",
    "POI_WORLD_3",
    "POI_WORLD_4",
    "POI_WORLD_5",
    "POI_WORLD_6",
    "POI_HAINAN",
    "AREA_CHINA_1",
    "AREA_CHINA_2",
    "AREA_CHINA_3",
  ].forEach((v) => {
    map.setLayoutProperty(v, "visibility", state.ZJiSHow ? "visible" : "none");
  });
});

// 区划 树
const treeDataAdmin = ref([
  {
    title: "海南省",
    key: "0-0",
    children: [],
  },
]);

const expandedKeysAdmin = ref(["0-0"]);
const selectedKeysAdmin = ref();
const checkedKeysAdmin = ref(["0-0"]);

const loadAdminList = () => {
  admin.forEach((ad) => {
    let city = [];
    ad.children &&
      ad.children.forEach((cd) => {
        city.push({
          title: cd.name,
          key: `0-0-${ad.name}-${cd.name}`,
        });
      });
    treeDataAdmin.value[0].children.push({
      title: ad.name,
      key: `0-0-${ad.name}`,
      children: city,
    });
  });
};

const resetSyle = () => {
  // 样式调节
  let mstyle = [
    "WAY_HAINAN_4_8",
    "WAY_HAINAN_OUTLINE_4_8",
    "WAY_HAINAN_11",
    "WAY_HAINAN_11_20",
    "WAY_HAINAN_NAME",
    "WAY_HAINAN_NAME_8_20",
    "WAY_HAINAN_HEIGHT",
  ];
  mstyle.forEach((e) => {
    map.setFilter(e, null);
  });
};

watch(checkedKeysAdmin, () => changeAdmin());

const changeAdmin = () => {
  // console.log(checkedKeysAdmin);
  // 汇总选中
  let where = [];
  checkedKeysAdmin.value.forEach((d) => {
    d.split("-").length > 3 && where.push(d.split("-")[3]);
    d.split("-").length > 2 && where.push(d.split("-")[2]);
  });

  // 样式调节
  let mstyle = [
    "WAY_HAINAN_4_8",
    "WAY_HAINAN_OUTLINE_4_8",
    "WAY_HAINAN_11",
    "WAY_HAINAN_11_20",
    "WAY_HAINAN_NAME",
    "WAY_HAINAN_NAME_8_20",
    "WAY_HAINAN_HEIGHT",
  ];
  mstyle.forEach((e) => {
    if (!where.length) {
      map.setFilter(e, ["in", "county", "un"]);
      return;
    }
    where.length > 0 && map.setFilter(e, ["all", ["in", "county", ...where]]);
  });
};

// 关联树
const treeData = ref([
  {
    title: "道路",
    key: "0-0",
    children: [
      {
        title: "高速公路",
        key: "0-0-1",
        children: [],
      },
      {
        title: "国道",
        key: "0-0-2",
        children: [],
      },
      {
        title: "省道",
        key: "0-0-3",
        children: [],
      },
      {
        title: "县道",
        key: "0-0-4",
        children: [],
      },
      //   {
      //     title: "乡道",
      //     key: "0-0-5",
      //     children: [],
      //   },
      //   {
      //     title: "村道",
      //     key: "0-0-6",
      //     children: [],
      //   },
      //   {
      //     title: "专用公路",
      //     key: "0-0-7",
      //     children: [],
      //   },
      //   {
      //     title: "城市道路",
      //     key: "0-0-8",
      //     children: [],
      //   },
      //   {
      //     title: "未分类道路",
      //     key: "0-0-9",
      //     children: [],
      //   },
    ],
  },
]);

const expandedKeys = ref(["0-0"]);
const selectedKeys = ref();
const checkedKeys = ref(["0-0"]);

watch(checkedKeys, () => changeRoad());

const changeRoad = () => {
  // 汇总选中
  let where = [];
  checkedKeys.value.forEach((d) => {
    d.split("-").length > 3 && where.push(d.split("-")[3]);
  });

  // 样式调节
  let mstyle = [
    "WAY_HAINAN_4_8",
    "WAY_HAINAN_OUTLINE_4_8",
    "WAY_HAINAN_11",
    "WAY_HAINAN_11_20",
    "WAY_HAINAN_NAME",
    "WAY_HAINAN_NAME_8_20",
    "WAY_HAINAN_HEIGHT",
  ];
  mstyle.forEach((e) => {
    if (!where.length) {
      map.setFilter(e, ["in", "ref", "un"]);
      return;
    }
    where.length > 0 && map.setFilter(e, ["all", ["in", "ref", ...where]]);
  });
};


// 高速公路（Motorway）：一般为浅蓝色，颜色值为 #2E6887。
// 主要道路（Primary road）：一般为浅灰色，颜色值为 #E0E0E0。
// 次要道路（Secondary road）：一般为浅灰色，颜色值为 #F0F0F0。
// 省道（Regional road）：一般为浅黄色，颜色值为 #FFE8C0。
// 县道（Local road）：一般为浅绿色，颜色值为 #C8E8C0。
let mapdata = {
  rightLayer: ref(false),
  x: 0,
  y: 0,
  loadLayer: [],
  activeKey: 1,
  layers: layers,
  tuli: [
    { id: 1, name: "高速公路", color: "RGB(188,160,239)", value: [], checked: true },
    { id: 2, name: "国道", color: "RGB(238,156,66)", value: [], checked: true },
    { id: 3, name: "省道", color: "RGB(252,209,89)", value: [], checked: true },
    { id: 4, name: "县道", color: "RGB(252,240,149)", value: [], checked: true },
    { id: 4, name: "旅游公路", color: "RGB(206,234,214)", value: [], checked: true },
    // { id: 5, name: "乡道", color: "#DC94ED", value: [], checked: true },
    // { id: 6, name: "村道", color: "#77E5EB", value: [], checked: true },
    // { id: 7, name: "专用公路", color: "#EBD78F", value: [], checked: true },
    // { id: 8, name: "城市道路", color: "#81EEC8", value: [], checked: true },
    // { id: 9, name: "未分类道路", color: "#F7621A", value: [], checked: true },
  ],

  readTypeList: [],
};

const searchPOI = () => {
  let dos =
    "https://restapi.amap.com/v5/place/text?keywords=%E5%8D%9A%E9%B3%8C%E4%BA%92%E9%80%9A&types=180200|180201|180202|180203|180300|180301|180302&region=%E6%B5%B7%E5%8D%97&key=00aa810d556c38ed9e1f70720c671f0e";

  fetch(dos)
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((err) => console.log("Request Failed", err));
};

// 获得道路类型
let roadtypes = ref({
  GS: [],
  GD: [],
  SD: [],
  XD: [],
  YD: [],
});

// 获得道路类型
const loadRoadList = () => {
  fetch(config.API.getRoadType)
    .then((response) => response.json())
    .then((json) => {
      json.reduce((acc, obj) => {
        let name = obj.ref;

        // 国家高速
        if ((name.length == 3 || name.length == 5) && name.indexOf("G") > -1) {
          roadtypes.value.GS.push(obj.ref);
          MOCK_DATA.G.push(obj.ref);
        }
        // 省级高速
        if (name.length == 3 && name.indexOf("S") > -1) {
          roadtypes.value.GS.push(obj.ref);
          MOCK_DATA.G.push(obj.ref);
        }

        // 国道
        if (name.length != 3 && name.length != 5 && name.indexOf("G") > -1) {
          roadtypes.value.GD.push(obj.ref);
          MOCK_DATA.G.push(obj.ref);
        }

        // 省道
        if (name.indexOf("S") > -1) {
          roadtypes.value.SD.push(obj.ref);
          MOCK_DATA.S.push(obj.ref);
        }

        // 县道
        if (name.indexOf("X") > -1) {
          roadtypes.value.XD.push(obj.ref);
          MOCK_DATA.X.push(obj.ref);
        }
        // 乡道
        if (name.indexOf("Y") > -1) {
          roadtypes.value.YD.push(obj.ref);
          MOCK_DATA.Y.push(obj.ref);
        }
      }, {});

      let index = 0;
      let math = [];
      for (let a in roadtypes._rawValue) {
        for (let i = 0; i < roadtypes.value[a].length; i++) {
          let k = treeData.value[0].children[index].key + "-" + roadtypes.value[a][i];
          treeData.value[0].children[index].children.push({
            key: k,
            title: roadtypes.value[a][i],
          });
          math.push(k);
        }

        index++;
      }

      // 初始化
      //checkedKeys

      //   console.log(math);
    })
    .catch((err) => console.log("Request Failed", err));
};

// 地图类型
let machine = ref("mercator");
watch(machine, () => {
  message.loading(machine.value == "globe" ? "切换到三维地图" : "切换到二维地图", 1);
});

// 模式切换
const threeD = () => {
  if (map.getProjection().name == "globe") {
    map.setProjection("mercator");
    map.setTerrain(undefined);
    map.setPitch(0);
  } else {
    map.setProjection("globe");
    map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
    map.setPitch(60);
  }

  machine.value = map.getProjection().name;
};

// 图层切换
const switchTile = (layer) => {
  // 投影转换
  layer.projection ? map.setProjection("globe") : map.setProjection("mercator");

  // 图层叠加
  addRasterTileLayer(layer.param, layer.key);

  // 历史缓存
  localStorage.setItem("MAP_LAYERS", JSON.stringify(layer));

  // 路网叠加
  addWay();
};

const zoomIn = () => {
  map && map.zoomIn({ duration: 1000 });
};
const zoomOut = () => {
  map && map.zoomOut({ duration: 1000 });
};
const Zero = () => {
  map.resetNorthPitch({ duration: 2000 });
};

const switchLayer = () => {
  mapdata.rightLayer.value = !mapdata.rightLayer.value;
};

// 地图初始化
let map = undefined;

const initMap = () => {
  mapboxgl.workerCount = 12;
  mapboxgl.accessToken = config.mapbox.key;

  map = new mapboxgl.Map({
    container: "map",
    // center: [105.27771321722543, 39.952128183377255],
    // zoom: 3.5,
    center: [109.7, 19.23],
    zoom: 8.3,
    maxZoom: 18,
    minZoom: 3,
    style: {
      version: 8,
      sprite: "http://" + window.location.host + "/mapboxgl/sprites/sprite",
      glyphs:
        "http://" + window.location.host + "/mapboxgl/fonts/{fontstack}/{range}.pbf",
      light: {
        anchor: "map",
        color: "#F5F5F5",
        intensity: 0.2,
      },
      fog: {
        color: "rgb(186, 210, 235)", // Lower atmosphere
        "high-color": "rgb(36, 92, 223)", // Upper atmosphere
        "horizon-blend": 0.02, // Atmosphere thickness (default 0.2 at low zooms)
        "space-color": "rgb(11, 11, 25)", // Background color
        "star-intensity": 0.6, // Background star brightness (default 0.35 at low zoooms )
      },
      sources: {},
      layers: [
        {
          id: "background",
          type: "background",
          layout: {},
          paint: {
            "background-color": "#f5f5f5",
          },
          interactive: true,
        },
      ],
      _ssl: true,
    },
    projection: "globe",
  });

  map.addControl(
    new mapboxgl.AttributionControl({
      customAttribution: "<div id='xyz'></div>",
    })
  );

  map.addControl(
    new mapboxgl.ScaleControl({
      maxWidth: 150,
      unit: "metric",
    })
  );
};

// 基础图层
const loadBaseWay = () => {
  map.on("load", () => {
    addTiles();

    addWay();

    addTerrain();

   // fitCenter();
  });
};

// 初始化视野
const fitCenter = () => {
  map.flyTo({
    center: [109.7, 19.23],
    zoom: 8.6,
    speed: 1,

    curve: 2,
    easing(t) {
      return t;
    },
  });
};

// 追加地形
const addTerrain = () => {
  map.addSource("mapbox-dem", {
    type: "raster-dem",
    url: "mapbox://mapbox.terrain-rgb",
    tileSize: 512,
    maxzoom: 14,
  });
  map.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
};

// 添加图层
const addTiles = () => {
  //  历史缓存 重置底图
  addRasterTileLayer(mapdata.layers[12].param, mapdata.layers[12].key);
};

// 监听事件
const eventMap = () => {
  map.on("mousemove", (e) => {
    let name = localStorage.getItem("MAP_LAYERS");

    document.getElementById("xyz").innerHTML = `
    <span style='padding-right: 10px;' >© Mileage</span>
    <span style='padding-right: 10px;'>经纬度:${e.lngLat.lng.toFixed(
      6
    )},${e.lngLat.lat.toFixed(6)}</span>
    <span style='padding-right: 10px;' id="zoom">级别:${map.getZoom().toFixed(2)} </span>
    <span  >图源: ${name ? JSON.parse(name).name : layers[12].name}</span>
    `;
  });

  map.on("zoom", () => {
    if (map.getZoom() && document.getElementById("zoom")) {
      document.getElementById("zoom").innerText = map.getZoom().toFixed(2);
    }
  });

  const popup = new mapboxgl.Popup({
    closeOnClick: false,
    closeButton: false,
    maxWidth: "300px",
  });

  map.on("mousemove", "WAY_HAINAN_11_20", (e) => {
    if (map.getZoom() < 10) return;

    map.getCanvas().style.cursor = "pointer";
    const feature = e.features[0];

    map.setFilter("WAY_HAINAN_HEIGHT", [
      "all",
      ["in", "objectid", feature.properties.objectid],
    ]);
    map.setLayoutProperty("WAY_HAINAN_HEIGHT", "visibility", "visible");

    // let text = `
    // <table style="font-size: 14px;line-height:1.8;width:100%;;">
    //     <tr><th colspan="2" style="border-bottom:1px solid #cccccc;font-size:16px;text-align: left" >数据详情</th></tr>
    //     <tr><th style="text-align: left;">数据编号：</th><td >${
    //       feature.properties.osm_id
    //     }</td><tr>
    //     <tr><th style="text-align: left;">OSM编号：</th><td >${
    //       feature.properties.osm_id
    //     }</td><tr>
    //     <tr><th style="text-align: left;">段编号：</th><td >${
    //       feature.properties.osm_id
    //     }</td><tr>
    //     <tr><th style="text-align: left;">所属道路：</th><td >${
    //       feature.properties.ref
    //     }</td><tr>
    //     <tr><th style="text-align: left;">所属路段：</th><td >${
    //       feature.properties.name
    //     }</td><tr>
    //     <tr><th style="text-align: left;">收费道路类型：</th><td>${
    //       feature.properties.roadtype
    //     }</td></tr>
    //     <tr><th style="text-align: left;">路段方向：</th><td>${
    //       feature.properties.oneway == "F" ? "双向" : "单向"
    //     }</td></tr>
    //     <tr><th style="text-align: left;">设计时速(km/h)：</th><td>${Number(
    //       feature.properties.maxspeed
    //     )} </td></tr>
    //     <tr><th style="text-align: left;">是否桥梁：</th><td>${
    //       feature.properties.bridge == "T" ? feature.properties.bt_name : "否"
    //     }</td></tr>
    //     <tr><th style="text-align: left;">是否隧道：</th><td>${
    //       feature.properties.tunnel == "T" ? feature.properties.bt_name : "否"
    //     }</td></tr>
    //     <tr><th style="text-align: left;">长度(km)：</th><td>${Number(
    //       feature.properties.length
    //     ).toFixed(4)} </td></tr>
    //     <tr><th style="text-align: left;">互通名称：</th><td>${
    //       feature.properties.rs_name
    //     }</td> </tr>
    //     <tr><th style="text-align: left;">省级行政区划：</th><td>${
    //       feature.properties.province
    //     } </td></tr>
    //     <tr><th style="text-align: left;">市县级行政区划：</th><td>${
    //       feature.properties.city
    //     } </td></tr>
    //     </table>
    // `;

    let text = `
    <table style="font-size: 14px;line-height:1.8;width:100%;;">
        <tr><th colspan="2" style="border-bottom:1px solid #cccccc;font-size:16px;text-align: left" >路网详情</th></tr>
        <tr><th>数据编号：</th><td >${Number(feature.properties.objectid)}</td><tr>
        <tr><th>地图编号：</th><td >${feature.properties.gid}</td><tr>
        <tr><th>路段编号：</th><td >${Number(feature.properties.osm_id)}</td><tr>
        <tr><th>所属道路：</th><td >${
          !feature.properties.ref ? "" : feature.properties.ref
        } ${feature.properties.name ? feature.properties.name : ""}</td><tr>
        <tr><th>收费类型：</th><td>${feature.properties.roadtype}</td></tr>
        <tr><th>路段方向：</th><td>${
          feature.properties.oneway == "T"
            ? "正向通行"
            : feature.properties.oneway == "F"
            ? "逆向通行"
            : "双向通行"
        }</td></tr>
        <tr><th>设计时速：</th><td>${Number(feature.properties.maxspeed)}(km/h) </td></tr>
        <tr><th>隧道桥梁：</th><td>${feature.properties.bridge == "T" ? "桥梁" : ""}${
      feature.properties.tunnel == "T" ? "隧道" : ""
    }</td></tr>
        <tr><th>要素长度：</th><td>${Number(feature.properties.length).toFixed(
          6
        )} (m)</td></tr>
        <tr><th>互通名称：</th><td>${feature.properties.rs_name?feature.properties.rs_name:''}</td> </tr>
        <tr><th>省级区划：</th><td>${feature.properties.province?feature.properties.province:''} </td></tr>
        <tr><th>市县区划：</th><td>${feature.properties.city?feature.properties.city:feature.properties.city} </td></tr>
        </table>
    `;
    popup.setLngLat(e.lngLat).setHTML(text).addTo(map);
  });

  map.on("mouseleave", "WAY_HAINAN_11_20", () => {
    map.getCanvas().style.cursor = "";
    popup.setLngLat([0, 0]);
    popup.setHTML("");

    map.setLayoutProperty("WAY_HAINAN_HEIGHT", "visibility", "none");
  });
};

// 初始化
onMounted(() => {
  nextTick(() => {
    initMap();

    eventMap();

    loadBaseWay();

    loadData();
  });
});

// 加载异步数据
const loadData = () => {
  // 道路列表
  loadRoadList();

  // 行政
  loadAdminList();
};

// 定制图层
const addRasterTileLayer = (layerList, key) => {
  mapdata.loadLayer.forEach((layerId) => {
    map.getLayer(layerId) && map.removeLayer(layerId);
    map.getSource(layerId) && map.removeSource(layerId);
  });
  mapdata.loadLayer = [];
  layerList.forEach((layer) => {
    mapdata.loadLayer.push(layer[0]);
    //调用接口，添加图层
    var param = key ? { key: key } : null;
    map.addLayer(rasterTileLayer(layer[0], layer[1], param));
  });
};

// 添加矢量路网
const addWay = () => {
  // 配图
  waySpec.forEach((layer) => {
    map.getLayer(layer.id) && map.removeLayer(layer.id);
  });

  // 源数据
  let sources = [
    config.way,
    config.poi,
    config.wpoi,
    config.world_china_city,
    config.world_china_county,
    config.world_china_province,
  ];
  sources.forEach((source) => {
    map.getSource(source.name) && map.removeSource(source.name);
  });

  // 重载数据
  sources.forEach((source) => {
    !map.getSource(source.name) && map.addSource(source.name, source.tile);
  });

  // 重载配图
  waySpec.forEach((spec) => {
    !map.getLayer(spec.id) && map.addLayer(spec);
  });
};
</script>

<style scoped>
/deep/ .ant-card-grid {
  padding: 15px;
}

/deep/ .ant-btn {
  padding: 5px 10px;
  margin-top: -1px;
}
.map {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.right-tl {
  position: absolute;
  left: 1rem;
  bottom: 2.5rem;
  width: 18vw;

  z-index: 1000;
}

.right-layer {
  position: absolute;
  right: 3vw;
  bottom: 2vh;
  width: 27rem;
  z-index: 1000;
}
.right-tool {
  position: absolute;
  right: 1rem;
  bottom: 1.5rem;
  width: 2rem;
  z-index: 1000;
}

.mapdata-tool {
  position: absolute;
  right: 1rem;
  top: 1rem;
  height: 2vh;
  width: 20vw;
  z-index: 1000;
}

.left-menu {
  position: absolute;
  left: 1rem;
  top: 1rem;
  width: 20rem;

  z-index: 1000;
}

.page {
  height: calc(100%);
  width: 100%;
}
.tip {
  color: rgba(0, 0, 0, 0.88);
  font-size: 14px;
  line-height: 2;
  list-style: none;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
    Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji",
    "Segoe UI Symbol", "Noto Color Emoji";
  background: #ffffff;
}
.tuli {
  font-size: 15px;
  font-weight: 1000;
  padding: 4px 0;
  text-align: center;
}

.center-right {
  position: absolute;
  right: 2.5rem;
  top: 5rem;
  width: 1vw;
}
</style>
