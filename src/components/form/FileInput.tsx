import { cn } from '@/lib/utils'
import { FileTextIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import type { BaseComponentProps } from './type'

interface FileInputProps extends BaseComponentProps<string | null> {
  value?: string | null // base64 string
  accept?: string
  multiple?: boolean
  icon?: React.ElementType
}

export const FileInput: React.FC<FileInputProps> = ({
  label,
  description,
  error,
  className,
  value,
  accept,
  multiple,
  icon,
  onChange,
  onBlur,
  disabled,
  ...props
}) => {
  const [preview, setPreview] = useState<string>('')
  const [fileName, setFileName] = useState<string>('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    if (file) {
      const reader = new FileReader()

      reader.onloadend = () => {
        const result = reader.result as string
        setPreview(file.type.startsWith('image/') ? result : '')
        setFileName(file.name)
        onChange?.(result)
      }
      reader.readAsDataURL(file)
    } else {
      setPreview('')
      onChange?.(null)
    }
  }

  return (
    <div className={cn('space-y-2', className)}>
      {label && <Label>{label}</Label>}
      <div className="flex items-center space-x-2">
        {preview ? (
          <img
            width={40}
            height={40}
            src={preview}
            alt="Preview"
            className="h-10 w-10 rounded-md object-cover"
          />
        ) : icon ? (
          React.createElement(icon, {
            className: 'h-10 w-10 text-gray-400',
          })
        ) : (
          <FileTextIcon className="h-10 w-10 text-gray-400" />
        )}
        <Input
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="flex-1"
          onChange={handleFileChange}
          onBlur={(e) => onBlur?.(e.target.files?.[0]?.name ?? null)}
          {...props}
        />
      </div>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {error}
    </div>
  )
}
