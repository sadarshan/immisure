import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import './Header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <img src="/immisure-logo.png" alt="Immisure" className="logo-img" />
        </Link>
        
        <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`}>
          <Link 
            to="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <a 
            href="/#countries" 
            className={`nav-link ${location.pathname.startsWith('/countries') ? 'active' : ''}`}
            onClick={(e) => {
              setIsMenuOpen(false)
              if (location.pathname === '/') {
                e.preventDefault()
                document.getElementById('countries')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }
            }}
          >
            Countries
          </a>
          <Link 
            to="/contact" 
            className={`nav-link ${isActive('/contact') ? 'active' : ''}`}
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </nav>

        <button 
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  )
}

export default Header
