import * as LucideIcons from "lucide-react"
import type React from "react"

export function resolveLucideIcon(name: string | null | undefined): React.ElementType | undefined {
  if (!name) return undefined
  return (LucideIcons as Record<string, React.ElementType>)[name]
}
