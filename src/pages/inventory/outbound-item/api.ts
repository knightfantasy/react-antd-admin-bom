import { request } from '@/utils'

export default {
  uploadExcel: (data: FormData) => request.post(`/inventory/outbound-items/upload-excel/`, data),
}
