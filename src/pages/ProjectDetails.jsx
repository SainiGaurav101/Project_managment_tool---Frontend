// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaUser, FaTasks, FaClock, FaBuilding } from "react-icons/fa";

// const ProjectDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [project, setProject] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProjectDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/projects/${id}`, { withCredentials: true });
//         setProject(response.data);
//       } catch (error) {
//         console.error("Error fetching project details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProjectDetails();
//   }, [id]);

//   const handleUserClick = (user) => {
//     navigate(`/user/${user.id}`, { state: { user } });
//   };

//   if (loading) return <p className="text-center text-gray-600">Loading project details...</p>;
//   if (!project) return <p className="text-center text-red-500">Project not found.</p>;

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
//       <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg">
//         <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">{project.project_name}</h2>
        
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Project Info */}
//           <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
//             <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
//               <FaBuilding /> Project Information
//             </h3>
//             <p><strong>Company:</strong> {project.company_name}</p>
//             <p><strong>Status:</strong> {project.status}</p>
//             <p><strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}</p>
//           </div>

//           {/* Manager Info */}
//           {project.manager && (
//             <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
//               <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
//                 <FaUser /> Manager
//               </h3>
//               <p><strong>Name:</strong> {project.manager.name}</p>
//               <p><strong>Role:</strong> {project.manager.role}</p>
//             </div>
//           )}
//         </div>

//         {/* Assigned Users */}
//         <div className="mt-6 p-4 border rounded-lg shadow-sm bg-gray-50">
//           <h3 className="text-lg font-semibold text-gray-700">Assigned Users</h3>
//           {project.assignedUsers.length > 0 ? (
//             <ul className="space-y-2">
//               {project.assignedUsers.map(user => (
//                 <li
//                   key={user.id}
//                   className="p-2 bg-white rounded-md shadow-md cursor-pointer hover:bg-blue-100 transition"
//                   onClick={() => handleUserClick(user)}
//                 >
//                   {user.name} 
//                   {/* (
//                     {user.role}
//                   ) */}
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>No users assigned</p>
//           )}
//         </div>

//         {/* Tasks List */}
//         <div className="mt-6 p-4 border rounded-lg shadow-sm bg-gray-50">
//           <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
//             <FaTasks /> Tasks
//           </h3>
//           {project.Tasks.length > 0 ? (
//             <div className="overflow-x-auto">
//               <table className="w-full border border-gray-300 mt-2 text-sm">
//                 <thead>
//                   <tr className="bg-gray-200 text-gray-700">
//                     <th className="border px-3 py-2">Title</th>
//                     <th className="border px-3 py-2">Status</th>
//                     <th className="border px-3 py-2">Priority</th>
//                     <th className="border px-3 py-2">Progress</th>
//                     <th className="border px-3 py-2">Deadline</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {project.Tasks.map(task => (
//                     <tr key={task.id} className="text-center bg-white border-b">
//                       <td className="border px-3 py-2">{task.title}</td>
//                       <td className="border px-3 py-2 text-green-600 font-semibold">{task.status}</td>
//                       <td className="border px-3 py-2 text-red-500">{task.priority}</td>
//                       <td className="border px-3 py-2">{task.progress}%</td>
//                       <td className="border px-3 py-2 text-blue-500">{new Date(task.deadline).toLocaleDateString()}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <p>No tasks available</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProjectDetails;




import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaTasks, FaClock, FaBuilding, FaChartPie } from "react-icons/fa";
import DownloadProjectReport from "../components/DownloadProjectReport";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/projects/${id}`, { withCredentials: true });
        setProject(response.data);
      } catch (error) {
        console.error("Error fetching project details:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchProjectReport = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/task/${id}/report`, { withCredentials: true });
        setReport(response.data);
      } catch (error) {
        console.error("Error fetching project report:", error);
      }
    };

    fetchProjectDetails();
    fetchProjectReport();
  }, [id]);

  const handleUserClick = (user) => {
    navigate(`/user/${user.id}`, { state: { user } });
  };

  if (loading) return <p className="text-center text-gray-600">Loading project details...</p>;
  if (!project) return <p className="text-center text-red-500">Project not found.</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <div className="bg-white w-full max-w-4xl p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-4 text-gray-800 text-center">{project.project_name}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <FaBuilding /> Project Information
            </h3>
            <p><strong>Company:</strong> {project.company_name}</p>
            <p><strong>Status:</strong> {project.status}</p>
            <p><strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}</p>
          </div>

          {project.manager && (
            <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
              <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                <FaUser /> Manager
              </h3>
              <p><strong>Name:</strong> {project.manager.name}</p>
              <p><strong>Role:</strong> {project.manager.role}</p>
            </div>
          )}
        </div>

        <div className="mt-6 p-4 border rounded-lg shadow-sm bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-700">Assigned Users</h3>
          {project.assignedUsers.length > 0 ? (
            <ul className="space-y-2">
              {project.assignedUsers.map(user => (
                <li
                  key={user.id}
                  className="p-2 bg-white rounded-md shadow-md cursor-pointer hover:bg-blue-100 transition"
                  onClick={() => handleUserClick(user)}
                >
                  {user.name}
                </li>
              ))}
            </ul>
          ) : (
            <p>No users assigned</p>
          )}
        </div>

        <div className="mt-6 p-4 border rounded-lg shadow-sm bg-gray-50">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
            <FaTasks /> Tasks
          </h3>
          {project.Tasks.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-300 mt-2 text-sm">
                <thead>
                  <tr className="bg-gray-200 text-gray-700">
                    <th className="border px-3 py-2">Title</th>
                    <th className="border px-3 py-2">Status</th>
                    <th className="border px-3 py-2">Priority</th>
                    <th className="border px-3 py-2">Progress</th>
                    <th className="border px-3 py-2">Deadline</th>
                  </tr>
                </thead>
                <tbody>
                  {project.Tasks.map(task => (
                    <tr key={task.id} className="text-center bg-white border-b">
                      <td className="border px-3 py-2">{task.title}</td>
                      <td className="border px-3 py-2 text-green-600 font-semibold">{task.status}</td>
                      <td className="border px-3 py-2 text-red-500">{task.priority}</td>
                      <td className="border px-3 py-2">{task.progress}%</td>
                      <td className="border px-3 py-2 text-blue-500">{new Date(task.deadline).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No tasks available</p>
          )}
        </div>

        {report && report.tasks && (
  <div className="mt-6 p-4 border rounded-lg shadow-sm bg-gray-50">
    <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
      <FaChartPie /> Project Report
    </h3>
    <p><strong>Total Tasks:</strong> {report.tasks.length}</p>
    <p><strong>Completed Tasks:</strong> {report.tasks.filter(task => task.status === "done").length}</p>
    <p><strong>Pending Tasks:</strong> {report.tasks.filter(task => task.status !== "done").length}</p>
    <p><strong>Completion Rate:</strong> {report.completionRate}%</p>

    {/* Add the Download PDF Button Here */}
    <div className="mt-4 flex justify-center">
      <DownloadProjectReport projectData={{ project, tasks: project.Tasks, completionRate: report.completionRate }} />
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default ProjectDetails;

