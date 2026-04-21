import type React from "react"

export type Option = {
  label: string
  value: string | number
  icon?: React.FC<React.SVGProps<SVGSVGElement>>
  count?: number
}
