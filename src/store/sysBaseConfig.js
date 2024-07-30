import configApi from '@/api/dev/configApi'
import { message } from 'ant-design-vue'

const formData = ref({
	MILEAGE_SYS_LOGO: '',
	MILEAGE_SYS_API_URL: '',
	MILEAGE_SYS_NAME: '',
	MILEAGE_SYS_VERSION: '',
	MILEAGE_SYS_COPYRIGHT: '',
	MILEAGE_SYS_COPYRIGHT_URL: '',
	MILEAGE_SYS_DEFAULT_FILE_ENGINE: 'LOCAL',
	MILEAGE_SYS_DEFAULT_CAPTCHA_OPEN: false,
	MILEAGE_SYS_DEFAULT_PASSWORD: ''
})

const param = {
	category: 'SYS_BASE'
}

const getSysBaseConfig = () => {
	configApi.configList(param).then((data) => {
		if (data) {
			data.forEach((item) => {
				formData.value[item.configKey] = item.configValue ? '' : item.configValue
			})
		} else {
			message.warning('表单项不存在，请初始化数据库')
		}
	})
}
