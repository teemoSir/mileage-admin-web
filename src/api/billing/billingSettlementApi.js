import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/api/billingapp/billing/billingsettlement/` + url, ...arg)

/**
 * 账单Api接口管理器
 *
 * @author cg.ji
 * @date  2023/12/06 16:17
 **/
export default {
	// 获取账单分页
	billingSettlementPage(data) {
		return request('page', data, 'get')
	},
	// 提交账单表单 edit为true时为编辑，默认为新增
	billingSettlementSubmitForm(data, edit = false) {
		return request(edit ? 'edit' : 'add', data)
	},
	// 删除账单
	billingSettlementDelete(data) {
		return request('delete', data)
	},
	// 获取账单详情
	billingSettlementDetail(data) {
		return request('detail', data, 'get')
	}
}
