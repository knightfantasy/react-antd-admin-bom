import { ModalForm, ProFormDigit } from '@ant-design/pro-components'
import React from 'react'
import { Form } from 'antd'
import api from '../api'
import { useFormSave } from '@/hooks'

interface ActionModalProps {
  modalVisible: boolean
  inventoryId: string
  minLimitValue?: number
  setModalVisible: (visible: boolean) => void
  setMinLimmitValue: (newValue: number) => void
}
function ActionModalComponent(props: ActionModalProps) {
  const { modalVisible, inventoryId, minLimitValue, setModalVisible, setMinLimmitValue } = props

  const [form] = Form.useForm()

  const { handleSave } = useFormSave({
    apiMethod: fields => api.updateObj(inventoryId, fields),
    formInstance: form,
    onSuccess: () => {
      setModalVisible(false)
      setMinLimmitValue(form.getFieldValue('min_limit'))
    },
  })

  return (
    <ModalForm
      title="设置下限"
      form={form}
      modalProps={{ destroyOnClose: true }}
      width="25%"
      autoFocusFirstInput
      open={modalVisible}
      onOpenChange={setModalVisible}
      onFinish={handleSave}
    >
      <ProFormDigit
        name="min_limit"
        label="库存下限"
        rules={[{ required: true }]}
        fieldProps={{ precision: 0 }} // 设置小数点位数
        initialValue={minLimitValue}
      />

    </ModalForm>
  )
}

const ActionModal = React.memo(ActionModalComponent)

export default ActionModal
