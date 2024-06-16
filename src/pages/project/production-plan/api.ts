import { request } from '@/utils'

type ProductList = Api.ResponseData<Api.Product.IProduct[]>
type AssemblyList = Api.ResponseData<Api.Product.IAssembly[]>

export default {

  getBOMInventory: (id: string) => request.get<Api.Project.AssemblyBomInventory>(`/material/assemblies/${id}/bom/inventory/`),
  getProductItemInventory: (id: string) => request.get<Api.Project.ProductItemInventory>(`/material/products/${id}/items/inventory/`),
  completeObj: (id: number, row: Record<string, any>) => request.put(`/project/plans/${id}/complete/`, row),

  fetchObjectIdOptions: async (itemType: 'product' | 'assembly') => {
    if (itemType === 'product') {
      const { data } = await request.get<ProductList>('/material/products/?status=published&_paginator=none')
      const options = data.map((item) => {
        return {
          label: item.sku,
          value: item.id,
        }
      })
      return options
    }
    else if (itemType === 'assembly') {
      const { data } = await request.get<AssemblyList>('/material/assemblies/?status=published&_paginator=none')
      const options = data.map((item) => {
        return {
          label: item.number,
          value: item.id,
        }
      })
      return options
    }
    else {
      return []
    }
  },
}
