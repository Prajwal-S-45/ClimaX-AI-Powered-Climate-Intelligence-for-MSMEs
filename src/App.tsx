import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ClimateProvider } from './context/ClimateContext';
import { AppLayout } from './layouts/AppLayout';
import { LandingPage } from './pages/LandingPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { DashboardPage } from './pages/DashboardPage';
import { ClimateRiskPage } from './pages/ClimateRiskPage';
import { InterventionsPage } from './pages/InterventionsPage';
import { SimulatorPage } from './pages/SimulatorPage';
import { PassportPage } from './pages/PassportPage';
import { ImpactPage } from './pages/ImpactPage';
import { VerificationPage } from './pages/VerificationPage';

export const App: React.FC = () => {
  return (
    <ClimateProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<LandingPage />} />
            <Route path="onboarding" element={<OnboardingPage />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="climate-risk" element={<ClimateRiskPage />} />
            <Route path="interventions" element={<InterventionsPage />} />
            <Route path="simulator" element={<SimulatorPage />} />
            <Route path="passport" element={<PassportPage />} />
            <Route path="impact" element={<ImpactPage />} />
            <Route path="verify/:passportId" element={<VerificationPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ClimateProvider>
  );
};

export default App;

