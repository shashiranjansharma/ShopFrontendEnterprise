export interface User {
  full_name: string
  total_money?: number
  remaining_money?: number
  phone?: number
  transaction_history?: any
}

export interface Products {
  id: string
  barcode: string
  name: string
  description: string
  total: number
  category: Category
  category_type: string
  price: number
}

export interface Category {
  id: string
  category_type: string
  name: string
  description: string
}
