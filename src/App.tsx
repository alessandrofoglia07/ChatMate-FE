import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './pages/mainPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path='/' element={<MainPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
