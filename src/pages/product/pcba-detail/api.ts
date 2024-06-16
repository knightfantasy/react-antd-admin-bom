import { request } from '@/utils'

export default {
  deleteObjs: (pid: string, data: Record<string, any>) => request.post(`/material/assemblies/${pid}/bom/bulk-delete/`, data),
  uploadExcel: (pid: string, data: FormData) => request.post(`/material/assemblies/${pid}/bom/upload-excel/`, data),
}
