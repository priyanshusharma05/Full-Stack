import './Landing.css'

function Landing({ onGetStarted }) {
  return (
    <div className="landing-container">
      {/* Header */}
      <header className="landing-header">
        <div className="header-content">
          <h1 className="logo">📚 Student Management System</h1>
          <button onClick={onGetStarted} className="btn-get-started">
            Get Started
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h2>Manage Student Records Efficiently</h2>
          <p>A comprehensive platform to track student information, manage academic results, and organize sections seamlessly</p>
          <button onClick={onGetStarted} className="btn-primary btn-large">
            Start Now
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Student Management</h3>
            <p>Add, edit, and manage student records with ease. Organize students by sections and track their information.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Results Tracking</h3>
            <p>Record and manage student results. Automatic grade calculation based on marks and percentage.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🏫</div>
            <h3>Section Organization</h3>
            <p>Organize students into sections. Create new sections on the fly as needed.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔐</div>
            <h3>Secure Access</h3>
            <p>User authentication with secure sign-in and sign-up. Your data is protected and personalized.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">💾</div>
            <h3>Data Persistence</h3>
            <p>All your data is saved securely. Access your records anytime, anywhere.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🎨</div>
            <h3>User Friendly</h3>
            <p>Intuitive interface designed for simplicity and efficiency. No technical knowledge required.</p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Sign Up</h3>
            <p>Create your account with your email and password</p>
          </div>
          
          <div className="step">
            <div className="step-number">2</div>
            <h3>Add Students</h3>
            <p>Add student information and organize them into sections</p>
          </div>
          
          <div className="step">
            <div className="step-number">3</div>
            <h3>Record Results</h3>
            <p>Add and manage student examination results</p>
          </div>
          
          <div className="step">
            <div className="step-number">4</div>
            <h3>Track Progress</h3>
            <p>Monitor and view student grades and performance</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to Get Started?</h2>
        <p>Join now and streamline your student management process</p>
        <button onClick={onGetStarted} className="btn-primary btn-large">
          Access Your Dashboard
        </button>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-content">
          <p>&copy; 2025 Student Management System. All rights reserved.</p>
          <p>Designed for efficient academic record management</p>
        </div>
      </footer>
    </div>
  )
}

export default Landing
