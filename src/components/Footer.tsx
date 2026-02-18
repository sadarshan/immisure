import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3 className="footer-title">Immisure</h3>
          <p className="footer-description">
            Your trusted partner for Slovakia work permit immigration services.
            We ensure on-time visa processing with professional guidance.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/jobs">Available Jobs</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Contact</h4>
          <ul className="footer-contact">
            <li>
              <Phone size={18} />
              <span>+421 XXX XXX XXX</span>
            </li>
            <li>
              <Mail size={18} />
              <span>info@immisure.com</span>
            </li>
            <li>
              <MapPin size={18} />
              <span>Slovakia</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 Immisure. All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
