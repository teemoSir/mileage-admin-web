
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

import e1 from "@/assets/images/map/c1.png";
import e2 from "@/assets/images/map/c2.png";
import e3 from "@/assets/images/map/c3.png";
import e4 from "@/assets/images/map/c4.png";
import e5 from "@/assets/images/map/c5.png";
import maker from "@/assets/images/map/maker.png";

import config from "../../../config/mapServeConfig";
import { gcj02_To_gps84 } from "./transform";


/**
 * 互通数据坐标录入
 */
const cross = () => {


    // 获取路口表
    //http://localhost:3000/v1/query/way_code_hainan_cross?columns=*&limit=100


    let datajson = [];
    fetch("http://localhost:3000/v1/query/way_code_hainan_cross?columns=*&limit=300")
        .then((response) => response.json())
        .then((json) => {
            if (json.length > 0) {
                //  console.log(json);
                datajson = json;


                let index = 0;
                let time = setInterval(() => {
                    getPOI(datajson[index], index);

                    index++;
                    if (index >= datajson.length) {
                        clearTimeout(time)
                        console.info("完成更新")
                    }
                }, (Math.random() + 0.2) * 100)
            }
        })
        .catch((err) => console.log("Request Failed", err));

    // 查询POI

    const getPOI = (d, id) => {
        fetch(config.API.getGaodePoi.replace("{keywords}", d.name).replace("{region}", "海南省"))
            .then((response) => response.json())
            .then((json) => {
                if (json.status == "1" && json.pois.length > 0) {
                    // console.log(json, json.pois);

                    setCoord(json.pois[0]["location"].split(",")[0], json.pois[0]["location"].split(",")[1], json.pois[0]["name"], id)
                }

            })
            .catch((err) => console.log("Request Failed", err));
    }

    // 更新路口表
    const setCoord = (longitude, latitude, name, id) => {
        //http://localhost:3000/v1/update_coord?filter=%E6%96%B0%E5%9D%A1%E4%BA%92%E9%80%9A&longitude=22&latitude=22

        let ll = gcj02_To_gps84([
            Number(longitude),
            Number(latitude),
        ]);

        fetch(`http://localhost:3000/v1/update_coord?filter=${name}&longitude=${ll.lng}&latitude=${ll.lat}`)
            .then((response) => response.json())
            .then((json) => {
                if (json.length == 0) {
                    console.info(name + ": 更新完成,索引" + id);
                }

            })
            .catch((err) => console.log("Request Failed", err));
    }

}

/**
 * 行政区划
 */
const admin = [
    {
        code: '460100',
        name: '海口市',
        children: [
            { code: '460101', name: '市辖区' },
            { code: '460105', name: '秀英区' },
            { code: '460106', name: '龙华区' },
            { code: '460107', name: '琼山区' },
            { code: '460108', name: '美兰区' },
        ]
    },
    {
        code: '460200',
        name: '三亚市',
        children: [
            { code: '460201', name: '市辖区' },
            { code: '460202', name: '海棠区' },
            { code: '460203', name: '吉阳区' },
            { code: '460204', name: '天涯区' },
            { code: '460205', name: '崖州区' },
        ]
    }, {
        code: '460300',
        name: '三沙市',
        children: [
            { code: '460321', name: '西沙群岛' },
            { code: '460322', name: '南沙群岛' },
            { code: '460323', name: '中沙群岛的岛礁及其海域' },
        ]
    },
    {
        code: '460400',
        name: '儋州市',
    }, {
        code: '469000', name: '省直辖县级行政区划',
        children: [
            { code: '469001', name: '五指山市' },
            { code: '469002', name: '琼海市' },
            { code: '469005', name: '文昌市' },
            { code: '469006', name: '万宁市' },
            { code: '469007', name: '东方市' },
            { code: '469021', name: '定安县' },
            { code: '469022', name: '屯昌县' },
            { code: '469023', name: '澄迈县' },
            { code: '469024', name: '临高县' },
            { code: '469025', name: '白沙黎族自治县' },
            { code: '469026', name: '昌江黎族自治县' },
            { code: '469027', name: '乐东黎族自治县' },
            { code: '469028', name: '陵水黎族自治县' },
            { code: '469029', name: '保亭黎族苗族自治县' },
            { code: '469030', name: '琼中黎族苗族自治县' },
        ]
    }
]


/**
 * 根据条件获得表 json
 * @param {*} url 请求地址
 */
const getTable = async (url) => {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await response.json();
    return data;
}

/**
 * 添加图片缓存
 * @param {*} map 地图实例
 */
const loadImages = (map) => {

    let image = [
        { name: "e1", data: e1 },
        { name: "e2", data: e2 },
        { name: "e3", data: e3 },
        { name: "e4", data: e4 },
        { name: "e5", data: e5 },
        { name: "maker", data: maker },
    ];



    image.forEach((i) => {

        map.loadImage(
            i.data, // 图片的 URL
            (error, image) => {
                if (error) throw error;
                map.addImage(i.name, image);
            }
        );
    })
}


/**
 * 加载互通枢纽等地物要素
 * @param {*} map 地图实例
 */
const addCrossLayer = async (map) => {
    map.getLayer("CROSS_LAYER") && map.removeLayer("CROSS_LAYER");
    map.getSource("CROSS_SOURCE") && map.removeSource("CROSS_SOURCE");

    await getTable(
        config.API.getCross
            .replace("{tablename}", "way_code_hainan_cross")
            .replace("{filter}", "")
            .replace("{limit}", "1000")
    ).then((data) => {
        let features = [];
        data.forEach((d) => {
            features.push({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [d.longitude, d.latitude], // 点的经纬度坐标
                },
                properties: d,
            });
        });

        map.addSource("CROSS_SOURCE", {
            type: "geojson",
            data: {
                type: "FeatureCollection",
                features: features,
            },
        });
        features = [];

        map.addLayer({
            id: "CROSS_LAYER",
            type: "symbol",
            source: "CROSS_SOURCE",
            layout: {
                "icon-image": ["match", ["get", "type"], "1", "e5", "2", "e4", "3", "e3", ""],
                "icon-size": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    2,
                    0.1,
                    5,
                    0.11,
                    16,
                    0.2,
                ],
            },
            layout: {
                visibility: "none"
            },
        });
    });
};


/**
 * 获得道路类型
 * @returns 
 */
const loadRoadList = async () => {
    let MOCK_DATA = {
        G: [],
        S: [],
        X: [],
        Y: [],
    };
    let roadtypes = {
        GS: [],
        GD: [],
        SD: [],
        XD: [],
        YD: [],
    };
    // 关联树
    let treeData = [
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
                {
                    title: "乡道",
                    key: "0-0-5",
                    children: [],
                },
                // {
                //     title: "村道",
                //     key: "0-0-6",
                //     children: [],
                // },
                // {
                //     title: "专用公路",
                //     key: "0-0-7",
                //     children: [],
                // },
                // {
                //     title: "城市道路",
                //     key: "0-0-8",
                //     children: [],
                // },
                // {
                //     title: "未分类道路",
                //     key: "0-0-9",
                //     children: [],
                // },
            ],
        },
    ];
    const response = await fetch(config.API.getRoadType);

    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    let data = await response.json();
    data.reduce((acc, obj) => {
        let name = obj.ref;

        // 国家高速
        if ((name.length == 3 || name.length == 5)  && name.indexOf("G") > -1) {
            roadtypes.GS.push(obj.ref);
            MOCK_DATA.G.push(obj.ref);
        }
      

        // 国道
        if (name.length == 4 && name.indexOf("G") > -1) {
            roadtypes.GD.push(obj.ref);
            MOCK_DATA.G.push(obj.ref);
        }

        // 省道
        if (name.indexOf("S") > -1) {
            roadtypes.SD.push(obj.ref);
            MOCK_DATA.S.push(obj.ref);
        }

        // 县道
        if (name.indexOf("X") > -1) {
            roadtypes.XD.push(obj.ref);
            MOCK_DATA.X.push(obj.ref);
        }
        // 乡道
        if (name.indexOf("Y") > -1) {
            roadtypes.YD.push(obj.ref);
            MOCK_DATA.Y.push(obj.ref);
        }
    }, {});

    let index = 0;
    //let math = [];

    for (let a in Object.keys(roadtypes)) {
        for (let i = 0; i < roadtypes[Object.keys(roadtypes)[a]].length; i++) {
            treeData[0].children[index].children.push({
                key:  treeData[0].children[index].key + "-" + roadtypes[Object.keys(roadtypes)[a]][i],
                title: roadtypes[Object.keys(roadtypes)[a]][i],
            });
        }
        index++;
    }

    return { treeData: treeData, MOCK_DATA: MOCK_DATA, roadtypes: roadtypes }
};



export {
    admin,
    d2,
    d3,
    north,
    c1,
    c2,
    c3,
    c4,
    c5,
    c6,
    c7,
    c8,
    c9,
    c10,
    c11,
    c12,
    getTable,
    cross,
    loadImages,
    addCrossLayer,
    loadRoadList
}
