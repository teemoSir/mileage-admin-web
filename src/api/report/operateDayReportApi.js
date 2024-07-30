import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/api/dataapp/data/reportDay/` + url, ...arg)

/**
 * 报表Api接口管理器
 *
 * @author cg.ji
 * @date  2023/12/01 15:19
 **/
export default {
	// 获取账单周期配置分页
	operateDayReportApi(data) {
		return request('operateDayReport', data, 'get')
	}
}
