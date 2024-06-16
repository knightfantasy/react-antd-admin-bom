import { Navigate } from 'react-router-dom'
import { ScheduleOutlined } from '@ant-design/icons'
import DashboardLayout from '@/layouts'
import lazyLoad from '@/components/lazy-load'

const projectRoutes: AuthRoute.RouteObject = {
  path: 'project',
  element: <DashboardLayout />,
  handle: {
    name: 'Project',
    label: '计划管理',
    icon: <ScheduleOutlined />,
    order: 70,
  },
  children: [
    {
      index: true,
      element: <Navigate to="plans" replace />,
    },
    {
      path: 'plans',
      element: lazyLoad(lazy(() => import('@/pages/project/production-plan'))),
      handle: {
        name: 'ProductionPlan',
        label: '生产计划',
        permission: 'project:plan',
      },
    },
  ],
}

export default projectRoutes
