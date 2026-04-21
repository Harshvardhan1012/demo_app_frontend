import { DataTableFacetedFilter } from "@/components/ui/data-table-faceted-filter"
import { SelectInput } from "@/components/form/SelectInput"
import { FormFieldType } from "@/components/form/DynamicForm"
import type { Category, ExpenseFilters } from "@/app/expense/type"
import type { Option } from "@/types/data-table"
import { resolveLucideIcon } from "@/lib/lucide"
import { SORT_OPTIONS } from "./sortOptions"


type Props = {
  filters: Partial<ExpenseFilters>
  categories: Category[]
  onChange: (filters: Partial<ExpenseFilters>) => void
  totalAmount?: number
  currencySymbol?: string
}

export function ExpenseFilters({ filters, categories, onChange, totalAmount, currencySymbol }: Props) {
  const categoryOptions: Option[] = categories.map((c) => ({
    label: c.name,
    value: String(c.id),
    icon: resolveLucideIcon(c.icon) as Option["icon"],
  }))

  return (
    <div className="flex flex-wrap items-center justify-between gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <DataTableFacetedFilter
          title="Category"
          options={categoryOptions}
          multiple
          value={filters.categoryIds}
          onValueChange={(val) =>
            onChange({ ...filters, categoryIds: val?.length ? val : undefined })
          }
        />

        <SelectInput
          fieldType={FormFieldType.SELECT}
          fieldName="sort"
          fieldLabel=""
          error={null}
          options={SORT_OPTIONS}
          value={filters.sort}
          onChange={(v) => onChange({ ...filters, sort: v as ExpenseFilters["sort"] })}
          className="w-44"
        />
      </div>

      {totalAmount && (
        <div className="text-sm text-muted-foreground">
          Total {" "}
          <span className="font-semibold text-foreground">
            {currencySymbol} {totalAmount}
          </span>
        </div>
      )}
    </div>
  )
}
