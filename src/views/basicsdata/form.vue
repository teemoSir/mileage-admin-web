<template>
    <xn-form-container
        :title="'车辆信息详情'"
        :width="700"
        :visible="visible"
        :destroy-on-close="true"
        @close="onClose"
    >
        <a-form ref="formRef" :model="formData" :rules="formRules" layout="horizontal">
        	<a-form-item label="办理人姓名：" name="vehicleOwner">
				<a-input v-model:value="formData.vehicleOwner"  allow-clear />
			</a-form-item>
            <a-form-item label="车牌号码：" name="vehiclePlate">
                <a-input v-model:value="formData.vehiclePlate"  allow-clear />
            </a-form-item>
            <a-form-item label="车牌颜色：" name="vehiclePlateColor">
                <a-input v-model:value="formData.vehiclePlateColor"  allow-clear />
            </a-form-item>
            <a-form-item label="收费车型：" name="vehicleType">
                <a-input v-model:value="formData.vehicleType"  allow-clear />
            </a-form-item>
            <a-form-item label="机动车所有人证件类型：" name="ownerIdCardType">
                <a-input v-model:value="formData.ownerIdCardType"  allow-clear />
            </a-form-item>
            <a-form-item label="机动车所有人证件号码：" name="ownerIdCardNum">
                <a-input v-model:value="formData.ownerIdCardNum"  allow-clear />
            </a-form-item>
            <a-form-item label="机动车所有人地址：" name="ownerAddress">
                <a-input v-model:value="formData.ownerAddress"  allow-clear />
            </a-form-item>
            <a-form-item label="行驶证车辆类型：" name="travelType">
                <a-input v-model:value="formData.travelType"  allow-clear />
            </a-form-item>
            <a-form-item label="行驶证品牌型号：" name="travelModel">
                <a-input v-model:value="formData.travelModel" allow-clear />
            </a-form-item>
            <a-form-item label="营运标识：" name="useCharacter">
                <a-input v-model:value="formData.useCharacter" allow-clear />
            </a-form-item>
            <a-form-item label="车辆识别代号：" name="vin">
                <a-input v-model:value="formData.vin" allow-clear />
            </a-form-item>
            <a-form-item label="车辆发动机号：" name="engineNum">
                <a-input v-model:value="formData.engineNum" allow-clear />
            </a-form-item>
            <a-form-item label="注册日期：" name="registerDate">
                <a-input v-model:value="formData.registerDate" allow-clear />
            </a-form-item>
            <a-form-item label="发证日期：" name="issueDate">
                <a-input v-model:value="formData.issueDate"  allow-clear />
            </a-form-item>
            <a-form-item label="档案编号：" name="fileNum">
                <a-input v-model:value="formData.fileNum" allow-clear />
            </a-form-item>
            <a-form-item label="核定载人数：" name="approvedCount">
                <a-input v-model:value="formData.approvedCount" allow-clear />
            </a-form-item>
            <a-form-item label="总质量：" name="totalMass">
                <a-input v-model:value="formData.totalMass"  allow-clear />
            </a-form-item>
            <a-form-item label="整备质量：" name="unladenMass">
                <a-input v-model:value="formData.unladenMass" allow-clear />
            </a-form-item>
            <a-form-item label="核定载质量：" name="approvedMass">
                <a-input v-model:value="formData.approvedMass" allow-clear />
            </a-form-item>
            <a-form-item label="外廊尺寸：" name="outsideDimensions">
                <a-input v-model:value="formData.outsideDimensions" allow-clear />
            </a-form-item>
            <a-form-item label="准牵引总质量：" name="towMass">
                <a-input v-model:value="formData.towMass" allow-clear />
            </a-form-item>
            <a-form-item label="车轮数：" name="wheelCount">
                <a-input v-model:value="formData.wheelCount" allow-clear />
            </a-form-item>
            <a-form-item label="车轴数：" name="axleCount">
                <a-input v-model:value="formData.axleCount" allow-clear />
            </a-form-item>
            <a-form-item label="报文ID：" name="terminalMessageId">
                <a-input v-model:value="formData.terminalMessageId" allow-clear />
            </a-form-item>
            <a-form-item label="Iccid物联网卡号：" name="iccid">
                <a-input v-model:value="formData.iccid" allow-clear />
            </a-form-item>
            <a-form-item label="终端IMEI：" name="imei">
                <a-input v-model:value="formData.imei" allow-clear />
            </a-form-item>
            <a-form-item label="个人企业标识：" name="infoFlag">
                <a-input v-model:value="formData.infoFlag"  allow-clear />
            </a-form-item>
            <a-form-item label="车辆动力：" name="vehiclePower">
                <a-input v-model:value="formData.vehiclePower" allow-clear />
            </a-form-item>
            <a-form-item label="车籍地：" name="vehicleAddress">
                <a-input v-model:value="formData.vehicleAddress" allow-clear />
            </a-form-item>
            <a-form-item label="唯一识别码：" name="discernCode">
                <a-input v-model:value="formData.discernCode" allow-clear />
            </a-form-item>
            <a-form-item label="机动车所有人联系电话：" name="ownerPhone">
                <a-input v-model:value="formData.ownerPhone" allow-clear />
            </a-form-item>
            <a-form-item label="终端 - 制造商：" name="terminalMfrs">
                <a-input v-model:value="formData.terminalMfrs" allow-clear />
            </a-form-item>
            <a-form-item label="GNSS - 芯片制造商：" name="gnssChipMfrs">
                <a-input v-model:value="formData.gnssChipMfrs" allow-clear />
            </a-form-item>
            <a-form-item label="终端 - 制造商类型" name="terminalMfrsType">
                <a-input v-model:value="formData.terminalMfrsType"  allow-clear />
            </a-form-item>
            <a-form-item label="GNSS - 芯片制造商类型" name="gnssChipMfrsType">
                <a-input v-model:value="formData.gnssChipMfrsType" allow-clear />
            </a-form-item>
            <a-form-item label="SE - 制造商：" name="seMfrs">
                <a-input v-model:value="formData.seMfrs" allow-clear />
            </a-form-item>
            <a-form-item label="SE - 制造商id：" name="seMfrsId">
                <a-input v-model:value="formData.seMfrsId" allow-clear />
            </a-form-item>
            <a-form-item label="车联网标识：" name="clwState">
                <a-input v-model:value="formData.clwState" allow-clear />
            </a-form-item>
            <a-form-item label="汽车排量：" name="vehicleCc">
                <a-input v-model:value="formData.vehicleCc"  allow-clear />
            </a-form-item>
            <a-form-item label="车辆来源：" name="vehicleSource">
                <a-input v-model:value="formData.vehicleSource"  allow-clear />
            </a-form-item>
        </a-form>
        <template #footer>
            <a-button style="margin-right: 8px" @click="onClose">关闭</a-button>
        </template>
    </xn-form-container>
</template>

<script setup name="vehicleInfoForm">
    import { cloneDeep } from 'lodash-es'
    import { required } from '@/utils/formRules'
    import vehicleInfoApi from '@/api/basicsdata/vehicleInfoApi'
    // 抽屉状态
    const visible = ref(false)
    const emit = defineEmits({ successful: null })
    const formRef = ref()
    // 表单数据
    const formData = ref({})
    const submitLoading = ref(false)

    // 打开抽屉
    const onOpen = (record) => {
    	let param = {
                    pkid: record.pkid
                }
		vehicleInfoApi.vehicleInfoDetail(Object.assign(param)).then((data) => {
			visible.value = true
				if (data) {
					let recordData = cloneDeep(data)
					formData.value = Object.assign({}, recordData)
				}
		})

    }
    // 关闭抽屉
    const onClose = () => {
        formRef.value.resetFields()
        formData.value = {}
        visible.value = false
    }
    // 默认要校验的
    const formRules = {
    }
    // 验证并提交数据
    const onSubmit = () => {
        formRef.value.validate().then(() => {
            submitLoading.value = true
            const formDataParam = cloneDeep(formData.value)
            vehicleInfoApi
                .vehicleInfoSubmitForm(formDataParam, formDataParam.pkid)
                .then(() => {
                    onClose()
                    emit('successful')
                })
                .finally(() => {
                    submitLoading.value = false
                })
        })
    }
    // 抛出函数
    defineExpose({
        onOpen
    })
</script>
