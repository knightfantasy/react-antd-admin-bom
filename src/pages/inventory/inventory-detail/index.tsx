import type { ProColumns } from '@ant-design/pro-components'
import { Button, Card, Col, Divider, Row, Statistic } from 'antd'
import ActionModal from './components/ActionModal'
import MyProTable from '@/components/MyProTable'
import { useCRUD } from '@/hooks'

type RowType = Api.Inventory.IInventoryLog

export default function InventoryLog() {
  const { actionRef, modalVisible, fetchData, setModalVisible } = useCRUD<RowType>()

  const { inventoryId } = useParams()

  const { state } = useLocation() // 列表页面通过state传属性
  const { itemNumber, totalQty, stockQty, lockedQty, availableQty, minLimit } = state || {}

  const [minLimitValue, setMinLimmitValue] = useState<number | undefined>(minLimit)

  const columns = useMemo<ProColumns<RowType>[]>(() => [
    {
      title: '日期',
      dataIndex: 'create_time',
      valueType: 'date',
    },
    {
      title: '类型',
      dataIndex: 'service_type_name',
    },
    {
      title: '库存开始数量',
      dataIndex: 'beginning_qty_stock',
    },
    {
      title: '库存变动数量',
      dataIndex: 'change_qty_stock',
      render: (_, row) => {
        const diff = row.balance_qty_stock - row.beginning_qty_stock
        if (diff === 0) {
          return <span>-</span>
        }
        else if (diff > 0) {
          return (
            <span className="text-green-500">
              {`+${row.change_qty_stock}`}
            </span>
          )
        }
        else {
          return (
            <span className="text-red-500">
              {`-${row.change_qty_stock}`}
            </span>
          )
        }
      },
    },
    {
      title: '库存结存数量',
      dataIndex: 'balance_qty_stock',
    },

    {
      title: '可用开始数量',
      dataIndex: 'beginning_qty_available',
    },
    {
      title: '可用变动数量',
      dataIndex: 'change_qty_available',
      render: (_, row) => {
        const diff = row.balance_qty_available - row.beginning_qty_available
        if (diff === 0) {
          return <span>-</span>
        }
        else if (diff > 0) {
          return (
            <span className="text-green-500">
              {`+${row.change_qty_available}`}
            </span>
          )
        }
        else {
          return (
            <span className="text-red-500">
              {`-${row.change_qty_available}`}
            </span>
          )
        }
      },
    },
    {
      title: '可用结存数量',
      dataIndex: 'balance_qty_available',
    },
  ], [])

  return (
    <>
      <Card title={itemNumber} bordered={false}>
        <Row justify="space-around">
          <Col span={4}>
            <Statistic title="入库总数" value={totalQty} />
          </Col>

          <Col span={4}>
            <Statistic title="在库数量" value={stockQty} />

          </Col>
          <Col span={4}>
            <Statistic title="占用数量" value={lockedQty} />

          </Col>
          <Col span={4}>
            <Statistic title="可用数量" value={availableQty} />

          </Col>
          <Col span={4}>
            <Statistic title="库存下限" value={minLimitValue} precision={0} />

            <Button className="mt-4" type="primary" onClick={() => setModalVisible(true)}>
              设置下限
            </Button>
          </Col>
        </Row>
      </Card>

      <Divider />

      <MyProTable<RowType>
        headerTitle="库存列表"
        columns={columns}
        actionRef={actionRef}
        requestFn={fetchData}
        search={false}
        toolBarRender={false}
      />

      {modalVisible && (
        <ActionModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          inventoryId={inventoryId!}
          minLimitValue={minLimitValue}
          setMinLimmitValue={setMinLimmitValue}
        />
      )}
    </>

  )
}
