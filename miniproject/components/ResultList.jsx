import { useState } from 'react'
import { Result } from '../models'

function ResultList({ results, students, onUpdate, onDelete }) {
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({})

  const getStudentName = (studentId) => {
    console.log('Looking for student ID:', studentId, 'Students array:', students)
    // Try both direct match and string conversion
    const student = students.find(s => {
      return s.id == studentId || String(s.id) === String(studentId)
    })
    if (student) {
      return `${student.name} (${student.rollNumber})`
    }
    console.warn('Student not found for ID:', studentId)
    return 'Unknown'
  }

  const handleEditStart = (result) => {
    setEditingId(result.id)
    setEditData(result)
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditData(prev => ({
      ...prev,
      [name]: name === 'studentId' ? String(value) :
              ['marks', 'totalMarks'].includes(name) ? parseFloat(value) : value
    }))
  }

  const handleEditSave = (id) => {
    onUpdate(id, editData)
    setEditingId(null)
  }

  const handleEditCancel = () => {
    setEditingId(null)
  }

  const getGrade = (marks, totalMarks) => {
    const percentage = (marks / totalMarks) * 100
    if (percentage >= 90) return 'O'
    if (percentage >= 80) return 'A+'
    if (percentage >= 70) return 'A'
    if (percentage >= 60) return 'B+'
    if (percentage >= 50) return 'B'
    if (percentage >= 40) return 'C'
    return 'F'
  }

  const getPercentage = (marks, totalMarks) => {
    return ((marks / totalMarks) * 100).toFixed(2)
  }

  return (
    <div className="list-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Subject</th>
            <th>Marks</th>
            <th>Total</th>
            <th>Percentage</th>
            <th>Grade</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {results.length === 0 ? (
            <tr>
              <td colSpan="7" className="empty-message">No results found</td>
            </tr>
          ) : (
            results.map(result => (
              <tr key={result.id}>
                {editingId === result.id ? (
                  <>
                    <td>
                      <select 
                        name="studentId" 
                        value={editData.studentId} 
                        onChange={handleEditChange}
                      >
                        {students.map(student => (
                          <option key={student.id} value={student.id}>
                            {student.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="text"
                        name="subject"
                        value={editData.subject}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="marks"
                        value={editData.marks}
                        onChange={handleEditChange}
                        step="0.5"
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        name="totalMarks"
                        value={editData.totalMarks}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>{getPercentage(editData.marks, editData.totalMarks)}%</td>
                    <td>{getGrade(editData.marks, editData.totalMarks)}</td>
                    <td>
                      <button 
                        className="btn btn-success btn-small"
                        onClick={() => handleEditSave(result.id)}
                      >
                        Save
                      </button>
                      <button 
                        className="btn btn-secondary btn-small"
                        onClick={handleEditCancel}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{getStudentName(result.studentId)}</td>
                    <td>{result.subject}</td>
                    <td>{result.marks}</td>
                    <td>{result.totalMarks}</td>
                    <td>{getPercentage(result.marks, result.totalMarks)}%</td>
                    <td className={`grade-${getGrade(result.marks, result.totalMarks)}`}>
                      {getGrade(result.marks, result.totalMarks)}
                    </td>
                    <td>
                      <button 
                        className="btn btn-warning btn-small"
                        onClick={() => handleEditStart(result)}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn btn-danger btn-small"
                        onClick={() => {
                          console.log('Deleting result with ID:', result.id)
                          onDelete(result.id)
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default ResultList
