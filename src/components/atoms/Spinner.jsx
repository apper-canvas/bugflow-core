import React from 'react'

      const Spinner = ({ className = 'h-12 w-12', color = 'border-primary' }) => {
        return (
          <div className={`animate-spin rounded-full border-b-2 ${color} mx-auto ${className}`}></div>
        )
      }

      export default Spinner