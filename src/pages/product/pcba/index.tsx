import type { ProColumns } from '@ant-design/pro-components'
import { Badge, Descriptions } from 'antd'
import ActionModal from './components/ActionModal'
import MyProTable from '@/components/MyProTable'
import { useCRUD } from '@/hooks'
import { AddButton, DeleteButton } from '@/components/buttons'

type Row = Api.Product.IAssembly

export default function Pcba() {
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

  const columns = useMemo<ProColumns<Row>[]>(() => [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '类别',
      dataIndex: 'category_name',
    },
    {
      title: '物料编号',
      dataIndex: 'number',
      render: (_, row) => <Link to={`${row.id}/bom`}>{row.number}</Link>,
    },
    {
      title: '描述',
      dataIndex: 'description',
      ellipsis: {
        showTitle: true,
      },
      hideInSearch: true,
    },
    {
      title: '制造商',
      dataIndex: 'manufacturer',
    },
    {
      title: '预计成本',
      hideInSearch: true,
      render: (_, row) => {
        return row.estimated_cost && `￥ ${row.estimated_cost}`
      },
    },
    {
      title: '关联产品',
      dataIndex: 'product_number',
      hideInSearch: true,
      render: (_, row) => {
        return (
          <Descriptions size="small" column={1}>
            {row.product_number.map((item, index) => (
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
      title: '更新时间',
      dataIndex: 'update_time',
      valueType: 'date',
      hideInSearch: true,
      render: (dom, row) => {
        const statusBadgeMapper = {
          draft: {
            color: 'grey',
            label: '草 稿',
          },
          published: {
            color: 'green',
            label: '发 布',
          },
          obsolete: {
            color: 'red',
            label: '废 弃',
          },
        }

        const badgeType = statusBadgeMapper[row.status]

        return (
          <>
            {dom}
            <Badge className="ml-3" color={badgeType.color} count={badgeType.label} />
          </>
        )
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
  ], [handleAdd])

  return (

    <>
      <MyProTable<Row>
        headerTitle="备件列表"
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
    </>

  )
}
