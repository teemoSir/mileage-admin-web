import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/api/highwayfee/fee/rateResult/${url}`, ...arg)

/**
 * 费率Api接口管理器
 *
 * @author cg.ji
 * @date  2023/11/21 17:46
 **/
export default {
	rateResultPage(data) {
		return request('rateResultPage', data, 'get')
	}
}
