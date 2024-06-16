declare namespace Api {
  namespace System {
    interface LoginParams {
      username: string
      password: string
      rememberMe?: boolean
    }

    interface IToken {
      access: string
    }

    interface IUserInfo {
      id: number
      username: string
      name: string
      perms: string[]
    }

    interface IUser {
      id: number
      username: string
      name: string
      email: string
      is_active: boolean
      date_joined: string
      roles_name: string[]
    }

  }
}
