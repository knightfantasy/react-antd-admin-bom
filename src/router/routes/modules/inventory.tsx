import { Navigate } from 'react-router-dom'
import { LuWarehouse } from 'react-icons/lu'
import DashboardLayout from '@/layouts'
import lazyLoad from '@/components/lazy-load'

const orderRoutes: AuthRoute.RouteObject = {
  path: 'inventory',
  element: <DashboardLayout />,
  handle: {
    name: 'Inventory',
    label: '库存管理',
    icon: <LuWarehouse />,
    permission: 'inventory',
    order: 70,
  },
  children: [
    {
      index: true,
      element: <Navigate to="inventories" replace />,
    },
    {
      path: 'inventories',
      element: lazyLoad(lazy(() => import('@/pages/inventory/inventory'))),
      handle: {
        name: 'InventoryList',
        label: '库存列表',
        permission: 'inventory:inventory',
      },
    },
    {
      path: 'inventories/:inventoryId/logs',
      element: lazyLoad(lazy(() => import('@/pages/inventory/inventory-detail'))),
      handle: {
        name: 'InventoryDetail',
        label: '库存日志',
        permission: 'inventory:inventory',
        hideInMenu: true,
      },
    },
    {
      path: 'outbound-items',
      element: lazyLoad(lazy(() => import('@/pages/inventory/outbound-item/'))),
      handle: {
        name: 'OutboundItem',
        label: '出库列表',
        permission: 'inventory:outbound',
      },
    },
  ],
}

export default orderRoutes
