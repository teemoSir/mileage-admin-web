import { baseRequest } from '@/utils/request'

const request = (url, ...arg) => baseRequest(`/api/billingapp/rate/rateschedule/` + url, ...arg)

/**
 * 费率定时启动任务配置Api接口管理器
 *
 * @author lxf
 * @date  2024/01/11 11:38
 **/
export default {
	// 获取费率定时启动任务配置分页
	bdRateScheduleConfigPage(data) {
		return request('page', data, 'get')
	},
	// 提交费率定时启动任务配置表单 edit为true时为编辑，默认为新增
	bdRateScheduleConfigSubmitForm(data, edit = false) {
		return request(edit ? 'edit' : 'add', data)
	},
	// 删除费率定时启动任务配置
	bdRateScheduleConfigDelete(data) {
		return request('delete', data)
	},
	// 获取费率定时启动任务配置详情
	bdRateScheduleConfigDetail(data) {
		return request('detail', data, 'get')
	}
}
