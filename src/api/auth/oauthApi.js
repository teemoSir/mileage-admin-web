import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/api/webapp/auth/third/${url}`, ...arg)
/**
 * 三方登录
 *
 * @author yubaoshan
 * @date 2022-09-22 22:33:20
 */
export default {
	// 第三方登录页面渲染
	thirdRender(data) {
		return request('render', data, 'get')
	},
	// 第三方登录授权回调
	thirdCallback(data) {
		return request('callback', data, 'get')
	}
}
