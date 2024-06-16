import type { ProColumns } from '@ant-design/pro-components'
import { Badge } from 'antd'
import ActionModal from './components/ActionModal'
import MyProTable from '@/components/MyProTable'
import { useCRUD } from '@/hooks'

type Row = Api.Inventory.IInventory

export default function Inventory() {
  const { actionRef, modalVisible, currentRow, fetchData, setCurrentRow, setModalVisible } = useCRUD<Row>()

  const [activeKey, setActiveKey] = useState<string>('all')

  const columns = useMemo<ProColumns<Row>[]>(() => [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },

    {
      title: '物料编号',
      dataIndex: 'item_number',
      formItemProps: {
        name: 'number',
      },
      render: (_, row) => (
        <Link
          to={`${row.id}/logs`}
          state={{
            // 通过 state 传递其它数据
            itemNumber: row.item_number,
            totalQty: row.total_qty,
            stockQty: row.stock_qty,
            lockedQty: row.locked_qty,
            availableQty: row.available_qty,
            minLimit: row.min_limit,
          }}
        >
          {row.item_number}
        </Link>
      ),
    },
    {
      title: '入库总数',
      dataIndex: 'total_qty',
      hideInSearch: true,
    },
    {
      title: '在库数量',
      dataIndex: 'stock_qty',
      hideInSearch: true,
    },
    {
      title: '占用数量',
      dataIndex: 'locked_qty',
      hideInSearch: true,
    },
    {
      title: '可用数量',
      dataIndex: 'available_qty',
      hideInSearch: true,
      render: (dom, row) => {
        const isWarning = row.available_qty < row.min_limit
        return (
          <>
            {dom}
            { isWarning && <Badge className="ml-5" color="red" count="预警" /> }
          </>
        )
      },
    },
    {
      title: '库存下限',
      dataIndex: 'min_limit',
      hideInSearch: true,
      renderText: (_, row) => row.min_limit || '-',
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, row) => [
        <a key="publish" onClick={() => handleOutput(row)}>出库</a>,
      ],
    },

  ], [])

  // 出库
  async function handleOutput(row: Row) {
    setCurrentRow(row)
    setModalVisible(true)
  }

  return (

    <>
      <MyProTable<Row>
        // headerTitle="库存列表"
        columns={columns}
        actionRef={actionRef}
        requestFn={fetchData}
        toolbar={{
          title: '库存列表',
          multipleLine: true,
          tabs: {
            activeKey,
            onChange: activeKey => setActiveKey(activeKey),
            items: [
              {
                key: 'all',
                tab: '全部',
              },
              {
                key: 'part',
                tab: '元件',
              },
              {
                key: 'assembly',
                tab: '备件',
              },
              {
                key: 'product',
                tab: '产品',
              },
              {
                key: 'alert',
                tab: '库存预警',
              },
            ],
          },
        }}
        params={{
          type: activeKey === 'all' ? undefined : activeKey,
        }}
      />

      {modalVisible && (
        <ActionModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          currentRow={currentRow}
          reload={actionRef.current?.reload}
        />
      )}
    </>

  )
}
