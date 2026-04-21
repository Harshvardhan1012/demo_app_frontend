import { Badge } from "@/components/ui/badge"
import { resolveLucideIcon } from "@/lib/lucide"
import type { ColumnDef } from "@tanstack/react-table"
import type { Expense } from "./type"

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

export const expenseColumns: ColumnDef<Expense>[] = [
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <span className="whitespace-nowrap">{formatDate(row.original.date)}</span>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const Icon = resolveLucideIcon(row.original.category.icon)
      return (
        <Badge variant="outline">
          {Icon && <Icon className="h-3 w-3" />}
          {row.original.category.name}
        </Badge>
      )
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <span className="font-medium tabular-nums">
        {row.original.currency.symbol}
        {row.original.amount.toFixed(2)}
      </span>
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {row.original.description ?? "—"}
      </span>
    ),
  },
]
