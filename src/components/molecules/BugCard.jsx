import React, { useState } from 'react'
      import { motion } from 'framer-motion'
      import { format } from 'date-fns'
      import Card from '@/components/atoms/Card'
      import Badge from '@/components/atoms/Badge'
      import Text from '@/components/atoms/Text'

      const BugCard = ({ bug, onSelectBug, handleDragStart, getPriorityColor, getStatusColor, selectedBug }) => {
        const [isHovered, setIsHovered] = useState(false)

        return (
          <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ y: -2 }}
            draggable
            onDragStart={(e) => handleDragStart(e, bug)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => onSelectBug(bug)}
            className={`relative cursor-pointer transition-all duration-300 ${
              selectedBug?.id === bug?.id ? 'ring-2 ring-primary shadow-card' : 'hover:shadow-card'
            } ${isHovered ? 'transform scale-[1.02]' : ''}`}
          >
            <Card className="p-4 h-full flex flex-col justify-between">
              <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${getPriorityColor(bug?.priority)} rounded-l-xl`} />
              
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1 pr-2">
                  <Text type="h3" className="font-semibold text-surface-900 line-clamp-1">
                    {bug?.title || 'Untitled Bug'}
                  </Text>
                  <Text type="p" className="text-xs text-surface-500 font-mono">#{bug?.id}</Text>
                </div>
                
                <Badge className={getStatusColor(bug?.status)}>
                  {bug?.status?.replace('-', ' ') || 'open'}
                </Badge>
              </div>

              <Text type="p" className="text-sm text-surface-600 mb-3 line-clamp-2 flex-grow">
                {bug?.description || 'No description provided'}
              </Text>

              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${getPriorityColor(bug?.priority)}`} />
                  <Text type="span" className="text-xs text-surface-500 capitalize">
                    {bug?.priority || 'medium'}
                  </Text>
                </div>
                
                <div className="flex items-center space-x-2">
                  {bug?.assignee && (
                    <div className="w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                      <Text type="span" className="text-xs text-white font-medium">
                        {bug.assignee.charAt(0).toUpperCase()}
                      </Text>
                    </div>
                  )}
                  <Text type="span" className="text-xs text-surface-400">
                    {bug?.createdAt ? format(new Date(bug.createdAt), 'MMM d') : 'No date'}
                  </Text>
                </div>
              </div>
            </Card>
          </motion.div>
        )
      }

      export default BugCard