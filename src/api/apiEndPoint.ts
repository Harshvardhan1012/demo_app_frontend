export const apiPaths = {
  users: {
    me: "/users/me",
  },
  expenses: {
    list: "/expenses",
    create: "/expenses",
    detail: (id: number) => `/expenses/${id}`,
    update: (id: number) => `/expenses/${id}`,
    delete: (id: number) => `/expenses/${id}`,
  },
  categories: {
    list: "/categories",
  },
  currencies: {
    list: "/currencies",
  },
} as const

export type ApiPaths = typeof apiPaths

export default apiPaths
