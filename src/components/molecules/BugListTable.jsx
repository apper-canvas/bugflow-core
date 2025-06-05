import React from 'react'
      import { motion, AnimatePresence } from 'framer-motion'
      import { format } from 'date-fns'
      import Icon from '@/components/atoms/Icon'
      import Badge from '@/components/atoms/Badge'
      import Text from '@/components/atoms/Text'
      import Button from '@/components/atoms/Button'

      const BugListTable = ({ bugs, onSelectBug, onDeleteBug, getPriorityColor, getStatusColor }) => {
        if (!bugs || bugs.length === 0) {
          return (
            <div className="text-center py-12">
              <Icon name="Search" className="h-12 w-12 text-surface-400 mx-auto mb-4" />
              <Text type="p" className="text-surface-600">No bugs found</Text>
            </div>
          )
        }

        return (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-surface-200">
                  <th className="text-left py-3 px-4 font-medium text-surface-700">Bug</th>
                  <th className="text-left py-3 px-4 font-medium text-surface-700 hidden md:table-cell">Priority</th>
                  <th className="text-left py-3 px-4 font-medium text-surface-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-surface-700 hidden lg:table-cell">Assignee</th>
                  <th className="text-left py-3 px-4 font-medium text-surface-700 hidden sm:table-cell">Created</th>
                  <th className="text-left py-3 px-4 font-medium text-surface-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {bugs.map(bug => (
                    <motion.tr
                      key={bug?.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border-b border-surface-100 hover:bg-surface-50/50 transition-colors cursor-pointer"
                      onClick={() => onSelectBug(bug)}
                    >
                      <td className="py-3 px-4">
                        <div>
                          <Text type="h4" className="font-medium text-surface-900 line-clamp-1">
                            {bug?.title || 'Untitled Bug'}
                          </Text>
                          <Text type="p" className="text-sm text-surface-500 font-mono">#{bug?.id}</Text>
                        </div>
                      </td>
                      <td className="py-3 px-4 hidden md:table-cell">
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${getPriorityColor(bug?.priority)}`} />
                          <Text type="span" className="text-sm capitalize">{bug?.priority || 'medium'}</Text>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(bug?.status)}>
                          {bug?.status?.replace('-', ' ') || 'open'}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 hidden lg:table-cell">
                        {bug?.assignee ? (
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                              <Text type="span" className="text-xs text-white font-medium">
                                {bug.assignee.charAt(0).toUpperCase()}
                              </Text>
                            </div>
                            <Text type="span" className="text-sm">{bug.assignee}</Text>
                          </div>
                        ) : (
                          <Text type="span" className="text-sm text-surface-400">Unassigned</Text>
                        )}
                      </td>
                      <td className="py-3 px-4 hidden sm:table-cell">
                        <Text type="span" className="text-sm text-surface-600">
                          {bug?.createdAt ? format(new Date(bug.createdAt), 'MMM d, yyyy') : 'No date'}
                        </Text>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            onClick={(e) => {
                              e.stopPropagation()
                              onSelectBug(bug)
                            }}
                            className="p-0 text-primary hover:text-primary-dark"
                            whileHover={{}}
                            whileTap={{}}
                          >
                            <Icon name="Eye" className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            onClick={(e) => {
                              e.stopPropagation()
                              if (window.confirm('Are you sure you want to delete this bug?')) {
                                onDeleteBug(bug?.id)
                              }
                            }}
                            className="p-0 text-red-500 hover:text-red-700"
                            whileHover={{}}
                            whileTap={{}}
                          >
                            <Icon name="Trash2" className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )
      }

      export default BugListTable