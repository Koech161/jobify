
import { Route,BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Job from './components/Job';
import Home from './components/Home';
import NavBar from './components/NavBar';

function App() {
  return (
   <Router>
    <div>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/jobs' element={<Job/>} />
      </Routes>
    </div>
   </Router>
  );
}

export default App;
