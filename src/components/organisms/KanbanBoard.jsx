import React, { useState } from 'react'
      import { motion, AnimatePresence } from 'framer-motion'
      import Card from '@/components/atoms/Card'
      import Badge from '@/components/atoms/Badge'
      import Icon from '@/components/atoms/Icon'
      import Text from '@/components/atoms/Text'
      import BugCard from '@/components/molecules/BugCard'

      const KanbanBoard = ({
        bugs,
        onUpdateBug,
        onSelectBug,
        selectedBug,
        getPriorityColor,
        getStatusColor,
        statuses
      }) => {
        const [draggedBug, setDraggedBug] = useState(null)

        const handleDragStart = (e, bug) => {
          setDraggedBug(bug)
          e.dataTransfer.effectAllowed = 'move'
        }

        const handleDragOver = (e) => {
          e.preventDefault()
          e.dataTransfer.dropEffect = 'move'
        }

        const handleDrop = (e, newStatus) => {
          e.preventDefault()
          if (draggedBug && draggedBug.status !== newStatus) {
            onUpdateBug(draggedBug.id, { ...draggedBug, status: newStatus, updatedAt: new Date().toISOString() })
          }
          setDraggedBug(null)
        }

        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
            {statuses.map(status => {
              const statusBugs = (bugs || []).filter(bug => bug?.status === status)
              
              return (
                <motion.div
                  key={status}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="min-h-[400px] min-w-[280px]"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, status)}
                >
                  <Card className="p-4 h-full">
                    <div className="flex items-center justify-between mb-4">
                      <Text type="h3" className="font-semibold text-surface-900 capitalize">
                        {status.replace('-', ' ')}
                      </Text>
                      <Badge className={getStatusColor(status)}>
                        {statusBugs.length}
                      </Badge>
                    </div>
                    
                    <div className="space-y-3">
                      <AnimatePresence>
                        {statusBugs.map(bug => (
                          <BugCard
                            key={bug?.id}
                            bug={bug}
                            handleDragStart={handleDragStart}
                            onSelectBug={onSelectBug}
                            getPriorityColor={getPriorityColor}
                            getStatusColor={getStatusColor}
                            selectedBug={selectedBug}
                          />
                        ))}
                      </AnimatePresence>
                    </div>
                    
                    {statusBugs.length === 0 && (
                      <div className="text-center text-surface-400 mt-8">
                        <Icon name="Package" className="h-8 w-8 mx-auto mb-2 opacity-50" />
                        <Text type="p" className="text-sm">No bugs here</Text>
                      </div>
                    )}
                  </Card>
                </motion.div>
              )
            })}
          </div>
        )
      }

      export default KanbanBoard