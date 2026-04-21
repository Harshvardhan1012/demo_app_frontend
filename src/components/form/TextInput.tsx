import React from 'react'
import { cn } from '@/lib/utils'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { type BaseFormFieldConfig, FormFieldType } from './DynamicForm'
import type { StringOrNumberComponentProps } from './type'

export interface InputFieldConfig
  extends BaseFormFieldConfig<
      | FormFieldType.TEXT
      | FormFieldType.PASSWORD
      | FormFieldType.EMAIL
      | FormFieldType.NUMBER
    >,
    Omit<React.ComponentProps<typeof Input>, 'ref'> {
  fieldType:
    | FormFieldType.TEXT
    | FormFieldType.PASSWORD
    | FormFieldType.EMAIL
    | FormFieldType.NUMBER
  ref?: React.Ref<HTMLInputElement>
}

export interface TextInputProps
  extends Omit<
    React.ComponentProps<typeof Input>,
    'onFocus' | 'onBlur' | 'onChange'
  > {
  icon?: React.ElementType
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}

interface ITextInputType extends StringOrNumberComponentProps, TextInputProps {
  type?: 'text' | 'password' | 'email' | 'number'
  value?: string | number
  placeholder?: string
  icon?: React.ElementType
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}

export const TextInput: React.FC<ITextInputType> = ({
  label,
  description,
  error,
  className,
  type = 'text',
  value = '',
  placeholder,
  icon,
  prefix,
  suffix,
  onChange,
  onBlur,
  disabled,
  ...props
}) => {
  const hasLeft = !!(icon || prefix)

  return (
    <div className={cn('space-y-2', className)}>
      {label && <Label>{label}</Label>}
      <div className="relative flex items-center">
        {icon &&
          React.createElement(icon, {
            className:
              'absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 pointer-events-none',
          })}
        {!icon && prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none select-none">
            {prefix}
          </span>
        )}
        <Input
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(e) => {
            const newValue =
              type === 'number' ? Number(e.target.value) : e.target.value
            onChange?.(newValue)
          }}
          onBlur={(e) => {
            const newValue =
              type === 'number' ? Number(e.target.value) : e.target.value
            onBlur?.(newValue)
          }}
          className={cn(
            icon ? 'pl-10' : hasLeft ? 'pl-8' : '',
            suffix ? 'pr-8' : '',
          )}
          {...props}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none select-none">
            {suffix}
          </span>
        )}
      </div>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {error}
    </div>
  )
}
