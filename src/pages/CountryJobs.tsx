import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, ArrowRight, Clock, CalendarDays, Banknote, ChevronDown, ChevronUp } from 'lucide-react'
import { getCountryBySlug } from '../data/countries'
import type { Job } from '../data/countries'
import './Jobs.css'

const JobCard = ({ job, countrySlug }: { job: Job; countrySlug: string }) => {
  const wage = `${job.currency} ${job.wagePerMonth.toLocaleString()}/month`

  return (
    <Link to={`/countries/${countrySlug}/jobs/${job.id}`} className="job-card">
      <div className="job-card-header">
        <div className="job-icon">{job.icon}</div>
        <div className="job-status">
          {job.available ? (
            <span className="badge badge-available">
              <CheckCircle size={16} />
              Available
            </span>
          ) : (
            <span className="badge badge-unavailable">
              <XCircle size={16} />
              Unavailable
            </span>
          )}
        </div>
      </div>
      <div className="job-card-body">
        <h3 className="job-title">{job.title}</h3>
        <p className="job-category">{job.category}</p>
        <p className="job-description">{job.description}</p>
        <div className="job-meta">
          <div className="job-meta-item">
            <CalendarDays size={16} />
            <span className="job-meta-label">Contract:</span>
            <span className="job-meta-value">{job.contractDuration}</span>
          </div>
          <div className="job-meta-item">
            <Clock size={16} />
            <span className="job-meta-label">Hours/day:</span>
            <span className="job-meta-value">{job.workHoursPerDay}</span>
          </div>
          <div className="job-meta-item">
            <Banknote size={16} />
            <span className="job-meta-label">Wage:</span>
            <span className="job-meta-value">{wage}</span>
          </div>
        </div>
        {job.note && (
          <p className="job-card-note">
            Note: {job.note}
          </p>
        )}
      </div>
      <div className="job-card-footer">
        <span className="job-link">
          View Details
          <ArrowRight size={18} />
        </span>
      </div>
    </Link>
  )
}

const CountryJobs = () => {
  const { countrySlug } = useParams<{ countrySlug: string }>()
  const country = countrySlug ? getCountryBySlug(countrySlug) : undefined
  const [showUnavailable, setShowUnavailable] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const scrollToAvailable = () => {
      const el = document.getElementById('available')
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    if (window.location.hash === '#available') {
      scrollToAvailable()
    }
  }, [countrySlug])

  if (!country) {
    return <Navigate to="/" replace />
  }

  const availableJobs = country.jobs.filter((j) => j.available)
  const unavailableJobs = country.jobs.filter((j) => !j.available)

  return (
    <div className="jobs-page">
      <div className="jobs-hero jobs-hero-country">
        <div className="jobs-hero-bg" style={{ backgroundImage: `url(${country.image})` }} />
        <div className="container jobs-hero-inner">
          <Link to="/" className="jobs-back-country">
            ← Back to countries
          </Link>
          <h1 className="jobs-title">Work in {country.name}</h1>
          <p className="jobs-subtitle">
            {country.description} All positions come with work permit assistance.
          </p>
        </div>
      </div>

      <div className="container">
        {availableJobs.length > 0 && (
          <section id="available" className="jobs-section jobs-section-available">
            <div className="section-header">
              <h2 className="section-title">
                <CheckCircle className="section-icon available" />
                Available Positions ({availableJobs.length})
              </h2>
            </div>
            <div className="jobs-grid">
              {availableJobs.map((job) => (
                <JobCard key={job.id} job={job} countrySlug={country.slug} />
              ))}
            </div>
          </section>
        )}

        {unavailableJobs.length > 0 && (
          <section className="jobs-section jobs-section-unavailable">
            <button
              type="button"
              className="unavailable-toggle"
              onClick={() => setShowUnavailable((v) => !v)}
              aria-expanded={showUnavailable}
            >
              <XCircle className="section-icon unavailable" />
              Currently Unavailable ({unavailableJobs.length})
              {showUnavailable ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
            {showUnavailable && (
              <>
                <p className="section-description">
                  These positions are currently filled. Check back later for new openings.
                </p>
                <div className="jobs-grid">
                  {unavailableJobs.map((job) => (
                    <JobCard key={job.id} job={job} countrySlug={country.slug} />
                  ))}
                </div>
              </>
            )}
          </section>
        )}
      </div>
    </div>
  )
}

export default CountryJobs
