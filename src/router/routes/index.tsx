import type { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import basicRoutes from './basic'
import lazyLoad from '@/components/lazy-load'
import DashboardLayout from '@/layouts'

export const loginRoute: RouteObject = {
  path: '/login',
  element: lazyLoad(lazy(() => import('@/pages/login'))),
}

export const exceptionRoutes: RouteObject = {
  path: '/error',
  element: <DashboardLayout />,
  children: [
    {
      path: '404',
      element: lazyLoad(lazy(() => import('@/pages/exception/404'))),
    },
    {
      path: '500',
      element: lazyLoad(lazy(() => import('@/pages/exception/500'))),
    },
  ],
}

export default basicRoutes

/** 匹配所有无效路由 */
export const pageNotFoundRoute: RouteObject = {
  path: '*',
  element: <Navigate to="/error/404" replace />,
}

/** 未登录状态时，访问其他路由时，引导到登录页 */
export const emptyRoute: RouteObject = {
  path: '*',
  element: <Navigate to="/login" replace />,
}

export const constantRoutes: AuthRoute.RouteObject[] = [...basicRoutes, loginRoute, exceptionRoutes, pageNotFoundRoute]

const modules = import.meta.glob('./modules/*.tsx', { eager: true })
export const dynamicRoutes: AuthRoute.RouteObject[] = Object.values(modules).map((module: any) => module.default)
