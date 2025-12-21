import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { EventProvider } from './pages/EventContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardStudent from './pages/DashboardStudent';
import DashboardAdmin from './pages/DashboardAdmin';
import StudentRegistration from './pages/StudentRegistration';
import Complaints from './pages/Complaints';
import ManageEvents from './pages/ManageEvents';
import StudentProfile from './pages/StudentProfile';
import SkillExchangeAdmin from './pages/SkillExchangeAdmin';
import SkillExchangeStudent from './pages/SkillExchangeStudent';
import PollManagement from './pages/PollManagement';
import StudentPolls from './pages/StudentPolls';
import NotFound from './pages/NotFound';
import Timetable from './pages/Timetable'; // ✅ Import this statically
import { ThemeProvider } from '@mui/material/styles';
import ErrorBoundary from './components/ErrorBoundary';
import theme from './theme';
import StudentLayout from './components/StudentLayout';
import AdminLayout from './components/AdminLayout';

// ---------- Protected Routes ----------
const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  if (!user) return <Navigate to="/login" replace />;
  const { role } = JSON.parse(user);
  return role === 'student' ? children : <Navigate to="/dashboard/admin" replace />;
};

const AdminRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  if (!user) return <Navigate to="/login" replace />;
  const { role } = JSON.parse(user);
  return role === 'admin' ? children : <Navigate to="/dashboard/student" replace />;
};

// ---------- App Component ----------
// ---------- App Component ----------

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <EventProvider>
          <Router>
            <div className="app">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />

                {/* Student Routes with Layout */}
                <Route path="/dashboard/student" element={
                  <PrivateRoute>
                    <StudentLayout>
                      <DashboardStudent />
                    </StudentLayout>
                  </PrivateRoute>
                } />
                <Route path="/dashboard/student/profile" element={
                  <PrivateRoute>
                    <StudentLayout>
                      <StudentProfile />
                    </StudentLayout>
                  </PrivateRoute>
                } />
                <Route path="/skill-exchange" element={
                  <PrivateRoute>
                    <StudentLayout>
                      <SkillExchangeStudent />
                    </StudentLayout>
                  </PrivateRoute>
                } />
                <Route path="/polls" element={
                  <PrivateRoute>
                    <StudentLayout>
                      <StudentPolls />
                    </StudentLayout>
                  </PrivateRoute>
                } />
                <Route path="/timetable" element={
                  <PrivateRoute>
                    <StudentLayout>
                      <Timetable />
                    </StudentLayout>
                  </PrivateRoute>
                } />
                <Route path="/complaints" element={
                  <PrivateRoute>
                    <StudentLayout>
                      <Complaints />
                    </StudentLayout>
                  </PrivateRoute>
                } />



                {/* Admin Routes with Layout */}
                <Route path="/dashboard/admin" element={
                  <AdminRoute>
                    <AdminLayout>
                      <DashboardAdmin />
                    </AdminLayout>
                  </AdminRoute>
                } />
                <Route path="/dashboard/admin/student-registration" element={
                  <AdminRoute>
                    <AdminLayout>
                      <StudentRegistration />
                    </AdminLayout>
                  </AdminRoute>
                } />
                <Route path="/events" element={
                  <AdminRoute>
                    <AdminLayout>
                      <ManageEvents />
                    </AdminLayout>
                  </AdminRoute>
                } />
                <Route path="/complaints/admin" element={
                  <AdminRoute>
                    <AdminLayout>
                      <Complaints />
                    </AdminLayout>
                  </AdminRoute>
                } />
                <Route path="/skill-exchange/admin" element={
                  <AdminRoute>
                    <AdminLayout>
                      <SkillExchangeAdmin />
                    </AdminLayout>
                  </AdminRoute>
                } />
                <Route path="/polls/admin" element={
                  <AdminRoute>
                    <AdminLayout>
                      <PollManagement />
                    </AdminLayout>
                  </AdminRoute>
                } />

                {/* 404 Page */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Router>
        </EventProvider>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default App;
