

//const host = `http://localhost:3000/`;
const host = `http://192.168.12.57:8005/`;
const MAP_CONFIG = {
    mapbox: {
        key: "pk.eyJ1IjoibHV3ZW5qdW4iLCJhIjoiY2xpODV0c2s2MWV5YjNrcmJneTJ5OHljcyJ9.STONixPRitDkS9dxJSSbHw"
    },

    // 上海测试服务器取图地址
    way: {
        name: 'hainan_road',
        tile: {
            type: "vector",
            tiles: [
                `${host}v1/mvt/hainan_road/{z}/{x}/{y}?geom_column=geom&columns=name,roadtype,length,rs_name,ref,oneway,objectid,bridge,tunnel,objectid,osm_id,gid,maxspeed,city,county,province`,
                `${host}v1/mvt/hainan_road/{z}/{x}/{y}?geom_column=geom&columns=name,roadtype,length,rs_name,ref,oneway,objectid,bridge,tunnel,objectid,osm_id,gid,maxspeed,city,county,province`,
                `${host}v1/mvt/hainan_road/{z}/{x}/{y}?geom_column=geom&columns=name,roadtype,length,rs_name,ref,oneway,objectid,bridge,tunnel,objectid,osm_id,gid,maxspeed,city,county,province`,
                `${host}v1/mvt/hainan_road/{z}/{x}/{y}?geom_column=geom&columns=name,roadtype,length,rs_name,ref,oneway,objectid,bridge,tunnel,objectid,osm_id,gid,maxspeed,city,county,province`
            ],
        }
    },
    poi: {
        name: "poi_hainan_wgs84_2024",
        tile: {
            type: "vector",
            tiles: [
                `${host}v1/mvt/poi_hainan_wgs84_2024/{z}/{x}/{y}?geom_column=geom&columns=gid,name,dl,zl,lon,lat,province,city,district`,
                `${host}v1/mvt/poi_hainan_wgs84_2024/{z}/{x}/{y}?geom_column=geom&columns=gid,name,dl,zl,lon,lat,province,city,district`,
                `${host}v1/mvt/poi_hainan_wgs84_2024/{z}/{x}/{y}?geom_column=geom&columns=gid,name,dl,zl,lon,lat,province,city,district`,
                `${host}v1/mvt/poi_hainan_wgs84_2024/{z}/{x}/{y}?geom_column=geom&columns=gid,name,dl,zl,lon,lat,province,city,district`
            ]
        }
    },
    wpoi: {
        name: "world_poi",
        tile: {
            type: "vector",
            tiles: [
                `${host}v1/mvt/world_poi/{z}/{x}/{y}?geom_column=geom&columns=name_chn,priority`,
                `${host}v1/mvt/world_poi/{z}/{x}/{y}?geom_column=geom&columns=name_chn,priority`,
                `${host}v1/mvt/world_poi/{z}/{x}/{y}?geom_column=geom&columns=name_chn,priority`,
                `${host}v1/mvt/world_poi/{z}/{x}/{y}?geom_column=geom&columns=name_chn,priority`
            ]
        }
    },
    world_china_province: {
        name: "world_china_province",
        tile: {
            type: "vector",
            tiles: [
                `${host}v1/mvt/world_china_province/{z}/{x}/{y}?geom_column=geom&columns=NAME`,
                `${host}v1/mvt/world_china_province/{z}/{x}/{y}?geom_column=geom&columns=NAME`,
                `${host}v1/mvt/world_china_province/{z}/{x}/{y}?geom_column=geom&columns=NAME`,
                `${host}v1/mvt/world_china_province/{z}/{x}/{y}?geom_column=geom&columns=NAME`
            ],
            minzoom: 2,
            maxzoom: 15.99

        }
    },
    world_china_city: {
        name: "world_china_city",
        tile: {
            type: "vector",
            tiles: [
                `${host}v1/mvt/world_china_city/{z}/{x}/{y}?geom_column=geom&columns=NAME`,
                `${host}v1/mvt/world_china_city/{z}/{x}/{y}?geom_column=geom&columns=NAME`,
                `${host}v1/mvt/world_china_city/{z}/{x}/{y}?geom_column=geom&columns=NAME`,
                `${host}v1/mvt/world_china_city/{z}/{x}/{y}?geom_column=geom&columns=NAME`
            ],
            minzoom: 6,
            maxzoom: 7.49

        }
    },
    world_china_county: {
        name: "world_china_county",
        tile: {
            type: "vector",
            tiles: [
                `${host}v1/mvt/world_china_county/{z}/{x}/{y}?geom_column=geom&columns=NAME`,
                `${host}v1/mvt/world_china_county/{z}/{x}/{y}?geom_column=geom&columns=NAME`,
                `${host}v1/mvt/world_china_county/{z}/{x}/{y}?geom_column=geom&columns=NAME`,
                `${host}v1/mvt/world_china_county/{z}/{x}/{y}?geom_column=geom&columns=NAME`
            ]
            , minzoom: 7.5,
            maxzoom: 20

        }
    },
    API: {
        // 高德
        getGaodePoi:`https://restapi.amap.com/v5/place/text?keywords={keywords}&region={region}&key=00aa810d556c38ed9e1f70720c671f0e`,
        // 定制化获取道路类型
        getRoadType: `${host}v1/list_sql?filter={f}`,
        // 条件化获取某个字段
        getCross: `${host}v1/query/{tablename}?columns=*&filter={filter}&limit={limit}`,
        
    }
}

export default MAP_CONFIG
