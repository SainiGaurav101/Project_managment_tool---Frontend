// import { useState, useEffect } from "react";
// import axios from "axios";

// const MemberDashboard = () => {
//     const [projects, setProjects] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");

//     useEffect(() => {
//         const fetchProjects = async () => {
//             try {
//                 const response = await axios.get("http://localhost:5000/api/projects/assigned-projects", {
//                     withCredentials: true // Ensures cookies are sent for session-based auth
//                 });
//                 setProjects(response.data.projects);
//             } catch (err) {
//                 setError("Failed to fetch assigned projects.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProjects();
//     }, []);

//     return (
//         <div className="p-6 max-w-4xl mx-auto">
//             <h2 className="text-2xl font-bold mb-4">Assigned Projects</h2>

//             {loading && <p>Loading projects...</p>}
//             {error && <p className="text-red-500">{error}</p>}

//             {!loading && projects.length === 0 && <p>No assigned projects found.</p>}

//             {!loading && projects.length > 0 && (
//                 <table className="w-full border-collapse border border-gray-300">
//                     <thead>
//                         <tr className="bg-gray-100">
//                             <th className="border p-2">Project ID</th>
//                             <th className="border p-2">Project Name</th>
//                             <th className="border p-2">Created By</th>
//                             <th className="border p-2">Company</th>
//                             <th className="border p-2">Deadline</th>
//                             {/* <th className="border p-2">Status</th> */}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {projects.map((project) => (
//                             <tr key={project.id} className="text-center border-t">
//                                 <td className="border p-2">{project.id}</td>
//                                 <td className="border p-2">{project.project_name}</td>
//                                 <td className="border p-2">{project.created_by_name}</td>
//                                 <td className="border p-2">{project.company_name}</td>
//                                 <td className="border p-2">{new Date(project.deadline).toLocaleDateString()}</td>
//                                 {/* <td className="border p-2">
//                                     <span className={`px-2 py-1 rounded-full ${project.status === "active" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>
//                                         {project.status}
//                                     </span>
//                                 </td> */}
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// };

// export default MemberDashboard;

// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // ✅ Import navigation
// import axios from "axios";

// const MemberDashboard = () => {
//     const [projects, setProjects] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState("");
//     const navigate = useNavigate(); // ✅ Initialize navigation

//     useEffect(() => {
//         const fetchProjects = async () => {
//             try {
//                 const response = await axios.get("http://localhost:5000/api/projects/assigned-projects", {
//                     withCredentials: true // Ensures cookies are sent for session-based auth
//                 });
//                 setProjects(response.data.projects);
//             } catch (err) {
//                 setError("Failed to fetch assigned projects.");
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProjects();
//     }, []);

//     // ✅ Navigate to project details
//     const handleProjectClick = (projectId) => {
//         navigate(`/project/${projectId}`);
//     };

//     // ✅ Navigate to Kanban Board
//     const handleKanbanClick = (projectId) => {
//         navigate(`/kanban/${projectId}`);
//     };


//     const [user, setUser] = useState(null);
//     const [selectedFile, setSelectedFile] = useState(null);
  
//     // ✅ Function to fetch user data from session storage
//     useEffect(() => {
//       const userData = sessionStorage.getItem("user");
//       if (userData) {
//         setUser(JSON.parse(userData));
//       }
//     }, []);
  
//     // ✅ Handle file selection
//     const handleFileChange = (event) => {
//       const file = event.target.files[0];
//       if (file) {
//         setSelectedFile(file);
//       }
//     };
  
//     // ✅ Handle file upload
//     const handleFileUpload = async () => {
//       if (!selectedFile) {
//         console.error("No file selected");
//         return;
//       }
  
//       const formData = new FormData();
//       formData.append("profile_picture", selectedFile);
  
//       try {
//         const response = await fetch("http://localhost:5000/api/users/upload-profile", {
//           method: "POST",
//           body: formData,
//           credentials: "include",
//         });
  
//         if (!response.ok) {
//           throw new Error("Upload failed");
//         }
  
//         const data = await response.json();
//         console.log("Upload successful:", data);
  
//         // ✅ Update session storage with the new profile picture URL
//         const newProfilePicture = `http://localhost:5000${data.profile_picture}`;
  
//         const updatedUser = {
//           ...user,
//           profile_picture: newProfilePicture,
//         };
  
//         sessionStorage.setItem("user", JSON.stringify(updatedUser));
  
//         // ✅ Force UI to update
//         setUser(updatedUser);
//       } catch (error) {
//         console.error("Error uploading profile picture:", error);
//       }
//     };
  
//     if (!user) {
//       return <p>Loading user data...</p>;
//     }

    

//     return (
//         <div className="p-6 max-w-5xl mx-auto">

// <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">User Profile</h2>
      
//       {/* ✅ Display user profile picture */}
//       <img
//         className="w-20 h-20 rounded-full object-fill border-2 border-gray-200"
//         src={user.profile_picture ? `${user.profile_picture}?t=${new Date().getTime()}` : "http://localhost:5000/uploads/default-profile.png"}
//         alt="Profile"
//       />

//       {/* ✅ File input for image upload */}
//       <input type="file" onChange={handleFileChange} className="border text-bold mt-2" />

//       {/* ✅ Upload button */}
//       <button className="bg-green-500 text-white px-4 py-2 rounded mt-2" onClick={handleFileUpload}>
//         Upload
//       </button>

//       {/* ✅ Display user details */}
//       <p className="mt-4">Welcome, {user.name}!</p>
//       <p>Role: {user.role}</p>
//       <p>Email: {user.email}</p>
//     </div>
            
//             <h2 className="text-2xl font-bold mb-4">Assigned Projects</h2>

//             {loading && <p>Loading projects...</p>}
//             {error && <p className="text-red-500">{error}</p>}

//             {!loading && projects.length === 0 && <p>No assigned projects found.</p>}

//             {!loading && projects.length > 0 && (
//                 <table className="w-full border-collapse border border-gray-300">
//                     <thead>
//                         <tr className="bg-gray-100">
//                             <th className="border p-2">Project ID</th>
//                             <th className="border p-2">Project Name</th>
//                             <th className="border p-2">Created By</th>
//                             <th className="border p-2">Company</th>
//                             <th className="border p-2">Deadline</th>
//                             <th className="border p-2">Actions</th> {/* ✅ New Column for Kanban Button */}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {projects.map((project) => (
//                             <tr key={project.id} className="text-center border-t">
//                                 <td className="border p-2">{project.id}</td>
//                                 <td 
//                                     className="border p-2 text-blue-500 cursor-pointer hover:underline"
//                                     onClick={() => handleProjectClick(project.id)} // ✅ Clickable project name
//                                 >
//                                     {project.project_name}
//                                 </td>
//                                 <td className="border p-2">{project.created_by_name}</td>
//                                 <td className="border p-2">{project.company_name}</td>
//                                 <td className="border p-2">{new Date(project.deadline).toLocaleDateString()}</td>
//                                 <td className="border p-2">
//                                     <button 
//                                         className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
//                                         onClick={() => handleKanbanClick(project.id)} // ✅ Kanban Board Button
//                                     >
//                                         Go to Kanban Board
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// };

// export default MemberDashboard;



import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import navigation
import axios from "axios";
import { FaClipboardList  } from "react-icons/fa";

const MemberDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate(); // ✅ Initialize navigation

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/projects/assigned-projects", {
                    withCredentials: true // Ensures cookies are sent for session-based auth
                });
                setProjects(response.data.projects);
            } catch (err) {
                setError("Failed to fetch assigned projects.");
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // ✅ Navigate to project details
    const handleProjectClick = (projectId) => {
        navigate(`/project/${projectId}`);
    };

    // ✅ Navigate to Kanban Board
    const handleKanbanClick = (projectId) => {
        navigate(`/kanban/${projectId}`);
    };


    const [user, setUser] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
  
    // ✅ Function to fetch user data from session storage
    useEffect(() => {
      const userData = sessionStorage.getItem("user");
      if (userData) {
        setUser(JSON.parse(userData));
      }
    }, []);
  
    // ✅ Handle file selection
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setSelectedFile(file);
      }
    };
  
    // ✅ Handle file upload
    const handleFileUpload = async () => {
      if (!selectedFile) {
        console.error("No file selected");
        return;
      }
  
      const formData = new FormData();
      formData.append("profile_picture", selectedFile);
  
      try {
        const response = await fetch("http://localhost:5000/api/users/upload-profile", {
          method: "POST",
          body: formData,
          credentials: "include",
        });
  
        if (!response.ok) {
          throw new Error("Upload failed");
        }
  
        const data = await response.json();
        console.log("Upload successful:", data);
  
        // ✅ Update session storage with the new profile picture URL
        const newProfilePicture = `http://localhost:5000${data.profile_picture}`;
  
        const updatedUser = {
          ...user,
          profile_picture: newProfilePicture,
        };
  
        sessionStorage.setItem("user", JSON.stringify(updatedUser));
  
        // ✅ Force UI to update
        setUser(updatedUser);
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    };
  
    if (!user) {
      return <p>Loading user data...</p>;
    }
    
    return (
      <div className="flex flex-col md:flex-row h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-black text-white p-6 flex flex-col items-center shadow-lg md:fixed left-0 top-0 h-auto md:h-screen">
        <nav className="w-full flex flex-col items-center">
          {/* Profile Picture */}
          <img
            className="w-24 h-24 rounded-full border-2 border-gray-200 object-cover"
            src={
              user?.profile_picture
                ? `${user.profile_picture}?t=${new Date().getTime()}`
                : "http://localhost:5000/uploads/default-profile.png"
            }
            alt="Profile"
          />
          
          {/* Profile Upload Section */}
          <div className="w-full bg-gray-800 shadow-lg rounded-lg p-4 border mt-4 text-center">
            <input
              type="file"
              onChange={handleFileChange}
              className="p-1 border bg-gray-700 text-white rounded-lg cursor-pointer w-full"
            />
            <p className="text-sm text-gray-400 mt-1">SVG, PNG, JPG, or GIF (MAX. 800x400px).</p>
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded mt-2 w-full hover:bg-blue-500"
              onClick={handleFileUpload}
            >
              Upload
            </button>
          </div>

          {/* User Info */}
          <h3 className="mt-4 text-lg font-semibold">{user?.name || "Guest"}</h3>
          <p className="text-gray-400 text-sm">{user?.email || "No email provided"}</p>
          
          {/* Navigation Links */}
          <ul className="w-full mt-6 space-y-2 flex-1">
            {[{ name: "All Projects", key: "projects" }].map((item) => (
              <li
                key={item.key}
                className={`py-2 px-4 cursor-pointer text-center rounded-lg transition-all duration-200 ${activeTab === item.key ? "bg-gray-600" : "hover:bg-gray-700"}`}
                onClick={() => setActiveTab(item.key)}
              >
                {item.name}
              </li>
            ))}
            
            {/* Logout Button */}
            <li
              className="py-2 px-4 cursor-pointer text-center bg-red-600 text-white rounded-lg hover:bg-red-500 mt-4"
              onClick={() => navigate("/logout")}
            >
              Logout
            </li>
          </ul>
        </nav>
      </aside>
      
      {/* Main Content */}
      <div className="flex-1 p-2 md:p-6 md:ml-64">
  <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-center">Assigned Projects</h2>
  {loading && <p className="text-center text-sm sm:text-base">Loading projects...</p>}
  {error && <p className="text-red-500 text-center text-sm sm:text-base">{error}</p>}
  {!loading && projects.length === 0 && <p className="text-center text-sm sm:text-base">No assigned projects found.</p>}
  {!loading && projects.length > 0 && (
    <div className="overflow-x-auto">
      <table className="w-full bg-white border-collapse shadow-lg rounded-lg overflow-hidden text-xs sm:text-sm md:text-base">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="border p-1 sm:p-2">Project ID</th>
            <th className="border p-1 sm:p-2">Project Name</th>
            <th className="border p-1 sm:p-2">Created By</th>
            <th className="border p-1 sm:p-2">Company</th>
            <th className="border p-1 sm:p-2">Deadline</th>
            <th className="border p-1 sm:p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id} className="border-t hover:bg-gray-50">
              <td className="border p-1 sm:p-2 text-xs sm:text-sm">{project.id}</td>
              <td 
                className="border p-1 sm:p-2 text-blue-500 cursor-pointer hover:underline text-xs sm:text-sm"
                onClick={() => handleProjectClick(project.id)}
              >
                {project.project_name}
              </td>
              <td className="border p-1 sm:p-2 text-xs sm:text-sm">{project.created_by_name}</td>
              <td className="border p-1 sm:p-2 text-xs sm:text-sm">{project.company_name}</td>
              <td className="border p-1 sm:p-2 text-xs sm:text-sm">{new Date(project.deadline).toLocaleDateString()}</td>
              <td className="border p-1 sm:p-2">
                <button 
                  className="bg-blue-500 text-white px-2 sm:px-4 py-1 sm:py-2 rounded hover:bg-blue-600 transition text-lg sm:text-sm cursor-pointer"
                  onClick={() => handleKanbanClick(project.id)}
                >
               <FaClipboardList className="inline-block mr-1" />   View Board
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>

    </div>
    );
};

export default MemberDashboard;
