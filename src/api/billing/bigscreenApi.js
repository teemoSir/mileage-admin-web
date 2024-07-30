import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/api/dataapp/data/bigscreen/` + url, ...arg)

/**
 * @author zdl
 * @date  2023/12/25 15:33
 **/
export default {
	createQueryParam(data) {
		return request('createQueryParam', data, 'get')
	},
	billingHz(data) {
		return request('billingHz', data, 'get')
	},
	queryBigScreenZtgk(data) {
		return request('queryBigScreenZtgk', data, 'get')
	},
	queryBillingByRoadType(data) {
		return request('queryBillingByRoadType', data, 'get')
	},
	queryBigScreenJfgkTop(data) {
		return request('queryBigScreenJfgkTop', data, 'get')
	},
	queryBigScreenLcgkfxCl(data) {
		return request('queryBigScreenLcgkfxCl', data, 'get')
	},
	queryBigScreenLcgkfxCc(data) {
		return request('queryBigScreenLcgkfxCc', data, 'get')
	},
	queryBigScreenJfjeqs(data) {
		return request('queryBigScreenJfjeqs', data, 'get')
	},
	queryBigScreenJtllqs(data) {
		return request('queryBigScreenJtllqs', data, 'get')
	},
	queryBigScreenJfzd(data) {
		return request('queryBigScreenJfzd', data, 'get')
	},
	nowVehicleLocation() {
		return request('nowVehicleLocation', {}, 'get')
	},
	queryNowLocation(data) {
		return request('queryNowLocation', data, 'get')
	}
}
