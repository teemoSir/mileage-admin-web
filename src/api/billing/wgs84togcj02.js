export default {
    PI: '3.1415926535897932384626',
    ee: '0.00669342162296594323',
    a: '6378245.0',
    wgs84togcj02 (lng, lat) {
        lng = Number(lng);
        lat = Number(lat);
        if (this.out_of_china(lng, lat)) {
            return [lng, lat];
        } else {
            let dlat = this.transformlat(lng - 105.0, lat - 35.0);
            let dlng = this.transformlng(lng - 105.0, lat - 35.0);
            let radlat = lat / 180.0 * this.PI;
            let magic = Math.sin(radlat);
            magic = 1 - this.ee * magic * magic;
            let sqrtmagic = Math.sqrt(magic);
            dlat = (dlat * 180.0) / ((this.a * (1 - this.ee)) / (magic * sqrtmagic) * this.PI);
            dlng = (dlng * 180.0) / (this.a / sqrtmagic * Math.cos(radlat) * this.PI);
            let mglat = lat + dlat;
            let mglng = lng + dlng;
            return [mglng, mglat];
        }
    },
    transformlat (lng, lat) {
        let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
        ret += (20.0 * Math.sin(6.0 * lng * this.PI) + 20.0 * Math.sin(2.0 * lng * this.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lat * this.PI) + 40.0 * Math.sin(lat / 3.0 * this.PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(lat / 12.0 * this.PI) + 320 * Math.sin(lat * this.PI / 30.0)) * 2.0 / 3.0;
        return ret;
    },
    transformlng (lng, lat) {
        let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
        ret += (20.0 * Math.sin(6.0 * lng * this.PI) + 20.0 * Math.sin(2.0 * lng * this.PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lng * this.PI) + 40.0 * Math.sin(lng / 3.0 * this.PI)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(lng / 12.0 * this.PI) + 300.0 * Math.sin(lng / 30.0 * this.PI)) * 2.0 / 3.0;
        return ret;
    },
    out_of_china (lng, lat) {
        let la = +lat;
        let ln = +lng;
        return !(ln > 73.66 && lng < 135.05 && la > 3.86 && lat < 53.55);
    },
    gcj02towgs84 (lng, lat) {
        lat = Number(lat);
        lng = Number(lng);
        if (this.out_of_china(lng, lat)) {
            return [lng, lat]
        } else {
            let dlat = this.transformlat(lng - 105.0, lat - 35.0);
            let dlng = this.transformlng(lng - 105.0, lat - 35.0);
            let radlat = lat / 180.0 * this.PI;
            let magic = Math.sin(radlat);
            magic = 1 - this.ee * magic * magic;
            let sqrtmagic = Math.sqrt(magic);
            dlat = (dlat * 180.0) / ((this.a * (1 - this.ee)) / (magic * sqrtmagic) * this.PI);
            dlng = (dlng * 180.0) / (this.a / sqrtmagic * Math.cos(radlat) * this.PI);
            let mglat = lat + dlat;
            let mglng = lng + dlng;
            return [lng * 2 - mglng, lat * 2 - mglat]
        }
    }
}
