import { Suspense, type JSX } from 'react'
import { Route } from 'react-router-dom'
import { Loader } from 'lucide-react'
import type {
  SidebarConfig,
  SidebarItem,
} from '@/components/NavSideBar/DynamicSidebar'

export const generateRoutesFromSidebar = (config: SidebarConfig) => {
  const allRoutes: JSX.Element[] = []

  const processItems = (items: SidebarItem[]) => {
    items.forEach((item) => {
      if (item.url && item.component) {
        const RouteComponent = item.component

        const routeElement = (
          <Route
            key={item.id}
            path={item.url}
            element={
              <Suspense
                fallback={
                  <Loader className="h-6 w-full animate-spin text-muted-foreground flex justify-center items-center " />
                }>
                <RouteComponent />
              </Suspense>
            }
          />
        )

        allRoutes.push(routeElement)
      }

      if (item.subItems) {
        processItems(item.subItems)
      }
    })
  }

  // Process all groups
  config.groups.forEach((group: { items: SidebarItem[] }) =>
    processItems(group.items),
  )
  if (config.header && Array.isArray(config.header)) {
    config.header.forEach((group: { items: SidebarItem[] }) =>
      processItems(group.items),
    )
  }
  if (config.footer && Array.isArray(config.footer)) {
    config.footer.forEach((group: { items: SidebarItem[] }) =>
      processItems(group.items),
    )
  }
  return allRoutes
}
