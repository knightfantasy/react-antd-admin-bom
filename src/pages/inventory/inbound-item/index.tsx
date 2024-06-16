import type { ProColumns } from '@ant-design/pro-components'
import { Spin } from 'antd'
import api from './api'
import MyProTable from '@/components/MyProTable'
import { useCRUD } from '@/hooks'
import { DeleteButton, UploadButton } from '@/components/buttons'

type Row = Api.Inventory.IInboundItem

export default function InboundItem() {
  const { actionRef, fetchData, handleSingleDelete } = useCRUD<Row>()

  const [spinning, setSpinning] = useState(false)

  const columns = useMemo<ProColumns<Row>[]>(() => [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '编号',
      dataIndex: 'item_number',
      formItemProps: {
        name: 'number',
      },
    },
    {
      title: '制造商',
      dataIndex: 'item_manufacturer',
    },
    {
      title: '数量',
      dataIndex: 'quantity',
      hideInSearch: true,
    },
    {
      title: '批次号',
      dataIndex: 'batch_no',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '类型',
      dataIndex: 'type',
      hideInTable: true,
      valueType: 'select',
      valueEnum: {
        production: '生产入库',
        purchase: '采购入库',
      },
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
      label="导入入库"
      errorColumnTitle="型号"
      data={{ method: 'inbound_upload' }}
      requestFn={api.uploadExcel}
      setSpinning={setSpinning}
      actionRef={actionRef}
    />,

  ], [])

  return (

    <>
      <MyProTable<Row>
        headerTitle="入库列表"
        columns={columns}
        actionRef={actionRef}
        requestFn={fetchData}
        toolBarRender={toolBarRender}
      />

      {/* 全屏loading */}
      <Spin spinning={spinning} percent="auto" fullscreen />

    </>

  )
}
