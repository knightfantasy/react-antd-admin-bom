import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios'
import { message } from 'antd'
import { resolveResError } from './helpers'
import { useUserStore } from '@/store'
import { isArray, isObject } from '@/utils'

interface CustomAxiosError extends Omit<AxiosError, 'response'> {
  response?: AxiosResponse<Api.ResponseData>
}

export function reqResolve(config: InternalAxiosRequestConfig) {
  // 请求拦截器的处理逻辑
  const accessToken = useUserStore.getState().accessToken

  if (accessToken) {
    // 认证方案: JWT Bearer
    config.headers.Authorization = config.headers.Authorization ?? `Bearer ${accessToken}`
  }

  return config
}

export function reqReject(error: AxiosError) {
  // console.log(error)
  return Promise.reject(error)
}

export function resResolve(response: AxiosResponse) {
  return Promise.resolve(response)
}

export function resReject(error: CustomAxiosError) {
  // 响应拦截器错误处理逻辑
  if (!error || !error.response) {
    const code = error?.code // 无法连接时，code为ERR_NETWORK
    /** 根据code处理对应的操作，并返回处理后的msg */
    const msg = resolveResError(code, error.message) as string
    message.error(msg)
    return Promise.reject(error)
  }

  const { data, status } = error.response
  const code = data?.code ?? status

  const msg = resolveResError(code, data.msg)

  if (isObject(msg) && !isArray(msg)) {
    if (msg.non_field_errors)
      message.error(msg.non_field_errors)

    return Promise.reject(msg)
  }
  else if (isArray(msg)) {
    if (msg.length > 1) {
      message.error('此错误暂未处理，请联系管理员')
    }
    else {
      message.error(msg.join(', '))
    }
  }
  else {
    message.error(msg)
  }

  return Promise.reject(msg)
}
