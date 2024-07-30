import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/api/dataapp/data/report/` + url, ...arg)

/**
 * 平台运营统计报表Api接口管理器
 *
 * @author jxbd_yl
 * @date  2024/02/22
 **/
export default {
	//平台运营统计报表
	oprateCollectReportApi(data) {
		return request('operateCollectReport', data, 'get')
	}
}
