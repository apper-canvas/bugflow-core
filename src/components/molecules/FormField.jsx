import React from 'react'
      import Input from '@/components/atoms/Input'
      import Label from '@/components/atoms/Label'
      import Text from '@/components/atoms/Text'

      const FormField = ({ label, type = 'text', value, onChange, placeholder, error, rows, children, ...props }) => {
        const inputElement = rows ? (
          <textarea
            value={value}
            onChange={onChange}
            rows={rows}
            className={`w-full px-3 py-2 border rounded-lg bg-white/80 backdrop-blur-sm transition-all resize-none ${
              error ? 'border-red-500 focus:ring-red-200' : 'border-surface-300 focus:border-primary focus:ring-primary/20'
            }`}
            placeholder={placeholder}
            {...props}
          />
        ) : (
          type === 'select' ? (
            <select
              value={value}
              onChange={onChange}
              className="w-full px-3 py-2 border border-surface-300 rounded-lg bg-white/80 backdrop-blur-sm focus:border-primary focus:ring-primary/20 transition-all"
              {...props}
            >
              {children}
            </select>
          ) : (
            <Input
              type={type}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              error={error}
              {...props}
            />
          )
        )

        return (
          <div>
            <Label>
              {label} {props.required && <Text type="span" className="text-red-500">*</Text>}
            </Label>
            {inputElement}
            {error && <Text type="p" className="text-red-500 text-xs mt-1">{error}</Text>}
          </div>
        )
      }

      export default FormField