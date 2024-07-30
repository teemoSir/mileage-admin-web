import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/api/highwayfee/fee/trafficrecord/` + url, ...arg)

/**
 * 通信记录Api接口管理器
 *
 * @author zdl
 * @date  2023/11/30 15:35
 **/
export default {
	// 获取通信记录分页
	trafficRecordPage(data) {
		return request('page', data, 'get')
	},
	// 获取通信记录详情
	trafficRecordDetail(data) {
		return request('queryDetail', data, 'get')
	},
	trafficRecordQueryMatchTracks(data) {
		return request('queryMatchTracks', data, 'get')
	},
	trafficRecordQueryTracks(data) {
		return request('queryTracks', data, 'get')
	}
}
