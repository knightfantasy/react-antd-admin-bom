import { request } from '@/utils'

export default {
  uploadExcel: (data: FormData) => request.post(`/inventory/inbound-items/upload-excel/`, data),
}
