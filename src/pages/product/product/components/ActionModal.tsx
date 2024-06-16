import { ModalForm, ProFormGroup, ProFormSelect, ProFormText } from '@ant-design/pro-components'
import type { ProFormInstance } from '@ant-design/pro-components'
import React from 'react'

type Row = Api.Product.IProduct

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
      title={`${isEditing ? '编辑' : '新增'}产品`}
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
          name="sku"
          label="SKU"
          width="md"
          rules={[{ required: true }]}
        />

        <ProFormText
          name="name_cn"
          label="中文品名"
          width="md"
          rules={[{ required: true }]}
        />
      </ProFormGroup>

      <ProFormGroup>
        <ProFormText
          name="name_en"
          label="英文品名"
          width="md"
        />

        <ProFormText
          name="hs_code"
          label="海关编码"
          width="md"
        />
      </ProFormGroup>

      {isEditing && (
        <ProFormGroup>
          <ProFormText
            name="unit_cn"
            label="成交单位"
            width="md"
          />

          <ProFormText
            name="unit_en"
            label="成交单位英文"
            width="md"
          />
        </ProFormGroup>
      )}

      <ProFormGroup>
        <ProFormText
          name="unit_weight"
          label="单品重量"
          width="md"
          rules={[{ required: true }]}
        />

        <ProFormText
          name="unit_price"
          label="申报单价"
          width="md"
          rules={[{ required: true }]}
        />
      </ProFormGroup>

      {isEditing && (
        <ProFormGroup>
          <ProFormSelect
            name="status"
            label="状态"
            width="md"
            valueEnum={
              {
                draft: '草稿',
                published: '发布',
                obsolete: '废弃',
              }
            }
          />

          <ProFormText
            name="estimated_cost"
            label="预计成本"
            width="md"
          />
        </ProFormGroup>
      )}

      <ProFormText
        name="specification"
        label="规格型号"
      />

    </ModalForm>
  )
}

const ActionModal = React.memo(ActionModalComponent)

export default ActionModal
