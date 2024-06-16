import axios from 'axios'
import type { AxiosRequestConfig } from 'axios'
import { reqReject, reqResolve, resReject, resResolve } from './interceptors'

export function createAxios(options = {}) {
  const defaultOptions = {
    timeout: 50000, // 请求超时时间
  }
  const service = axios.create({
    ...defaultOptions,
    ...options,
  })
  // 请求拦截
  service.interceptors.request.use(reqResolve, reqReject)
  service.interceptors.response.use(resResolve, resReject)

  // 创建新的 get 方法
  async function get<T = Api.ResponseData>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await service.get<T>(url, config)
    return response.data
  }

  // POST 方法
  async function post<T = Api.ResponseData>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await service.post<T>(url, data, config)
    return response.data
  }

  // PUT 方法
  async function put<T = Api.ResponseData>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await service.put<T>(url, data, config)
    return response.data
  }

  // PATCH 方法
  async function patch<T = Api.ResponseData>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await service.patch<T>(url, data, config)
    return response.data
  }

  // DELETE 方法
  async function del<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await service.delete<T>(url, config)
    return response.data
  }

  return { ...service, get, post, put, patch, del }
}

export const request = createAxios({
  baseURL: import.meta.env.VITE_BASE_API,
  // 取消多选传递空数组，比如 somelist[]=1&somelist[]=2&somelist[]=3
  paramsSerializer: {
    indexes: null,
  },
})
