
import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import RegisterStudent from './components/RegisterStudent'
import SubmitReview from './components/SubmitReview'
import { Toaster, toast } from 'react-hot-toast'
import SubjectsList from './components/SubjectsList'

import Onestaffreview from './components/Onestaffreview'
function App() {

  return(
    <Router>
      <div>
        <Toaster/>
        <main>
        <div className='container '>
          <div className=''>
            <Routes>
              <Route path='/'element={<RegisterStudent/>}/>
              <Route path='/submitReview/:id'element={<SubmitReview/>}/>
              <Route path='/subjectList/:id'element={<SubjectsList/>}/>
        
              <Route path="/onestaff-reviews" element={<Onestaffreview />} />
            </Routes>
          </div>
        </div>

        </main>
      </div>
    </Router>
  )
}

export default App
