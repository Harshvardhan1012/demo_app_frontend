import { useApiGet, useApiPost } from "@/api/tanstackHooks"
import apiPaths from "@/api/apiEndPoint"
import queryKeys from "@/api/queryKey"
import { buildQueryParams } from "@/lib/params"
import type { Category, CreateExpenseBody, CurrentUser, Expense, ExpenseFilters, ExpenseListResponse } from "./type"

export { getOrCreateIdempotencyKey, rotateIdempotencyKey } from "@/lib/idempotency"

// ─── Hooks ────────────────────────────────────────────────────────────────────

export function useCurrentUser() {
  return useApiGet<CurrentUser>(
    queryKeys.currentUser.all,
    apiPaths.users.me
  )
}

export function useExpenses(filters: ExpenseFilters) {
  return useApiGet<ExpenseListResponse>(
    queryKeys.expenses.list(filters),
    apiPaths.expenses.list,
    {
      params: buildQueryParams({
        categoryIds: filters.categoryIds?.length ? filters.categoryIds.join(",") : undefined,
        sort: filters.sort,
        page: filters.page,
        limit: filters.pageSize,
      }),
    }
  )
}

export function useCategories() {
  return useApiGet<Category[]>(
    queryKeys.categories.list(),
    apiPaths.categories.list
  )
}

export function useCreateExpense() {
  return useApiPost<Expense, unknown, CreateExpenseBody>(
    apiPaths.expenses.create,
    queryKeys.expenses.all,
  )
}
