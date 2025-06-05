import activityData from '../mockData/activities.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class ActivityService {
  constructor() {
    this.activities = [...activityData]
  }

  async getAll() {
    await delay(200)
    return [...this.activities]
  }

  async getById(id) {
    await delay(150)
    const activity = this.activities.find(a => a.id === id)
    if (!activity) {
      throw new Error('Activity not found')
    }
    return { ...activity }
  }

  async getByBugId(bugId) {
    await delay(200)
    return this.activities
      .filter(activity => activity.bugId === bugId)
      .map(activity => ({ ...activity }))
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  }

  async create(activityData) {
    await delay(250)
    const newActivity = {
      id: Date.now().toString(),
      ...activityData,
      timestamp: new Date().toISOString()
    }
    this.activities.unshift(newActivity)
    return { ...newActivity }
  }

  async update(id, updates) {
    await delay(200)
    const index = this.activities.findIndex(a => a.id === id)
    if (index === -1) {
      throw new Error('Activity not found')
    }
    
    this.activities[index] = {
      ...this.activities[index],
      ...updates
    }
    
    return { ...this.activities[index] }
  }

  async delete(id) {
    await delay(200)
    const index = this.activities.findIndex(a => a.id === id)
    if (index === -1) {
      throw new Error('Activity not found')
    }
    
    this.activities.splice(index, 1)
    return true
  }
}

export default new ActivityService()