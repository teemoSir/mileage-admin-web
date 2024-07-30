import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/api/billingapp/billing/billingtrafficrecord/` + url, ...arg)

/**
 * 通信记录Api接口管理器
 *
 * @author zdl
 * @date  2023/11/30 15:35
 **/
export default {
	// 获取通信记录分页
	bdBillingTrafficRecordPage(data) {
		return request('page', data, 'get')
	},
	// 获取通信记录详情
	bdBillingTrafficRecordDetail(data) {
		return request('detail', data, 'get')
	},
	bdBillingTrafficRecordLocation(data) {
		return request('location', data, 'get')
	},
	// bdBillingTrafficRecordQueryMatchTracks(data) {
	// 	return request('queryMatchTracks', data, 'get')
	// },
	bdBillingTrafficRecordQueryTracks(data) {
		return request('queryTracks', data, 'get')
	}
}
