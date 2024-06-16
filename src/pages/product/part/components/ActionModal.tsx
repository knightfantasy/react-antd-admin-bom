import { ModalForm, ProFormGroup, ProFormSelect, ProFormText } from '@ant-design/pro-components'
import type { ProFormInstance } from '@ant-design/pro-components'
import React from 'react'
import { useRequest } from 'ahooks'
import api from '../api'

type Row = Api.Product.IPart

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

  const { data: categoryOptions, loading } = useRequest(() => api.fetchCategoryOptions(), {
    cacheKey: '/material/categories/',
    staleTime: Infinity,
  })

  return (
    <ModalForm
      title={`${isEditing ? '编辑' : '新增'}元件`}
      formRef={formRef}
      modalProps={{ destroyOnClose: true }}
      autoFocusFirstInput
      open={modalVisible}
      onOpenChange={setModalVisible}
      initialValues={currentRow}
      onFinish={async value => await handleSubmit(value as Row)}
    >
      <ProFormGroup>
        <ProFormSelect
          name="category"
          label="类别"
          width="md"
          options={categoryOptions}
          showSearch
          fieldProps={{
            loading,
          }}
          rules={[{ required: true }]}
        />
        <ProFormText
          name="name"
          label="名称"
          width="md"
          rules={[{ required: true }]}
        />
      </ProFormGroup>

      <ProFormGroup>
        <ProFormText
          name="model"
          label="型号"
          width="md"
          rules={[{ required: true }]}
        />

        <ProFormText
          name="footprint"
          label="封装"
          width="md"
        />
      </ProFormGroup>

      <ProFormGroup>
        <ProFormText
          name="specification"
          label="规格"
          width="md"
        />

        <ProFormText
          name="brand"
          label="品牌"
          width="md"
        />
      </ProFormGroup>

      <ProFormGroup>
        <ProFormText
          name="manufacturer"
          label="制造商"
          width="md"
        />

        <ProFormText
          name="manufacturer_model"
          label="厂家型号"
          width="md"
        />
      </ProFormGroup>

      <ProFormGroup>
        <ProFormText
          name="base_cost"
          label="基准价"
          width="md"
        />

        <ProFormText
          name="current_cost"
          label="现货价"
          width="md"
        />
      </ProFormGroup>

      <ProFormGroup>
        <ProFormText
          name="md5_model"
          label="part(md5)"
          width="md"
        />

        <ProFormText
          name="md5_foot"
          label="foot(md5)"
          width="md"
        />
      </ProFormGroup>

      <ProFormText
        name="note"
        label="备注"
      />
    </ModalForm>
  )
}

const ActionModal = React.memo(ActionModalComponent)

export default ActionModal
