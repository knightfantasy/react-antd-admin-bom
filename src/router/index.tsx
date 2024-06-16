import type { RouteObject } from 'react-router-dom'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { useUserRoutes } from './hooks'

function Router() {
  const routes = useUserRoutes() as RouteObject[]

  // console.log('routes', routes)
  const router = createBrowserRouter(routes)
  return <RouterProvider router={router} />
}

export default Router
