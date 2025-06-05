import React from 'react'

      const Input = ({ type = 'text', value, onChange, placeholder, className = '', error, ...props }) => {
        const baseClasses = "w-full px-3 py-2 border rounded-lg bg-white/80 backdrop-blur-sm transition-all"
        const errorClasses = error ? 'border-red-500 focus:ring-red-200' : 'border-surface-300 focus:border-primary focus:ring-primary/20'

        return (
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${baseClasses} ${errorClasses} ${className}`}
            {...props}
          />
        )
      }

      export default Input