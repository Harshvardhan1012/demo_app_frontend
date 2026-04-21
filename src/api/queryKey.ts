export const queryKeys = {
  currentUser: {
    all: ["currentUser"] as const,
  },
  expenses: {
    all: ["expenses"] as const,
    lists: () => [...queryKeys.expenses.all, "list"] as const,
    list: (filters: Record<string, any>) =>
      [...queryKeys.expenses.lists(), { filters }] as const,
    detail: (id: number) =>
      [...queryKeys.expenses.all, "detail", id] as const,
  },
  categories: {
    all: ["categories"] as const,
    list: () => [...queryKeys.categories.all, "list"] as const,
  },
  currencies: {
    all: ["currencies"] as const,
    list: () => [...queryKeys.currencies.all, "list"] as const,
  },
} as const

export type QueryKeyType = typeof queryKeys

export default queryKeys
