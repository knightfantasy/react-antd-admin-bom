declare namespace Api {
  namespace Project {

    interface IProductionPlan {
      id: number
      number: string
      item_type: 'PCBA' | '产品'
      item_number: string
      object_id: string
      model_class: 'assembly' | 'product'
      planned_start_date: string
      planned_end_date: string
      planned_quantity: number
      start_date: string
      end_date: string
      quantity: number
    }

    interface IProductionPlanDetailFixed {
      stock_qty: number
      locked_qty: number
      available_qty: number
      needed_qty: number
      total_needed_qty: number
      diff_qty?: number | string
    }

    interface IProductionPlanAssembly extends IProductionPlanDetailFixed {
      name: string
      model: string
      manufacturer: string
    }

    interface IProductionPlanProduct extends IProductionPlanDetailFixed {
      item_number: string
    }

    type AssemblyBomInventory = Api.ResponseData<IProductionPlanAssembly[]>
    type ProductItemInventory = Api.ResponseData<IProductionPlanProduct[]>

  }
}
