# Expense Tracker App

A React + TypeScript frontend for managing personal expenses — with filtering, sorting, pagination, multi-currency support, and data export.

---

## Tech Stack

| Concern        | Technology                              |
| -------------- | --------------------------------------- |
| Framework      | React 19 + TypeScript + Vite            |
| Styling        | Tailwind CSS + Shadcn/UI (Radix UI)     |
| Data Fetching  | TanStack React Query                    |
| Tables         | TanStack React Table                    |
| Forms          | React Hook Form + Zod                   |
| HTTP Client    | Axios                                   |
| Routing        | React Router v7                         |
| URL State      | nuqs                                    |
| Icons          | Lucide React                            |
| Notifications  | Sonner                                  |
| Export         | jsPDF + XLSX                            |
| Date Utilities | date-fns                                |

---

## Features

- **Expense CRUD** — create expenses
- **Multi-currency** — each expense carries a currency with code and symbol
- **Category badges** — expenses are categorised with a Lucide icon and badge display
- **Filtering** — multi-select category filter; resets pagination on change
- **Sorting** — sort by date ascending or descending
- **Pagination** — configurable page size, URL-persisted page state
- **Total amount** — displays the sum of all filtered expenses
- **Data export** — export the current view to PDF or Excel
- **Dark / light theme** — theme selector with toggle button
- **Idempotency keys** — prevents duplicate expense creation on retry
- **URL-based state** — filters, sort, and page survive browser refresh
- **Auth** — Bearer token authentication with auto-logout on expiry

---

## Project Structure

```
src/
├── api/                        # HTTP client, query keys, React Query hooks
│   ├── apiClient.ts            # Axios instance with auth interceptor
│   ├── apiEndPoint.ts          # All API path constants
│   ├── authTokenManager.ts     # Token read/write helpers
│   ├── queryKey.ts             # Query key factory
│   └── tanstackHooks.ts        # Generic useApiGet / useApiPost / … hooks
├── app/
│   └── expense/
│       ├── api.ts              # Expense-specific React Query hooks
│       ├── form_config.ts      # Zod schema + DynamicForm field config
│       ├── table_config.tsx    # TanStack column definitions
│       ├── type.ts             # Domain TypeScript interfaces
│       └── page.tsx            # Expense page (URL state, data fetching)
├── components/
│   ├── expense/                # Expense feature components
│   ├── form/                   # DynamicForm + all input primitives
│   ├── table/                  # DataTable + Pagination
│   ├── ui/                     # Shadcn primitives
│   ├── NavSideBar/             # Sidebar navigation
│   └── theme/                  # Theme provider + toggle
├── context/
│   └── AuthContext.tsx         # Auth state, token verification, logout
├── lib/
│   ├── idempotency.ts          # UUID key generation and rotation
│   └── params.ts               # Query param builder (strips nulls)
├── types/
│   ├── apiResponse.ts          # IAPIResponse<T> and IAPIError shapes
│   └── data-table.ts           # Table utility types
├── routes/
│   └── routeUtils.ts           # Route enum + auto-generated route config
├── sidebar/
│   └── sidebarConfig.ts        # Sidebar header, nav items, footer
└── Providers/
    └── AppProviders.tsx        # Provider stack + global prefetch
```

---

## API (`src/app/expense/api.ts`)

**Base URL:** `https://demoappbackend-production.up.railway.app`

| Hook                        | Method | Endpoint                | Description                                   |
| --------------------------- | ------ | ----------------------- | --------------------------------------------- |
| `useGetCurrentUser`         | GET    | `/v1/users/me`          | Fetch logged-in user with default currency    |
| `useGetExpenses`            | GET    | `/v1/expenses`          | Paginated + filtered + sorted expense list    |
| `useCreateExpense`          | POST   | `/v1/expenses`          | Create expense; invalidates expense list      |
| `useGetExpenseById`         | GET    | `/v1/expenses/:id`      | Single expense detail                         |
| `useUpdateExpense`          | PUT    | `/v1/expenses/:id`      | Update expense; invalidates list + detail     |
| `useDeleteExpense`          | DELETE | `/v1/expenses/:id`      | Soft-delete expense; invalidates list         |
| `useGetCategories`          | GET    | `/v1/categories`        | All categories for the current user           |
| `useGetCurrencies`          | GET    | `/v1/currencies`        | All available currencies                      |

Query parameters accepted by `GET /v1/expenses`:

| Param         | Type                       | Description                  |
| ------------- | -------------------------- | ---------------------------- |
| `categoryIds` | `string` (comma-separated) | Filter by one or more IDs    |
| `sort`        | `"date_desc" \| "date_asc"` | Sort order                  |
| `page`        | `number`                   | Current page (1-indexed)     |
| `pageSize`    | `number`                   | Items per page               |

---

## Form Config (`src/app/expense/form_config.ts`)

Defines the Zod validation schema and the field array consumed by `DynamicForm`.

**Zod schema rules:**

| Field         | Rule                                             |
| ------------- | ------------------------------------------------ |
| `amount`      | Positive number, max 2 decimal places            |
| `categoryId`  | Required positive integer                        |
| `date`        | Required; must not be in the future              |
| `description` | Optional string, max 200 characters              |

**Form fields:**

| Field         | Type          | Notes                                       |
| ------------- | ------------- | ------------------------------------------- |
| `amount`      | `NUMBER`      | Prefix shows the user's default currency symbol |
| `categoryId`  | `SELECT`      | Options loaded from `/v1/categories`; shows Lucide icon per category |
| `date`        | `DATE`        | Single-date mode; max = today               |
| `description` | `TEXTAREA`    | Optional; 200 char limit                    |

---

## Table Config (`src/app/expense/table_config.tsx`)

TanStack column definitions rendered by the shared `DataTable` component.

| Column        | Display                                          |
| ------------- | ------------------------------------------------ |
| `date`        | Formatted `DD-MMM-YYYY` (en-IN locale)           |
| `category`    | Badge with Lucide icon + category name           |
| `amount`      | Currency symbol prefix, 2 decimal places         |
| `description` | Description text or `—` if empty                |

Additional table features: row selection, column visibility toggle, export (PDF / Excel), pagination, loading skeletons, error state with retry.


## What can be done better
basic edit and delete feature
authorization and authentication of user can be done
expense category currency can be managed in setttings
alerts can be there based on monthly/weeekly/yearly expense reached
filters can be dynmanic in nature can have controll from the database/admin 
table configuration form configuration can also be controlled from db/admin
caching can be done more better