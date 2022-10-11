import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/main/MainLayout';
import Main from '../pages/main/Main';

import './App.scss';
import Tips from '../pages/tips/Tips';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<MainLayout />}> 
          <Route path='' element={<Main />} />
          <Route path='event' element={<Main />} />
          <Route path='awards' element={<Main />} />
          <Route path='rules' element={<Main />} />
          <Route path='tips' element={<Main />} />
          <Route path='*' element={<Main />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
