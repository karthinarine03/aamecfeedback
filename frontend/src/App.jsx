
import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import RegisterStudent from './components/RegisterStudent'
import SubmitReview from './components/SubmitReview'
function App() {

  return(
    <Router>
      <div>
        <main>
          <div className='container'>
            <Routes>
              <Route path='/'element={<RegisterStudent/>}/>
              <Route path='/submitReview/:id'element={<SubmitReview/>}/>

            </Routes>
          </div>
        </main>
      </div>
    </Router>
  )
}

export default App
