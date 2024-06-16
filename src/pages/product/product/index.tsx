import type { ProColumns } from '@ant-design/pro-components'
import { Badge, Space } from 'antd'
import ActionModal from './components/ActionModal'
import MyProTable from '@/components/MyProTable'
import { useCRUD } from '@/hooks'
import { AddButton, DeleteButton } from '@/components/buttons'

type Row = Api.Product.IProduct

export default function Product() {
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
      title: 'SKU',
      dataIndex: 'sku',
      render: (_, row) => <Link to={`${row.id}/items`}>{row.sku}</Link>,
    },
    {
      title: '品名',
      dataIndex: 'name_cn',
      hideInSearch: true,
    },
    {
      title: 'HS编码',
      dataIndex: 'hs_code',
      hideInSearch: true,
    },
    {
      title: '成交单位',
      dataIndex: 'unit_cn',
      hideInSearch: true,
    },
    {
      title: '单品重量',
      dataIndex: 'unit_weight',
      hideInSearch: true,
      render: (_, row) => {
        return row.unit_weight && `${row.unit_weight} kg`
      },
    },
    {
      title: '申报单价',
      dataIndex: 'unit_price',
      hideInSearch: true,
      render: (_, row) => {
        return row.unit_price && `$ ${row.unit_price}`
      },
    },
    {
      title: '规格型号',
      dataIndex: 'specification',
      hideInSearch: true,
    },
    {
      title: '预计成本',
      dataIndex: 'estimated_cost',
      hideInSearch: true,
      render: (_, row) => {
        return row.estimated_cost && `￥ ${row.estimated_cost}`
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
      render: (_, row) => {
        return (
          <Space>
            <a key="edit" onClick={() => handleEdit(row)}>编辑</a>
            { row.status !== 'published' && <DeleteButton key="delete" onConfirm={async () => await handleSingleDelete(row?.id)} />}
          </Space>
        )
      },
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [])

  const toolBarRender = useCallback(() => [
    <AddButton key="add" onClick={handleAdd} />,
  ], [handleAdd])

  return (

    <>
      <MyProTable<Row>
        headerTitle="产品列表"
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
