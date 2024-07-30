import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/api/basicsdataapp/manage/railwayCode/${url}`, ...arg)

/**
 *
 * 路段管理Api接口管理器
 *
 * @author jxbd_yl
 * @date  2024/04/12
 **/
export default {
	//路段管理分页查询
	wayCodeHainanroadsectionPage(data) {
		return request('wayCodeHainanroadsectionPage', data, 'get')
	},
	//路段管理详情查询
	findWayCodeSectionDetail(data) {
		return request('findWayCodeSectionDetail', data, 'get')
	},
	//道路树
	findwayCodeTree(data) {
		return request('findwayCodeTree', data, 'get')
	},
	//新增、编辑道路管理
	// 提交道路表单 edit为true时为编辑，默认为新增
	wayCodeSectionsubmitForm(data, edit = false) {
		return request(edit ? 'edit' : 'add', data)
	},
	//删除
	sectionDelete(data) {
		return request('sectionDelete', data)
	},
	//根据id查询道路管理信息
	findWayCodeSectionSearch(data) {
		return request('findWayCodeSectionSearch', data, 'get')
	}
}
