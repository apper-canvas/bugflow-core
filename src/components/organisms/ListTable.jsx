import React, { useState } from 'react'
      import Icon from '@/components/atoms/Icon'
      import Text from '@/components/atoms/Text'
      import Button from '@/components/atoms/Button'
      import Card from '@/components/atoms/Card'
      import BugListTable from '@/components/molecules/BugListTable'

      const ListTable = ({ bugs, onUpdateBug, onDeleteBug, onSelectBug, getPriorityColor, getStatusColor }) => {
        const [sortBy, setSortBy] = useState('createdAt')
        const [sortOrder, setSortOrder] = useState('desc')

        const sortedBugs = [...(bugs || [])].sort((a, b) => {
          let aVal = a?.[sortBy]
          let bVal = b?.[sortBy]
          
          if (sortBy === 'priority') {
            const priorityOrder = { critical: 4, high: 3, medium: 2, low: 1 }
            aVal = priorityOrder[a?.priority] || 0
            bVal = priorityOrder[b?.priority] || 0
          }
          
          if (sortOrder === 'asc') {
            return aVal > bVal ? 1 : -1
          }
          return aVal < bVal ? 1 : -1
        })

        return (
          <Card className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
              <Text type="h2" className="text-lg font-semibold text-surface-900">Bug List</Text>
              
              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-1.5 border border-surface-300 rounded-lg bg-white/80 backdrop-blur-sm text-sm focus:border-primary focus:ring-primary/20 transition-all"
                >
                  <option value="createdAt">Created Date</option>
                  <option value="updatedAt">Updated Date</option>
                  <option value="priority">Priority</option>
                  <option value="status">Status</option>
                  <option value="title">Title</option>
                </select>
                
                <Button
                  variant="icon"
                  onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                >
                  <Icon name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <BugListTable
              bugs={sortedBugs}
              onSelectBug={onSelectBug}
              onDeleteBug={onDeleteBug}
              getPriorityColor={getPriorityColor}
              getStatusColor={getStatusColor}
            />
          </Card>
        )
      }

      export default ListTable