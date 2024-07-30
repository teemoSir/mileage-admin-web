import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/api/basicsdataapp/roadmatch/wayCode/` + url, ...arg)

/**
 *
 * 路段编码信息表Api接口管理器
 *
 * @author jxbd_yl
 * @date  2024/03/27
 **/
export default {
	//路段分页查询
	wayCodeHainanSectionPage(data) {
		return request('wayCodeHainanSectionPage', data, 'get')
	},
	//路段详情查询
	findWayCodeHainanSection(data) {
		return request('findWayCodeHainanSection', data, 'get')
	}
}
