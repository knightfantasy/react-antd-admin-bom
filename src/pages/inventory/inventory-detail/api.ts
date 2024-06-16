import { request } from '@/utils'

export default {
  updateObj: (id: string, data: Record<string, any>) => request.put(`/inventory/inventories/${id}/`, data),
}
