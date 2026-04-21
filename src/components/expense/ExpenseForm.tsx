import { useRef } from 'react'
import DynamicForm from '@/components/form/DynamicForm'
import type { FormContextType } from '@/components/form/FormContext'
import { useCreateExpense } from '@/app/expense/api'
import { getOrCreateIdempotencyKey, rotateIdempotencyKey } from '@/lib/idempotency'
import {
  expenseSchema,
  getExpenseFormConfig,
  type ExpenseFormValues,
} from '@/app/expense/form_config'
import type { Category, Currency } from '@/app/expense/type'

type Props = {
  onSuccess?: () => void
  defaultCurrency?: Currency
  categories: Category[]
}

export function ExpenseForm({ onSuccess, defaultCurrency, categories }: Props) {
  const formRef = useRef<FormContextType>(null)
  const idempotencyKeyRef = useRef<string>(getOrCreateIdempotencyKey())

  const formConfig = getExpenseFormConfig(defaultCurrency, categories)
  const { mutate, isPending } = useCreateExpense()

  const handleSubmit = (values: ExpenseFormValues) =>
    mutate(
      { ...values, idempotencyKey: idempotencyKeyRef.current },
      {
        onSuccess: () => {
          idempotencyKeyRef.current = rotateIdempotencyKey()
          formRef.current?.resetForm()
          onSuccess?.()
        },
      }
    )

  return (
    <DynamicForm
      ref={formRef}
      formConfig={formConfig}
      schema={expenseSchema}
      onSubmit={handleSubmit}
      defaultValues={{
        amount: 0,
        categoryId: 0,
        date: new Date().toISOString().split('T')[0],
        description: '',
      }}
      loading={isPending}
      submitButtonText="Add Expense"
    />
  )
}
