import { ModalForm, ProFormText } from '@ant-design/pro-components'
import type { ProFormInstance } from '@ant-design/pro-components'
import React from 'react'

type Row = Api.Product.ICategory

interface ActionModalProps {
  currentRow?: Row
  modalVisible: boolean
  formRef: React.MutableRefObject<ProFormInstance | undefined>
  setModalVisible: (visible: boolean) => void
  handleSubmit: (data: Partial<Row>) => Promise<void>
}
function ActionModalComponent(props: ActionModalProps) {
  const { modalVisible, currentRow, formRef, setModalVisible, handleSubmit } = props

  const isEditing = !!currentRow

  return (
    <ModalForm
      title={`${isEditing ? '编辑' : '新增'}类别`}
      formRef={formRef}
      modalProps={{ destroyOnClose: true }}
      width="30%"
      autoFocusFirstInput
      open={modalVisible}
      onOpenChange={setModalVisible}
      initialValues={currentRow}
      onFinish={async value => await handleSubmit(value as Row)}
    >
      <ProFormText
        name="name"
        label="名称"
        rules={[{ required: true }]}
      />
      <ProFormText
        name="prefix"
        label="前缀"
      />
      <ProFormText
        name="description"
        label="描述"
      />
    </ModalForm>
  )
}

const ActionModal = React.memo(ActionModalComponent)

export default ActionModal
