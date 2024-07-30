import { defineStore } from 'pinia'
import { changeColor } from '@/utils/themeUtil'
import config from '@/config'
import { message } from 'ant-design-vue'
import tool from '@/utils/tool'

const toolDataGet = (key) => {
	return tool.data.get(key)
}

// 获取缓存中的，如果取不到那就用配置的
const getCacheConfig = (value) => {
	const data = toolDataGet(value)
	if (data === null) {
		return config[value]
	}
	return data
}

/**
 * deprecated 请使用 useGlobalStore
 */
export const globalStore = defineStore({
	id: 'global',
	state: () => ({
		// 移动端布局
		isMobile: false,
		// 布局
		layout: getCacheConfig('MILEAGE_LAYOUT'),
		// 菜单是否折叠 toggle
		menuIsCollapse: getCacheConfig('MILEAGE_MENU_COLLAPSE'),
		// 侧边菜单是否排他展开
		sideUniqueOpen: getCacheConfig('MILEAGE_SIDE_UNIQUE_OPEN'),
		// 多标签栏
		layoutTagsOpen: getCacheConfig('MILEAGE_LAYOUT_TAGS_OPEN'),
		// 是否展示面包屑
		breadcrumbOpen: getCacheConfig('MILEAGE_BREADCRUMD_OPEN'),
		// 顶栏是否应用主题色
		topHeaderThemeColorOpen: getCacheConfig('MILEAGE_TOP_HEADER_THEME_COLOR_OPEN'),
		// 顶栏主题色通栏
		topHeaderThemeColorSpread: getCacheConfig('MILEAGE_TOP_HEADER_THEME_COLOR_SPREAD'),
		// 模块坞
		moduleUnfoldOpen: getCacheConfig('MILEAGE_MODULE_UNFOLD_OPEN'),
		// 主题
		theme: getCacheConfig('MILEAGE_THEME'),
		// 主题颜色
		themeColor: toolDataGet('MILEAGE_THEME_COLOR') || config.COLOR,
		// 整体表单风格
		formStyle: getCacheConfig('MILEAGE_FORM_STYLE'),
		// 用户信息
		userInfo: toolDataGet('USER_INFO') || {},
		// 系统配置
		sysBaseConfig: toolDataGet('MILEAGE_SYS_BASE_CONFIG') || config.SYS_BASE_CONFIG,
		// 默认应用
		module: getCacheConfig('MILEAGE_MENU_MODULE_ID')
	}),
	getters: {},
	actions: {
		setIsMobile(key) {
			this.isMobile = key
		},
		setLayout(key) {
			this.layout = key
		},
		setTheme(key) {
			this.theme = key
			const closeMessage = message.loading(`加载中...`)
			changeColor(this.themeColor, key).then(closeMessage)
		},
		setThemeColor(key) {
			this.themeColor = key
			const closeMessage = message.loading(`加载中...`)
			changeColor(key, this.theme).then(closeMessage)
		},
		initTheme() {
			const closeMessage = message.loading(`加载中...`)
			changeColor(this.themeColor, this.theme).then(closeMessage)
		},
		toggleConfig(key) {
			this[key] = !this[key]
		},
		setFormStyle(key) {
			this.formStyle = key
		},
		setUserInfo(key) {
			this.userInfo = key
		},
		setSysBaseConfig(key) {
			this.sysBaseConfig = key
		},
		setModule(key) {
			this.module = key
		}
	}
})

export const useGlobalStore = globalStore
