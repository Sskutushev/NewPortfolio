import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ThemeAwareHeader from './components/ThemeAwareHeader/ThemeAwareHeader';
import './styles/globals.css';

// Lazy load pages
const MainPage = lazy(() => import('./pages/MainPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));

function AppWrapper() {
  return (
    <Router>
      <div className="App">
        <ThemeAwareHeader />
        <main id="main-content">
          <Routes>
            <Route path="/" element={
              <Suspense fallback={<div className="loading">Loading...</div>}>
                <MainPage />
              </Suspense>
            } />
            <Route path="/portfolio" element={
              <Suspense fallback={<div className="loading">Loading...</div>}>
                <PortfolioPage />
              </Suspense>
            } />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default AppWrapper;