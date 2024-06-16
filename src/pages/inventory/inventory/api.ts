import { request } from '@/utils'

export default {
  outputObj: (id: number, row: Record<string, any>) => request.post(`/inventory/inventories/${id}/output/`, row),
}
