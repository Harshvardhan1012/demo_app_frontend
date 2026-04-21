import { LogOut, ReceiptText } from "lucide-react"
import { lazy } from "react"
import { AppRoutes } from "../routes/routeUtils"

export const ExpensePage = lazy(() => import("../app/expense/page"))

interface SidebarSubItem {
  id: string
  title: string
  url: string
  component: any
  icon: any
  showIf?: () => boolean
}

interface SidebarItem {
  id: string
  title: string
  url?: string
  component?: any
  icon: any
  showIf?: () => boolean
  subItems?: SidebarSubItem[]
  onClick?: () => void
}

interface SidebarGroup {
  id: string
  items: SidebarItem[]
}

interface SidebarConfig {
  groups: SidebarGroup[]
  header: SidebarGroup[]
  footer: SidebarGroup[]
}

export const sidebarConfig = (
  onLogoutClick?: () => void,
): SidebarConfig => ({
  groups: [
    {
      id: "Navigation",
      items: [
        {
          id: "expenses",
          title: "Expenses",
          url: AppRoutes.EXPENSES,
          component: ExpensePage,
          icon: ReceiptText,
        },
      ],
    },
  ],
  header: [
    {
      id: "header",
      items: [
        {
          id: "app-title",
          title: "Expense Tracker",
          icon: ReceiptText,
        },
      ],
    },
  ],
  footer: [
    {
      id: "footer",
      items: [
        {
          id: "logout",
          title: "Log Out",
          icon: LogOut,
          onClick: () => onLogoutClick?.(),
        },
      ],
    },
  ],
})
