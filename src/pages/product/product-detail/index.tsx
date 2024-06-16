import type { ProColumns } from '@ant-design/pro-components'
import { Button, message } from 'antd'
import ActionModal from './components/ActionModal'
import api from './api'
import MySelectTable from '@/components/MySelectTable'
import { useBulkOperation, useCRUD } from '@/hooks'
import { DeleteButton, UploadButton } from '@/components/buttons'

type Row = Api.Product.IProductItem

export default function ProductDetail() {
  const {
    modalVisible,
    currentRow,
    actionRef,
    formRef,
    setModalVisible,
    fetchData,
    handleEdit,
    handleSubmit,
    handleSingleDelete,
  } = useCRUD<Row>()

  const bulkOperation = useBulkOperation()

  const { setSelectedRowKeys, setSpinning } = bulkOperation

  const { productId } = useParams()

  const columns = useMemo<ProColumns<Row>[]>(() => [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '编号',
      dataIndex: 'item_number',
    },
    {
      title: '数量',
      dataIndex: 'quantity',
    },
    {
      title: '预计单价',
      dataIndex: 'estimated_unit_price',
      render: (_, row) => {
        return row.estimated_unit_price && `￥ ${row.estimated_unit_price}`
      },
    },
    {
      title: '预计总价',
      dataIndex: 'estimated_sku_price',
      render: (_, row) => {
        return `￥ ${(Number.parseFloat(row.estimated_unit_price) * row.quantity).toFixed(2)}`
      },
    },
    {
      title: '备注',
      dataIndex: 'note',
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, row) => [
        <a key="edit" onClick={() => handleEdit(row)}>编辑</a>,
        <DeleteButton key="delete" onConfirm={async () => await handleSingleDelete(row?.id)} />,
      ],
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [])

  const toolBarRender = useCallback(() => [
    <UploadButton
      key="upload"
      label="导入清单"
      errorColumnTitle="Number"
      data={{ method: 'product_item_upload', pid: productId! }}
      requestFn={api.uploadExcel}
      setSpinning={setSpinning}
      actionRef={actionRef}
    />,
  ], [])

  const footerToolbar = useCallback((selectedRowKeys: React.Key[]) =>
    [
      <Button key="bulk_delete" onClick={() => handleBulkDelete(selectedRowKeys)}>批量删除</Button>,
    ], [])

  async function handleBulkDelete(selectedRowKeys: React.Key[]) {
    if (!productId)
      return

    try {
      await api.deleteObjs(productId, { id: selectedRowKeys })
      setSelectedRowKeys([])
      actionRef.current?.reload()
      message.success('删除成功')
    }
    catch (error) {
    }
  }

  return (

    <>
      <MySelectTable<Row>
        headerTitle="BOM"
        columns={columns}
        actionRef={actionRef}
        requestFn={fetchData}
        toolBarRender={toolBarRender}
        bulkOperation={bulkOperation}
        rowSelectionEnabled
        pagination={{ pageSize: Number.MAX_SAFE_INTEGER, showSizeChanger: false }}
        footerToolbar={footerToolbar}
        scroll={{ x: 0 }}
        search={false}
        showSelectAll={false}
      />

      {modalVisible && (
        <ActionModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          currentRow={currentRow}
          formRef={formRef}
          handleSubmit={handleSubmit}
        />
      )}

    </>

  )
}
