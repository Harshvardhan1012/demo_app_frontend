import { ErrorBoundary } from '@/components/ErrorBoundary'
import { ClientSidebarProvider } from '@/components/NavSideBar/ClientSidebarProvider'
import { AlertProvider } from '@/components/services/toastService'
import { ModeToggle } from '@/components/theme/mode-toggle'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { ThemeSelector } from '@/components/theme/theme-selector'
import { Toaster } from '@/components/ui/sonner'
import { generateRoutesFromSidebar } from '@/routes/routeGenerator'
import { sidebarConfig } from '@/sidebar/sidebarConfig'
import { SidebarExample } from '@/sidebar/SidebarExample'
import { useCurrentUser, useCategories } from '@/app/expense/api'
import { NuqsAdapter } from 'nuqs/adapters/react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './../index.css'
import { QueryClientWrapper } from './QueryClientProvider'

function GlobalPrefetch() {
  useCurrentUser()
  useCategories()
  return null
}

function AppProvider() {
  const routes = generateRoutesFromSidebar(sidebarConfig(() => true))
  return (
    <ErrorBoundary>
      <Router>
        <NuqsAdapter>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem>
            <AlertProvider>
              <QueryClientWrapper>
                <GlobalPrefetch />
                <ClientSidebarProvider>
                  <Routes>
                    {/* Add any additional routes here if needed */}
                    {/* Routes with sidebar */}
                    <Route
                      path="/*"
                      element={
                        <div className="flex flex-col h-screen w-full overflow-hidden">
                          <div className="absolute right-4 top-2 z-50 flex items-center gap-4">
                            <ThemeSelector />
                            <ModeToggle />
                          </div>
                          <div className="flex flex-1 w-full overflow-hidden">
                            <SidebarExample>
                              <Routes>{routes}</Routes>
                            </SidebarExample>
                          </div>
                        </div>
                      }
                    />
                  </Routes>
                </ClientSidebarProvider>
                <Toaster />
              </QueryClientWrapper>
            </AlertProvider>
          </ThemeProvider>
        </NuqsAdapter>
      </Router>
    </ErrorBoundary>
  )
}
export default AppProvider
