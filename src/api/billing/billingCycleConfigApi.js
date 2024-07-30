import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/api/billingapp/billing/billingcycleconfig/` + url, ...arg)

/**
 * 账单周期配置Api接口管理器
 *
 * @author cg.ji
 * @date  2023/12/01 15:19
 **/
export default {
	// 获取账单周期配置分页
	billingCycleConfigPage(data) {
		return request('page', data, 'get')
	},
	billingCycleConfigList(data) {
    		return request('list', data, 'get')
    	},
	// 提交账单周期配置表单 edit为true时为编辑，默认为新增
	billingCycleConfigSubmitForm(data, edit = false) {
		return request(edit ? 'edit' : 'add', data)
	},
	// 删除账单周期配置
	billingCycleConfigDelete(data) {
		return request('delete', data)
	},
	// 获取账单周期配置详情
	billingCycleConfigDetail(data) {
		return request('detail', data, 'get')
	}
}
