import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import LandingPage from './pages/LandingPage';
import PQRSPage from './pages/PQRSPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/pqrs" element={<PQRSPage />} />
          <Route path="/politica-privacidad" element={<PrivacyPolicyPage />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;
