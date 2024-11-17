import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentCanceled from './pages/PaymentCanceled';
import HomePage from './pages/Home';
import { AuthProvider } from './hooks/useAuth';
import Layout from './components/Layout';
import ProtectedLayout from './components/ProtectedLayout';
import Loading from './components/ui/Loading';

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="payment-success" element={<PaymentSuccess />} />
            <Route path="payment-canceled" element={<PaymentCanceled />} />
          </Route>
          <Route path="/dashboard" element={<ProtectedLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="productivity" element={<Dashboard activeCategory="productivity" />} />
            <Route path="marketing" element={<Dashboard activeCategory="marketing" />} />
            <Route path="business" element={<Dashboard activeCategory="business" />} />
            <Route path="creativity" element={<Dashboard activeCategory="creativity" />} />
            <Route path="analytics" element={<Dashboard activeCategory="analytics" />} />
            <Route path="tech" element={<Dashboard activeCategory="tech" />} />
            <Route path="settings" element={<Dashboard activeCategory="settings" />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </AuthProvider>
  );
}

export default App;