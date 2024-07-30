import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/api/highwayfee/fee/rate/${url}`, ...arg)

/**
 * 费率Api接口管理器
 *
 * @author cg.ji
 * @date  2023/11/21 17:46
 **/
export default {
	rateBasicsPage(data) {
		return request('rateBasicsPage', data, 'get')
	},
	detail(data) {
		return request('detail', data, 'get')
	},
	enableStatus(data) {
		return request('updateStatus', data, 'get')
	},
	addRate(data, id) {
		if (id) {
			return request('editRate', data, 'post')
		} else {
			return request('addRate', data, 'post')
		}
	}
}
