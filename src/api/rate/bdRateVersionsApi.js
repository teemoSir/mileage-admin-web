import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/api/billingapp/rate/bdrateversions/${url}`, ...arg)

/**
 * 费率版本控制表Api接口管理器
 *
 * @author lxf
 * @date  2023/11/09 13:50
 **/
export default {
	// 获取费率版本控制表分页
	bdRateVersionsPage(data) {
		return request('page', data, 'get')
	},
	// 提交费率版本控制表表单 edit为true时为编辑，默认为新增
	bdRateVersionsSubmitForm(data, edit = false) {
		return request(edit ? 'edit' : 'add', data)
	},
	// 删除费率版本控制表
	bdRateVersionsDelete(data) {
		return request('delete', data)
	},
	// 获取费率版本控制表详情
	bdRateVersionsDetail(data) {
		return request('detail', data, 'get')
	},
	getBdRateVersionIds() {
		return request('getVersionIds', 'get')
	}
}
