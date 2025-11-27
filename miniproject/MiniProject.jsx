import { useState, useEffect } from 'react'
import { studentAPI, resultAPI, sectionAPI } from './apiService'
import StudentForm from './components/StudentForm'
import StudentList from './components/StudentList'
import ResultForm from './components/ResultForm'
import ResultList from './components/ResultList'
import Auth from './Auth'
import Landing from './Landing'
import './MiniProject.css'

function MiniProject() {
  const [showLanding, setShowLanding] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [activeTab, setActiveTab] = useState('students')
  const [students, setStudents] = useState([])
  const [results, setResults] = useState([])
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Check if user is already logged in
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn')
    const email = localStorage.getItem('userEmail')
    if (loggedIn === 'true' && email) {
      setIsLoggedIn(true)
      setUserEmail(email)
      setShowLanding(false)
      loadInitialData()
    }
  }, [])

  // Load data on mount
  useEffect(() => {
    if (isLoggedIn) {
      loadInitialData()
    }
  }, [isLoggedIn])

  const loadInitialData = async () => {
    setLoading(true)
    setError('')
    try {
      const [studentsData, resultsData, sectionsData] = await Promise.all([
        studentAPI.getAllStudents(),
        resultAPI.getAllResults(),
        sectionAPI.getAllSections()
      ])
      console.log('📥 Loaded data:')
      console.log('Students:', studentsData)
      console.log('Results:', resultsData)
      setStudents(studentsData)
      setResults(resultsData)
      setSections(sectionsData)
    } catch (err) {
      setError('Failed to load data. Make sure JSON Server is running.')
      console.error('❌ Load error:', err)
    } finally {
      setLoading(false)
    }
  }

  // Student CRUD operations
  const handleAddStudent = async (student) => {
    try {
      const newStudent = await studentAPI.createStudent(student)
      setStudents([...students, newStudent])
      setError('')
    } catch (err) {
      setError('Failed to add student')
    }
  }

  const handleUpdateStudent = async (id, student) => {
    try {
      console.log('📝 Updating student:', id, student)
      await studentAPI.updateStudent(id, student)
      setStudents(students.map(s => s.id == id ? student : s))
      setError('')
    } catch (err) {
      console.error('Error:', err)
      setError(`Failed to update student: ${err.message}`)
    }
  }

  const handleDeleteStudent = async (id) => {
    try {
      console.log('🗑️ Deleting student:', id)
      await studentAPI.deleteStudent(id)
      setStudents(students.filter(s => s.id != id))
      setResults(results.filter(r => r.studentId != id))
      setError('')
    } catch (err) {
      console.error('Error:', err)
      setError(`Failed to delete student: ${err.message}`)
    }
  }

  // Result CRUD operations
  const handleAddResult = async (result) => {
    try {
      const newResult = await resultAPI.createResult(result)
      setResults([...results, newResult])
      setError('')
    } catch (err) {
      setError('Failed to add result')
    }
  }

  const handleUpdateResult = async (id, result) => {
    try {
      console.log('📝 Updating result:', id, result)
      await resultAPI.updateResult(id, result)
      setResults(results.map(r => r.id == id ? result : r))
      setError('')
    } catch (err) {
      console.error('Error:', err)
      setError(`Failed to update result: ${err.message}`)
    }
  }

  const handleDeleteResult = async (id) => {
    try {
      console.log('🗑️ Deleting result:', id)
      const response = await resultAPI.deleteResult(id)
      console.log('Delete successful:', response)
      setResults(results.filter(r => r.id != id))
      setError('')
    } catch (err) {
      console.error('Error:', err)
      setError(`Failed to delete result: ${err.message}`)
    }
  }

  const handleAddSection = async (sectionName) => {
    try {
      const newSection = await sectionAPI.createSection({ sectionName })
      setSections([...sections, newSection])
      setError('')
    } catch (err) {
      console.error('Error:', err)
      setError(`Failed to add section: ${err.message}`)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userEmail')
    setIsLoggedIn(false)
    setUserEmail('')
    setStudents([])
    setResults([])
    setSections([])
    setShowLanding(true)
  }

  const handleLoginSuccess = (email) => {
    setIsLoggedIn(true)
    setUserEmail(email)
    setShowLanding(false)
  }

  const handleGetStarted = () => {
    setShowLanding(false)
  }

  // Show Landing page first
  if (showLanding) {
    return <Landing onGetStarted={handleGetStarted} />
  }

  // Show Auth page if not logged in
  if (!isLoggedIn) {
    return <Auth onLoginSuccess={handleLoginSuccess} />
  }

  return (
    <div className="miniproject">
      <div className="header">
        <div className="header-content">
          <h1>📚 Student Result Management System</h1>
          <div className="user-info">
            <span>👤 {userEmail}</span>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </div>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'students' ? 'active' : ''}`}
          onClick={() => setActiveTab('students')}
        >
          Students
        </button>
        <button 
          className={`tab ${activeTab === 'results' ? 'active' : ''}`}
          onClick={() => setActiveTab('results')}
        >
          Results
        </button>
      </div>

      <div className="content">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            {activeTab === 'students' && (
              <div className="tab-content">
                <h2>Manage Students</h2>
                <StudentForm onAdd={handleAddStudent} sections={sections} onAddSection={handleAddSection} />
                <StudentList 
                  students={students}
                  onUpdate={handleUpdateStudent}
                  onDelete={handleDeleteStudent}
                  sections={sections}
                />
              </div>
            )}

            {activeTab === 'results' && (
              <div className="tab-content">
                <h2>Manage Results</h2>
                <ResultForm onAdd={handleAddResult} students={students} />
                <ResultList 
                  results={results}
                  students={students}
                  onUpdate={handleUpdateResult}
                  onDelete={handleDeleteResult}
                />
              </div>
            )}
          </>
        )}
      </div>

      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 Student Management System. All rights reserved.</p>
          <p>Designed for efficient academic record management</p>
        </div>
      </footer>
    </div>
  )
}

export default MiniProject
