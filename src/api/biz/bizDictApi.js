import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/api/bizapp/biz/dict/${url}`, ...arg)
/**
 * 字典
 *
 * @author yubaoshan
 * @date 2022-09-22 22:33:20
 */
export default {
	// 获取业务字典分页
	dictPage(data) {
		return request('page', data, 'get')
	},
	// 获取业务字典树
	dictTree(data) {
		return request('tree', data, 'get')
	},
	// 获取所有字典树
	dictTreeAll(data) {
		return request('treeAll', data, 'get')
	},
	// 编辑业务字典
	submitForm(data) {
		return request('edit', data)
	}
}
