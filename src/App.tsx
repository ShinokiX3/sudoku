import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/main/MainLayout';
import Main from './pages/main/Main';

import './App.css';
import Tips from './pages/tips/Tips';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainLayout />}> 
          <Route path='' element={<Main />} />
          <Route path='tips' element={<Tips />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
