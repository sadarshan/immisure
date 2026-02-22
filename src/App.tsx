import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Contact from './pages/Contact'
import CountryJobs from './pages/CountryJobs'
import JobDetail from './pages/JobDetail'
import './App.css'

function RedirectJobToSlovakia() {
  const { id } = useParams<{ id: string }>()
  return <Navigate to={id ? `/countries/slovakia/jobs/${id}` : '/countries/slovakia'} replace />
}

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/countries/:countrySlug" element={<CountryJobs />} />
            <Route path="/countries/:countrySlug/jobs/:jobId" element={<JobDetail />} />
            <Route path="/jobs" element={<Navigate to="/countries/slovakia" replace />} />
            <Route path="/jobs/:id" element={<RedirectJobToSlovakia />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
