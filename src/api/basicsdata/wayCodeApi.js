import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/api/basicsdataapp/roadmatch/wayCode/${url}`, ...arg)

/**
 * 道路管理Api接口管理器
 *
 * @author jxbd_yl
 * @date  2024/03/27
 **/
export default {
	//道路编码
	wayCodeHainanPage(data) {
		return request('wayCodeHainanPage', data, 'get')
	},
	//道路编码详情
	findWayCodeHainan(data) {
		return request('findWayCodeHainan', data, 'get')
	},
	//新增、编辑道路管理
	// 提交道路表单 edit为true时为编辑，默认为新增
	wayCodeHainanSubmitForm(data, edit = false) {
		return request(edit ? 'edit' : 'add', data)
	},

	//附属设施分页
	wayCodeHainanFacilitiesPage(data) {
		return request('wayCodeHainanFacilitiesPage', data, 'get')
	},
	//附属设施详情
	findwayCodeHainanFacilities(data) {
		return request('findwayCodeHainanFacilities', data, 'get')
	},
	//交叉口分页查询
	wayCodeHainanCrossPage(data) {
		return request('wayCodeHainanCrossPage', data, 'get')
	},
	//交叉口详情查询
	findwayCodeHainanCross(data) {
		return request('findwayCodeHainanCross', data, 'get')
	},
	//路段分页查询
	wayCodeHainanSectionPage(data) {
		return request('wayCodeHainanSectionPage', data, 'get')
	},
	//路段详情查询
	findWayCodeHainanSection(data) {
		return request('findWayCodeHainanSection', data, 'get')
	}
}
