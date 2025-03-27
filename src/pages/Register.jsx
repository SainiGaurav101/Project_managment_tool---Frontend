// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("member"); // Default role
//   const [error, setError] = useState(null);
//   const [success, setSuccess] = useState(null);
//   const navigate = useNavigate();

//   // Check if the user is an admin before allowing access
//   useEffect(() => {
//     const user = JSON.parse(sessionStorage.getItem("user"));
//     if (!user || user.role !== "admin") {
//       navigate("/unauthorized"); // Redirect unauthorized users
//     }
//   }, [navigate]);

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError(null);
//     setSuccess(null);

//     if (!name || !email || !password) {
//       setError("All fields are required");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/api/auth/register",
//         { name, email, password, role },
//         { withCredentials: true } // Enable session cookies
//       );

//       setSuccess("Registration successful! Redirecting to login...");
//       setTimeout(() => navigate("/login"), 2000);
//     } catch (error) {
//       setError(error.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center h-screen bg-gray-100">
//       <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold text-center mb-4">Register New User</h2>
//         {error && <p className="text-red-500 text-sm text-center">{error}</p>}
//         {success && <p className="text-green-500 text-sm text-center">{success}</p>}
        
//         <form onSubmit={handleRegister}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium">Name</label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full p-2 border rounded-md"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium">Email</label>
//             <input
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-2 border rounded-md"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium">Password</label>
//             <input
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-2 border rounded-md"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block text-sm font-medium">Role</label>
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="w-full p-2 border rounded-md"
//             >
//               <option value="manager">Manager</option>
//               <option value="member">Member</option>
//             </select>
//           </div>

//           <button type="submit" className="w-full bg-green-500 text-white p-2 rounded-md">
//             Register
//           </button>
//         </form>

//         <p className="mt-2 text-sm text-center">
//           <a href="/admin-dashboard" className="text-blue-500">Back to Dashboard</a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { FaUserShield } from "react-icons/fa";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👀 Toggle state for password visibility
  const [role, setRole] = useState("member");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/unauthorized");
    }
  }, [navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    const emailPattern = /^[a-zA-Z0-9._%+-]+@knoqlogico\.com$/;
    if (!emailPattern.test(email)) {
      setError("Only @knoqlogico.com emails are allowed.");
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/auth/register", { name, email, password, role }, { withCredentials: true });
      setSuccess("Registration successful! ");
      // setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 px-4">
      <div className="w-full max-w-lg p-8 bg-white rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register New User</h2>
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm text-center mb-4">{success}</p>}
        
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-gray-500" />
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-gray-500" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 pl-10 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-500" />
            <input
              type={showPassword ? "text" : "password"} // 👀 Toggle between "text" & "password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pl-10 pr-12 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500 focus:outline-none"
            >
              {showPassword ? <FiEyeOff className="text-lg" /> : <FiEye className="text-lg" />}
            </button>
          </div>
          <div className="relative">
            <FaUserShield className="absolute left-3 top-3 text-gray-500" />
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 pl-10 border rounded-lg bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
            >
              <option value="manager">Manager</option>
              <option value="member">Member</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300">
            Register
          </button>
        </form>
        <p className="mt-4 text-sm text-center text-gray-600">
          <a href="/admin-dashboard" className="text-blue-500 hover:underline">Back to Dashboard</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
