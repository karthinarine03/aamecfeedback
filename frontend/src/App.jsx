
import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import RegisterStudent from './components/RegisterStudent'
import SubmitReview from './components/SubmitReview'
import { Toaster, toast } from 'react-hot-toast'
import SubjectsList from './components/SubjectsList'
import Header from './layout/Header'
import Onestaffreview from './components/Onestaffreview'
import Footer from './layout/Footer'
function App() {

  return(
    <Router>
      <div className='background'>
        <Toaster/>
        <Header/>
        <main>
        <div className='container '>
          <div className='row'>
            <Routes>
              <Route path='/'element={<RegisterStudent/>}/>
              <Route path='/submitReview/:id'element={<SubmitReview/>}/>
              <Route path='/subjectList/:id'element={<SubjectsList/>}/>
        
              <Route path="/onestaff-reviews" element={<Onestaffreview />} />
            </Routes>
          </div>
        </div>

        </main>
        <Footer/>
      </div>
    </Router>
  )
}

export default App
