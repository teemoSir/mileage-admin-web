import { createApp } from 'vue'
import Antd from 'ant-design-vue'
import { createPinia } from 'pinia'

import './style/index.less'
import mileage from './mileage'
import i18n from './locales'
import router from './router'
import App from './App.vue'
import './tailwind.css'
import 'xe-utils'
import VXETable from 'vxe-table'
import VXETablePluginExportXLSX from 'vxe-table-plugin-export-xlsx'
VXETable.use(VXETablePluginExportXLSX)

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(Antd)
app.use(i18n)
app.use(mileage)
app.use(VXETable)

// 挂载app
app.mount('#app')
