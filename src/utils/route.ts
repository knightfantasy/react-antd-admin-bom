/**
 *
 * @param route - 当前路由需要的权限
 * @param permissions - 当前用户所有的权限
 */
export function hasPermission(route: AuthRoute.RouteObject, permissions: string[]): boolean {
  if (route.handle?.permission) {
    return permissions.includes(route.handle.permission) // 用户被分配的权限中，是否包含当前页面需要的权限
  }
  else {
    return true
  }
}

/**
 *
 * @param routes - 所有的需要权限的路由
 * @param permissions - 当前用户所有的权限
 * @param permissionPrefix - 父级路由权限前缀
 */
export function filterPermissionRoutes(
  routes: AuthRoute.RouteObject[],
  permissions: string[],
  permissionPrefix?: string,
): AuthRoute.RouteObject[] {
  const result: AuthRoute.RouteObject[] = []
  routes.forEach((item) => {
    const route: AuthRoute.RouteObject = { ...item }

    // 排除掉index=true，也就是redirect的情况
    if (!route.index && route.handle) {
      if (!route.handle.permission) {
        const prefix = permissionPrefix ? `${permissionPrefix}:` : ''
        route.handle.permission = `${prefix}${route.handle.name}`.toLowerCase()
      }
    }

    if (hasPermission(route, permissions)) {
      result.push(route)
      if (route.children?.length) {
        route.children = filterPermissionRoutes(
          route.children,
          permissions,
          route.handle?.permission, // 作为子路由的前缀
        )
      }
    }
  })
  return result
}
