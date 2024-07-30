import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/api/basicsdataapp/cross/wayIntersection/${url}`, ...arg)

/**
 *
 * 道路交叉管理Api接口管理器
 *
 * @author jxbd_yl
 * @date  2024/04/10
 **/
export default {
	//道路交叉管理分页查询
	wayCodeHainanCrossPage(data) {
		return request('wayCodeHainanCrossPage', data, 'get')
	},
	//道路交叉管理详情查询
	findWayCodeCrossDetail(data) {
		return request('findWayCodeCrossDetail', data, 'get')
	},
	//道路树
	findwayCodeTree(data) {
		return request('findwayCodeTree', data, 'get')
	},
	//新增、编辑道路三叉管理
	// 提交道路表单 edit为true时为编辑，默认为新增
	wayCodeCrosssubmitForm(data, edit = false) {
		return request(edit ? 'edit' : 'add', data)
	},
	//删除
	crossDelete(data) {
		return request('crossDelete', data)
	},
	//根据id查询道路三叉管理信息
	findWayCodeCrossSearch(data) {
		return request('findWayCodeCrossSearch', data, 'get')
	}
}
