import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PQRSPage from './pages/PQRSPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import AzurePage from './pages/AzurePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/azure" element={<AzurePage />} />
        <Route path="/pqrs" element={<PQRSPage />} />
        <Route path="/politica-privacidad" element={<PrivacyPolicyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
