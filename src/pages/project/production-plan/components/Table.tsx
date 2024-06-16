import React from 'react'
import { Table } from 'antd'
import type { TableProps } from 'antd'

interface InventoryTableProps {
  itemType: 'product' | 'assembly'
  plannedQuantity: number
  tableData: Api.Project.IProductionPlanProduct[] | Api.Project.IProductionPlanAssembly[]
}

function TableComponent(props: InventoryTableProps) {
  const { tableData, itemType, plannedQuantity } = props

  const columnsFixed: TableProps<Api.Project.IProductionPlanDetailFixed>['columns'] = [
    {
      title: '在库数量',
      dataIndex: 'stock_qty',
    },
    {
      title: '占用数量',
      dataIndex: 'locked_qty',
    },
    {
      title: '可用数量',
      dataIndex: 'available_qty',
    },
    {
      title: '单件所需', // 生产一块pcba需要的单个元件数量
      dataIndex: 'needed_qty',
    },
    {
      title: '全部所需', // 生产指定数量pcba需要的单个元件数量
      dataIndex: 'total_needed_qty',
      render: (_, row) => {
        return row.needed_qty * plannedQuantity || '-'
      },
    },
    {
      title: '差异数量', // 库存可用 - 全部所需
      dataIndex: 'diff_qty',
      sorter: (row1, row2) => {
        const diffA = row1.available_qty - row1.needed_qty * plannedQuantity
        const diffB = row2.available_qty - row2.needed_qty * plannedQuantity
        return diffA - diffB
      },
      render: (_, row) => {
        const diff_qty = row.available_qty - row.needed_qty * plannedQuantity
        return diff_qty < 0 ? <span style={{ color: 'red' }}>{diff_qty}</span> : '-'
      },
    },
  ]
  const columnsAssembly = [
    {
      title: '名称',
      dataIndex: 'name',
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: '型号',
      dataIndex: 'model',
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: '制造商',
      dataIndex: 'manufacturer',
      ellipsis: {
        showTitle: true,
      },
    },
    ...columnsFixed,

  ]

  const columnsPruduct = [
    {
      title: '编号',
      dataIndex: 'item_number',
      ellipsis: {
        showTitle: true,
      },
    },
    ...columnsFixed,
  ]

  if (tableData.length > 0) {
    return (
      <Table
        rowKey="model"
        dataSource={tableData}
        columns={itemType === 'assembly' ? columnsAssembly : columnsPruduct}
        bordered={false}
        pagination={false}
        size="small"
        style={{ maxHeight: '40vh', overflow: 'auto' }}
      />
    )
  }
}

const InventoryTable = React.memo(TableComponent)

export default InventoryTable
