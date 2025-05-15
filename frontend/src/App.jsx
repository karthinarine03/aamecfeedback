import { BrowserRouter as Router, Route, Routes,useLocation } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import Header from './Header'
import Home from './home'
import Subjectlist from './subjectList';
import Questionspage from './question_page';
import Footer from './footer';
import Dashboard from './dashboard';
import RegisterStudent from './components/RegisterStudent';
function Layout() {

  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/staff/dashboard');

  if (isDashboard) {
    // Render dashboard route only, with no other layout
    return (
      <Routes>
        <Route path='/staff/dashboard' element={<Dashboard />} />
      </Routes>
    );
  }

  // Default layout
  return (
    <>
      <Header />
      <div className='backgrounds'>
      <div className='title'>
          <h1>STUDENT FEEDBACK FORM</h1>
      </div>
      <div className="home_page">
      <div className='form_regs'>
      <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/lists' element={<Subjectlist />} />
          <Route path='/feedback/:code/:subname' element={<Questionspage />} />
          <Route path='/feedback/register' element={<RegisterStudent />} />
      </Routes>

      </div>
      </div>
      </div>
      <Footer />
      </>
  )
}
function App() {
  

  return (
    <Router>
      <Layout />
    </Router>
  )
}

export default App


