import { FormFieldType, type FormFieldConfig } from "@/components/form/DynamicForm"
import { z } from "zod"
import type { Category, Currency } from "./type"
import { resolveLucideIcon } from "@/lib/lucide"

// ─── Zod schema ───────────────────────────────────────────────────────────────

export const expenseSchema = z.object({
  amount: z.coerce
    .number({ message: "Enter a valid amount" })
    .positive("Amount must be greater than 0")
    .multipleOf(0.01, "Amount can have at most 2 decimal places"),
  categoryId: z.coerce
    .number({ message: "Select a category" })
    .int()
    .positive("Select a category"),
  date: z
    .union([z.string().min(1, "Date is required"), z.date()])
    .transform((v) => (v instanceof Date ? v.toISOString().split("T")[0] : v)),
  description: z.string().trim().max(200, "Description cannot exceed 200 characters").optional(),
})

export type ExpenseFormValues = z.infer<typeof expenseSchema>

// ─── Field config factory ─────────────────────────────────────────────────────

export function getExpenseFormConfig(
  currency: Currency | undefined,
  categories: Category[],
): FormFieldConfig[] {
  return [
    {
      fieldName: "amount",
      fieldLabel: "Amount",
      fieldType: FormFieldType.NUMBER,
      placeholder: "0.00",
      inputPrefix: currency?.symbol,
      description: currency ? `${currency.name} (${currency.code})` : undefined,
    },
    {
      fieldName: "categoryId",
      fieldLabel: "Category",
      fieldType: FormFieldType.SELECT,
      placeholder: "Select a category",
      options: categories.map((c) => ({
        value: String(c.id),
        label: c.name,
        icon: resolveLucideIcon(c.icon),
      })),
    },
    {
      fieldName: "date",
      fieldLabel: "Date",
      fieldType: FormFieldType.DATE,
      mode: "single",
      maxDate: new Date(),
    },
    {
      fieldName: "description",
      fieldLabel: "Description",
      fieldType: FormFieldType.TEXTAREA,
      placeholder: "What was this expense for? (optional)",
    },
  ]
}
