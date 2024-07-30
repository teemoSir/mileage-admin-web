import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/api/highwayfee/fee/road/${url}`, ...arg)

/**
 * 费率Api接口管理器
 *
 * @author cg.ji
 * @date  2023/11/21 17:46
 **/
export default {
	page(data) {
		return request('page', data, 'get')
	},
	detail(data) {
		return request('detail', data, 'get')
	}
}
