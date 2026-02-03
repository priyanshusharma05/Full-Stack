import { useState } from 'react'
import { Result } from '../models'

function ResultForm({ onAdd, students }) {
  const [formData, setFormData] = useState({
    studentId: '',
    subject: '',
    marks: '',
    totalMarks: 100
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formData.studentId && formData.subject && formData.marks && formData.totalMarks) {
      const result = new Result(
        Date.now(),
        parseInt(formData.studentId),
        formData.subject,
        parseFloat(formData.marks),
        parseFloat(formData.totalMarks)
      )
      onAdd(result)
      setFormData({ studentId: '', subject: '', marks: '', totalMarks: 100 })
    } else {
      alert('Please fill all fields')
    }
  }

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="result-form">
        <div className="form-group">
          <label>Student:</label>
          <select name="studentId" value={formData.studentId} onChange={handleChange}>
            <option value="">Select Student</option>
            {students.map(student => (
              <option key={student.id} value={student.id}>
                {student.name} ({student.rollNumber})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Subject:</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Enter subject name"
          />
        </div>

        <div className="form-group">
          <label>Marks Obtained:</label>
          <input
            type="number"
            name="marks"
            value={formData.marks}
            onChange={handleChange}
            placeholder="Enter marks"
            step="0.5"
          />
        </div>

        <div className="form-group">
          <label>Total Marks:</label>
          <input
            type="number"
            name="totalMarks"
            value={formData.totalMarks}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Result
        </button>
      </form>
    </div>
  )
}

export default ResultForm
