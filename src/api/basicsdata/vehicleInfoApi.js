import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/api/basicsdataapp/basicsdata/vehicleinfo/${url}`, ...arg)

/**
 * 车辆信息表Api接口管理器
 *
 * @author cg.ji
 * @date  2023/11/21 17:46
 **/
export default {
	// 获取车辆信息表分页
	vehicleInfoPage(data) {
		return request('page', data, 'get')
	},
	// 获取车辆信息表详情
	vehicleInfoDetail(data) {
		return request('detail', data, 'get')
	},
	// 获取车辆证件
	queryPicture(data) {
		return request('picture', data, 'get')
	},
	// 排放水平更新
	updateVehicleCc(data) {
		return request('updateVehicleCc', data, 'get')
	}
}
