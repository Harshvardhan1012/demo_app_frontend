export const apiPaths = {
  users: {
    me: "/v1/users/me",
  },
  expenses: {
    list: "/v1/expenses",
    create: "/v1/expenses",
    detail: (id: number) => `/v1/expenses/${id}`,
    update: (id: number) => `/v1/expenses/${id}`,
    delete: (id: number) => `/v1/expenses/${id}`,
  },
  categories: {
    list: "/v1/categories",
  },
  currencies: {
    list: "/v1/currencies",
  },
} as const

export type ApiPaths = typeof apiPaths

export default apiPaths
