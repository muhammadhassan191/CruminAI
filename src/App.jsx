import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import LeadSearch from './pages/LeadSearch';
import CRM from './pages/CRM';

// Placeholder components for other pages
const ICPMatcher = () => <div className="card"><h2>AI ICP Matcher</h2><p>Find matches with Gemini AI based on your natural language description.</p></div>;
const CreditsPage = () => <div className="card"><h2>Credits & Billing</h2><p>Manage your account balance and reveal history.</p></div>;
const SettingsPage = () => <div className="card"><h2>Settings</h2><p>System configuration and API integrations.</p></div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="search" element={<LeadSearch />} />
          <Route path="crm" element={<CRM />} />
          <Route path="ai-matcher" element={<ICPMatcher />} />
          <Route path="credits" element={<CreditsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
