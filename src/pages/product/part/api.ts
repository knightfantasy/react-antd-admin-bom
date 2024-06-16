import { request } from '@/utils'

type CategoryList = Api.ResponseData<Api.Product.ICategory[]>

export default {
  uploadExcel: (data: FormData) => request.post(`/material/parts/upload-excel/`, data),

  fetchCategoryOptions: async () => {
    const { data } = await request.get<CategoryList>('/material/categories/?_paginator=none')

    const options = data.map((item) => {
      return {
        label: item.name,
        value: item.id,
      }
    })

    return options
  },

}
