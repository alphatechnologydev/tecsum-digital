import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import DirectorDashboard from './pages/DirectorDashboard';
import CoordinacionDashboard from './pages/CoordinacionDashboard';
import ControlEscolarDashboard from './pages/ControlEscolarDashboard';
import PublicidadDashboard from './pages/PublicidadDashboard';
import CajaDashboard from './pages/CajaDashboard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected — Director */}
          <Route
            path="/director"
            element={
              <ProtectedRoute allowedRoles={['Director']}>
                <DirectorDashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected — Coordinación */}
          <Route
            path="/coordinacion"
            element={
              <ProtectedRoute allowedRoles={['Coordinación']}>
                <CoordinacionDashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected — Control Escolar */}
          <Route
            path="/control-escolar"
            element={
              <ProtectedRoute allowedRoles={['Control Escolar']}>
                <ControlEscolarDashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected — Publicidad */}
          <Route
            path="/publicidad"
            element={
              <ProtectedRoute allowedRoles={['Publicidad']}>
                <PublicidadDashboard />
              </ProtectedRoute>
            }
          />

          {/* Protected — Caja */}
          <Route
            path="/caja"
            element={
              <ProtectedRoute allowedRoles={['Caja']}>
                <CajaDashboard />
              </ProtectedRoute>
            }
          />

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
