import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/api/billingapp/rate/bdtollrates/` + url, ...arg)

/**
 * 车辆通行费率表Api接口管理器
 *
 * @author lxf
 * @date  2023/11/09 14:00
 **/
export default {
	bdTollRates(data) {
		return request('queryRates',data, 'get')
		//return request('queryRates?versionId=FL20231208093101',data, 'get')
	},
	// 获取车辆通行费率表分页
	bdTollRatesPage(data) {
		return request('page', data, 'get')
	},
	// 提交车辆通行费率表表单 edit为true时为编辑，默认为新增
	bdTollRatesSubmitForm(data, edit = false) {
		return request(edit ? 'edit' : 'add', data)
	},
	// 删除车辆通行费率表
	bdTollRatesDelete(data) {
		return request('delete', data)
	},
	// 获取车辆通行费率表详情
	bdTollRatesDetail(data) {
		return request('detail', data, 'get')
	},
	// 批量添加费率明细
	addBatchRatesDetail(data) {
		return request('addBatch', data, 'post')
	},
	//费率结果表
	rateResultTable() {
		return request('rateResultTable', 'get')
	}
}
