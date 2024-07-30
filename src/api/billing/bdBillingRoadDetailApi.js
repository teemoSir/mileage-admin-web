import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/api/billingapp/billing/billingroaddetail/` + url, ...arg)

/**
 * 道路计费明细表Api接口管理器
 *
 * @author zdl
 * @date  2023/11/30 15:33
 **/
export default {
	// 获取道路计费明细表分页
	bdBillingRoadDetailPage(data) {
		return request('page', data, 'get')
	},
	// 提交道路计费明细表表单 edit为true时为编辑，默认为新增
	bdBillingRoadDetailSubmitForm(data, edit = false) {
		return request(edit ? 'edit' : 'add', data)
	},
	// 删除道路计费明细表
	bdBillingRoadDetailDelete(data) {
		return request('delete', data)
	},
	// 获取道路计费明细表详情
	bdBillingRoadDetailDetail(data) {
		return request('detail', data, 'get')
	},
	bdBillingRoadDetailTrafficId(data) {
		return request('trafficId', data, 'get')
	}
}
