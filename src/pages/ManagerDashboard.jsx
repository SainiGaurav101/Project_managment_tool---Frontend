// import { useEffect, useState } from "react";
// import axios from "axios";


// const ManagerDashboard = () => {
//   const [members, setMembers] = useState([]);
//   const [selectedMembers, setSelectedMembers] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [projectData, setProjectData] = useState({
//     project_name: "",
//     deadline: "",
//     status: "active",
//     company_name: "",
//   });
//   const [showForm, setShowForm] = useState(false);


//   useEffect(() => {
//     fetchMembers();
//     fetchProjects();
//   }, []);


//   const fetchMembers = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/users", {
//         withCredentials: true,
//       });
//       const filteredMembers = response.data.filter((user) => user.role === "member");
//       setMembers(filteredMembers);
//     } catch (error) {
//       console.error("Error fetching members:", error);
//     }
//   };


//   const fetchProjects = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/projects/my-projects", {
//         withCredentials: true,
//       });
//       setProjects(response.data.projects);
//     } catch (error) {
//       console.error("Error fetching projects:", error);
//     }
//   };


//   const handleChange = (e) => {
//     setProjectData({ ...projectData, [e.target.name]: e.target.value });
//   };


//   const handleMemberSelect = (id) => {
//     setSelectedMembers((prev) =>
//       prev.includes(id) ? prev.filter((memberId) => memberId !== id) : [...prev, id]
//     );
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newProject = {
//       ...projectData,
//       assigned_members: selectedMembers,
//     };
//     try {
//       await axios.post("http://localhost:5000/api/projects/", newProject, {
//         withCredentials: true,
//       });
//       alert("Project created successfully!");
//       setProjectData({ project_name: "", deadline: "", status: "active", company_name: "" });
//       setSelectedMembers([]);
//       setShowForm(false);
//       fetchProjects();
//     } catch (error) {
//       console.error("Error creating project:", error);
//       alert("Failed to create project.");
//     }
//   };


//   return (
//     <>
//       <h1 className="text-3xl font-extrabold text-center">Welcome Manager</h1>
//       <div className="flex flex-col items-center p-10">
//         {!showForm && (
//           <button
//             onClick={() => setShowForm(true)}
//             className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200 mb-5"
//           >
//             Create Project
//           </button>
//         )}


//         {showForm && (
//           <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">New Project</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-1">Project Name</label>
//                 <input
//                   type="text"
//                   name="project_name"
//                   value={projectData.project_name}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-1">Deadline</label>
//                 <input
//                   type="date"
//                   name="deadline"
//                   value={projectData.deadline}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-1">Company Name</label>
//                 <input
//                   type="text"
//                   name="company_name"
//                   value={projectData.company_name}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-1">Assign Members</label>
//                 <div className="border border-gray-300 rounded-lg p-2 max-h-32 overflow-auto bg-gray-50">
//                   {members.map((member) => (
//                     <label key={member.id} className="flex items-center space-x-2 py-1">
//                       <input
//                         type="checkbox"
//                         value={member.id}
//                         onChange={() => handleMemberSelect(member.id)}
//                         checked={selectedMembers.includes(member.id)}
//                         className="w-4 h-4"
//                       />
//                       <span>{member.name}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div>
//               <div className="flex justify-between mt-4">
//                 <button onClick={() => setShowForm(false)} className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600">
//                   Back
//                 </button>
//                 <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700">
//                   Create
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>


//       {/* Projects Table */}
//       <div className="container mx-auto p-4">
//         <h2 className="text-2xl font-bold text-center mb-4">My Projects</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
//             <thead>
//               <tr className="bg-blue-500 text-white">
//                 <th className="py-2 px-4">ID</th>
//                 <th className="py-2 px-4">Project Name</th>
//                 <th className="py-2 px-4">Created By</th>
//                 <th className="py-2 px-4">Company</th>
//                 <th className="py-2 px-4">Deadline</th>
//                 <th className="py-2 px-4">Created At</th>
//               </tr>
//             </thead>
//             <tbody>
//               {projects.map((project) => (
//                 <tr key={project.id} className="border-t border-gray-300 hover:bg-gray-100">
//                   <td className="py-2 px-4">{project.id}</td>
//                   <td className="py-2 px-4">{project.project_name}</td>
//                   <td className="py-2 px-4">{project.created_by_name}</td>
//                   <td className="py-2 px-4">{project.company_name}</td>
//                   <td className="py-2 px-4">{new Date(project.deadline).toLocaleDateString()}</td>
//                   <td className="py-2 px-4">{new Date(project.createdAt).toLocaleString()}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };


// export default ManagerDashboard;






// Second Functionality




// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { Info } from "lucide-react"; // Import an info icon


// const ManagerDashboard = () => {
//   const [members, setMembers] = useState([]);
//   const [selectedMembers, setSelectedMembers] = useState([]);
//   const [projects, setProjects] = useState([]);
//   const [projectData, setProjectData] = useState({
//     project_name: "",
//     deadline: "",
//     status: "active",
//     company_name: "",
//   });
//   const [showForm, setShowForm] = useState(false);
//   const navigate = useNavigate();
//   // These are for the functionality of the upload image and user data
//   const [user, setUser] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);


//   useEffect(() => {
//     fetchMembers();
//     fetchProjects();
//   }, []);


//   const fetchMembers = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/users", {
//         withCredentials: true,
//       });
//       const filteredMembers = response.data.filter((user) => user.role === "member");
//       setMembers(filteredMembers);
//     } catch (error) {
//       console.error("Error fetching members:", error);
//     }
//   };


//   const fetchProjects = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/projects/my-projects", {
//         withCredentials: true,
//       });
//       setProjects(response.data.projects);
//     } catch (error) {
//       console.error("Error fetching projects:", error);
//     }
//   };


//   const handleChange = (e) => {
//     setProjectData({ ...projectData, [e.target.name]: e.target.value });
//   };


//   const handleMemberSelect = (id) => {
//     setSelectedMembers((prev) =>
//       prev.includes(id) ? prev.filter((memberId) => memberId !== id) : [...prev, id]
//     );
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newProject = {
//       ...projectData,
//       assigned_members: selectedMembers,
//     };
//     try {
//       await axios.post("http://localhost:5000/api/projects/", newProject, {
//         withCredentials: true,
//       });
//       alert("Project created successfully!");
//       setProjectData({ project_name: "", deadline: "", status: "active", company_name: "" });
//       setSelectedMembers([]);
//       setShowForm(false);
//       fetchProjects();
//     } catch (error) {
//       console.error("Error creating project:", error);
//       alert("Failed to create project.");
//     }
//   };

// // Image and name functionality
 

//   // ✅ Function to fetch user data from session storage
//   useEffect(() => {
//     const userData = sessionStorage.getItem("user");
//     if (userData) {
//       setUser(JSON.parse(userData));
//     }
//   }, []);

//   // ✅ Handle file selection
//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedFile(file);
//     }
//   };

//     // ✅ Handle file upload
//   const handleFileUpload = async () => {
//     if (!selectedFile) {
//       console.error("No file selected");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("profile_picture", selectedFile);
//     try {
//       const response = await fetch("http://localhost:5000/api/users/upload-profile", {
//         method: "POST",
//         body: formData,
//         credentials: "include",
//       });

//       if (!response.ok) {
//         throw new Error("Upload failed");
//       }

//       const data = await response.json();
//       console.log("Upload successful:", data);

//       // ✅ Update session storage with the new profile picture URL
//       const newProfilePicture = `http://localhost:5000${data.profile_picture}`;

//       const updatedUser = {
//         ...user,
//         profile_picture: newProfilePicture,
//       };

//       sessionStorage.setItem("user", JSON.stringify(updatedUser));

//       // ✅ Force UI to update
//       setUser(updatedUser);
//     } catch (error) {
//       console.error("Error uploading profile picture:", error);
//     }
//   };

//   if (!user) {
//     return <p>Loading user data...</p>;
//   }


//   return (
//     <>
//          <h1 className="text-3xl font-extrabold text-center">Welcome Manager</h1>

//          <div className="p-4">
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




//        <div className="flex flex-col items-center p-10">
//          {!showForm && (
//           <button
//             onClick={() => setShowForm(true)}
//             className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200 mb-5"
//           >
//             Create Project
//           </button>
//         )}


//         {showForm && (
//           <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">New Project</h2>
//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-1">Project Name</label>
//                 <input
//                   type="text"
//                   name="project_name"
//                   value={projectData.project_name}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-1">Deadline</label>
//                 <input
//                   type="date"
//                   name="deadline"
//                   value={projectData.deadline}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 font-semibold mb-1">Company Name</label>
//                 <input
//                   type="text"
//                   name="company_name"
//                   value={projectData.company_name}
//                   onChange={handleChange}
//                   className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
//                   required
//                 />
//               </div>
//               {/* <div>
//                 <label className="block text-gray-700 font-semibold mb-1">Assign Members</label>
//                 <div className="border border-gray-300 rounded-lg p-2 max-h-32 overflow-auto bg-gray-50">
//                   {members.map((member) => (
//                     <label key={member.id} className="flex items-center space-x-2 py-1">
//                       <input
//                         type="checkbox"
//                         value={member.id}
//                         onChange={() => handleMemberSelect(member.id)}
//                         checked={selectedMembers.includes(member.id)}
//                         className="w-4 h-4"
//                       />
//                       <span>{member.name}</span>
//                     </label>
//                   ))}
//                 </div>
//               </div> */}
//  <div>
//   <label className="block text-gray-700 font-semibold mb-1">Assign Members</label>
//   <div className="border border-gray-300 rounded-lg p-2 max-h-32 overflow-auto bg-gray-50">
//     {members.map((member) => (
//       <label key={member.id} className="flex items-center justify-between space-x-2 py-1">
//         <div className="flex items-center space-x-2">
//           <input
//             type="checkbox"
//             value={member.id}
//             onChange={() => handleMemberSelect(member.id)}
//             checked={selectedMembers.includes(member.id)}
//             className="w-4 h-4"
//           />
//           <span>{member.name}</span>
//         </div>
       
//         {/* Tooltip Button */}
//          <div className="relative group">
//           <button className="text-gray-500 hover:text-blue-500">
//             <Info size={16} />
//           </button>
//           <div className="absolute right-full top-1/2 -translate-y-1/2 ml-2 hidden group-hover:flex flex-col bg-white shadow-lg border border-gray-400 rounded-md p-2 text-sm w-40">
//             <p className="text-gray-700"><strong>ID:</strong> {member.id}</p>
//             <p className="text-gray-700"><strong>Role:</strong> {member.role}</p>
//           </div>
//         </div>
//       </label>
//     ))}
//   </div>
// </div>




//               <div className="flex justify-between mt-4">
//                 <button onClick={() => setShowForm(false)} className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600">
//                   Back
//                 </button>
//                 <button type="submit" className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700">
//                   Create
//                 </button>
//               </div>
//             </form>
//           </div>
//         )}
//       </div>








//       <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
//         <h3 className="text-2xl font-semibold mb-4 text-gray-700">All Projects</h3>
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse border border-gray-300">
//             <thead>
//               <tr className="bg-gray-200">
//                 <th className="border border-gray-300 px-4 py-2">Project ID</th>
//                 <th className="border border-gray-300 px-4 py-2">Project Name</th>
//                 <th className="border border-gray-300 px-4 py-2">Created By</th>
//                 <th className="border border-gray-300 px-4 py-2">Company</th>
//                 <th className="border border-gray-300 px-4 py-2">Deadline</th>
//                 {/* <th className="border border-gray-300 px-4 py-2">Assigned Members</th> */}
//                 <th className="border border-gray-300 px-4 py-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {projects.map(project => (
//                 <tr key={project.id} className="text-center">
//                   <td className="border border-gray-300 px-4 py-2">{project.id}</td>
//                   <td className="border border-gray-300 px-4 py-2">
//   <button
//     onClick={() => navigate(`/project/${project.id}`)}
//     className="text-blue-600 hover:underline"
//   >
//     {project.project_name}
//   </button>
// </td>
//                   {/* <td className="border border-gray-300 px-4 py-2">{project.project_name}</td> */}


//                   <td className="border border-gray-300 px-4 py-2">{project.created_by_name}</td>
//                   <td className="border border-gray-300 px-4 py-2">{project.company_name}</td>
//                   <td className="border border-gray-300 px-4 py-2">{project.deadline.split("T")[0]}</td>
//                   {/* <td className="border border-gray-300 px-4 py-2">
//                     {project.assignedUsers?.length > 0
//                       ? project.assignedUsers.map(user => `${user.name} (${user.id})`).join(", ")
//                       : "No members assigned"}
//                   </td> */}
//                   <td className="border border-gray-300 px-4 py-2">
                   
//                     <button
//                       onClick={() => navigate(`/kanban/${project.id}`)}
//                       className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-blue-700 transition"
//                     >
//                       View Kanban Board
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };


// export default ManagerDashboard;




import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Info } from "lucide-react"; // Import an info icon
import { FaClipboardList } from "react-icons/fa";


const ManagerDashboard = () => {
   const [activeTab, setActiveTab] = useState("All projects");
  const [members, setMembers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [projectData, setProjectData] = useState({
    project_name: "",
    deadline: "",
    status: "active",
    company_name: "",
  });
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();
  // These are for the functionality of the upload image and user data
  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);


  useEffect(() => {
    fetchMembers();
    fetchProjects();
  }, []);


  const fetchMembers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users", {
        withCredentials: true,
      });
      const filteredMembers = response.data.filter((user) => user.role === "member");
      setMembers(filteredMembers);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };


  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/projects/my-projects", {
        withCredentials: true,
      });
      setProjects(response.data.projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };


  const handleChange = (e) => {
    setProjectData({ ...projectData, [e.target.name]: e.target.value });
  };


  const handleMemberSelect = (id) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((memberId) => memberId !== id) : [...prev, id]
    );
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProject = {
      ...projectData,
      assigned_members: selectedMembers,
    };
    try {
      await axios.post("http://localhost:5000/api/projects/", newProject, {
        withCredentials: true,
      });
      alert("Project created successfully!");
      setProjectData({ project_name: "", deadline: "", status: "active", company_name: "" });
      setSelectedMembers([]);
      setShowForm(false);
      fetchProjects();
    } catch (error) {
      console.error("Error creating project:", error);
      alert("Failed to create project.");
    }
  };

// Image and name functionality
 

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
    <>
    <div>
       {/* Sidebar */}
      <div className="h-screen w-64 bg-black text-white p-6 flex flex-col items-center shadow-lg fixed left-0 top-0">
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
          <p className="text-sm text-gray-400 mt-1">
            SVG, PNG, JPG, or GIF (MAX. 800x400px).
          </p>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded mt-2 w-full hover:bg-blue-500 cursor-pointer"
            onClick={handleFileUpload}
          >
            Upload
          </button>
        </div>

        {/* User Info */}
        <h3 className="mt-4 text-lg font-semibold">{user?.name || "Guest"}</h3>
        {/* <p className="text-gray-400 text-sm">Role: {user.role}</p> */}
        <p className="text-gray-400 text-sm">{user.email}</p>

        {/* Navigation Links */}
        <ul className="w-full mt-6 space-y-2 flex-1">
          {[
            // { name: "Dashboard", key: "dashboard" },
            // { name: "All Users", key: "users" },
            { name: "All Projects", key: "projects" },
          ].map((item) => (
            <li
              key={item.key}
              className={`py-2 px-4 cursor-pointer text-center rounded-lg transition-all duration-200 ${
                activeTab === item.key ? "bg-gray-600" : "hover:bg-gray-700"
              }`}
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
    </div>


{/* main right side */}
<div className="flex flex-col p-6 ml-60">
      <div className="w-full">
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow-md transition ml-12 cursor-pointer"
          >
            Create Project
          </button>
        )}

        {showForm && (
           <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
             <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
               <h2 className="text-xl font-bold text-gray-800 mb-4 text-center cursor-pointer">
                 New Project
               </h2>         

               <form onSubmit={handleSubmit} className="space-y-4">
                 <div>
                   <label className="block text-gray-700 font-semibold mb-1">
                     Project Name
                   </label>
                   <input
                     type="text"
                     name="project_name"
                     value={projectData.project_name}
                     onChange={handleChange}
                     className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                     required
                   />
                 </div>         

                 <div>
                   <label className="block text-gray-700 font-semibold mb-1">
                     Deadline
                   </label>
                   <input
                     type="date"
                     name="deadline"
                     value={projectData.deadline}
                     onChange={handleChange}
                     className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                     required
                   />
                 </div>         

                 <div>
                   <label className="block text-gray-700 font-semibold mb-1">
                     Company Name
                   </label>
                   <input
                     type="text"
                     name="company_name"
                     value={projectData.company_name}
                     onChange={handleChange}
                     className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
                     required
                   />
                 </div>         

                 {/* Assign Members Section */}
                 <div>
                   <label className="block text-gray-700 font-semibold mb-1">
                     Assign Members
                   </label>
                   <div className="border border-gray-300 rounded-lg p-2 max-h-40 overflow-auto bg-gray-50">
                     {members.map((member) => (
                       <label key={member.id} className="flex items-center justify-between py-1">
                         <div className="flex items-center space-x-2">
                           <input
                             type="checkbox"
                             value={member.id}
                             onChange={() => handleMemberSelect(member.id)}
                             checked={selectedMembers.includes(member.id)}
                             className="w-4 h-4 cursor-pointer"
                           />
                           <span className="cursor-pointer">{member.name}</span>
                         </div>
                         <div className="relative group">
                           <button className="text-gray-500 hover:text-blue-500 cursor-pointer">
                             <Info size={16} />
                           </button>
                           <div className="absolute right-full top-1/2 -translate-y-1/2 ml-2 hidden group-hover:block bg-white shadow-lg border border-gray-400 rounded-md p-2 text-sm w-40">
                             <p className="text-gray-700">
                               <strong>ID:</strong> {member.id}
                             </p>
                             <p className="text-gray-700">
                               <strong>Role:</strong> {member.role}
                             </p>
                           </div>
                         </div>
                       </label>
                     ))}
                   </div>
                 </div>         

                 {/* Buttons */}
                 <div className="flex justify-between mt-4">
                   <button
                     onClick={() => setShowForm(false)}
                     className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 active:scale-95 transition duration-200 cursor-pointer"
                   >
                     Cancel
                   </button>
                   <button
                     type="submit"
                     className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 active:scale-95 transition duration-200 cursor-pointer"
                   >
                     Create
                   </button>
                 </div>
               </form>
             </div>
           </div>
         )}

      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-4 text-gray-700">All Projects</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="border border-gray-300 px-4 py-2">Project ID</th>
                <th className="border border-gray-300 px-4 py-2">Project Name</th>
                <th className="border border-gray-300 px-4 py-2">Created By</th>
                <th className="border border-gray-300 px-4 py-2">Company</th>
                <th className="border border-gray-300 px-4 py-2">Deadline</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id} className="text-center border-b border-gray-300">
                  <td className="border border-gray-300 px-4 py-2">{project.id}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => navigate(`/project/${project.id}`)}
                      className="text-blue-600 hover:underline cursor-pointer"
                    >
                      {project.project_name}
                    </button>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{project.created_by_name}</td>
                  <td className="border border-gray-300 px-4 py-2">{project.company_name}</td>
                  <td className="border border-gray-300 px-4 py-2">{project.deadline.split("T")[0]}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={() => navigate(`/kanban/${project.id}`)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-blue-700 transition cursor-pointer"
                    >
                   <FaClipboardList className="inline-block mr-1" />   View  Board
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
      </div>
    </>
  );
};


export default ManagerDashboard;




