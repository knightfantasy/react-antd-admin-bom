declare namespace Api {
  namespace Inventory {

    interface IInventory {
      id: number
      item_number: string
      item_manufacturer: string | null
      total_qty: number
      stock_qty: number
      locked_qty: number
      available_qty: number
      min_limit: number
    }

    interface IOrderItem {

      id: number
      item_number: string
      item_manufacturer: string | null
      quantity: number
      batch_no: string
      note: string
      inventory_id: number
      create_time: string

    }

    interface IInboundItem extends IOrderItem {
      type: string
    }

    interface IInventoryLog {
      id: number
      service_type_name: string
      beginning_qty_available: number
      change_qty_available: number
      balance_qty_available: number
      beginning_qty_stock: number
      change_qty_stock: number
      balance_qty_stock: number
      create_time: string
    }

    interface IOutboundItem extends IOrderItem {
      type: 'tob' | 'toc' | 'sample' | 'pr' | 'marketing' | 'adjustment'
    }

  }
}
