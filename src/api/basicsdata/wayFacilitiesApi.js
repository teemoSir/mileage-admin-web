import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/api/basicsdataapp/facilities/wayAuxiliary/${url}`, ...arg)

/**
 * 附属设施信息表Api接口管理器
 *
 * @author jxbd_yl
 * @date  2024/04/01
 **/
export default {
	//附属设施分页
	wayCodeHainanFacilitiesPage(data) {
		return request('wayCodeHainanFacilitiesPage', data, 'get')
	},
	//附属设施综合详情
	findwayCodeHainanFacilities(data) {
		return request('findwayCodeHainanFacilities', data, 'get')
	},
	//道路树
	findwayCodeTree(data) {
		return request('findwayCodeTree', data, 'get')
	},
	//新增、编辑附属设施管理
	// 提交道路表单 edit为true时为编辑，默认为新增
	wayCodeFacilitiesbmitForm(data, edit = false) {
		return request(edit ? 'edit' : 'add', data)
	},
	//删除
	facilitiesDelete(data) {
		return request('facilitiesDelete', data)
	},
	//附属设施详情
	findWayCodeHainanFacilitiesDetail(data) {
		return request('findWayCodeHainanFacilitiesDetail', data, 'get')
	}
}
