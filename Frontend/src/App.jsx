import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { EventProvider } from './context/EventContext';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home/Home';
import Events from './pages/Events/Events';
import EventDetails from './pages/EventDetails/EventDetails';
import Auth from './pages/Auth/Auth';
import Dashboard from './pages/Dashboard/Dashboard';
import ScrollToTop from './components/ui/ScrollToTop';
import LightPillar from './components/ui/LightPillar';
import './index.css';

function App() {
  return (
    <AuthProvider>
      <EventProvider>
        {/* Global Background */}
        <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
          <LightPillar
            topColor="#4923e1"
            bottomColor="#9efff4"
            intensity={1}
            rotationSpeed={5}
            glowAmount={0.004}
            pillarWidth={3}
            pillarHeight={1}
            noiseIntensity={0.5}
            pillarRotation={86}
            interactive={false}
            mixBlendMode="screen"
            quality="medium"
          />
        </div>
        <Router>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="events" element={<Events />} />
              <Route path="events/:id" element={<EventDetails />} />
              <Route path="auth" element={<Auth />} />
              <Route path="dashboard" element={<Dashboard />} />

              {/* Fallback */}
              <Route path="*" element={<div style={{ padding: '4rem', textAlign: 'center' }}>Page Not Found</div>} />
            </Route>
          </Routes>
        </Router>
      </EventProvider>
    </AuthProvider>
  );
}

export default App;
