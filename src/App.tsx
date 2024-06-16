import { App as AntdApp, ConfigProvider } from 'antd'
import { ProConfigProvider } from '@ant-design/pro-components'
import Router from '@/router'

export default function App() {
  return (
    <ConfigProvider>
      <AntdApp>
        <ProConfigProvider>
          <Router />
        </ProConfigProvider>
      </AntdApp>
    </ConfigProvider>
  )
}
