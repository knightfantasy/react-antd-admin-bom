import type { ProColumns } from '@ant-design/pro-components'
import { Badge, Descriptions, Spin } from 'antd'
import ActionModal from './components/ActionModal'
import api from './api'
import MyProTable from '@/components/MyProTable'
import { useCRUD } from '@/hooks'
import { AddButton, DeleteButton, UploadButton } from '@/components/buttons'

type Row = Api.Product.IPart

export default function Part() {
  const {
    modalVisible,
    currentRow,
    actionRef,
    formRef,
    setModalVisible,
    fetchData,
    handleAdd,
    handleEdit,
    handleSubmit,
    handleSingleDelete,
  } = useCRUD<Row>()

  const [spinning, setSpinning] = useState(false)

  const columns = useMemo<ProColumns<Row>[]>(() => [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '型号',
      dataIndex: 'model',
    },
    {
      title: '封装',
      dataIndex: 'footprint',
      hideInSearch: true,
    },
    {
      title: '规格',
      dataIndex: 'specification',
      ellipsis: {
        showTitle: true,
      },
      hideInSearch: true,
    },
    {
      title: '制造商',
      dataIndex: 'manufacturer',
      render: (_, row) => {
        return (
          <Descriptions size="small" column={1}>
            {row.manufacturer
            && (
              <Descriptions.Item label="制造商" key="manufacturer">
                {row.manufacturer}
              </Descriptions.Item>
            )}
            {row.brand
            && (
              <Descriptions.Item label="品牌" key="brand">
                {row.brand}
              </Descriptions.Item>
            )}
          </Descriptions>
        )
      },
    },
    {
      title: '价格',
      dataIndex: 'base_price',
      hideInSearch: true,
      render: (_, row) => {
        return (
          <Descriptions size="small" column={1}>
            {row.base_cost && (
              <Descriptions.Item label="基准价">
                {row.base_cost}
              </Descriptions.Item>
            )}
            {row.current_cost
            && (
              <Descriptions.Item label="现货价">
                {row.current_cost}
              </Descriptions.Item>
            )}
          </Descriptions>
        )
      },
    },
    {
      title: 'KEY',
      dataIndex: 'md5_key',
      hideInSearch: true,
    },
    {
      title: '备注',
      dataIndex: 'note',
      ellipsis: {
        showTitle: true,
      },
      hideInSearch: true,
    },
    {
      title: '关联备件',
      dataIndex: 'assembly_number',
      hideInSearch: true,
      render: (_, row) => {
        return (
          <Descriptions size="small" column={1}>
            {row.assembly_number.map((item, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <Descriptions.Item key={index}>{item}</Descriptions.Item>
            ))}
          </Descriptions>
        )
      },
    },
    {
      title: '可用库存',
      key: 'available_qty',
      hideInSearch: true,
      filters: [
        { text: '预警', value: 'alert' },
      ],
      render: (_, row) => {
        if (row.inventory?.inventory_id) {
          const isWarning = row.inventory.available_qty < row.inventory.min_limit
          return (
            <>
              <Link
                to={`/inventory/inventories/${row.inventory.inventory_id}/logs`}
                state={{
                  // 通过 state 传递其它数据
                  itemNumber: row.number,
                  totalQty: row.inventory.total_qty,
                  stockQty: row.inventory.stock_qty,
                  lockedQty: row.inventory.locked_qty,
                  availableQty: row.inventory.available_qty,
                  minLimit: row.inventory.min_limit,
                }}
              >
                {row.inventory.available_qty}
              </Link>
              { isWarning && <Badge className="ml-5" color="red" count="预警" /> }
            </>
          )
        }
      },
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
    <AddButton key="add" onClick={handleAdd} />,

    <UploadButton
      key="upload"
      label="导入元件"
      errorColumnTitle="型号"
      data={{ method: 'part_upload' }}
      requestFn={api.uploadExcel}
      setSpinning={setSpinning}
      actionRef={actionRef}
    />,

  ], [handleAdd])

  return (

    <>
      <MyProTable<Row>
        headerTitle="元件列表"
        columns={columns}
        actionRef={actionRef}
        requestFn={fetchData}
        toolBarRender={toolBarRender}
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

      {/* 全屏loading */}
      <Spin spinning={spinning} percent="auto" fullscreen />

    </>

  )
}
