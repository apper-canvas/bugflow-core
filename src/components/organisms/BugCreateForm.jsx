import React, { useState } from 'react'
      import Modal from '@/components/molecules/Modal'
      import FormField from '@/components/molecules/FormField'
      import Button from '@/components/atoms/Button'

      const BugCreateForm = ({ showCreateModal, onCloseCreateModal, onCreateBug }) => {
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

        const handleChange = (e) => {
          const { name, value } = e.target
          setFormData(prev => ({ ...prev, [name]: value }))
          // Clear error for the field once user starts typing
          if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }))
          }
        }

        return (
          <Modal
            isOpen={showCreateModal}
            onClose={onCloseCreateModal}
            title="Create New Bug"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter bug title..."
                error={errors.title}
                required
              />

              <FormField
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the bug..."
                rows={3}
                error={errors.description}
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  label="Priority"
                  name="priority"
                  type="select"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </FormField>

                <FormField
                  label="Assignee"
                  name="assignee"
                  type="text"
                  value={formData.assignee}
                  onChange={handleChange}
                  placeholder="Assign to..."
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button type="button" variant="ghost" onClick={onCloseCreateModal}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary">
                  Create Bug
                </Button>
              </div>
            </form>
          </Modal>
        )
      }

      export default BugCreateForm