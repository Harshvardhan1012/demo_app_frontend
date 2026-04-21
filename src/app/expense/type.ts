
// ─── Domain types ────────────────────────────────────────────────────────────

export type Category = {
  id: number
  name: string
  icon: string | null
  userId: number
}

export type Currency = {
  id: number
  code: string
  symbol: string
  name: string
}

export type CurrentUser = {
  id: number
  name: string
  defaultCurrencyId: number
  defaultCurrency: Currency
}

export type Expense = {
  id: number
  description: string | null
  amount: number
  currencyId: number
  categoryId: number
  date: string
  userId: number
  idempotencyKey: string
  category: Category
  currency: Currency
}

export type CreateExpenseBody = {
  amount: number
  categoryId: number
  description?: string
  date: string
  idempotencyKey: string
}

export type ExpenseFilters = {
  categoryIds?: string[]
  sort?: "date_desc" | "date_asc"
  page?: number
  pageSize?: number
}

export type PaginationMeta = {
  total: number
  page: number
  pageSize: number
  pageCount: number
}

export type ExpenseListResponse = {
  items: Expense[]
  totalAmount: number
  meta: PaginationMeta
}
