import React from 'react'
      import { motion } from 'framer-motion'

      const Button = ({ children, onClick, className = '', variant = 'primary', type = 'button', whileHover, whileTap, ...props }) => {
        let baseClasses = "px-4 py-2 rounded-lg transition-all font-medium"
        let variantClasses = ""

        switch (variant) {
          case 'primary':
            variantClasses = "bg-gradient-to-r from-primary to-primary-dark text-white shadow-soft hover:shadow-card"
            break
          case 'secondary':
            variantClasses = "bg-surface-200 text-surface-800 hover:bg-surface-300"
            break
          case 'outline':
            variantClasses = "border border-primary text-primary hover:bg-primary/10"
            break
          case 'ghost':
            variantClasses = "text-surface-600 hover:text-surface-800 hover:bg-white/50"
            break
          case 'danger':
            variantClasses = "bg-red-500 text-white hover:bg-red-600 shadow-soft"
            break
          case 'icon':
            baseClasses = "p-1.5 rounded-full transition-colors"
            variantClasses = "text-surface-600 hover:text-surface-900"
            break
          default:
            variantClasses = "bg-gradient-to-r from-primary to-primary-dark text-white shadow-soft hover:shadow-card"
        }

        const combinedClasses = `${baseClasses} ${variantClasses} ${className}`

        return (
          <motion.button
            whileHover={whileHover || { scale: 1.05 }}
            whileTap={whileTap || { scale: 0.95 }}
            onClick={onClick}
            className={combinedClasses}
            type={type}
            {...props}
          >
            {children}
          </motion.button>
        )
      }

      export default Button