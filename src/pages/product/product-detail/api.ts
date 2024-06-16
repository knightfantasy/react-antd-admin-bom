import { request } from '@/utils'

export default {
  deleteObjs: (pid: string, data: Record<string, any>) => request.post(`/material/products/${pid}/items/bulk-delete/`, data),
  uploadExcel: (pid: string, data: FormData) => request.post(`/material/products/${pid}/items/upload-excel/`, data),
}
