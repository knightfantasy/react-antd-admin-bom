import { Navigate } from 'react-router-dom'
import { LuCircuitBoard } from 'react-icons/lu'
import DashboardLayout from '@/layouts'
import lazyLoad from '@/components/lazy-load'

const orderRoutes: AuthRoute.RouteObject = {
  path: 'material',
  element: <DashboardLayout />,
  handle: {
    name: 'Material',
    label: '物料管理',
    icon: <LuCircuitBoard />,
    permission: 'product',
    order: 60,
  },
  children: [
    {
      index: true,
      element: <Navigate to="parts" replace />,
    },
    {
      path: 'parts',
      element: lazyLoad(lazy(() => import('@/pages/product/part'))),
      handle: {
        name: 'Part',
        label: '元件列表',
      },
    },
    {
      path: 'assemblies',
      element: lazyLoad(lazy(() => import('@/pages/product/pcba'))),
      handle: {
        name: 'Assembly',
        label: '备件列表',
      },
    },
    {
      path: 'assemblies/:assemblyId/bom',
      element: lazyLoad(lazy(() => import('@/pages/product/pcba-detail'))),
      handle: {
        name: 'AssemblyDetail',
        label: 'BOM',
        permission: 'product:assembly',
        hideInMenu: true,
      },
    },
    {
      path: 'products',
      element: lazyLoad(lazy(() => import('@/pages/product/product'))),
      handle: {
        name: 'Product',
        label: '产品列表',
      },
    },
    {
      path: 'products/:productId/items',
      element: lazyLoad(lazy(() => import('@/pages/product/product-detail'))),
      handle: {
        name: 'ProductDetail',
        label: '产品BOM',
        permission: 'product:product',
        hideInMenu: true,
      },
    },
    {
      path: 'inbound-items',
      element: lazyLoad(lazy(() => import('@/pages/inventory/inbound-item/'))),
      handle: {
        name: 'InboundItem',
        label: '料件入库',
        permission: 'inventory:inbound',
        url: '/inventory/inbound-items',
      },
    },
    {
      path: 'categories',
      element: lazyLoad(lazy(() => import('@/pages/product/category'))),
      handle: {
        name: 'Category',
        label: '类别列表',
      },
    },
  ],
}

export default orderRoutes
