import { Link } from 'react-router-dom'
import { CheckCircle, XCircle, ArrowRight, Clock, CalendarDays, Banknote } from 'lucide-react'
import { jobs } from '../data/jobs'
import './Jobs.css'

const Jobs = () => {
  const availableJobs = jobs.filter(job => job.available)
  const unavailableJobs = jobs.filter(job => !job.available)

  return (
    <div className="jobs-page">
      <div className="jobs-hero">
        <div className="container">
          <h1 className="jobs-title">Available Job Positions</h1>
          <p className="jobs-subtitle">
            Explore work opportunities in Slovakia. All positions come with work permit assistance.
          </p>
        </div>
      </div>

      <div className="container">
        {/* Available Jobs */}
        {availableJobs.length > 0 && (
          <section className="jobs-section">
            <div className="section-header">
              <h2 className="section-title">
                <CheckCircle className="section-icon available" />
                Available Positions ({availableJobs.length})
              </h2>
            </div>
            <div className="jobs-grid">
              {availableJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </section>
        )}

        {/* Unavailable Jobs */}
        {unavailableJobs.length > 0 && (
          <section className="jobs-section">
            <div className="section-header">
              <h2 className="section-title">
                <XCircle className="section-icon unavailable" />
                Currently Unavailable ({unavailableJobs.length})
              </h2>
              <p className="section-description">
                These positions are currently filled. Check back later for new openings.
              </p>
            </div>
            <div className="jobs-grid">
              {unavailableJobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}

const JobCard = ({ job }: { job: typeof jobs[0] }) => {
  const wage = `${job.currency} ${job.wagePerMonth.toLocaleString()}/month`

  return (
    <Link to={`/jobs/${job.id}`} className="job-card">
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

export default Jobs
