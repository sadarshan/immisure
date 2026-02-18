import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Clock, Shield, Users } from 'lucide-react'
import './Home.css'

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Slovakia Work Permit
              <span className="highlight"> Made Simple</span>
            </h1>
            <p className="hero-subtitle">
              Professional immigration consultancy services for Slovakia work permits.
              On-time processing guaranteed for Factory, Warehouse, Agriculture, and more.
            </p>
            <div className="hero-cta">
              <Link to="/jobs" className="btn btn-primary">
                View Available Jobs
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-illustration">
              <div className="illustration-circle circle-1"></div>
              <div className="illustration-circle circle-2"></div>
              <div className="illustration-circle circle-3"></div>
              <div className="illustration-icon">✈️</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Immisure?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Clock className="icon" />
              </div>
              <h3>On-Time Processing</h3>
              <p>We guarantee timely visa processing with efficient documentation handling.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Shield className="icon" />
              </div>
              <h3>Expert Guidance</h3>
              <p>Professional consultants with years of experience in Slovakia immigration.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <CheckCircle className="icon" />
              </div>
              <h3>Verified Employers</h3>
              <p>All job opportunities are from verified and trusted employers in Slovakia.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Users className="icon" />
              </div>
              <h3>End-to-End Support</h3>
              <p>Complete assistance from application to visa approval and relocation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Job Categories Section */}
      <section className="categories">
        <div className="container">
          <h2 className="section-title">Job Categories</h2>
          <div className="categories-grid">
            <div className="category-card">
              <div className="category-icon">🏭</div>
              <h3>Factory Workers</h3>
              <p>Manufacturing positions with competitive wages</p>
            </div>
            <div className="category-card">
              <div className="category-icon">📦</div>
              <h3>Warehouse Workers</h3>
              <p>Logistics and distribution opportunities</p>
            </div>
            <div className="category-card">
              <div className="category-icon">🏠</div>
              <h3>House Cleaners</h3>
              <p>Domestic service positions</p>
            </div>
            <div className="category-card">
              <div className="category-icon">🌾</div>
              <h3>Agriculture</h3>
              <p>Farming and agricultural work</p>
            </div>
          </div>
          <div className="categories-cta">
            <Link to="/jobs" className="btn btn-secondary">
              Explore All Jobs
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Journey?</h2>
            <p>Check available work and apply today</p>
            <Link to="/jobs" className="btn btn-primary btn-large">
              View Available Jobs
              <ArrowRight size={24} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
