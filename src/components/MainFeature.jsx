import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { format } from 'date-fns'
import ApperIcon from './ApperIcon'

const MainFeature = ({ 
  bugs, 
  view, 
  onUpdateBug, 
  onDeleteBug, 
  onSelectBug, 
  selectedBug,
  showCreateModal,
  onCreateBug,
  onCloseCreateModal,
  getPriorityColor,
  getStatusColor,
  statuses 
}) => {
  const [draggedBug, setDraggedBug] = useState(null)
  const [sortBy, setSortBy] = useState('createdAt')
  const [sortOrder, setSortOrder] = useState('desc')

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

  const CreateBugModal = () => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      priority: 'medium',
      status: 'open',
      reporter: 'Current User',
      assignee: ''
    })
    const [errors, setErrors] = useState({})

    const validateForm = () => {
      const newErrors = {}
      if (!formData.title?.trim()) newErrors.title = 'Title is required'
      if (!formData.description?.trim()) newErrors.description = 'Description is required'
      setErrors(newErrors)
      return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      if (validateForm()) {
        onCreateBug({
          ...formData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        })
        setFormData({
          title: '',
          description: '',
          priority: 'medium',
          status: 'open',
          reporter: 'Current User',
          assignee: ''
        })
      }
    }

    return (
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={onCloseCreateModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card rounded-2xl p-6 w-full max-w-md shadow-glass"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-surface-900">Create New Bug</h2>
                <button
                  onClick={onCloseCreateModal}
                  className="text-surface-500 hover:text-surface-700 transition-colors"
                >
                  <ApperIcon name="X" className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg bg-white/80 backdrop-blur-sm transition-all ${
                      errors.title ? 'border-red-500 focus:ring-red-200' : 'border-surface-300 focus:border-primary focus:ring-primary/20'
                    }`}
                    placeholder="Enter bug title..."
                  />
                  {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-surface-700 mb-1">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg bg-white/80 backdrop-blur-sm transition-all resize-none ${
                      errors.description ? 'border-red-500 focus:ring-red-200' : 'border-surface-300 focus:border-primary focus:ring-primary/20'
                    }`}
                    placeholder="Describe the bug..."
                  />
                  {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-1">
                      Priority
                    </label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value }))}
                      className="w-full px-3 py-2 border border-surface-300 rounded-lg bg-white/80 backdrop-blur-sm focus:border-primary focus:ring-primary/20 transition-all"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-surface-700 mb-1">
                      Assignee
                    </label>
                    <input
                      type="text"
                      value={formData.assignee}
                      onChange={(e) => setFormData(prev => ({ ...prev, assignee: e.target.value }))}
                      className="w-full px-3 py-2 border border-surface-300 rounded-lg bg-white/80 backdrop-blur-sm focus:border-primary focus:ring-primary/20 transition-all"
                      placeholder="Assign to..."
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={onCloseCreateModal}
                    className="px-4 py-2 text-surface-600 hover:text-surface-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg shadow-soft hover:shadow-card transition-all font-medium"
                  >
                    Create Bug
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  const BugCard = ({ bug }) => {
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
        className={`glass-card rounded-xl p-4 cursor-pointer transition-all duration-300 ${
          selectedBug?.id === bug?.id ? 'ring-2 ring-primary shadow-card' : 'hover:shadow-card'
        } ${isHovered ? 'transform scale-[1.02]' : ''}`}
      >
        <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b ${getPriorityColor(bug?.priority)} rounded-l-xl`} />
        
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-surface-900 line-clamp-1">
              {bug?.title || 'Untitled Bug'}
            </h3>
            <p className="text-xs text-surface-500 font-mono">#{bug?.id}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(bug?.status)}`}>
              {bug?.status?.replace('-', ' ') || 'open'}
            </span>
          </div>
        </div>

        <p className="text-sm text-surface-600 mb-3 line-clamp-2">
          {bug?.description || 'No description provided'}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${getPriorityColor(bug?.priority)}`} />
            <span className="text-xs text-surface-500 capitalize">
              {bug?.priority || 'medium'}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {bug?.assignee && (
              <div className="w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-medium">
                  {bug.assignee.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <span className="text-xs text-surface-400">
              {bug?.createdAt ? format(new Date(bug.createdAt), 'MMM d') : 'No date'}
            </span>
          </div>
        </div>
      </motion.div>
    )
  }

  if (view === 'kanban') {
    return (
      <div className="space-y-6">
        <CreateBugModal />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
          {statuses.map(status => {
            const statusBugs = (bugs || []).filter(bug => bug?.status === status)
            
            return (
              <motion.div
                key={status}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-xl p-4 min-h-[400px] min-w-[280px]"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, status)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-surface-900 capitalize">
                    {status.replace('-', ' ')}
                  </h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(status)}`}>
                    {statusBugs.length}
                  </span>
                </div>
                
                <div className="space-y-3">
                  <AnimatePresence>
                    {statusBugs.map(bug => (
                      <BugCard key={bug?.id} bug={bug} />
                    ))}
                  </AnimatePresence>
                </div>
                
                {statusBugs.length === 0 && (
                  <div className="text-center text-surface-400 mt-8">
                    <ApperIcon name="Package" className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No bugs here</p>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <CreateBugModal />
      
      <div className="glass-card rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
          <h2 className="text-lg font-semibold text-surface-900">Bug List</h2>
          
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
            
            <button
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="p-1.5 text-surface-600 hover:text-surface-900 transition-colors"
            >
              <ApperIcon name={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'} className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
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
                {sortedBugs.map(bug => (
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
                        <h4 className="font-medium text-surface-900 line-clamp-1">
                          {bug?.title || 'Untitled Bug'}
                        </h4>
                        <p className="text-sm text-surface-500 font-mono">#{bug?.id}</p>
                      </div>
                    </td>
                    <td className="py-3 px-4 hidden md:table-cell">
                      <div className="flex items-center space-x-2">
                        <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${getPriorityColor(bug?.priority)}`} />
                        <span className="text-sm capitalize">{bug?.priority || 'medium'}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(bug?.status)}`}>
                        {bug?.status?.replace('-', ' ') || 'open'}
                      </span>
                    </td>
                    <td className="py-3 px-4 hidden lg:table-cell">
                      {bug?.assignee ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                            <span className="text-xs text-white font-medium">
                              {bug.assignee.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="text-sm">{bug.assignee}</span>
                        </div>
                      ) : (
                        <span className="text-sm text-surface-400">Unassigned</span>
                      )}
                    </td>
                    <td className="py-3 px-4 hidden sm:table-cell">
                      <span className="text-sm text-surface-600">
                        {bug?.createdAt ? format(new Date(bug.createdAt), 'MMM d, yyyy') : 'No date'}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            onSelectBug(bug)
                          }}
                          className="text-primary hover:text-primary-dark transition-colors"
                        >
                          <ApperIcon name="Eye" className="h-4 w-4" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            if (confirm('Are you sure you want to delete this bug?')) {
                              onDeleteBug(bug?.id)
                            }
                          }}
                          className="text-red-500 hover:text-red-700 transition-colors"
                        >
                          <ApperIcon name="Trash2" className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          
          {sortedBugs.length === 0 && (
            <div className="text-center py-12">
              <ApperIcon name="Search" className="h-12 w-12 text-surface-400 mx-auto mb-4" />
              <p className="text-surface-600">No bugs found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MainFeature