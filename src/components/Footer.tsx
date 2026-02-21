import { Link, useLocation } from 'react-router-dom'
import { Mail, Phone, MapPin } from 'lucide-react'
import './Footer.css'

const Footer = () => {
  const location = useLocation()

  const handleCountriesClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (location.pathname === '/') {
      e.preventDefault()
      document.getElementById('countries')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <img src="/immisure-logo.png" alt="Immisure" className="footer-logo" />
          <p className="footer-description">
            Your trusted partner for work permit immigration across multiple countries.
            We ensure on-time visa processing with professional guidance.
          </p>
        </div>

        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><a href="/#countries" onClick={handleCountriesClick}>Countries</a></li>
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
