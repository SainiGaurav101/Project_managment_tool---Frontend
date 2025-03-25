import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import MemberDashboard from "./pages/MemberDashboard";
import KanbanBoard from "./pages/KanbanBoard";
import ProjectDetails from "./pages/ProjectDetails"; 
import UserDetails from "./pages/UserDetails";
import ProtectedRoute from "./components/ProtectedRoute"; // Import the ProtectedRoute component

function App() {
  const user = JSON.parse(sessionStorage.getItem("user"));

  return (
    <Routes>
      {/* Default Route: If user is not logged in, go to login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Login Route */}
      <Route path="/login" element={<Login />} />

      {/* Register Route (Only accessible to Admins) */}
      <Route path="/register" element={<ProtectedRoute element={<Register />} role="admin" />} />

      {/* Protected Route for Dashboard */}
      <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />

      {/* Role-based Dashboard Routes */}
      {/* <Route path="/admin-dashboard" element={<ProtectedRoute element={<AdminDashboard />} />} />
      <Route path="/manager-dashboard" element={<ProtectedRoute element={<ManagerDashboard />} />} />
      <Route path="/member-dashboard" element={<ProtectedRoute element={<MemberDashboard />} />} /> */}


      <Route path="/admin-dashboard" element={<ProtectedRoute element={<AdminDashboard />} allowedRoles={["ADMIN"]} />} />
      <Route path="/manager-dashboard" element={<ProtectedRoute element={<ManagerDashboard />} allowedRoles={["ADMIN", "MANAGER"]} />} />
      <Route path="/member-dashboard" element={<ProtectedRoute element={<MemberDashboard />} allowedRoles={["MEMBER"]} />} />

{/* This is for the for the lockup field for to get all the information ok */}
      <Route
  path="/project/:id"
  element={<ProtectedRoute element={<ProjectDetails />} allowedRoles={["ADMIN", "MANAGER", "MEMBER"]} />}
/>
{/* Add this inside the <Routes> component */}
<Route path="/user/:id" element={<ProtectedRoute element={<UserDetails />} allowedRoles={["ADMIN", "MANAGER", "MEMBER"]} />} />


 {/* Kanban Board Route: Only Assigned Users Can Access */}
 <Route path="/kanban/:id" element={<ProtectedRoute element={<KanbanBoard />} allowedRoles={["ADMIN", "MANAGER", "MEMBER"]} />} />


      {/* Unauthorized Access Page */}
      <Route path="/unauthorized" element={<h2>Unauthorized Access</h2>} />

      {/* Fallback for Undefined Routes */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default App;
