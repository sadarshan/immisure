import { useParams, Link, Navigate } from 'react-router-dom'
import { ArrowLeft, CheckCircle, XCircle, Calendar, FileText } from 'lucide-react'
import { getJobById } from '../data/jobs'
import './JobDetail.css'

const JobDetail = () => {
  const { id } = useParams<{ id: string }>()
  const job = id ? getJobById(id) : undefined

  if (!job) {
    return <Navigate to="/jobs" replace />
  }

  return (
    <div className="job-detail-page">
      <div className="container">
        <Link to="/jobs" className="back-link">
          <ArrowLeft size={20} />
          Back to Jobs
        </Link>

        <div className="job-detail-header">
          <div className="job-detail-icon">{job.icon}</div>
          <div className="job-detail-info">
            <div className="job-detail-meta">
              <span className="job-category-badge">{job.category}</span>
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
            <h1 className="job-detail-title">{job.title}</h1>
            <p className="job-detail-description">{job.description}</p>
          </div>
        </div>

        {job.available ? (
          <>
            <div className="job-detail-content">
              <div className="job-detail-main">
                <section className="detail-section">
                  <h2 className="section-heading">
                    <FileText className="section-heading-icon" />
                    Job Requirements
                  </h2>
                  <ul className="requirements-list">
                    {job.requirements.map((req, index) => (
                      <li key={index} className="requirement-item">
                        <CheckCircle className="requirement-icon" size={20} />
                        {req}
                      </li>
                    ))}
                  </ul>
                </section>

                <section className="detail-section">
                  <h2 className="section-heading">
                    <Calendar className="section-heading-icon" />
                    Application Process
                  </h2>
                  <div className="process-steps">
                    <div className="process-step">
                      <div className="step-number">1</div>
                      <div className="step-content">
                        <h3>Fill Application Form</h3>
                        <p>Complete the immigration details form below</p>
                      </div>
                    </div>
                    <div className="process-step">
                      <div className="step-number">2</div>
                      <div className="step-content">
                        <h3>Document Review</h3>
                        <p>Our team will review your application</p>
                      </div>
                    </div>
                    <div className="process-step">
                      <div className="step-number">3</div>
                      <div className="step-content">
                        <h3>Work Permit Processing</h3>
                        <p>We handle all visa and permit documentation</p>
                      </div>
                    </div>
                    <div className="process-step">
                      <div className="step-number">4</div>
                      <div className="step-content">
                        <h3>Approval & Relocation</h3>
                        <p>Receive your permit and start your journey</p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>

              <div className="job-detail-sidebar">
                <div className="application-box">
                  <h3 className="application-title">Apply Now</h3>
                  <p className="application-description">
                    Fill out the form below to start your Slovakia work permit application.
                    Our team will contact you within 24 hours.
                  </p>
                  <div className="form-container">
                    <iframe
                      src={job.googleFormUrl}
                      width="100%"
                      height="800"
                      frameBorder="0"
                      marginHeight={0}
                      marginWidth={0}
                      title={`Application form for ${job.title}`}
                      className="google-form"
                    >
                      Loading…
                    </iframe>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="unavailable-message">
            <XCircle className="unavailable-icon" size={64} />
            <h2>This Position is Currently Unavailable</h2>
            <p>
              This job position is currently filled. Please check back later for new openings,
              or explore other available positions.
            </p>
            <Link to="/jobs" className="btn btn-primary">
              View Other Jobs
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default JobDetail
