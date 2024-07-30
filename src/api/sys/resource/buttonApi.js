import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/api/webapp/sys/button/${url}`, ...arg)
/**
 * 按钮
 *
 * @author yubaoshan
 * @date 2022-09-22 22:33:20
 */
export default {
	// 获取按钮分页
	buttonPage(data) {
		return request('page', data, 'get')
	},
	// 提交表单 edit为true时为编辑，默认为新增
	submitForm(data, edit = false) {
		return request(edit ? 'edit' : 'add', data)
	},
	// 删除按钮
	buttonDelete(data) {
		return request('delete', data)
	},
	// 获取按钮详情
	buttonDetail(data) {
		return request('detail', data, 'get')
	}
}
