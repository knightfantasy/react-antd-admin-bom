import type { ProColumns } from '@ant-design/pro-components'
import { Button, message } from 'antd'
import ActionModal from './components/ActionModal'
import api from './api'
import MySelectTable from '@/components/MySelectTable'
import { useBulkOperation, useCRUD } from '@/hooks'
import { DeleteButton, UploadButton } from '@/components/buttons'

type Row = Api.Product.IAssemblyBom

export default function PcbaDetail() {
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

  const { assemblyId } = useParams()

  const columns = useMemo<ProColumns<Row>[]>(() => [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '名称',
      dataIndex: 'part_name',
    },
    {
      title: '型号',
      dataIndex: 'part_model',
    },
    {
      title: '封装',
      dataIndex: 'part_footprint',
    },
    {
      title: '规格',
      dataIndex: 'part_specification',
    },
    {
      title: '位号',
      dataIndex: 'refdes',
      width: 300,
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
      label="导入BOM"
      errorColumnTitle="Part No."
      data={{ method: 'bom_upload', pid: assemblyId! }}
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
    if (!assemblyId)
      return

    try {
      await api.deleteObjs(assemblyId, { id: selectedRowKeys })
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
