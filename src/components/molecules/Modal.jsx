import React from 'react'
      import { motion, AnimatePresence } from 'framer-motion'
      import Card from '@/components/atoms/Card'
      import Icon from '@/components/atoms/Icon'
      import Text from '@/components/atoms/Text'
      import Button from '@/components/atoms/Button'

      const Modal = ({ isOpen, onClose, title, children, className = '' }) => {
        return (
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  className={`w-full max-w-md ${className}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <Text type="h2" className="text-xl font-bold text-surface-900">{title}</Text>
                      <Button variant="ghost" onClick={onClose} className="p-0 text-surface-500 hover:text-surface-700" whileHover={{}} whileTap={{}}>
                        <Icon name="X" className="h-5 w-5" />
                      </Button>
                    </div>
                    {children}
                  </Card>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        )
      }

      export default Modal