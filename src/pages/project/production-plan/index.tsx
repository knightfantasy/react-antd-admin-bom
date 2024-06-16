import type { ProColumns } from '@ant-design/pro-components'
import { Button, Descriptions, Dropdown } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import ActionModal from './components/ActionModal'
import MyProTable from '@/components/MyProTable'
import { useCRUD } from '@/hooks'
import { DeleteButton } from '@/components/buttons'

type Row = Api.Project.IProductionPlan

export default function ProductPlan() {
  const [itemType, setItemType] = useState<string>('')
  const [isCompleting, setIsCompleting] = useState<boolean>(false)

  const {
    modalVisible,
    currentRow,
    actionRef,
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
      fixed: 'left',
      width: 48,
    },
    {
      title: '计划单号',
      dataIndex: 'number',
      hideInSearch: true,
    },
    {
      title: '类型',
      dataIndex: 'item_type',
    },
    {
      title: '货品编号',
      dataIndex: 'item_number',
      formItemProps: {
        label: '编号',
        name: 'number',
      },
    },
    {
      title: '开始时间',
      key: 'start_date',
      width: 200,
      hideInSearch: true,
      render: (_, row) => {
        return (
          <Descriptions size="small" column={1}>
            {row.planned_start_date && (
              <Descriptions.Item label="计划">
                {row.planned_start_date}
              </Descriptions.Item>
            )}
            {row.start_date
            && (
              <Descriptions.Item label="实际">
                {row.start_date}
              </Descriptions.Item>
            )}
          </Descriptions>
        )
      },
    },
    {
      title: '完成时间',
      key: 'end_date',
      width: 200,
      hideInSearch: true,
      render: (_, row) => {
        return (
          <Descriptions size="small" column={1}>
            {row.planned_end_date && (
              <Descriptions.Item label="计划">
                {row.planned_end_date}
              </Descriptions.Item>
            )}
            {row.end_date
            && (
              <Descriptions.Item label="实际">
                {row.end_date}
              </Descriptions.Item>
            )}
          </Descriptions>
        )
      },
    },
    {
      title: '计划数量',
      dataIndex: 'planned_quantity',
      hideInSearch: true,
    },
    {
      title: '实际数量',
      dataIndex: 'quantity',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, row) => {
        return row.quantity
          ? []
          : [
            <a
              key="edit"
              onClick={() => {
                setItemType(row.model_class)
                setIsCompleting(false)
                handleEdit(row)
              }}
            >
              编辑
            </a>,
            <a
              key="complete"
              onClick={() => {
                setItemType(row.model_class)
                setIsCompleting(true)
                handleEdit(row)
              }}
            >
              完成
            </a>,
            <DeleteButton key="delete" onConfirm={async () => await handleSingleDelete(row?.id)} />,
            ]
      },
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [])

  const toolBarRender = useCallback(() => [

    <Dropdown
      key="add"
      menu={{
        items: [
          {
            label: '备件计划',
            key: 'assembly',
          },
          {
            label: '产品计划',
            key: 'product',
          },
        ],
        onClick: ({ key }) => {
          setItemType(key)
          handleAdd()
        },
      }}
    >
      <Button type="primary" icon={<PlusOutlined />}>新增</Button>
    </Dropdown>,

  ], [])

  return (

    <>
      <MyProTable<Row>
        headerTitle="生产计划"
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
          handleSubmit={handleSubmit}
          reload={actionRef.current?.reload}
          itemType={itemType as 'product' | 'assembly'}
          isCompleting={isCompleting}
        />
      )}
    </>

  )
}
