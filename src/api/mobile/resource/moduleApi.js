import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/api/webapp/mobile/module/${url}`, ...arg)

/**
 * 模块
 *
 * @author yubaoshan
 * @date 2022-09-22 22:33:20
 */
export default {
	// 获取模块分页
	modulePage(data) {
		return request('page', data, 'get')
	},
	// 提交表单 edit为true时为编辑，默认为新增
	submitForm(data, edit = false) {
		return request(edit ? 'edit' : 'add', data)
	},
	// 删除模块
	moduleDelete(data) {
		return request('delete', data)
	},
	// 获取模块详情
	moduleDetail(data) {
		return request('detail', data, 'get')
	}
}
