import { useState } from 'react'
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryState,
} from 'nuqs'
import { PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FormDialog } from '@/components/ui/FormDialog'
import { PageHeader } from '@/components/ui/PageHeader'
import { Separator } from '@/components/ui/separator'
import { ExpenseFilters } from '@/components/expense/ExpenseFilters'
import { ExpenseForm } from '@/components/expense/ExpenseForm'
import { ExpenseList } from '@/components/expense/ExpenseList'
import { type ExpenseFilters as TFilters } from './type'
import { useCategories, useCurrentUser, useExpenses } from './api'

export default function ExpensePage() {
  const [dialogOpen, setDialogOpen] = useState(false)

  const [sort, setSort] = useQueryState(
    'sort',
    parseAsString.withDefault('date_desc'),
  )
  const [categoryIds, setCategoryIds] = useQueryState(
    'categoryIds',
    parseAsArrayOf(parseAsString).withDefault([]),
  )
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1))
  const [pageSize, setPageSize] = useQueryState(
    'pageSize',
    parseAsInteger.withDefault(10),
  )

  const { data: userData } = useCurrentUser()
  const { data: categoriesData } = useCategories()
  const user = userData?.data
  const categories = categoriesData?.data ?? []

  const filters: Partial<TFilters> = {
    sort: sort as TFilters['sort'],
    categoryIds: categoryIds.length ? categoryIds : undefined,
  }

  const { data, isLoading, error, refetch } = useExpenses({
    ...filters,
    page,
    pageSize,
  })

  const listData = data?.data
  const expenses = listData?.items
  const totalAmount = listData?.totalAmount
  const pageCount = listData?.meta?.pageCount ?? 1
  const total = listData?.meta?.total

  const handleFiltersChange = (next: Partial<TFilters>) => {
    setSort(next.sort ?? 'date_desc')
    setCategoryIds(next.categoryIds?.length ? next.categoryIds : [])
    setPage(1)
  }

  return (
    <div className="flex flex-col gap-6 p-6 max-w-5xl mx-auto">
      <PageHeader
        title="Expenses"
        description="Track and manage your expenses"
        action={
          <Button onClick={() => setDialogOpen(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Expense
          </Button>
        }
      />

      <FormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title="Add Expense">
        <ExpenseForm
          defaultCurrency={user?.defaultCurrency}
          categories={categories}
          onSuccess={() => setDialogOpen(false)}
        />
      </FormDialog>

      <div className="flex flex-col gap-4">
        <ExpenseFilters
          filters={filters}
          categories={categories}
          onChange={handleFiltersChange}
          totalAmount={totalAmount}
          currencySymbol={user?.defaultCurrency?.symbol}
        />
        <Separator />
        <ExpenseList
          expenses={expenses}
          isLoading={isLoading}
          error={error?.message}
          onRetry={refetch}
          page={page}
          pageSize={pageSize}
          pageCount={pageCount}
          total={total}
          onPageChange={(p) => setPage(p)}
          onPageSizeChange={(size) => {
            setPageSize(size)
            setPage(1)
          }}
        />
      </div>
    </div>
  )
}
