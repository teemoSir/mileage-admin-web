
import Baidu_BZ_WZJ from "@/assets/images/map/Baidu_BZ_WZJ.jpg";
import Baidu_BZ from "@/assets/images/map/Baidu_BZ.jpg";
import Baidu_WX_WZJ from "@/assets/images/map/Baidu_WX_WZJ.jpg";
import Baidu_WX from "@/assets/images/map/Baidu_WX.jpg";
import ESRI_BZ from "@/assets/images/map/ESRI_BZ.jpg";
import ESRI_SL from "@/assets/images/map/ESRI_SL.jpg";
import ESRI_WS from "@/assets/images/map/ESRI_WS.jpg";
import ESRI_WX from "@/assets/images/map/ESRI_WX.jpg";
import Gaode_BZ_WZJ from "@/assets/images/map/Baidu_BZ_WZJ.jpg";
import Gaode_BZ from "@/assets/images/map/Gaode_BZ.jpg";
import Gaode_WX_WZJ from "@/assets/images/map/Gaode_WX_WZJ.jpg";
import Gaode_WX from "@/assets/images/map/Gaode_WX.jpg";
import TDT_BZ_WZJ from "@/assets/images/map/TDT_BZ_WZJ.jpg";
import TDT_BZ from "@/assets/images/map/TDT_BZ.jpg";
import TDT_WX_WZJ from "@/assets/images/map/TDT_WX_WZJ.jpg";
import TDT_WX from "@/assets/images/map/TDT_WX.jpg";

import config from "../../../config/mapServeConfig";


let layers = [
    {
        id: 1,
        projection: false,
        name: "高德影像",
        url: Gaode_WX,
        key: "",
        zj: true,
        param: [
            ["gdyx", "GaoDe.Satellite.Map"],
            ["gdyxzj", "GaoDe.Satellite.Annotion"],
        ],
    },
    {
        id: 2,
        name: "高德影像(无注记)",
        projection: false,
        url: Gaode_WX_WZJ,
        key: "",
        zj: false,
        param: [["gdyx", "GaoDe.Satellite.Map"]],
    },
    {
        id: 3,
        name: "高德标准",
        projection: false,
        url: Gaode_BZ,
        key: "",
        zj: true,
        param: [["gdsl", "GaoDe.Normal.Map"]],
    },
    {
        id: 4,
        name: "高德标准(无注记)",
        projection: false,
        url: Gaode_BZ_WZJ,
        key: "",
        zj: false,
        param: [["gdslwzj", "GaoDe.Normal_NoTag.Map"]],
    },
    {
        id: 5,
        name: "百度影像",
        projection: false,
        url: Baidu_WX,
        key: "11",
        zj: true,
        param: [
            ["bdyx", "Baidu.Satellite.Map"],
            ["bdyxzj", "Baidu.Satellite.Annotion"],
        ],
    },
    {
        id: 6,
        name: "百度影像(无注记)",
        projection: false,
        url: Baidu_WX_WZJ,
        key: "11",
        zj: false,
        param: [["bdyx", "Baidu.Satellite.Map"]],
    },
    {
        id: 7,
        name: "百度标准",
        projection: false,
        url: Baidu_BZ,
        key: "",
        zj: true,
        param: [
            ["bdsl", "Baidu.Normal.Map"],
            ["bdsl", "Baidu.Normal_NoTag.Map"],
        ],
    },
    {
        id: 8,
        name: "百度标准(无注记)",
        projection: false,
        url: Baidu_BZ_WZJ,
        key: "",
        zj: false,
        param: [["bdsl", "Baidu.Normal_NoTag.Map"]],
    },
    {
        id: 9,
        name: "天地图影像",
        projection: true,
        url: TDT_WX,
        key: "9998977aa7629c0d5088a986b20567a1",
        zj: true,
        param: [
            ["tdtyx", "TianDiTu.Satellite.Map"],
            ["tdtyxzj", "TianDiTu.Satellite.Annotion"],
        ],
    },
    {
        id: 10,
        name: "天地图影像(无注记)",
        projection: true,
        url: TDT_WX_WZJ,
        key: "2d7a1be22646b7cad8e925293683e1e8",
        zj: false,
        param: [["tdtyx", "TianDiTu.Satellite.Map"]],
    },
    {
        id: 11,
        name: "天地图标准",
        projection: true,
        url: TDT_BZ,
        key: "2afa77972bd56e6da7f45dee6517b59a",
        zj: true,
        param: [
            ["tdtsl", "TianDiTu.Normal.Map"],
            ["tdtslzj", "TianDiTu.Normal.Annotion"],
        ],
    },
    {
        id: 12,
        name: "天地图标准无注记",
        projection: true,
        url: TDT_BZ_WZJ,
        key: "5a77920c8a19898beea6943e2c0c5bad",
        zj: false,
        param: [["tdtsl", "TianDiTu.Normal.Map"]],
    },

    {
        id: 13,
        name: "ESRI影像",
        projection: true,
        url: ESRI_WX,
        key: "",
        zj: true,
        param: [["arcc", "ArcGIS.Satellite.Map"]],
    },
    {
        id: 14,
        name: "ESRI标准",
        projection: false,
        url: ESRI_BZ,
        key: "",
        zj: true,
        param: [["Map", "Geoq.Normal.Map"]],
    },
    {
        id: 15,
        name: "ESRI深蓝",
        projection: false,
        url: ESRI_SL,
        key: "",
        zj: true,
        param: [["PurplishBlue", "Geoq.Normal.PurplishBlue"]],
    },

    {
        id: 16,
        name: "ESRI温色",
        url: ESRI_WS,
        key: "",
        zj: true,
        param: [["geoqWarm", "Geoq.Normal.Warm"]],
    },
    {
        id: 17,
        name: "星图影像",
        projection: true,
        url: ESRI_WX,
        zj: false,
        key: "44194e4bbd714ee9cd453c7ff3e5635b56bc9d61b26946f7631c69fa96d91e60",
        param: [["xinqiu", "Geovisearth.Satellite.Map"]],
    },
    {
        id: 18,
        name: "星图标准",
        projection: true,
        url: Gaode_BZ,
        zj: true,
        key: "44194e4bbd714ee9cd453c7ff3e5635b56bc9d61b26946f7631c69fa96d91e60",
        param: [["xinqiu1", "Geovisearth.Normal.Map"]],
    },
]

let waySpec = [
    // {
    //     id: "WAY_HAINAN_OUTLINE",
    //     name: "国道/省道",
    //     type: "line",
    //     source: config.way.name,
    //     "source-layer": config.way.name,
    //     minzoom: 11,
    //     layout: {
    //         "line-cap": "round",
    //         "line-join": "round",
    //     },
    //     paint: {
    //         "line-width": 2,
    //         "line-translate-anchor": "viewport",
    //         "line-gap-width": [
    //             "interpolate",
    //             ["exponential", 1.5],
    //             ["zoom"],
    //             3,
    //             1.5,
    //             4,
    //             2,
    //             5,
    //             4,
    //             6,
    //             7,
    //         ],
    //         "line-width": 1,
    //         "line-color": "rgba(255,255,255,0.6)",
    //     },
    //     interactive: true,
    // },
    {
        id: "WAY_HAINAN_OUTLINE_4_8",
        name: "国道/省道",
        type: "line",
        source: config.way.name,
        "source-layer": config.way.name,
        minzoom: 3,
        maxzoom: 10.99,
        // filter: [
        //     "in",
        //     ["get", "roadtype"],
        //     "高速公路",
        // ],
        layout: {
            "line-cap": "round",
            "line-join": "round",
        },
        paint: {
            "line-width": [
                "interpolate",
                ["exponential", 1.5],
                ["zoom"],
                3,
                0.5,
                4,
                1,
                5,
                3,
                6,
                6,
            ],
            "line-translate-anchor": "viewport",
            "line-color": "RGBA(225,255,255,0.5)",
            "line-opacity": 
            [
                "match",
                ["get", "roadtype"],
                "高速公路",
                0.5,
                0
            ],
           
        },
        interactive: true,
    },
    {
        id: "WAY_HAINAN_4_8",
        name: "国道/省道",
        type: "line",
        source: config.way.name,
        "source-layer": config.way.name,
        minzoom: 3,
        maxzoom: 10.99,
        layout: {
            "line-cap": ["step", ["zoom"], "butt", 1, "round"],
            "line-join": ["step", ["zoom"], "miter", 1, "round"],
        },
        // filter: [
        //     "in",
        //     ["get", "roadtype"],
        //     "高速公路",
        // ],
        paint: {
            "line-translate-anchor": "viewport",
            "line-width": [
                "interpolate",
                ["exponential", 1.5],
                ["zoom"],
                3,
                0.3,
                4,
                0.8,
                5,
                1.5,
                6,
                5,
            ],
            "line-color": "RGBA(225,77,98,0.8)",
            "line-opacity": 
            [
                "match",
                ["get", "roadtype"],
                "高速公路",
                1,
                0
            ],

        },
        interactive: true,
    },
    {
        id: "WAY_HAINAN_11",
        name: "国道/省道",
        type: "line",
        source: config.way.name,
        "source-layer": config.way.name,
        minzoom: 9,
        maxzoom: 10.99,

        // 'filter': ['in', ['get', 'roadtype'], '普通公路'],
        layout: {
            "line-cap": ["step", ["zoom"], "butt", 1, "round"],
            "line-join": ["step", ["zoom"], "miter", 1, "round"],
        },
        paint: {
            "line-translate-anchor": "viewport",
            "line-width": ["interpolate", ["exponential", 1.5], ["zoom"], 4, 1, 10, 4, 16, 10],
            "line-color": [
                "match",
                ["slice", ["to-string", ["get", "ref"]], 0, 1],
                "G",
                "RGBA(225,77,98,1)",
                "S",
                "RGBA(110,164,226,0.8)",
                "X",
                "RGBA(220,148,237,0.7)",
                "Y",
                "RGBA(119,229,235,0.5)",
                "RGBA(235,215,143,1)",
            ],
            "line-opacity": 
            [
                "match",
                ["get", "roadtype"],
                "普通公路",
                1,
                0
            ],
        },
        interactive: true,
    },
    {
        id: "WAY_HAINAN_11_20",
        name: "国道/省道",
        type: "line",
        source: config.way.name,
        "source-layer": config.way.name,
        minzoom: 11,
        maxzoom: 20,
        layout: {
            "line-cap": ["step", ["zoom"], "butt", 1, "round"],
            "line-join": ["step", ["zoom"], "miter", 1, "round"],
        },
        paint: {
            "line-translate-anchor": "viewport",
            "line-width": ["interpolate", ["exponential", 1.5], ["zoom"], 4, 1, 10, 4, 16, 10],
            "line-color": [
                "match",
                ["slice", ["to-string", ["get", "ref"]], 0, 1],
                "G",
                "RGBA(225,77,98,1)",
                "S",
                "RGBA(110,164,226,8)",
                "X",
                "RGBA(220,148,237,7)",
                "Y",
                "RGBA(119,229,235,0.5)",
                "RGBA(235,215,143,0.5)",
            ],
        },
        interactive: true,
    },
    {
        id: "WAY_HAINAN_NAME",
        type: "symbol",
        source: config.way.name,
        "source-layer": config.way.name,

        layout: {
            "symbol-avoid-edges": true,
            "icon-rotation-alignment": "viewport",
            "text-pitch-alignment": "viewport",
            visibility: "visible",
            "text-rotation-alignment": "map",
            "symbol-placement": "line",
            "text-font": ["Microsoft YaHei"],
            "text-field": "{name} {ref}",
            "text-size": ["interpolate", ["linear"], ["zoom"], 8, 0, 12, 15, 15, 20],
            "text-padding": 200,
        },
        paint: {
            'text-halo-width': 1.2,
            "text-color": "#000000",
            "text-size": [
                "match",
                ["slice", ["to-string", ["get", "ref"]], 0, 1],
                "G",
                16,
                "S",
                14,
                "X",
                13,
                "Y",
                12,
                10,
            ],
            "text-halo-color": "rgba(255, 255, 255, 0.8)",
        },
        minzoom: 11,
        maxzoom: 22,
    },

    {
        id: "WAY_HAINAN_NAME_8_20",
        type: "symbol",
        source: config.way.name,
        "source-layer": config.way.name,
        // filter: [
        //     "in",
        //     "roadtype",
        //     "高速公路",
        // ],
        layout: {
            "symbol-avoid-edges": true,
            "icon-rotation-alignment": "viewport",
            "text-pitch-alignment": "viewport",
            visibility: "visible",
            "text-font": ["Microsoft YaHei"],
            "text-optional": true,
            "text-padding": 50,
            "icon-padding": 50,
            "text-field": "{ref}",
            "text-size": 13,
            'icon-image': [
                "match",
                ["slice", ["to-string", ["get", "ref"]], 0, 1],
                "G",
                "153",
                "S",
                "153",
                "",
            ],
            'icon-size': 1.5
        },
        paint: {
            "text-color": "rgba(255, 255, 255, 1)",
            // "text-halo-color": "RGBA(19,163,131,1)",
            'text-halo-width': 1.2,
            "line-opacity": 
            [
                "match",
                ["get", "roadtype"],
                "高速公路",
                1,
                0
            ],
            
        },
        minzoom: 4,
        maxzoom: 10.99,
    },



    {
        id: "WAY_HAINAN_HEIGHT",
        name: "国道",
        type: "line",
        source: config.way.name,
        "source-layer": config.way.name,
        minzoom: 6,
        layout: {
            visibility: "none"
        },
        paint: {
            "line-translate-anchor": "viewport",
            "line-width": [
                "interpolate",
                ["exponential", 1.5],
                ["zoom"],
                4,
                5,
                10,
                8,
                16,
                10,
            ],
            "line-color": "blue",
            "line-opacity": 0.8,
        },
        interactive: true,
    },

    {
        id: "POI_HAINAN",
        type: "symbol",
        source: config.poi.name,
        "source-layer": config.poi.name,
        // filter: [
        //     "in",
        //     ["get", "roadtype"],
        //     "高速公路",
        // ],
        layout: {
            "symbol-avoid-edges": true,
            "icon-rotation-alignment": "viewport",
            "text-pitch-alignment": "viewport",
            visibility: "visible",
            "text-font": ["Microsoft YaHei"],
            "text-optional": true,
            "text-padding": 30,
            "icon-padding": 30,
            "text-offset": [0, -1.5],
            "icon-anchor": "bottom",
            "text-field": "{name}",
            "text-size": 16,
            'icon-image': '334'
        },
        paint: {
            "text-color": "rgba(50,42, 42, 1)",
            "text-halo-color": "RGBA(255,255,255,.6)",
            'text-halo-width': 1
        },
        minzoom: 14,

    },

    {
        id: "POI_WORLD_1",
        type: "symbol",
        source: config.wpoi.name,
        "source-layer": config.wpoi.name,
        filter: [
            "in",
            "priority",
            //"0" ,//机场 国外地址
            // "1" //乡
            //"2" //镇
            //"2" //镇
            //   "3", //岛礁 海域
            //  "4", //岛礁 海域
            //"5", //国内内陆岛礁
            //   "6" ,//部分省
            //  "7" //部分市
            //    "10" //部分市
            //  "11" //部分市
            //  "12" //部分市
            //   "13" //部分市
            // "14" //部分市
            // "15" //部分市
            // "16" //部分市
            // "17", // 西沙群岛
            // "105" // 无
            // "106" // 无
            // "107" // 无
            // "108" // 无
            //   "109", // 特别行政区
            // "110", //县级市
            //  "111" ,// 县
            //"112" ,// 区
            // "113" ,// 无
            //  "114" ,// 兴趣市
            // "115" ,// 兴趣市
            // "116", // 二级市
            // "117", //自治州 地区
            // "555", //境界地名




            //    "301",// 无
            "303", // 国家名称
            // "302",// 无
            // "304",
            //  "305",// 国内省 直辖市
            "300", // 中华人民共和国

        ],
        layout: {
            "symbol-avoid-edges": true,
            "icon-rotation-alignment": "viewport",
            "text-pitch-alignment": "viewport",
            visibility: "visible",
            "text-font": ["Microsoft YaHei"],
            "text-optional": true,
            "text-padding": 10,
            "text-padding": [
                "interpolate",
                ["exponential", 1.5],
                ["zoom"],
                2,
                5,
                5,
                10,
                16,
                20,
            ],
            "text-field": "{name_chn}",
            "text-size": 16,

        },
        paint: {
            "text-halo-color": "rgba(50,42, 42, 1)",
            "text-color": "RGBA(255,255,255,1)",
            'text-halo-width': 1.2
        },
        minzoom: 1,
        maxzoom: 3.99,

    },
    {
        id: "POI_WORLD_2",
        type: "symbol",
        source: config.wpoi.name,
        "source-layer": config.wpoi.name,
        filter: [
            "in",
            "priority",
            //"0" ,//机场 国外地址
            // "1" //乡
            //"2" //镇
            //"2" //镇
            //   "3", //岛礁 海域
            //  "4", //岛礁 海域
            //"5", //国内内陆岛礁
            //   "6" ,//部分省
            //  "7" //部分市
            //    "10" //部分市
            //  "11" //部分市
            //  "12" //部分市
            //   "13" //部分市
            // "14" //部分市
            // "15" //部分市
            // "16" //部分市
            // "17", // 西沙群岛
            // "105" // 无
            // "106" // 无
            // "107" // 无
            // "108" // 无
            //   "109", // 特别行政区
            // "110", //县级市
            //  "111" ,// 县
            //"112" ,// 区
            // "113" ,// 无
            //  "114" ,// 兴趣市
            // "115" ,// 兴趣市
            // "116", // 二级市
            // "117", //自治州 地区
            // "555", //境界地名




            //    "301",// 无
            "303", // 国家名称
            // "302",// 无
            // "304",
            "305",// 国内省 直辖市
            //  "300", // 中华人民共和国

        ],
        layout: {
            "symbol-avoid-edges": true,
            "icon-rotation-alignment": "viewport",
            "text-pitch-alignment": "viewport",
            visibility: "visible",
            "text-font": ["Microsoft YaHei"],
            "text-optional": true,
            "text-padding": 10,
            "text-padding": [
                "interpolate",
                ["exponential", 1.5],
                ["zoom"],
                2,
                5,
                5,
                10,
                16,
                20,
            ],
            "text-field": "{name_chn}",
            "text-size": 14,

        },
        paint: {
            "text-color": "rgba(50,42, 42, 1)",
            "text-halo-color": "RGBA(255,255,255,1)",
            'text-halo-width': 1.2
        },
        minzoom: 4,
        maxzoom: 5.99,

    },
    {
        id: "POI_WORLD_3",
        type: "symbol",
        source: config.wpoi.name,
        "source-layer": config.wpoi.name,
        filter: [
            "in",
            "priority",
            //"0" ,//机场 国外地址
            // "1" //乡
            //"2" //镇
            //"2" //镇
            "3", //岛礁 海域
            "4", //岛礁 海域
            //"5", //国内内陆岛礁
            //   "6" ,//部分省
            "7",//部分市
            //    "10" //部分市
            "11",//部分市
            "12", //部分市
            "13", //部分市
            "14", //部分市
            "15", //部分市
            "16", //部分市
            "17", // 西沙群岛
            // "105" // 无
            // "106" // 无
            // "107" // 无
            // "108" // 无
            "109", // 特别行政区
            // "110", //县级市
            //  "111" ,// 县
            //"112" ,// 区
            // "113" ,// 无
            //   "114" ,// 兴趣市
            //  "115" ,// 兴趣市
            "116", // 二级市
            "117", //自治州 地区
            "555", //境界地名




            //    "301",// 无
            "303", // 国家名称
            // "302",// 无
            // "304",
            "305",// 国内省 直辖市
            //  "300", // 中华人民共和国

        ],
        layout: {
            "symbol-avoid-edges": true,
            "icon-rotation-alignment": "viewport",
            "text-pitch-alignment": "viewport",
            visibility: "visible",
            "text-font": ["Microsoft YaHei"],
            "text-optional": true,
            "text-padding": 10,
            "text-padding": [
                "interpolate",
                ["exponential", 1.5],
                ["zoom"],
                2,
                5,
                5,
                10,
                16,
                20,
            ],
            "text-field": "{name_chn}",
            "text-size": [
                "match",
                ["get", "priority"],
                "117", 16,
                14,
            ],

        },
        paint: {
            "text-color": [
                "match",
                ["get", "priority"],
                "117",
                "RGBA(255,255,255,1)",
                "RGBA(50,42, 42, 1)",

            ],
            "text-halo-color": [
                "match",
                ["get", "priority"],
                "117", "RGBA(50,42, 42, 1)",
                "RGBA(255,255,255,1)"
            ],
            'text-halo-width': 1.2
        },
        minzoom: 6,
        maxzoom: 7.99,

    },
    {
        id: "POI_WORLD_4",
        type: "symbol",
        source: config.wpoi.name,
        "source-layer": config.wpoi.name,
        filter: [
            "in",
            "priority",
            "0",//机场 国外地址
            // "1" //乡
            //"2" //镇
            //"2" //镇
            "3", //岛礁 海域
            "4", //岛礁 海域
            "5", //国内内陆岛礁
            //   "6" ,//部分省
            "7",//部分市
            //    "10" //部分市
            "11",//部分市
            "12", //部分市
            "13", //部分市
            "14", //部分市
            "15", //部分市
            "16", //部分市
            "17", // 西沙群岛
            // "105" // 无
            // "106" // 无
            // "107" // 无
            // "108" // 无
            "109", // 特别行政区
            "110", //县级市
            "111",// 县
            //"112" ,// 区
            // "113" ,// 无
            //   "114" ,// 兴趣市
            //  "115" ,// 兴趣市
            "116", // 二级市
            "117", //自治州 地区
            "555", //境界地名




            //    "301",// 无
            // "303", // 国家名称
            // "302",// 无
            // "304",
            "305",// 国内省 直辖市
            //  "300", // 中华人民共和国

        ],
        layout: {
            "symbol-avoid-edges": true,
            "icon-rotation-alignment": "viewport",
            "text-pitch-alignment": "viewport",
            visibility: "visible",
            "text-font": ["Microsoft YaHei"],
            "text-optional": true,
            "text-padding": 10,
            "text-padding": [
                "interpolate",
                ["exponential", 1.5],
                ["zoom"],
                2,
                5,
                5,
                10,
                16,
                20,
            ],
            "text-field": "{name_chn}",
            "text-size": [
                "match",
                ["get", "priority"],
                "117", 16,
                14,
            ],

        },
        paint: {
            "text-color": [
                "match",
                ["get", "priority"],
                "117",
                "RGBA(255,255,255,1)",
                "RGBA(50,42, 42, 1)",

            ],
            "text-halo-color": [
                "match",
                ["get", "priority"],
                "117", "RGBA(50,42, 42, 1)",
                "RGBA(255,255,255,1)"
            ],
            'text-halo-width': 1.2
        },
        minzoom: 8,
        maxzoom: 9.99,

    },
    {
        id: "POI_WORLD_5",
        type: "symbol",
        source: config.wpoi.name,
        "source-layer": config.wpoi.name,
        filter: [
            "in",
            "priority",
            "0",//机场 国外地址
            // "1" //乡
            "2", //镇
            "3", //岛礁 海域
            "4", //岛礁 海域
            "5", //国内内陆岛礁
            //   "6" ,//部分省
            "7",//部分市
            "10",//部分市
            "11",//部分市
            "12", //部分市
            "13", //部分市
            "14", //部分市
            "15", //部分市
            "16", //部分市
            "17", // 西沙群岛
            // "105" // 无
            // "106" // 无
            // "107" // 无
            // "108" // 无
            "109", // 特别行政区
            "110", //县级市
            "111",// 县
            "112",// 区
            // "113" ,// 无
            //   "114" ,// 兴趣市
            //  "115" ,// 兴趣市
            "116", // 二级市
            "117", //自治州 地区
            "555", //境界地名




            //    "301",// 无
            // "303", // 国家名称
            // "302",// 无
            // "304",
            // "305",// 国内省 直辖市
            //  "300", // 中华人民共和国

        ],
        layout: {
            "symbol-avoid-edges": true,
            "icon-rotation-alignment": "viewport",
            "text-pitch-alignment": "viewport",
            visibility: "visible",
            "text-font": ["Microsoft YaHei"],
            "text-optional": true,
            "text-padding": 10,
            "text-padding": [
                "interpolate",
                ["exponential", 1.5],
                ["zoom"],
                2,
                5,
                5,
                10,
                16,
                20,
            ],
            "text-field": "{name_chn}",
            "text-size": [
                "match",
                ["get", "priority"],
                "117", 16,
                14,
            ],

        },
        paint: {
            "text-color": [
                "match",
                ["get", "priority"],
                "117",
                "RGBA(255,255,255,1)",
                "RGBA(50,42, 42, 1)",

            ],
            "text-halo-color": [
                "match",
                ["get", "priority"],
                "117", "RGBA(50,42, 42, 1)",
                "RGBA(255,255,255,1)"
            ],
            'text-halo-width': 1.2
        },
        minzoom: 10,
        maxzoom: 14.99,

    },
    {
        id: "POI_WORLD_6",
        type: "symbol",
        source: config.wpoi.name,
        "source-layer": config.wpoi.name,
        filter: [
            "in",
            "priority",
            "0",//机场 国外地址
            "1",//乡
            "2", //镇
            "3", //岛礁 海域
            "4", //岛礁 海域
            "5", //国内内陆岛礁
            //   "6" ,//部分省
            "7",//部分市
            "10",//部分市
            "11",//部分市
            "12", //部分市
            "13", //部分市
            "14", //部分市
            "15", //部分市
            "16", //部分市
            "17", // 西沙群岛
            // "105" // 无
            // "106" // 无
            // "107" // 无
            // "108" // 无
            "109", // 特别行政区
            "110", //县级市
            "111",// 县
            "112",// 区
            // "113" ,// 无
            "114",// 兴趣市
            "115",// 兴趣市
            "116", // 二级市
            "117", //自治州 地区
            "555", //境界地名




            //    "301",// 无
            // "303", // 国家名称
            // "302",// 无
            // "304",
            // "305",// 国内省 直辖市
            //  "300", // 中华人民共和国

        ],
        layout: {
            "symbol-avoid-edges": true,
            "icon-rotation-alignment": "viewport",
            "text-pitch-alignment": "viewport",
            visibility: "visible",
            "text-font": ["Microsoft YaHei"],
            "text-optional": true,
            "text-padding": 10,
            "text-padding": [
                "interpolate",
                ["exponential", 1.5],
                ["zoom"],
                2,
                5,
                5,
                10,
                16,
                20,
            ],
            "text-field": "{name_chn}",
            "text-size": [
                "match",
                ["get", "priority"],
                "117", 16,
                14,
            ],

        },
        paint: {
            "text-color": [
                "match",
                ["get", "priority"],
                "117",
                "RGBA(255,255,255,1)",
                "RGBA(50,42, 42, 1)",

            ],
            "text-halo-color": [
                "match",
                ["get", "priority"],
                "117", "RGBA(50,42, 42, 1)",
                "RGBA(255,255,255,1)"
            ],
            'text-halo-width': 1.2
        },
        minzoom: 15,

    },


    {
        id: "AREA_CHINA_1",
        'type': 'line',
        source: config.world_china_province.name,
        "source-layer": config.world_china_province.name,
        'paint': {
            'line-width': 1.8,
            'line-color': '#ccc',
            'line-opacity': 0.8
        },
        minzoom: 1,

    },
    {
        id: "AREA_CHINA_2",
        'type': 'line',
        source: config.world_china_county.name,
        "source-layer": config.world_china_county.name,

        'paint': {
            'line-width': 1,
            'line-color': '#fff',
            'line-opacity': 0.6
        },
        minzoom: 1,

    },
    {
        id: "AREA_CHINA_3",
        'type': 'line',
        source: config.world_china_city.name,
        "source-layer": config.world_china_city.name,
        'paint': {
            'line-width': 2,
            'line-color': '#fff',
            'line-opacity': 0.4
        },
        minzoom: 1,
    }
]


export { layers, waySpec }