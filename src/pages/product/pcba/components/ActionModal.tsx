import { ModalForm, ProFormGroup, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-components'
import type { ProFormInstance } from '@ant-design/pro-components'
import React from 'react'
import { useRequest } from 'ahooks'
import api from '../../part/api'

type Row = Api.Product.IAssembly

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
      title={`${isEditing ? '编辑' : '新增'}备件`}
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
          name="model"
          label="型号"
          width="md"
          rules={[{ required: true }]}
        />
      </ProFormGroup>

      <ProFormGroup>
        <ProFormText
          name="version"
          label="版本号"
          width="md"
        />

        <ProFormText
          name="manufacturer"
          label="制造商"
          width="md"
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

      <ProFormTextArea
        name="description"
        label="描述"
      />

      <ProFormTextArea
        name="change_history"
        label="变更历史"
      />

    </ModalForm>
  )
}

const ActionModal = React.memo(ActionModalComponent)

export default ActionModal
