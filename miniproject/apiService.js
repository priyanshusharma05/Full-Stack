// API service for CRUD operations
const API_URL = 'http://localhost:3000'

// Students API
export const studentAPI = {
  async getAllStudents() {
    try {
      const response = await fetch(`${API_URL}/students`)
      if (!response.ok) throw new Error('Failed to fetch students')
      return await response.json()
    } catch (error) {
      console.error('Error fetching students:', error)
      throw error
    }
  },

  async getStudentById(id) {
    try {
      const studentId = String(id)
      const response = await fetch(`${API_URL}/students/${studentId}`)
      if (!response.ok) throw new Error('Failed to fetch student')
      return await response.json()
    } catch (error) {
      console.error('Error fetching student:', error)
      throw error
    }
  },

  async createStudent(student) {
    try {
      const response = await fetch(`${API_URL}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
      })
      if (!response.ok) throw new Error('Failed to create student')
      return await response.json()
    } catch (error) {
      console.error('Error creating student:', error)
      throw error
    }
  },

  async updateStudent(id, student) {
    try {
      const studentId = String(id)
      console.log(`🔄 Updating student ${studentId} with:`, student)
      console.log(`🔗 URL: ${API_URL}/students/${studentId}`)
      const response = await fetch(`${API_URL}/students/${studentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(student)
      })
      console.log(`✅ Update response status: ${response.status}`)
      if (!response.ok) {
        const text = await response.text()
        console.error('Response text:', text)
        throw new Error(`HTTP ${response.status}: Failed to update student`)
      }
      return await response.json()
    } catch (error) {
      console.error('❌ Error updating student:', error)
      throw error
    }
  },

  async deleteStudent(id) {
    try {
      const studentId = String(id)
      console.log(`🗑️ Deleting student ${studentId}`)
      console.log(`🔗 URL: ${API_URL}/students/${studentId}`)
      const response = await fetch(`${API_URL}/students/${studentId}`, {
        method: 'DELETE'
      })
      console.log(`✅ Delete response status: ${response.status}`)
      if (!response.ok) throw new Error(`HTTP ${response.status}: Failed to delete student`)
      return response.status === 204 ? {} : await response.json()
    } catch (error) {
      console.error('❌ Error deleting student:', error)
      throw error
    }
  }
}

// Results API
export const resultAPI = {
  async getAllResults() {
    try {
      const response = await fetch(`${API_URL}/results`)
      if (!response.ok) throw new Error('Failed to fetch results')
      return await response.json()
    } catch (error) {
      console.error('Error fetching results:', error)
      throw error
    }
  },

  async getResultsByStudentId(studentId) {
    try {
      const response = await fetch(`${API_URL}/results?studentId=${studentId}`)
      if (!response.ok) throw new Error('Failed to fetch results')
      return await response.json()
    } catch (error) {
      console.error('Error fetching results:', error)
      throw error
    }
  },

  async createResult(result) {
    try {
      const response = await fetch(`${API_URL}/results`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result)
      })
      if (!response.ok) throw new Error('Failed to create result')
      return await response.json()
    } catch (error) {
      console.error('Error creating result:', error)
      throw error
    }
  },

  async updateResult(id, result) {
    try {
      const resultId = String(id)
      console.log(`🔄 Updating result ${resultId} with:`, result)
      const response = await fetch(`${API_URL}/results/${resultId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result)
      })
      console.log(`✅ Update response status: ${response.status}`)
      if (!response.ok) throw new Error(`HTTP ${response.status}: Failed to update result`)
      return await response.json()
    } catch (error) {
      console.error('❌ Error updating result:', error)
      throw error
    }
  },

  async deleteResult(id) {
    try {
      const resultId = String(id)
      console.log(`🗑️ Deleting result ${resultId}`)
      const response = await fetch(`${API_URL}/results/${resultId}`, {
        method: 'DELETE'
      })
      console.log(`✅ Delete response status: ${response.status}`)
      if (!response.ok) throw new Error(`HTTP ${response.status}: Failed to delete result`)
      return response.status === 204 ? {} : await response.json()
    } catch (error) {
      console.error('❌ Error deleting result:', error)
      throw error
    }
  }
}

// Sections API
export const sectionAPI = {
  async getAllSections() {
    try {
      const response = await fetch(`${API_URL}/sections`)
      if (!response.ok) throw new Error('Failed to fetch sections')
      return await response.json()
    } catch (error) {
      console.error('Error fetching sections:', error)
      throw error
    }
  },

  async createSection(section) {
    try {
      const response = await fetch(`${API_URL}/sections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(section)
      })
      if (!response.ok) throw new Error('Failed to create section')
      return await response.json()
    } catch (error) {
      console.error('Error creating section:', error)
      throw error
    }
  }
}
