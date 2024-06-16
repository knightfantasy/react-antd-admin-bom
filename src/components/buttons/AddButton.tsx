import { Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import React from 'react'

interface AddButtonProps {
  onClick: () => void
}

function AddButtonComponent({ onClick }: AddButtonProps) {
  return (
    <Button
      type="primary"
      icon={<PlusOutlined />}
      onClick={onClick}
    >
      新建
    </Button>
  )
}

export const AddButton = React.memo(AddButtonComponent)
