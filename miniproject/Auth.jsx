import { useState } from 'react'
import { userAPI } from './userAPI'
import './Auth.css'

function Auth({ onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSignIn = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      if (!formData.email || !formData.password) {
        setError('Email and password are required')
        setLoading(false)
        return
      }

      if (!validateEmail(formData.email)) {
        setError('Please enter a valid email')
        setLoading(false)
        return
      }

      // Check if user exists in database
      console.log('🔍 Checking user...')
      const user = await userAPI.getUserByEmail(formData.email)
      
      if (!user) {
        setError('User not found. Please sign up first.')
        setLoading(false)
        return
      }

      // Verify password
      if (user.password !== formData.password) {
        setError('Incorrect password')
        setLoading(false)
        return
      }

      console.log('✅ Sign In successful for:', formData.email)
      setSuccess('Successfully signed in!')
      setTimeout(() => {
        // Store user data
        localStorage.setItem('userEmail', formData.email)
        localStorage.setItem('userId', user.id)
        localStorage.setItem('isLoggedIn', 'true')
        if (onLoginSuccess) {
          onLoginSuccess(formData.email)
        }
      }, 1000)
    } catch (err) {
      console.error('Sign in error:', err)
      setError('Sign in failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
        setError('All fields are required')
        setLoading(false)
        return
      }

      if (!validateEmail(formData.email)) {
        setError('Please enter a valid email')
        setLoading(false)
        return
      }

      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters')
        setLoading(false)
        return
      }

      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match')
        setLoading(false)
        return
      }

      // Check if user already exists
      console.log('🔍 Checking if user exists...')
      const existingUser = await userAPI.getUserByEmail(formData.email)
      if (existingUser) {
        setError('This email is already registered. Please sign in instead.')
        setLoading(false)
        return
      }

      // Create new user
      console.log('📝 Creating new user...')
      const newUser = await userAPI.createUser({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        createdAt: new Date().toISOString().split('T')[0],
        id: Date.now()
      })

      console.log('✅ User created successfully:', newUser)
      setSuccess('Account created successfully! Please sign in.')
      setTimeout(() => {
        setIsSignUp(false)
        setFormData({ email: '', password: '', confirmPassword: '', fullName: '' })
      }, 1500)
    } catch (err) {
      console.error('Sign up error:', err)
      setError('Sign up failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleToggle = () => {
    setError('')
    setSuccess('')
    setFormData({ email: '', password: '', confirmPassword: '', fullName: '' })
    setIsSignUp(!isSignUp)
  }

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h1 className="system-title">📚 Student Management System</h1>
      </div>
      <div className="auth-card">
        <h1>{isSignUp ? 'Create Account' : 'Sign In'}</h1>
        
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <form onSubmit={isSignUp ? handleSignUp : handleSignIn}>
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
          </div>

          {isSignUp && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
              />
            </div>
          )}

          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Loading...' : (isSignUp ? 'Create Account' : 'Sign In')}
          </button>
        </form>

        <div className="auth-toggle">
          <p>
            {isSignUp ? 'Already have an account?' : "Don't have an account?"}
            <button type="button" onClick={handleToggle} className="toggle-btn">
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Auth
