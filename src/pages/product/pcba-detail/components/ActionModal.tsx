import { ModalForm, ProFormDigit, ProFormGroup, ProFormText } from '@ant-design/pro-components'
import type { ProFormInstance } from '@ant-design/pro-components'
import React from 'react'

type Row = Api.Product.IAssemblyBom

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
      title={`${isEditing ? '编辑' : '新增'}BOM`}
      formRef={formRef}
      modalProps={{ destroyOnClose: true }}
      autoFocusFirstInput
      open={modalVisible}
      onOpenChange={setModalVisible}
      initialValues={currentRow}
      onFinish={async value => await handleSubmit(value as Row)}
    >
      <ProFormGroup>
        <ProFormText
          name="part_model"
          label="型号"
          width="md"
          disabled={isEditing}
        />

        <ProFormText
          name="part_footprint"
          label="封装"
          width="md"
          disabled={isEditing}
        />
      </ProFormGroup>

      <ProFormGroup>
        <ProFormText
          name="refdes"
          label="位号"
          width="md"
        />

        <ProFormDigit
          name="quantity"
          label="数量"
          width="md"
          fieldProps={{ precision: 0 }} // 设置小数点位数
        />
      </ProFormGroup>

      <ProFormGroup>
        <ProFormDigit
          name="estimated_unit_price"
          label="单价"
          width="md"
          fieldProps={{ precision: 3 }}
        />

        <ProFormText
          name="note"
          label="备注"
          width="md"
        />
      </ProFormGroup>

    </ModalForm>
  )
}

const ActionModal = React.memo(ActionModalComponent)

export default ActionModal
