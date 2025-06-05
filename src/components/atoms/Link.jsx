import React from 'react'

      const Link = ({ children, href, className = '', ...props }) => {
        return (
          <a href={href} className={`text-primary hover:text-primary-dark transition-colors ${className}`} {...props}>
            {children}
          </a>
        )
      }

      export default Link