import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/api/webapp/dev/log/${url}`, ...arg)
/**
 * 日志
 *
 * @author yubaoshan
 * @date 2022-09-22 22:33:20
 */
export default {
	// 获取日志分页
	logPage(data) {
		return request('page', data, 'get')
	},
	// 获取访问日志折线图数据
	logVisLineChartData(data) {
		return request('vis/lineChartData', data, 'get')
	},
	// 获取访问日志饼状图数据
	logVisPieChartData(data) {
		return request('vis/pieChartData', data, 'get')
	},
	// 获取操作日志柱状图数据
	logOpBarChartData(data) {
		return request('op/barChartData', data, 'get')
	},
	// 获取操作日志饼状图数据
	logOpPieChartData(data) {
		return request('op/pieChartData', data, 'get')
	},
	// 清空日志
	logDelete(data) {
		return request('delete', data)
	}
}
