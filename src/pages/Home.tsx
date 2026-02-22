import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Clock, Shield, Users } from 'lucide-react'
import { countries } from '../data/countries'
import WorldMap from '../components/WorldMap'
import './Home.css'

const Home = () => {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#countries') {
      document.getElementById('countries')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              Work Permit Immigration
              <span className="highlight"> Made Simple</span>
            </h1>
            <p className="hero-subtitle">
              Professional immigration consultancy for work permits. On-time processing
              for Factory, Warehouse, Agriculture, Hospitality, and more across multiple countries.
            </p>
          </div>
          <div className="hero-image">
            <WorldMap />
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
              <p>Professional consultants with experience in international work permit immigration.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <CheckCircle className="icon" />
              </div>
              <h3>Verified Employers</h3>
              <p>All job opportunities are from verified and trusted employers.</p>
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

      {/* Countries Section */}
      <section id="countries" className="countries-section">
        <div className="container">
          <h2 className="section-title">Choose your dream work and destination</h2>
          <div className="countries-grid">
            {countries.map((country) => (
              <Link
                key={country.id}
                to={`/countries/${country.slug}#available`}
                className="country-card"
              >
                <div className="country-card-image-wrap">
                  <img
                    src={country.image}
                    alt={country.name}
                    className="country-card-image"
                    loading="lazy"
                    decoding="async"
                    width={480}
                    height={300}
                  />
                  <div className="country-card-overlay" />
                </div>
                <div className="country-card-content">
                  <h3 className="country-card-title">{country.name}</h3>
                  <p className="country-card-description">{country.description}</p>
                  <span className="country-card-link">
                    View jobs
                    <ArrowRight size={18} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Start Your Journey?</h2>
            <p>Check available work and apply today</p>
            <Link
              to="/#countries"
              className="btn btn-primary btn-large"
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  e.preventDefault()
                  document.getElementById('countries')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  window.history.replaceState(null, '', '/#countries')
                }
              }}
            >
              Explore Countries
              <ArrowRight size={24} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
