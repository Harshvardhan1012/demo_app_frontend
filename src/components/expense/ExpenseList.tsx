import { DataTable } from "@/components/table/Table"
import { expenseColumns } from "@/app/expense/table_config"
import type { Expense } from "@/app/expense/type"

type Props = {
  expenses: Expense[] | undefined
  isLoading: boolean
  error?: string | null
  onRetry?: () => void
  page: number
  pageSize: number
  pageCount: number
  total?: number
  onPageChange: (page: number) => void
  onPageSizeChange: (size: number) => void
}

export function ExpenseList({
  expenses,
  isLoading,
  error,
  onRetry,
  page,
  pageSize,
  pageCount,
  total,
  onPageChange,
  onPageSizeChange,
}: Props) {
  return (
    <DataTable
      columns={expenseColumns}
      data={expenses ?? []}
      isLoading={isLoading}
      error={error}
      onRetry={onRetry}
      page={page}
      pageSize={pageSize}
      pageCount={pageCount}
      total={total}
      onPageChange={onPageChange}
      onPageSizeChange={onPageSizeChange}
      heading="Expenses"
      fileName="expenses-export"
      exportData={expenses ?? []}
      errorMessage="No expenses found."
    />
  )
}
