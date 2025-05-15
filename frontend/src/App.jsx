
import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import RegisterStudent from './components/RegisterStudent'
function App() {

  return(
    <Router>
      <div>
        <main>
          <div className='container'>
            <Routes>
              <Route path='/'element={<RegisterStudent/>}/>
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  )
}

export default App
