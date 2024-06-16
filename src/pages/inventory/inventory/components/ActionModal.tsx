import { ModalForm, ProFormDigit, ProFormSelect, ProFormText } from '@ant-design/pro-components'
import React from 'react'
import { Form } from 'antd'
import api from '../api'
import { useFormSave } from '@/hooks'

type Row = Api.Inventory.IInventory

interface ActionModalProps {
  currentRow?: Row
  modalVisible: boolean
  setModalVisible: (visible: boolean) => void
  reload?: () => void
}
function ActionModalComponent(props: ActionModalProps) {
  const { modalVisible, currentRow, setModalVisible, reload } = props

  const [form] = Form.useForm()

  const { handleSave } = useFormSave({
    apiMethod: fields => api.outputObj(currentRow!.id, fields),
    formInstance: form,
    onSuccess: () => {
      setModalVisible(false)
      reload?.()
    },
  })

  return (
    <ModalForm
      title="出库"
      form={form}
      modalProps={{ destroyOnClose: true }}
      width="25%"
      autoFocusFirstInput
      open={modalVisible}
      onOpenChange={setModalVisible}
      initialValues={currentRow}
      onFinish={handleSave}
    >
      <ProFormDigit
        name="quantity"
        label="数量"
        fieldProps={{ precision: 0 }} // 设置小数点位数
        rules={[{ required: true }]}
      />
      <ProFormSelect
        name="type"
        label="方式"
        valueEnum={{
          tob: 'toB',
          toc: 'toC',
          sample: '样品',
          pr: 'PR',
          marketing: 'Marketing',
          adjustment: '库存调整',
        }}
      />
      <ProFormText
        name="note"
        label="备注"
      />

    </ModalForm>
  )
}

const ActionModal = React.memo(ActionModalComponent)

export default ActionModal
