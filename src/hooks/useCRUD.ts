import { message } from 'antd'
import type { ActionType, ProFormInstance } from '@ant-design/pro-components'
import { useApi, useMatchRoute } from '@/hooks'

interface RowObject {
  [key: string]: any
}

interface CRUDOptions<Obj extends RowObject> {
  rowKey?: string
  doCreate?: (row: Partial<Obj>) => Promise<void>
  doUpdate?: (id: string | number, row: Partial<Obj>) => Promise<void>
  doDelete?: (id: number | string) => Promise<void>
  doRefresh?: () => Promise<void>
  onSuccess?: () => void
}
export function useCRUD<Obj extends RowObject>(options: CRUDOptions<Obj> = {}) {
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [currentRow, setCurrentRow] = useState<Obj>()
  const actionRef = useRef<ActionType>()
  const formRef = useRef<ProFormInstance>()

  const { handle, pathname } = useMatchRoute()

  // route.handle?.url 为显式定义的后端url，如未指定，取route.path
  const apiPath: string = handle.url ?? pathname

  const { getObjs, createObj, updateObj, deleteObj } = useApi(apiPath)

  const isEditing = !!currentRow

  const {
    rowKey = 'id',
    doRefresh,
    doCreate = createObj,
    doUpdate = updateObj,
    doDelete = deleteObj,
    onSuccess,
  } = options

  /** 点击新增按钮 */
  const handleAdd = useCallback(() => {
    setModalVisible(true)
    setCurrentRow(undefined)
  }, [setModalVisible, setCurrentRow])

  /** 点击编辑按钮 */
  const handleEdit = useCallback((row: Obj) => {
    setModalVisible(true)
    setCurrentRow(row)
  }, [setModalVisible, setCurrentRow])

  /** 新增、编辑时的提交 */
  const handleSubmit = useCallback(async (fields: Partial<Obj>) => {
    // console.log(fields)
    const loadingMessage = isEditing ? '修改中' : '正在添加'
    const successMessage = isEditing ? '修改成功' : '添加成功'
    const hide = message.loading(loadingMessage)
    try {
      if (isEditing)
        await doUpdate(currentRow[rowKey], { ...currentRow, ...fields })
      else
        await doCreate(fields)
      message.success(successMessage)
      setModalVisible(false)
      doRefresh ? doRefresh() : actionRef?.current?.reload()
      onSuccess && onSuccess()
    }
    catch (error) {
      // console.log(error)

      // 展示后端的错误
      const formErrors = Object.entries(error as Api.ValidationError<Obj>).map(
        ([name, errors]) => {
          return {
            name,
            errors,
          }
        },
      )
      formRef.current?.setFields(formErrors)
    }
    finally {
      hide()
    }
  }, [rowKey, isEditing, currentRow, doUpdate, doCreate, doRefresh, onSuccess, actionRef])

  /** 单个删除 */
  async function handleSingleDelete(id: string | number) {
    const hide = message.loading('正在删除')
    try {
      await doDelete(id)
      message.success('删除成功')
      doRefresh ? doRefresh() : actionRef?.current?.reload()
      onSuccess && onSuccess()
    }
    catch (error) {
      return error
    }
    finally {
      hide()
    }
  }

  return {
    modalVisible,
    currentRow,
    actionRef,
    formRef,
    setModalVisible,
    setCurrentRow,
    fetchData: getObjs,
    handleAdd,
    handleEdit,
    handleSubmit,
    handleSingleDelete,
  }
}
