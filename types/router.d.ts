declare namespace AuthRoute{
  interface RouteHandle {
    /**
     * menu name, build for key and permission
     */
    name: string
    /**
     * menu label, build for menu and tab title
     */
    label: string
    /**
     * menu suffix icon
     */
    suffix?: ReactNode
    /**
     * menu prefix icon
     */
    icon?: ReactNode
    /**
     * menu order
     */
    order?: number
    /**
     * route permission
     */
    permission?: string
    /**
     * api url
     */
    url?: string
    /**
     * hide in menu
     */
    hideInMenu?: boolean
    /**
     * hide in multi tab
     */
    hideInTab?: boolean
    /**
     * disable in menu
     */
    disabled?: boolean
    /**
     * cache content
     */
    keepAlive?: boolean
  }
  type RouteObject = {
    handle?: RouteHandle
    children?: RouteObject[]
  } & Omit<import('react-router-dom').RouteObject, 'children' | 'handle'>

}
