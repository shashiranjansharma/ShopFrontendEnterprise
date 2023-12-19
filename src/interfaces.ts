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

export interface DataTableHeader {
  key: string
  value?: string
  title: string
  colspan?: number
  rowspan?: number
  fixed?: boolean
  align?: 'start' | 'end'
  width?: number
  minWidth?: string
  maxWidth?: string
  sortable?: boolean
}
