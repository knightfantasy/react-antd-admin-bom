import type { MenuDataItem } from '@ant-design/pro-components'
import { constantRoutes, dynamicRoutes, emptyRoute } from '../routes'
import { useUserStore } from '@/store/'
import { filterPermissionRoutes } from '@/utils'

/**
 *
 * @returns 根据角色权限，动态生成可访问的权限路由
 */
export function usePermissionRoutes(): AuthRoute.RouteObject[] {
  const userInfo = useUserStore(state => state.userInfo)

  const permissionRoutes = useMemo(
    () => {
      //  未登录情况
      if (!userInfo.id)
        return [emptyRoute]
      const userPermissions = userInfo.perms ?? []
      // 根据角色权限生成对应的路由
      return filterPermissionRoutes(dynamicRoutes, userPermissions)
    },
    [userInfo],
  )

  return permissionRoutes
}
/**
 *
 * @returns 当前访问用户可访问的路由
 */
export function useUserRoutes(): AuthRoute.RouteObject[] {
  const permissionRoutes = usePermissionRoutes()

  const setUserMenu = useUserStore(state => state.setUserMenu)

  useEffect(() => {
    // console.log('重新构建Menu')
    const menus = routeToMenuFn(permissionRoutes)
    setUserMenu(menus)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissionRoutes])

  const routes = useMemo(
    () => {
      return [...permissionRoutes, ...constantRoutes]
    },
    [permissionRoutes],
  )

  return routes
}

/** 通过用户的权限路由，构建用户可访问菜单，供pro-layouter使用 */
function routeToMenuFn(routes: AuthRoute.RouteObject[]): MenuDataItem[] {
  return routes
    .filter(route => route.path && route.handle?.name)
    .sort((a, b) => (a.handle?.order || 0) - (b.handle?.order || 0))
    .map(({ path, handle, children }) => {
      const { label, icon, disabled, hideInMenu } = handle || {}

      const menuItem: MenuDataItem = {
        path,
        name: label,
        hideInMenu: hideInMenu || false,
        disabled,
        icon,
        children: children ? routeToMenuFn(children) : undefined,
      }

      return menuItem
    })
}
