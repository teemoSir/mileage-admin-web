import config from '@/config'
import tool from '@/utils/tool'

// 系统路由
const routes = [
	{
		path: '/bigscreen/mileage',
		component: () => import('@/views/bigscreen/mileage/index.vue'),
		meta: {
			title: '北斗自由流收费监控大屏'
		}
	},
	{
		path: '/bigscreen/mileagepro',
		component: () => import('@/views/bigscreen/mileage_pro/index.vue'),
		meta: {
			title: '北斗自由流收费监控大屏'
		}
	}
]

export default routes
