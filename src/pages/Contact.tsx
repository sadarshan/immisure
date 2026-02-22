import { Link } from 'react-router-dom'
import { ArrowLeft, Mail, Phone, MapPin } from 'lucide-react'
import './Contact.css'

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="container">
        <Link to="/" className="contact-back-link">
          <ArrowLeft size={20} />
          Back to Home
        </Link>

        <div className="contact-header">
          <h1 className="contact-title">Contact Us</h1>
          <p className="contact-intro">
            Get in touch for work permit and immigration support. We’re here to help with your next step.
          </p>
        </div>

        <div className="contact-cards">
          <a href="tel:+917048222509" className="contact-card">
            <div className="contact-card-icon">
              <Phone size={28} aria-hidden />
            </div>
            <h2 className="contact-card-title">Phone</h2>
            <p className="contact-card-value">+917048222509</p>
            <span className="contact-card-hint">Tap to call</span>
          </a>

          <a href="mailto:support@immisure.in" className="contact-card">
            <div className="contact-card-icon">
              <Mail size={28} aria-hidden />
            </div>
            <h2 className="contact-card-title">Email</h2>
            <p className="contact-card-value">support@immisure.in</p>
            <span className="contact-card-hint">Tap to email</span>
          </a>

          <div className="contact-card contact-card-static">
            <div className="contact-card-icon">
              <MapPin size={28} aria-hidden />
            </div>
            <h2 className="contact-card-title">Location</h2>
            <p className="contact-card-value">1st Floor Sheenath Complex, Near Reliance Petrol Pump Bokhira, Porbandar- 360575</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
