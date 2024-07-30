import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/api/billingapp/billing/billingroadsection/` + url, ...arg)

/**
 * 道路计费明细表Api接口管理器
 *
 * @author zdl
 * @date  2023/11/30 15:33
 **/
export default {
	// 获取道路计费明细表分页
	page(data) {
		return request('page', data, 'get')
	},
	// 获取道路计费明细表详情
	detail(data) {
		return request('detail', data, 'get')
	},
	bdBillingRoadDetailTrafficId(data) {
		return request('trafficId', data, 'get')
	}
}
