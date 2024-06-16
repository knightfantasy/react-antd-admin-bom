import type { ProColumns } from '@ant-design/pro-components'
import { Spin } from 'antd'
import api from './api'
import MyProTable from '@/components/MyProTable'
import { useCRUD } from '@/hooks'
import { DeleteButton, UploadButton } from '@/components/buttons'

type Row = Api.Inventory.IOutboundItem

export default function OutboundItem() {
  const { actionRef, fetchData, handleSingleDelete } = useCRUD<Row>()

  const [spinning, setSpinning] = useState(false)

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
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      hideInSearch: true,
    },
    {
      title: '批次号',
      dataIndex: 'batch_no',
      hideInSearch: true,
    },
    {
      title: '类型',
      dataIndex: 'type',
      hideInSearch: true,
      filters: true,
      valueEnum: {
        tob: 'toB',
        toc: 'toC',
        sample: '样品',
        pr: 'PR',
        marketing: 'Marketing',
        adjustment: '库存调整',
      },

    },
    {
      title: '备注',
      dataIndex: 'note',
      hideInSearch: true,
      ellipsis: {
        showTitle: true,
      },
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      valueType: 'date',
      hideInSearch: true,
    },

    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, row) => [
        <DeleteButton key="delete" onConfirm={async () => await handleSingleDelete(row?.id)} />,
      ],
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
  ], [])

  const toolBarRender = useCallback(() => [

    <UploadButton
      key="upload"
      label="导入出库"
      errorColumnTitle="型号"
      data={{ method: 'outbound_upload' }}
      requestFn={api.uploadExcel}
      setSpinning={setSpinning}
      actionRef={actionRef}
    />,

  ], [])

  return (

    <>
      <MyProTable<Row>
        headerTitle="出库列表"
        columns={columns}
        actionRef={actionRef}
        requestFn={fetchData}
        toolBarRender={toolBarRender}
        params={{
          product_type: 'product',
        }}
      />

      {/* 全屏loading */}
      <Spin spinning={spinning} percent="auto" fullscreen />
    </>

  )
}
