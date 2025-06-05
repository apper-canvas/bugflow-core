import bugData from '../mockData/bugs.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class BugService {
  constructor() {
    this.bugs = [...bugData]
  }

  async getAll() {
    await delay(300)
    return [...this.bugs]
  }

  async getById(id) {
    await delay(200)
    const bug = this.bugs.find(b => b.id === id)
    if (!bug) {
      throw new Error('Bug not found')
    }
    return { ...bug }
  }

  async create(bugData) {
    await delay(400)
    const newBug = {
      id: Date.now().toString(),
      ...bugData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    this.bugs.unshift(newBug)
    return { ...newBug }
  }

  async update(id, updates) {
    await delay(300)
    const index = this.bugs.findIndex(b => b.id === id)
    if (index === -1) {
      throw new Error('Bug not found')
    }
    
    this.bugs[index] = {
      ...this.bugs[index],
      ...updates,
      updatedAt: new Date().toISOString()
    }
    
    return { ...this.bugs[index] }
  }

  async delete(id) {
    await delay(250)
    const index = this.bugs.findIndex(b => b.id === id)
    if (index === -1) {
      throw new Error('Bug not found')
    }
    
    this.bugs.splice(index, 1)
    return true
  }

  async getByStatus(status) {
    await delay(200)
    return this.bugs.filter(bug => bug.status === status).map(bug => ({ ...bug }))
  }

  async getByPriority(priority) {
    await delay(200)
    return this.bugs.filter(bug => bug.priority === priority).map(bug => ({ ...bug }))
  }
}

export default new BugService()