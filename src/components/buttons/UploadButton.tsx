import { Button, Descriptions, Modal, Table, Upload, message } from 'antd'
import type { ActionType } from '@ant-design/pro-components'
import { UploadOutlined } from '@ant-design/icons'
import React from 'react'
import type { TableProps } from 'antd'

interface UploadButtonProps {
  label: string
  data: Record<string, string>
  errorColumnTitle: string
  actionRef: React.RefObject<ActionType | undefined>
  requestFn: ((pid: string, params: any) => Promise<any>) | ((params: any) => Promise<any>)
  setSpinning: (spinning: boolean) => void
}

function UploadButtonComponent(props: UploadButtonProps) {
  const { data, label, errorColumnTitle, actionRef, setSpinning, requestFn } = props

  // 用于上传excel报错后的展示
  const errorColumns: TableProps<Api.ExcelImportErrorDetail>['columns'] = [
    {
      title: errorColumnTitle,
      dataIndex: 'key',
      width: 100,
    },
    {
      title: '错误',
      dataIndex: 'error',
      render: (_, row) => {
        return row.errors.map((item, index) => {
          return (
            // eslint-disable-next-line react/no-array-index-key
            <Descriptions size="small" column={1} key={index}>
              <Descriptions.Item label="错误字段">{Object.keys(item)[0]}</Descriptions.Item>
              <Descriptions.Item label="错误原因">{Object.values(item)[0]}</Descriptions.Item>
            </Descriptions>
          )
        })
      },
    },
  ]

  /** 上传excel */
  async function uploadRequest({ file, data }: any) {
    const formData = new FormData()
    if (file)
      formData.append('file', file)
    else
      throw new Error('File is missing')

    const { method, pid } = data
    if (method)
      formData.append('method', method)
    else
      throw new Error('Method is undefined')

    setSpinning(true)

    try {
      let response
      if (pid)
        response = await (requestFn as (pid: string | number, params: any) => Promise<any>)(pid, formData)
      else
        response = await (requestFn as (params: any) => Promise<any>)(formData)

      message.success(response.data)
      actionRef.current?.reload()
    }
    catch (error) {
      const { error_type, detail } = error as Api.ExcelImportError
      if (error_type === 'ExcelImportError' && detail?.length > 0) {
        // console.log(error.row)
        Modal.error({
          title: '错误提示',
          width: 800,
          content: (
            <Table
              rowKey="key"
              dataSource={detail}
              columns={errorColumns}
              bordered={false}
              pagination={false}
              style={{ maxHeight: '70vh', overflow: 'auto' }}
            />
          ),
        })
      }
    }
    finally {
      setSpinning(false)
    }
  }

  return (
    <Upload
      accept=".xlsx"
      key="upload"
      data={data}
      showUploadList={false}
      customRequest={uploadRequest}
    >
      <Button icon={<UploadOutlined />}>{label}</Button>
    </Upload>
  )
}

export const UploadButton = React.memo(UploadButtonComponent)
