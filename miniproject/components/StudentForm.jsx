import { useState } from 'react'

function StudentForm({ onAdd, sections, onAddSection }) {
  const [formData, setFormData] = useState({
    name: '',
    section: '',
    rollNumber: ''
  })
  const [showNewSectionInput, setShowNewSectionInput] = useState(false)
  const [newSectionName, setNewSectionName] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSectionChange = (e) => {
    const value = e.target.value
    if (value === 'CREATE_NEW') {
      setShowNewSectionInput(true)
    } else {
      setFormData(prev => ({
        ...prev,
        section: value
      }))
      setShowNewSectionInput(false)
    }
  }

  const handleCreateSection = () => {
    if (newSectionName.trim()) {
      onAddSection(newSectionName)
      setFormData(prev => ({
        ...prev,
        section: newSectionName
      }))
      setNewSectionName('')
      setShowNewSectionInput(false)
    } else {
      alert('Please enter a section name')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.name && formData.section && formData.rollNumber) {
      onAdd({
        ...formData,
        id: Date.now()
      })
      setFormData({ name: '', section: '', rollNumber: '' })
    } else {
      alert('Please fill all fields')
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="student-form">
        <div className="form-group">
          <label>Student Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter student name"
          />
        </div>

        <div className="form-group">
          <label>Section:</label>
          {showNewSectionInput ? (
            <div className="new-section-input">
              <input
                type="text"
                value={newSectionName}
                onChange={(e) => setNewSectionName(e.target.value)}
                placeholder="Enter new section name"
              />
              <button type="button" onClick={handleCreateSection} className="btn btn-small">
                Add Section
              </button>
              <button 
                type="button" 
                onClick={() => setShowNewSectionInput(false)} 
                className="btn btn-small btn-cancel"
              >
                Cancel
              </button>
            </div>
          ) : (
            <select name="section" value={formData.section} onChange={handleSectionChange}>
              <option value="">Select Section</option>
              {sections.map(section => (
                <option key={section.id} value={section.sectionName}>
                  {section.sectionName}
                </option>
              ))}
              <option value="CREATE_NEW">+ Create New Section</option>
            </select>
          )}
        </div>

        <div className="form-group">
          <label>Roll Number:</label>
          <input
            type="number"
            name="rollNumber"
            value={formData.rollNumber}
            onChange={handleChange}
            placeholder="Enter roll number"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Student
        </button>
      </form>
    </div>
  )
}

export default StudentForm
