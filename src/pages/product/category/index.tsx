import type { ProColumns } from '@ant-design/pro-components'
import { clearCache } from 'ahooks'
import ActionModal from './components/ActionModal'
import MyProTable from '@/components/MyProTable'
import { useCRUD } from '@/hooks'
import { AddButton, DeleteButton } from '@/components/buttons'

type Row = Api.Product.ICategory

export default function Category() {
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
  } = useCRUD<Row>({ onSuccess: () => clearCache('/material/categories/') })

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
      title: '前缀',
      dataIndex: 'prefix',
      hideInSearch: true,
    },
    {
      title: '描述',
      dataIndex: 'description',
      hideInSearch: true,
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
        headerTitle="类别列表"
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
