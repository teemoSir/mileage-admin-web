import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/api/highwayfee/fee/highwayfeeSettlement/` + url, ...arg)

/**
 * 高速账单Api接口管理器
 *
 * @author cg.ji
 * @date  2023/12/06 16:17
 **/
export default {
	// 获取账单分页
	page(data) {
		return request('page', data, 'get')
	},
	// 获取账单详情
	detail(data) {
		return request('detail', data, 'get')
	}
}
