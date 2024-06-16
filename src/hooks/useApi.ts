import { request } from '@/utils'

export function useApi<T>(apiPath: string) {
  return {
    getObjs: (params: any) => request.get(`${apiPath}/`, { params }),
    getObj: (id: string) => request.get(`${apiPath}/${id}/`),
    createObj: (data: Partial<T>) => request.post(`${apiPath}/`, data),
    updateObj: (id: string | number, data: Partial<T>) => request.put(`${apiPath}/${id}/`, data),
    deleteObj: (id: number | string) => request.del(`${apiPath}/${id}/`),
  }
}
