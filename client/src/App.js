import React from 'react';
import NavBar from './components/navbar';
import Signup from './Signup';
import Login from './Login';
import About from './About';
import Home from './Home';
import Forgetpass from './ForgetPass';
import { BrowserRouter as Router, Route ,Routes} from 'react-router-dom';
import './App.css';

export default function App() {
  const jwtToken = localStorage.getItem('token');
  
  return (
   <>
      <NavBar jwtToken={jwtToken}/>
      <Router>
        <Routes>
        <Route exact path='/forpass' element={<Forgetpass/>}/>
          <Route exact path='/' element={<Home jwtToken={jwtToken}/>} />
          <Route exact path='/about' element={<About/>} />
          <Route exact path='/signup' element={<Signup/>} />
          <Route exact path='/login' element={<Login />} />
      
        </Routes>
      </Router>
   </>
  );
}


