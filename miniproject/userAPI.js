// User Authentication API
const API_URL = 'http://localhost:3000'

export const userAPI = {
  async getAllUsers() {
    try {
      const response = await fetch(`${API_URL}/users`)
      if (!response.ok) throw new Error('Failed to fetch users')
      return await response.json()
    } catch (error) {
      console.error('Error fetching users:', error)
      throw error
    }
  },

  async getUserByEmail(email) {
    try {
      const response = await fetch(`${API_URL}/users?email=${email}`)
      if (!response.ok) throw new Error('Failed to fetch user')
      const users = await response.json()
      return users.length > 0 ? users[0] : null
    } catch (error) {
      console.error('Error fetching user:', error)
      throw error
    }
  },

  async createUser(user) {
    try {
      console.log('🔐 Creating new user:', user)
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      })
      if (!response.ok) throw new Error('Failed to create user')
      return await response.json()
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  },

  async updateUser(id, user) {
    try {
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      })
      if (!response.ok) throw new Error('Failed to update user')
      return await response.json()
    } catch (error) {
      console.error('Error updating user:', error)
      throw error
    }
  }
}
