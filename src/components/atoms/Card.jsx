import React from 'react'
      import { motion } from 'framer-motion'

      const Card = ({ children, className = '', animation = {}, ...props }) => {
        return (
          <motion.div
            className={`glass-card rounded-xl shadow-glass ${className}`}
            {...animation}
            {...props}
          >
            {children}
          </motion.div>
        )
      }

      export default Card