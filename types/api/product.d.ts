declare namespace Api {
  namespace Product {

    interface ICategory {
      id: number
      name: string
      prefix: string
      description: string
    }

    interface Inventory {
      inventory_id: number
      total_qty: number
      stock_qty: number
      locked_qty: number
      available_qty: number
      min_limit: number
    }

    interface IPart {
      id: string
      category: number
      category_name: string
      name: string
      model: string
      number: string
      footprint: string
      specification: string
      brand: string
      manufacturer: string
      manufacturer_model: string
      base_cost: string
      current_cost: string | null
      note: string
      md5_key: string
      assembly_number: string[]
      inventory: Inventory | null
    }

    interface IAssembly {
      id: string
      category: number
      category_name: string
      model: string
      version: string
      number: string
      status: 'draft' | 'published' | 'obsolete'
      description: string
      estimated_cost: string | null
      update_time: string
      product_number: string[]
      brand: string
      manufacturer: string
      change_history: string
      inventory: Inventory | null
    }

    interface IAssemblyBom {
      id: number
      part_id: string
      part_name: string
      part_model: string
      part_footprint: string
      part_specification: string
      refdes: string
      quantity: number
      note: string
      estimated_unit_price: string
    }

    interface IProduct {
      id: string
      sku: string
      name_cn: string
      name_en: string
      hs_code: string
      unit_cn: string
      unit_weight: string
      unit_price: string
      currency: string
      specification: string
      estimated_cost: string
      status: 'draft' | 'published' | 'obsolete'
      update_time: string
    }

    interface IProductItem {
      id: number
      item_number: string
      quantity: number
      estimated_unit_price: string
      note: string
    }

  }
}
