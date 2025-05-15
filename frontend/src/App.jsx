
import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import RegisterStudent from './components/RegisterStudent'
import SubmitReview from './components/SubmitReview'
import { Toaster, toast } from 'react-hot-toast'
import SubjectsList from './components/SubjectsList'
function App() {

  return(
    <Router>
      <div>
        <Toaster/>
        <main>
        <div className='backgrounds'>
        <div className='home_page'>
        <div className='form_regs'>
            <Routes>
              <Route path='/'element={<RegisterStudent/>}/>
              <Route path='/submitReview/:id'element={<SubmitReview/>}/>
              <Route path='/subjectList/:id'element={<SubjectsList/>}/>

            </Routes>
          </div>
        </div>
        </div>
        </main>
      </div>
    </Router>
  )
}

export default App
