import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { LoginFormPage, ProConfigProvider, ProFormCheckbox, ProFormText } from '@ant-design/pro-components'
import { App, Tabs, theme } from 'antd'
import { useLocalStorageState } from 'ahooks'
import api from './api'
import { useUserStore } from '@/store'

type LoginType = 'phone' | 'account'

const { VITE_HOMEPAGE: HOMEPAGE } = import.meta.env

function Page() {
  const [loginType, setLoginType] = useState<LoginType>('account')
  const [rememberMe, setRememberMe] = useLocalStorageState<boolean | undefined>('rememberMe', { defaultValue: false })
  const [userData, setUserData] = useLocalStorageState<{ username: string, password: string } | undefined>(
    'user-data',
    {
      defaultValue: {
        username: '',
        password: '',
      },
    },
  )

  const { message, notification } = App.useApp()

  const setAccessToken = useUserStore(state => state.setAccessToken)
  const setUserInfo = useUserStore(state => state.setUserInfo)

  async function handleLogin({ username, password, rememberMe }: Api.System.LoginParams) {
    const hide = message.loading('正在验证')
    try {
      const res = await api.login({ username, password })
      rememberMe ? setUserData({ username, password }) : setUserData(undefined)
      setAccessToken(res.data.access)
      try {
        const res = await api.getUserInfo()
        const { id, name, perms } = res.data
        setUserInfo({ id, name, perms })

        notification.success({
          message: '验证成功',
          description: `欢迎回来: ${name}`,
          duration: 3,
        })
      }
      catch (error) {
        setAccessToken('')
      }
    }
    finally {
      hide()
    }
  }

  const { token } = theme.useToken()
  return (
    <div style={{ backgroundColor: 'white', height: '100vh' }}>
      <LoginFormPage
        backgroundImageUrl="https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png"
        logo={<img alt="logo" src="/logo.svg" />}
        title="物料管理系统"
        containerStyle={{
          // backgroundColor: 'rgba(0, 0, 0,0.65)',
          backdropFilter: 'blur(4px)',
        }}
        subTitle="一套简单易用的物料管理系统"
        initialValues={
          {
            username: userData?.username || 'user',
            password: userData?.password || 'antd1234',
            rememberMe,
          }
        }
        onFinish={handleLogin}
      >
        <Tabs
          centered
          activeKey={loginType}
          onChange={activeKey => setLoginType(activeKey as LoginType)}
          items={[
            {
              key: 'account',
              label: '账号密码登录',
            },
          ]}
        />

        {loginType === 'account' && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: 'large',
                prefix: (
                  <UserOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className="prefixIcon"
                  />
                ),
              }}
              placeholder="用户名: user"
              rules={[
                {
                  required: true,
                  message: '请输入用户名!',
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: 'large',
                prefix: (
                  <LockOutlined
                    style={{
                      color: token.colorText,
                    }}
                    className="prefixIcon"
                  />
                ),
              }}
              placeholder="密码: antd1234"
              rules={[
                {
                  required: true,
                  message: '请输入密码！',
                },
              ]}
            />
          </>
        )}

        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox
            noStyle
            name="rememberMe"
            fieldProps={{
              checked: rememberMe,
              onChange: event => setRememberMe(event.target.checked),
            }}
          >
            记住我
          </ProFormCheckbox>
          <a
            style={{
              float: 'right',
            }}
            onClick={() => { }}
          >
            忘记密码
          </a>
        </div>
      </LoginFormPage>
    </div>
  )
}

export default function Login() {
  const userInfo = useUserStore(state => state.userInfo)
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const redirectUrl = searchParams.get('redirect')

  // 判断用户已登录
  if (userInfo.id) {
    // 如果有授权，则跳转到首页或者redirectUrl
    return <Navigate to={redirectUrl || HOMEPAGE} replace />
  }

  return (
    <ProConfigProvider>
      <Page />
    </ProConfigProvider>
  )
}
