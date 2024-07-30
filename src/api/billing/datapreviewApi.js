import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/api/dataapp/data/datapreview/` + url, ...arg)

/**
 * @author zdl
 * @date  2023/11/30 15:33
 **/
export default {
	// 计费概况
	bdBillingProfile(data) {
		return request('billingProfile', data, 'get')
	},
	bdBillingProfileHistry(data) {
		return request('bdBillingProfileHistry', data, 'get')
	},
	today(data) {
		return request('today', data, 'get')
	},
	queryVehicleOnline(data) {
		return request('queryVehicleOnline', data, 'get')
	},
	queryBillingByRoadType(data) {
		return request('queryBillingByRoadType', data, 'get')
	},
	queryBillingByRoadVehicleType(data) {
		return request('queryBillingByRoadVehicleType', data, 'get')
	},
	queryBillingVehicleBySource(data) {
		return request('queryBillingVehicleBySource', data, 'get')
	},
	queryBillingVehicleByType(data) {
		return request('queryBillingVehicleByType', data, 'get')
	},
	queryBillingByRoad(data) {
		return request('queryBillingByRoad', data, 'get')
	}
}
