import { Checkbox, Space, Spin } from 'antd'
import { FooterToolbar, ProTable } from '@ant-design/pro-components'
import type { ProTableProps } from '@ant-design/pro-components'
import React from 'react'
import type { useBulkOperation } from '@/hooks'
import { convertSorterToObject } from '@/utils'

type MySelectTableProps<DataSource extends Record<string, any>> = {
  /** 列表接口请求 */
  requestFn: (params: any) => Promise<any>
  footerToolbar?: (params: React.Key[]) => React.ReactNode
  bulkOperation?: ReturnType<typeof useBulkOperation>
  rowSelectionEnabled?: boolean
  showSelectAll?: boolean // 部分页面不需要显示“跨页全选按钮”
} & ProTableProps<DataSource, any>

function MySelectTableComponent<DataSource extends Record<string, any>>(props: MySelectTableProps<DataSource>) {
  const {
    headerTitle,
    rowKey = 'id',
    columns,
    actionRef,
    request,
    requestFn,
    search,
    pagination,
    toolBarRender,
    footerToolbar,
    cardBordered = true,
    bulkOperation,
    rowSelectionEnabled,
    showSelectAll = true,
    ...otherProps
  } = props

  const {
    spinning = false,
    isSelectAll = false,
    selectedRowKeys = [],
    setIsSelectAll,
    handleSearch,
    handleReset,
    handleSelectChange,
  } = bulkOperation ?? {}

  const [totalCount, setTotalCount] = useState(0)

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

    <>
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
        rowSelection={rowSelectionEnabled
          ? {
              selectedRowKeys,
              onChange: handleSelectChange,
              renderCell: isSelectAll
                ? (_, __, ___, originNode) => {
                    return <Checkbox checked disabled>{originNode}</Checkbox>
                  }
                : undefined,
              hideSelectAll: isSelectAll,
            }
          : undefined}
        tableAlertRender={({ selectedRowKeys }) => {
          return (
            <div>
              已选择
              {' '}
              <a style={{ fontWeight: 600 }}>{ isSelectAll ? totalCount : selectedRowKeys.length}</a>
              {' '}
              项
            </div>
          )
        }}
        tableAlertOptionRender={({ onCleanSelected }) => {
          return (
            <Space size={16}>
              {showSelectAll && !isSelectAll && (
                <a
                  className="text-emerald-500 hover:text-emerald-400"
                  onClick={() => setIsSelectAll?.(true)}
                >
                  跨页全选
                </a>
              )}
              <a onClick={() => {
                onCleanSelected()
                setIsSelectAll?.(false)
              }}
              >
                取消选择
              </a>
            </Space>
          )
        }}
        onSubmit={handleSearch}
        onReset={handleReset}
        // loading={spinning}
        {...otherProps}
      />

      {selectedRowKeys && selectedRowKeys.length > 0 && (
        <FooterToolbar extra={(
          <div>
            已选择
            {' '}
            <a style={{ fontWeight: 600 }}>
              { isSelectAll ? totalCount : selectedRowKeys.length}
            </a>
            {' '}
            项
          </div>
        )}
        >
          {footerToolbar?.(selectedRowKeys!)}
        </FooterToolbar>
      )}

      {/* 全屏loading */}
      <Spin spinning={spinning} percent="auto" fullscreen />
    </>

  )
}
const MySelectTable = React.memo(MySelectTableComponent) as typeof MySelectTableComponent
export default MySelectTable
