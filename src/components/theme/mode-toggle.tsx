'use client'

import { Button } from '@/components/ui/button'
import { MoonIcon, SunIcon } from '@/components/ui/icons'
import { useTheme } from 'next-themes'

export function ModeToggle() {
  const { setTheme, theme, resolvedTheme } = useTheme()

  const isDarkMode =
    resolvedTheme === 'dark' || (theme && theme.startsWith('dark'))

  const toggleMode = () => {
    // Extract the color theme part if it exists
    const colorTheme = theme?.includes('-') ? theme.split('-')[1] : null

    // Toggle between light and dark, preserving the color theme
    if (isDarkMode) {
      setTheme(colorTheme ? `light-${colorTheme}` : 'light')
    } else {
      setTheme(colorTheme ? `dark-${colorTheme}` : 'dark')
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleMode}>
      <SunIcon
        className={`h-5 w-5 transition-all ${
          isDarkMode ? '-rotate-90 scale-0' : 'rotate-0 scale-100'
        }`}
      />
      <MoonIcon
        className={`absolute h-5 w-5 transition-all ${
          isDarkMode ? 'rotate-0 scale-100' : 'rotate-90 scale-0'
        }`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
