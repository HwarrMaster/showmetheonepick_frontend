import React, { useEffect } from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';

import MainPage from 'pages/MainPage';
import EvaluatePage from 'pages/EvaluatePage';
import OnePickPage from 'pages/OnePick';
import ResultPage from 'pages/ResultPage';

function App() {
  function appHeight() {
    const doc = document.documentElement
    doc.style.setProperty('--app-height', `${window.innerHeight}px`)
  }

  useEffect(() => {
    window.addEventListener('resize', appHeight)
    appHeight();
  }, []);

  return (
    <React.Fragment>
      <Router>
        <Routes>
          <Route path="" element={<MainPage />} />
          <Route path="/evaluate" element={<EvaluatePage />} />
          <Route path="/onepick" element={<OnePickPage />} />
          <Route path="/result" element={<ResultPage />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
