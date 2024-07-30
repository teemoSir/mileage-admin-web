import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/api/dataapp/data/track/` + url, ...arg)

export default {
	queryTracksXny(data) {
		return request('queryTracksXny', data, 'get')
	}
}
