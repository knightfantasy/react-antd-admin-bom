import { Popconfirm } from 'antd'
import React from 'react'

interface DeleteButtonProps {
  text?: string
  onConfirm: () => void
}

function DeleteButtonComponent({ onConfirm, text = '删除' }: DeleteButtonProps) {
  return (
    <Popconfirm
      key="delete"
      placement="topRight"
      title={`确定要${text}吗?`}
      onConfirm={onConfirm}
      okText="确定"
      okType="danger"
      cancelText="取消"
    >
      <a key="delete">
        {text}
      </a>
    </Popconfirm>
  )
}

export const DeleteButton = React.memo(DeleteButtonComponent)
