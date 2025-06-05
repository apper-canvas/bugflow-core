import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import { bugService } from '../services'

const Home = () => {
  const [bugs, setBugs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [view, setView] = useState('kanban') // 'kanban' or 'list'
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBug, setSelectedBug] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    const loadBugs = async () => {
      setLoading(true)
      try {
        const result = await bugService.getAll()
        setBugs(result || [])
      } catch (err) {
        setError(err?.message || 'Failed to load bugs')
        toast.error('Failed to load bugs')
      } finally {
        setLoading(false)
      }
    }
    loadBugs()
  }, [])

  const filteredBugs = bugs.filter(bug => 
    bug?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bug?.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bug?.id?.toString().includes(searchTerm)
  )

  const handleCreateBug = async (bugData) => {
    try {
      const newBug = await bugService.create(bugData)
      setBugs(prev => [newBug, ...(prev || [])])
      setShowCreateModal(false)
      toast.success('Bug created successfully!')
    } catch (err) {
      toast.error('Failed to create bug')
    }
  }

  const handleUpdateBug = async (id, updates) => {
    try {
      const updatedBug = await bugService.update(id, updates)
      setBugs(prev => (prev || []).map(bug => bug?.id === id ? updatedBug : bug))
      toast.success('Bug updated successfully!')
    } catch (err) {
      toast.error('Failed to update bug')
    }
  }

  const handleDeleteBug = async (id) => {
    try {
      await bugService.delete(id)
      setBugs(prev => (prev || []).filter(bug => bug?.id !== id))
      setSelectedBug(null)
      toast.success('Bug deleted successfully!')
    } catch (err) {
      toast.error('Failed to delete bug')
    }
  }

  const getPriorityColor = (priority) => {
    const colors = {
      critical: 'from-red-500 to-red-600',
      high: 'from-orange-500 to-orange-600',
      medium: 'from-yellow-500 to-yellow-600',
      low: 'from-green-500 to-green-600'
    }
    return colors[priority] || colors.medium
  }

  const getStatusColor = (status) => {
    const colors = {
      open: 'bg-blue-100 text-blue-800 border-blue-200',
      'in-progress': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      testing: 'bg-purple-100 text-purple-800 border-purple-200',
      resolved: 'bg-green-100 text-green-800 border-green-200',
      closed: 'bg-gray-100 text-gray-800 border-gray-200'
    }
    return colors[status] || colors.open
  }

  const statuses = ['open', 'in-progress', 'testing', 'resolved', 'closed']

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card rounded-2xl p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-surface-600">Loading bugs...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass-card rounded-2xl p-8 text-center">
          <ApperIcon name="AlertTriangle" className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 font-medium">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                  <ApperIcon name="Bug" className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  BugFlow
                </h1>
              </div>
              
              <div className="hidden md:flex items-center space-x-2">
                <button
                  onClick={() => setView('kanban')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    view === 'kanban' 
                      ? 'bg-primary text-white shadow-soft' 
                      : 'text-surface-600 hover:text-surface-900 hover:bg-white/50'
                  }`}
                >
                  <ApperIcon name="Kanban" className="h-4 w-4 inline mr-1" />
                  Board
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    view === 'list' 
                      ? 'bg-primary text-white shadow-soft' 
                      : 'text-surface-600 hover:text-surface-900 hover:bg-white/50'
                  }`}
                >
                  <ApperIcon name="List" className="h-4 w-4 inline mr-1" />
                  List
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-surface-400" />
                <input
                  type="text"
                  placeholder="Search bugs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 rounded-lg border border-surface-200 focus:border-primary focus:ring-2 focus:ring-primary/20 bg-white/80 backdrop-blur-sm transition-all"
                />
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-gradient-to-r from-primary to-primary-dark text-white rounded-lg shadow-soft hover:shadow-card transition-all font-medium"
              >
                <ApperIcon name="Plus" className="h-4 w-4 inline mr-1" />
                <span className="hidden sm:inline">New Bug</span>
              </motion.button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MainFeature 
          bugs={filteredBugs}
          view={view}
          onUpdateBug={handleUpdateBug}
          onDeleteBug={handleDeleteBug}
          onSelectBug={setSelectedBug}
          selectedBug={selectedBug}
          showCreateModal={showCreateModal}
          onCreateBug={handleCreateBug}
          onCloseCreateModal={() => setShowCreateModal(false)}
          getPriorityColor={getPriorityColor}
          getStatusColor={getStatusColor}
          statuses={statuses}
        />
      </main>

      {/* Quick Stats */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-xl p-4 shadow-glass"
        >
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-surface-600">
                {(bugs || []).filter(bug => bug?.priority === 'critical').length} Critical
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-surface-600">
                {(bugs || []).filter(bug => bug?.status === 'open').length} Open
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Home