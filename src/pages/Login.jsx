// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

 


//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");
  
//     try {
//       const response = await axios.post("http://localhost:5000/api/auth/login", 
//         { email, password }, 
//         { withCredentials: true }
//       );
  
//       if (response.data) {
//         console.log("Login Success:", response.data);
  
//         // ✅ Ensure profile_picture has the correct path
//         const updatedUser = {
//           ...response.data.user,
//           profile_picture: response.data.user.profile_picture
//             ? `http://localhost:5000/uploads/${response.data.user.profile_picture}`
//             : "http://localhost:5000/uploads/default-profile.png",
//         };
  
//         // ✅ Store updated user in sessionStorage
//         sessionStorage.setItem("user", JSON.stringify(updatedUser));
  
//         // ✅ Redirect based on role
//         if (updatedUser.role === "admin") {
//           navigate("/admin-dashboard");
//         } else if (updatedUser.role === "manager") {
//           navigate("/manager-dashboard");
//         } else {
//           navigate("/member-dashboard");
//         }
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//     }
//   };
  



//   const handleLogout = () => {
//     sessionStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
//       <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
//         <h2 className="text-xl font-bold mb-4">Login</h2>
//         {error && <p className="text-red-500">{error}</p>}
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-2 mb-2 border rounded"
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 mb-2 border rounded"
//         />
//         <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
//           Login
//         </button>
//         {/* <p className="mt-2 text-sm text-center">
//           New user? <a href="/register" className="text-blue-500">Register here</a>
//         </p> */}
//         {/* <button onClick={handleLogout} className="w-full bg-red-500 text-white p-2 mt-2 rounded">
//           Logout
//         </button> */}
//       </form>
//     </div>
//   );
// }

// export default Login;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaSignInAlt } from "react-icons/fa";
import LoginImage from "../assets/images/Login_page.jpg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      if (response.data) {
        console.log("Login Success:", response.data);

        const updatedUser = {
          ...response.data.user,
          profile_picture: response.data.user.profile_picture
            ? `http://localhost:5000/uploads/${response.data.user.profile_picture}`
            : "http://localhost:5000/uploads/default-profile.png",
        };

        sessionStorage.setItem("user", JSON.stringify(updatedUser));

        if (updatedUser.role === "admin") {
          navigate("/admin-dashboard");
        } else if (updatedUser.role === "manager") {
          navigate("/manager-dashboard");
        } else {
          navigate("/member-dashboard");
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-200 p-4">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-2xl overflow-hidden w-full max-w-4xl">
        {/* Left Side: Image */}
        <div className="hidden md:block w-1/2">
          <img src={LoginImage} alt="Login Illustration" className="w-full h-full object-cover" />
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
          <h1 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 bg-clip-text text-transparent text-center">
            Project Management Tool
          </h1>

          <h2 className="text-xl md:text-2xl font-semibold mb-2 text-gray-700 text-center mt-4">Welcome Back</h2>
          <p className="text-gray-500 text-center mb-6">Login to access your projects</p>

          {error && <p className="text-red-500 text-center bg-red-100 p-2 rounded-md">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-4 md:space-y-5">
            {/* Email Input */}
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 pl-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 pl-12 pr-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg cursor-pointer"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Login Button */}
            <div className="flex justify-center">
              <button type="submit" className="w-full md:w-auto px-10 py-3 bg-blue-500 text-white rounded-lg flex items-center justify-center gap-3 hover:bg-blue-600 transition duration-300 shadow-lg transform hover:scale-105 cursor-pointer">
                Login
                <FaSignInAlt />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
