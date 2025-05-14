// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterForm from './components/Register';
import LoginForm from './components/Login';
import AdminLayout from './components/layouts/AdminLayout';
import OrganizerLayout from './components/layouts/OrganizerLayout';
import ParticipantLayout from './components/layouts/ParticipantLayout';
import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './components/HomePage';
import Unauthorized from './components/Unauthorized';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import OrganizerDashboard from './components/Dashboard/OrganizerDashboard';
import ParticipantDashboard from './components/Dashboard/ParticipantDashboard';
import Logout from './components/Logout';
import EventForm from './components/Events/EventForm';
import OrganizerEventsList from './components/Events/OrganizerEventsList';
import EventDetails from './components/EventDetails';
import ContactForm from './components/Contact';
import BookingConfirmation from './components/BookingConfirmation';
import UsersList from './components/UsersList';
import EventsList from './components/EventsList';
import NotificationToast from './components/NotificationToast';
import StatsRegistration from './components/StatsRegistration';
import ParticipantEvents from './components/Dashboard/ParticipantEvents';
// import NotificationToast from './components/NotificationToast';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/events/:id" element={<EventDetails />} /> */}

          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/logout" element={<Logout />} /> {/* Add this route */}
          {/* <Route path="contact" element={<ContactForm />} /> */}

          {/* Admin routes - requires admin role */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin/*" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<UsersList />} />
              <Route path="events" element={<EventsList />} />


            </Route>
          </Route>

          {/* Organizer routes - requires organizer role */}
          <Route element={<ProtectedRoute allowedRoles={['organizer']} />}>
            <Route path="/organizer" element={<OrganizerLayout />}>
              <Route index element={<OrganizerDashboard />} />
              <Route path="dashboard" element={<OrganizerDashboard />} />
              <Route path="events">
                <Route index element={<OrganizerEventsList />} />
                <Route path="create" element={<EventForm />} />
                <Route path=":id/edit" element={<EventForm />} />
                <Route path="organizer_stats_registration" element={<StatsRegistration />} />

              </Route>
            </Route>
          </Route>

          {/* Participant routes - requires participant role */}
          <Route element={<ProtectedRoute allowedRoles={['participant']} />}>
            <Route path="/participant/*" element={<ParticipantLayout />}>
              <Route path="dashboard" element={<ParticipantDashboard />} />
              <Route path="my-events" element={<ParticipantEvents />} />
              {/* Add more participant routes here */}
            </Route>
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />

          </Route>

          <Route path='contact' element={<ContactForm/>}></Route>

        </Routes>

      </div>
      <NotificationToast/>
    </Router>
  );
}

export default App;

