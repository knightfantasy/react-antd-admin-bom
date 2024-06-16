import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { MenuDataItem } from '@ant-design/pro-components'

interface IUserInfo {
  id?: number
  name?: string
  email?: string
  avatar?: string
  perms?: string[]
}

interface IState {
  userInfo: IUserInfo
  accessToken: string
  permissionRoutes: AuthRoute.RouteObject[]
  userMenu: MenuDataItem[]
}

interface IAction {
  setUserInfo: (userInfo: IUserInfo) => void
  setAccessToken: (accessToken: string) => void
  resetUserInfo: () => void
  setPermissionRoutes: (permissionRoutes: AuthRoute.RouteObject[]) => void
  setUserMenu: (userMenu: MenuDataItem[]) => void
}

export const useUserStore = create<IState & IAction>()(
  persist(set => ({
    userInfo: {},
    accessToken: '',
    permissionRoutes: [],
    userMenu: [],
    setUserInfo: (userInfo) => {
      set({ userInfo })
    },
    setAccessToken: (accessToken) => {
      set({ accessToken })
    },
    resetUserInfo: () => {
      set({ userInfo: {}, accessToken: '' })
    },
    setPermissionRoutes: (permissionRoutes) => {
      set({ permissionRoutes })
    },
    setUserMenu: (userMenu) => {
      set({ userMenu })
    },
  }), {
    name: 'user-storage',
    partialize: state => ({
      userInfo: state.userInfo,
      accessToken: state.accessToken,
    }),
  }),
)
