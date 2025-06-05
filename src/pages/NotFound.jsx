import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md mx-auto"
      >
        <div className="glass-card rounded-2xl p-8 shadow-glass">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center mx-auto mb-6"
          >
            <ApperIcon name="Bug" className="h-8 w-8 text-white" />
          </motion.div>
          
          <h1 className="text-4xl font-bold text-surface-900 mb-2">404</h1>
          <h2 className="text-xl font-semibold text-surface-700 mb-4">Page Not Found</h2>
          <p className="text-surface-600 mb-8">
            Looks like this page went missing. Maybe it's a bug we need to track!
          </p>
          
          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary to-primary-dark text-white px-6 py-3 rounded-lg font-medium shadow-soft hover:shadow-card transition-all transform hover:-translate-y-0.5"
          >
            <ApperIcon name="Home" className="h-4 w-4" />
            <span>Back to BugFlow</span>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

export default NotFound