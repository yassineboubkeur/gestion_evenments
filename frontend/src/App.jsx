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

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/logout" element={<Logout />} /> {/* Add this route */}

          {/* Admin routes - requires admin role */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin/*" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              {/* Add more admin routes here */}
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
              </Route>
            </Route>
          </Route>

          {/* Participant routes - requires participant role */}
          <Route element={<ProtectedRoute allowedRoles={['participant']} />}>
            <Route path="/participant/*" element={<ParticipantLayout />}>
              <Route path="dashboard" element={<ParticipantDashboard />} />
              {/* Add more participant routes here */}
            </Route>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;

// // src/App.jsx
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import RegisterForm from './components/Register';
// import LoginForm from './components/Login';
// import AdminLayout from './components/layouts/AdminLayout';
// import OrganizerLayout from './components/layouts/OrganizerLayout';
// import ParticipantLayout from './components/layouts/ParticipantLayout';
// import ProtectedRoute from './components/ProtectedRoute';
// import HomePage from './components/HomePage';
// import Unauthorized from './components/Unauthorized';
// import AdminDashboard from './components/Dashboard/AdminDashboard';
// import ManageEvents from './components/Events/ManageEvents';
// import OrganizerDashboard from './components/Dashboard/OrganizerDashboard';
// import OrganizerEvents from './components/Events/OrganizerEvents';
// import ParticipantDashboard from './components/Dashboard/ParticipantDashboard';
// import BrowseEvents from './components/Events/BrowseEvents';
// import MyEvents from './components/Events/MyEvents';

// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           {/* Public routes */}
//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<LoginForm />} />
//           <Route path="/register" element={<RegisterForm />} />
//           <Route path="/unauthorized" element={<Unauthorized />} />

//           {/* Admin routes */}
//           <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
//             <Route path="/admin/*" element={<AdminLayout />}>
//               <Route path="dashboard" element={<AdminDashboard />} />
//               {/* <Route path="users" element={<ManageUsers />} /> */}
//               <Route path="events" element={<ManageEvents />} />
//             </Route>
//           </Route>

//           {/* Organizer routes */}
//           <Route element={<ProtectedRoute allowedRoles={['organizer']} />}>
//             <Route path="/organizer/*" element={<OrganizerLayout />}>
//               <Route path="dashboard" element={<OrganizerDashboard />} />
//               <Route path="events" element={<OrganizerEvents />} />
//               {/* <Route path="create-event" element={<CreateEvens />} /> */}
//             </Route>
//           </Route>

//           {/* Participant routes */}
//           <Route element={<ProtectedRoute allowedRoles={['participant']} />}>
//             <Route path="/participant/*" element={<ParticipantLayout />}>
//               <Route path="dashboard" element={<ParticipantDashboard />} />
//               <Route path="events" element={<BrowseEvents />} />
//               <Route path="my-events" element={<MyEvents />} />
//             </Route>
//           </Route>
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;