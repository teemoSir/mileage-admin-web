import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/api/webapp/dev/message/${url}`, ...arg)
/**
 * 站内信
 *
 * @author yubaoshan
 * @date 2022-09-22 22:33:20
 */
export default {
	// 获取站内信分页
	messagePage(data) {
		return request('page', data, 'get')
	},
	// 获取站内信分页
	messageSend(data) {
		return request('send', data)
	},
	// 删除站内信
	messageDelete(data) {
		return request('delete', data)
	},
	// 获取站内信详情
	messageDetail(data) {
		return request('detail', data, 'get')
	}
}
