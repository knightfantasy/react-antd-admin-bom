import { Spin } from 'antd'

export function CircleLoading() {
  return (
    <div className="h-full flex items-center justify-center">
      <Spin size="large" />
    </div>
  )
}
