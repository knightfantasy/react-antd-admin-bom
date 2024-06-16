import { ProForm, ProFormDatePicker, ProFormDigit, ProFormGroup, ProFormSelect, ProFormText } from '@ant-design/pro-components'
import React from 'react'
import { useRequest } from 'ahooks'
import { Form, Modal, message } from 'antd'
import api from '../api'
import InventoryTable from './Table'
import { useFormSave } from '@/hooks'

type Row = Api.Project.IProductionPlan

interface ActionModalProps {
  currentRow?: Row
  modalVisible: boolean
  itemType: 'product' | 'assembly'
  /** 是否点击完成按钮 */
  isCompleting: boolean
  setModalVisible: (visible: boolean) => void
  handleSubmit: (data: Partial<Row>) => Promise<void>
  reload?: () => void
}

function ActionModalComponent(props: ActionModalProps) {
  const { modalVisible, currentRow, itemType, isCompleting, reload, setModalVisible, handleSubmit } = props

  const [tableData, setTableData] = useState<Api.Project.IProductionPlanProduct[] | Api.Project.IProductionPlanAssembly[]>([])
  const [plannedQuantity, setPlannedQuantity] = useState<number>(0)

  const [form] = Form.useForm()

  const isEditing = !!currentRow

  const { data: objectIdOptions } = useRequest(() => api.fetchObjectIdOptions(itemType))

  // 表单输入时的回调，处理输入计划数量状态
  const handleValuesChange = (changeValues: Partial<Row>) => {
    if (changeValues.planned_quantity !== undefined) {
      setPlannedQuantity(changeValues.planned_quantity)
    }
  }

  // 下拉框选择产品后，向后端请求BOM库存
  async function handleSelectTarget(value: string) {
    // 更换选择时，清空输入的计划数量
    form.setFieldsValue({
      planned_quantity: null,
    })
    setPlannedQuantity(0)

    if (value) {
      const getInventory = itemType === 'assembly' ? api.getBOMInventory : api.getProductItemInventory
      try {
        const { data } = await getInventory(value)
        setTableData(data)
      }
      catch (error) {
        // console.log(error)
        setTableData([])
      }
    }
    else {
      setTableData([])
    }
  }

  const { handleSave } = useFormSave({
    apiMethod: fields => api.completeObj(currentRow!.id, fields),
    formInstance: form,
    onSuccess: () => {
      setModalVisible(false)
      reload?.()
    },
  })

  // 表单提交
  function handleOnOk() {
    if (!isCompleting) {
      // 新增，编辑时校验下库存是否充足
      const hasError = tableData.some(row => row.available_qty - row.needed_qty * plannedQuantity < 0)
      if (hasError) {
        message.error('可用库存不足，请检查差异数量')
        return
      }
    }
    form.submit()
  }

  return (
    <Modal
      title={`${isEditing ? '编辑' : '新增'}生产计划`}
      width="60%"
      open={modalVisible}
      onOk={handleOnOk} // 提交表单
      onCancel={() => setModalVisible(false)}
      footer={(_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <OkBtn />
        </>
      )}

    >
      <ProForm<Row>
        form={form}
        initialValues={currentRow}
        submitter={false} // 隐藏form的提交按钮
        onFinish={isCompleting
          ? async values => await handleSave(values)
          : async values => await handleSubmit({ ...values, model_class: itemType })}
        onValuesChange={handleValuesChange}
        grid
        autoFocusFirstInput
      >
        <ProFormGroup>
          <ProFormText
            name="number"
            label="计划单号"
            colProps={{ span: 24 }}
            rules={[{ required: true }]}
          />
        </ProFormGroup>

        <ProFormGroup rowProps={{ gutter: 24 }}>
          <ProFormSelect
            name="object_id"
            label={itemType === 'product' ? '产品' : '备件'}
            colProps={{ span: 12 }}
            options={objectIdOptions}
            showSearch
            disabled={isEditing || isCompleting}
            onChange={handleSelectTarget}
            rules={[{ required: true }]}
          />

          {isCompleting
            ? (
              <ProFormDigit
                name="quantity"
                label="实际数量"
                colProps={{ span: 12 }}
                fieldProps={{ precision: 0 }}
                rules={[{ required: true }]}
              />
              )
            : (
              <ProFormDigit
                name="planned_quantity"
                label="计划数量"
                colProps={{ span: 12 }}
                fieldProps={{ precision: 0 }}
                disabled={isEditing}
                rules={[{ required: true }]}
              />
              )}
        </ProFormGroup>

        <ProFormGroup rowProps={{ gutter: 24 }}>
          {
            isCompleting
              ? (
                <ProFormDatePicker
                  name="start_date"
                  label="实际开始"
                  colProps={{ span: 12 }}
                  fieldProps={{
                    style: {
                      width: '100%',
                    },
                  }}
                  rules={[{ required: true }]}
                />
                )
              : (
                <ProFormDatePicker
                  name="planned_start_date"
                  label="计划开始"
                  colProps={{ span: 12 }}
                  fieldProps={{
                    style: {
                      width: '100%',
                    },
                  }}
                  rules={[{ required: true }]}
                />
                )
          }

          {
            isCompleting
              ? (
                <ProFormDatePicker
                  name="end_date"
                  label="实际完成"
                  colProps={{ span: 12 }}
                  fieldProps={{
                    style: {
                      width: '100%',
                    },
                  }}
                  rules={[{ required: true }]}
                />
                )
              : (
                <ProFormDatePicker
                  name="planned_end_date"
                  label="计划完成"
                  colProps={{ span: 12 }}
                  fieldProps={{
                    style: {
                      width: '100%',
                    },
                  }}
                  rules={[{ required: true }]}
                />
                )
          }
        </ProFormGroup>
      </ProForm>

      <InventoryTable
        itemType={itemType}
        tableData={tableData}
        plannedQuantity={plannedQuantity}
      />

    </Modal>

  )
}

const ActionModal = React.memo(ActionModalComponent)

export default ActionModal
