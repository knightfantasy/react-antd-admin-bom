import { ProTable } from '@ant-design/pro-components'
import type { ProTableProps } from '@ant-design/pro-components'
import React from 'react'
import { convertSorterToObject } from '@/utils'

type MyProTableProps<DataSource extends Record<string, any>> = {
  /** 列表接口请求 */
  requestFn?: (params: any) => Promise<any>
  setTotalCount?: (total: number) => void
} & ProTableProps<DataSource, any>

/** 主要就是提取了一些公用属性，比如pagination */
function MyProTableComponent<DataSource extends Record<string, any>>(props: MyProTableProps<DataSource>) {
  const {
    headerTitle,
    rowKey = 'id',
    columns,
    actionRef,
    request,
    requestFn,
    setTotalCount,
    search,
    pagination,
    toolBarRender,
    cardBordered = true,
    ...otherProps
  } = props

  const defaultRequest = useCallback(async (params: any, sort: any, filter: any) => {
    const { current: page, pageSize: limit, ...otherParams } = params
    const sortParams = convertSorterToObject(sort)
    let result = {
      data: [],
      success: false,
      total: 0,
    }
    if (requestFn) {
      const response = await requestFn({
        page,
        limit,
        ...filter,
        ...otherParams,
        ...sortParams,
      })

      setTotalCount && setTotalCount(response.data.count)

      result = {
        data: response.data.results,
        success: true,
        total: response.data.count,
      }
    }
    return result
  }, [requestFn, setTotalCount])

  const actualRequest = request ?? defaultRequest

  return (
    <ProTable<DataSource>
      headerTitle={headerTitle}
      rowKey={rowKey}
      columns={columns}
      actionRef={actionRef}
      request={actualRequest}
      search={search === false
        ? false
        : {
            labelWidth: 'auto',
            ...search,
          }}
      pagination={{
        defaultPageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50', '100'],
        ...pagination,
      }}
      dateFormatter="string"
      toolBarRender={toolBarRender}
      cardBordered={cardBordered}
      {...otherProps}
    />
  )
}

const MyProTable = React.memo(MyProTableComponent) as typeof MyProTableComponent
export default MyProTable
