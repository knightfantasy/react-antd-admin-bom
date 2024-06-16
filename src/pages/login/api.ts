import { request } from '@/utils'

type Login = Api.ResponseData<Api.System.IToken>
type UserInfo = Api.ResponseData<Api.System.IUserInfo>

export default {
  login: (data: Api.System.LoginParams) => request.post<Login>('/login/', data),
  getUserInfo: () => request.get<UserInfo>(`/system/users/info/`),
}
