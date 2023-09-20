import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import LevelList from './LevelList';
import LevelEdit from './LevelEdit';
import Login from './Login';
import './App.css';

const App = () => {
  return (
      <Router>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path='/levels' exact={true} element={<LevelList/>}/>
          <Route path='/levels/:id' element={<LevelEdit/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </Router>
  )
}

export default App;