import { LogoutOutlined } from '@ant-design/icons'
import { PageContainer, ProBreadcrumb, ProLayout } from '@ant-design/pro-components'
import { Dropdown } from 'antd'
import { useUserStore } from '@/store'

export default function DashboardLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [pathname, setPathname] = useState(location.pathname)

  const userMenu = useUserStore(state => state.userMenu)
  const userInfo = useUserStore(state => state.userInfo)
  const resetUserInfo = useUserStore(state => state.resetUserInfo)

  function logout() {
    resetUserInfo()
    const loginPath = pathname !== '/error/404'
      ? `/login?redirect=${pathname}`
      : '/login'
    navigate(loginPath, { replace: true })
  }

  return (
    <ProLayout
      title="物料管理系统"
      layout="mix"
      logo={<img alt="logo" src="/logo.svg" />}
      prefixCls="my-prefix"
      bgLayoutImgList={[
        {
          src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
          left: 85,
          bottom: 100,
          height: '303px',
        },
        {
          src: 'https://img.alicdn.com/imgextra/i2/O1CN01O4etvp1DvpFLKfuWq_!!6000000000279-2-tps-609-606.png',
          bottom: -68,
          right: -45,
          height: '303px',
        },
        {
          src: 'https://img.alicdn.com/imgextra/i3/O1CN018NxReL1shX85Yz6Cx_!!6000000005798-2-tps-884-496.png',
          bottom: 0,
          left: 0,
          width: '331px',
        },
      ]}
      route={{
        path: '/',
        children: userMenu,
      }}
      location={{ pathname }}
      token={{
        header: {
          colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
        },
      }}
      menu={{
        collapsedShowGroupTitle: true,
      }}
      headerContentRender={() => <ProBreadcrumb />}
      avatarProps={{
        src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
        size: 'small',
        title: userInfo.name,
        render: (_, dom) => {
          return (
            <Dropdown
              menu={{
                items: [
                  {
                    key: 'logout',
                    icon: <LogoutOutlined />,
                    label: '退出登录',
                    onClick: () => logout(),
                  },
                ],
              }}
            >
              {dom}
            </Dropdown>
          )
        },
      }}
      headerTitleRender={(logo, title, _) => {
        const defaultDom = (
          <a>
            {logo}
            {title}
          </a>
        )
        return defaultDom
      }}
      menuItemRender={(item, dom) => {
        return item.isUrl
          ? (
            <a href={item.path} target="_blank" rel="noopener noreferrer">
              {dom}
            </a>
            )
          : (
            <Link
              to={item.path || '/'}
              onClick={() => {
                setPathname(item.path || '/')
              }}
            >
              {dom}
            </Link>
            )
      }}
    >
      <PageContainer
        breadcrumbRender={false}
        title={false}
      >
        <Outlet />
      </PageContainer>
    </ProLayout>
  )
}
