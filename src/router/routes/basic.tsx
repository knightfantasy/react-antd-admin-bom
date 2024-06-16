import { Navigate } from 'react-router-dom'
import type { RouteObject } from 'react-router-dom'

const basicRoutes: RouteObject[] = [
  {
    path: '/',
    children: [
      {
        index: true,
        element: <Navigate to="/material/parts" replace />,
      },
    ],
  },
]

export default basicRoutes
