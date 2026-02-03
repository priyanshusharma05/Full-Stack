import { useState } from 'react'

function StudentList({ students, onUpdate, onDelete, sections }) {
  const [editingId, setEditingId] = useState(null)
  const [editData, setEditData] = useState({})

  const handleEditStart = (student) => {
    setEditingId(student.id)
    setEditData(student)
  }

  const handleEditChange = (e) => {
    const { name, value } = e.target
    setEditData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleEditSave = (id) => {
    console.log('Saving student with ID:', id, 'Data:', editData)
    onUpdate(id, editData)
    setEditingId(null)
  }

  const handleEditCancel = () => {
    setEditingId(null)
  }

  return (
    <div className="list-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Section</th>
            <th>Roll Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan="4" className="empty-message">No students found</td>
            </tr>
          ) : (
            students.map(student => (
              <tr key={student.id}>
                {editingId === student.id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="name"
                        value={editData.name}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <select name="section" value={editData.section} onChange={handleEditChange}>
                        {sections.map(section => (
                          <option key={section.id} value={section.sectionName}>
                            {section.sectionName}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        name="rollNumber"
                        value={editData.rollNumber}
                        onChange={handleEditChange}
                      />
                    </td>
                    <td>
                      <button 
                        className="btn btn-success btn-small"
                        onClick={() => handleEditSave(student.id)}
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
                    <td>{student.name}</td>
                    <td>{student.section}</td>
                    <td>{student.rollNumber}</td>
                    <td>
                      <button 
                        className="btn btn-warning btn-small"
                        onClick={() => handleEditStart(student)}
                      >
                        Edit
                      </button>
                      <button 
                        className="btn btn-danger btn-small"
                        onClick={() => onDelete(student.id)}
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

export default StudentList
