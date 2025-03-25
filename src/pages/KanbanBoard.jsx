
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaProjectDiagram,FaUserCircle,FaUserPlus ,FaPlus,FaTasks } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const KanbanBoard = () => {
  const { id } = useParams(); // ✅ Get Project ID from URL
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]); // ✅ Store project tasks
  const [loading, setLoading] = useState(true);
  const [creatingTask, setCreatingTask] = useState(false); // Loading state for task creation
  const [errorMessage, setErrorMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [showTaskModal, setShowTaskModal] = useState(false);
  


  // State to track hover popup
  const [hovered, setHovered] = useState(false); 
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    deadline: "",
  });

// This is the functionality for editing
  const [editingTask, setEditingTask] = useState(null);
  const [updatedTask, setUpdatedTask] = useState({
    status: "",
    priority: "",
    progress: 0,
  });

  const openEditForm = (task) => {
    setEditingTask(task); // Store the task being edited
    setUpdatedTask({
      status: task.status,
      priority: task.priority,
      progress: task.progress,
    });
  };


// Fetch all the users details 
  const fetchUsers = async () => {
    try {
        const response = await axios.get("http://localhost:5000/api/users", {
            withCredentials: true,
        });
        const filteredMembers = response.data.filter(user => user.role === "member");
      
        setUsers(filteredMembers);
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};

useEffect(() => {
    fetchUsers();
}, [])

// Add Members to the project
const handleAddMembers = async () => {
  if (selectedUsers.length === 0) return;

  try {
      await axios.post(`http://localhost:5000/api/projects/${id}/add-members`, 
          { members: selectedUsers }, 
          { withCredentials: true }
      );

      // Refresh project details after adding members
      fetchProjectData();
      setShowModal(false); // Close modal
      setSelectedUsers([]); // Add new user
      // Reset selection
  } catch (error) {
      console.error("Error adding members:", error);
  }
};


const assignedMemberIds = project?.assignedUsers?.map(user => user.id) ?? [];


const unassignedUsers = users.filter(user => !assignedMemberIds.includes(user.id));



  
  const updateTask = async () => {
    if (!editingTask) return;
  
    try {
      await axios.put(
        `http://localhost:5000/api/task/${editingTask.id}`,
        updatedTask,
        { withCredentials: true }
      );
  
      setEditingTask(null); // Close edit form
      fetchProjectData(); // Refresh tasks
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  

  // Now delete task 
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/task/${taskId}`, {
        withCredentials: true,
      });
  
      // Update state immediately to reflect deletion
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  
      // Optional: Fetch latest data if needed
      setTimeout(fetchProjectData, 500); // Delay fetch to ensure sync
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  


  // Fetch project details & tasks
  const fetchProjectData = async () => {
    try {
      // ✅ Fetch project details
      const projectResponse = await axios.get(`http://localhost:5000/api/projects/${id}`, {
        withCredentials: true, // ✅ Ensures session authentication
      });
       // Ensure assigned users are set correctly
   

      setProject(projectResponse.data);

      // ✅ Fetch tasks for this project
      const taskResponse = await axios.get(`http://localhost:5000/api/task/project/${id}`, {
        withCredentials: true,
      });

      setTasks(taskResponse.data); // ✅ Store fetched tasks
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error.response ? error.response.data : error.message);
      if (error.response && error.response.status === 401) {
        navigate("/login"); // ✅ Redirect unauthorized users
      }
    }
  };

  useEffect(() => {
    fetchProjectData(); // ✅ Initial fetch
  }, [id, navigate]);

  // Function to update task status
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:5000/api/task/${taskId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      fetchProjectData(); // ✅ Re-fetch tasks to update UI
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  // Function to create a new task
  const createTask = async () => {
    setCreatingTask(true);
    setErrorMessage("");

    if (!newTask.title || !newTask.assignedTo || !newTask.deadline) {
      setErrorMessage("All fields are required!");
      setCreatingTask(false);
      return;
    }
    try {
      // const response =
       await axios.post(
        `http://localhost:5000/api/task/${id}`,
        {
          ...newTask,
          assignedTo: [parseInt(newTask.assignedTo)],
          status: "todo",
          priority: "low",
        },
        { withCredentials: true }
      );
      setNewTask({ title: "", description: "", assignedTo: "", deadline: "" }); // Clear form
      // console.log("Task Created Successfully:", response.data);
      fetchProjectData(); // ✅ Refresh tasks after creation
    } catch (error) {
      console.error("Error creating task:", error.response ? error.response.data : error.message);
    }
    finally {
      setCreatingTask(false);
    }
  };

  // if (loading) return <p className="text-center text-xl font-bold">Loading project details...</p>;
  if (!project) return <p className="text-center text-xl font-bold text-red-500">Project not found!</p>;

  // Priority Colors
  const priorityColors = {
    low: "bg-green-200 text-green-700",
    medium: "bg-yellow-200 text-yellow-700",
    high: "bg-orange-200 text-red-700",
   
  };

// to remvoe the member from the project
  const handleRemoveMember = async (memberId) => {
    if (!window.confirm("Are you sure you want to remove this member?")) return;
  
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/projects/${id}/remove-members`,
        {
          data: { members: [memberId] }, // Send the member ID in an array
          withCredentials: true, // Ensure authentication is included
        }
      );
  
      if (response.status === 200) {
        alert("Member removed successfully!");
        
        // Update the UI by filtering out the removed member
        setProject((prevProject) => ({
          ...prevProject,
          assignedUsers: prevProject.assignedUsers.filter((user) => user.id !== memberId),
        }));
      }
    } catch (error) {
      console.error("Error removing member:", error.response?.data || error);
      alert("You Don't have authority to remove Members from the project");
    }
  };

// Drag and Drop Functionality

const handleDragEnd = async (result) => {
  if (!result.destination) return;  // Ignore invalid drops

  const { source, destination, draggableId } = result;

  if (source.droppableId === destination.droppableId && source.index === destination.index) return;

  const movedTask = tasks.find((task) => task.id.toString() === draggableId);
  if (!movedTask) return;

  // Optimistically update UI
  const updatedTasks = tasks.map((task) =>
    task.id.toString() === draggableId ? { ...task, status: destination.droppableId } : task
  );
  setTasks(updatedTasks);

  try {
    const response = await fetch(`http://localhost:5000/api/task/${movedTask.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: destination.droppableId }),
      credentials: "include", // Only if authentication is required
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update task in backend");
    }

    console.log("✅ Task updated successfully in backend");
  } catch (error) {
    console.error("❌ Error updating task:", error.message);
    setTasks(tasks); // Rollback UI if API fails
  }
};

  return (
    <div className="p-6">



      {/* Project Details */}
 {/* Project Name with Hover Popup */}
<div
      className="relative w-fit mx-auto"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Project Name Header */}
      <h1 className="cursor-pointer flex items-center gap-3 text-4xl font-bold text-center uppercase p-5 bg-gray-100 rounded-lg shadow-md transition-all duration-300 hover:bg-gray-50">
        <FaProjectDiagram className="text-blue-500" />
        {project.project_name}
      </h1>

      {/* Hover Card */}
      {hovered && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-white shadow-xl p-4 rounded-lg w-72 z-50 border border-gray-200 transition-opacity duration-300 opacity-100 scale-100">
          <p className="text-lg font-semibold flex items-center gap-2">
            📌 {project.project_name}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Company:</strong> {project.company_name}
          </p>
          <p className="text-sm text-red-500">
            <strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Created By:</strong> {project.manager.name}
          </p>
          <p className="text-sm text-gray-700">
            <strong>Created At:</strong> {new Date(project.createdAt).toLocaleDateString()}
          </p>

          {/* Assigned Members */}
          <p className="text-sm font-semibold mt-2">Assigned Members:</p>
          <ul className="text-sm text-gray-600 list-disc ml-4">
            {project.assignedUsers.map(user => (
              <li key={user.id}>{user.name} </li>
            ))}
          </ul>
        </div>
      )}
    </div>
      <p className="text-lg font-semibold text-center mt-2"><strong>Company:</strong> {project.company_name}</p>
      <p className="text-lg text-center text-red-500"><strong>Deadline:</strong> {new Date(project.deadline).toLocaleDateString()}</p>
      <p className="text-lg text-center"><strong>Created By:</strong> {project.manager.name} </p>

   
<div className="mt-6 w-full max-w-md mx-auto">
  {/* Header Section */}
  <div className="flex justify-between items-center mb-3">
    <h2 className="text-xl font-bold text-gray-800">Assigned Members</h2>

    <div className="flex space-x-2">
    <button
    onClick={() => setShowModal(true)}
    className="cursor-pointer flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-green-700 active:scale-95 transition duration-200"
  >
    <FaUserPlus className="text-xl" />
    <span className="text-sm">Add Members</span>
  </button>

  <button
    onClick={() => setShowTaskModal(true)}
    className="cursor-pointer flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 active:scale-95 transition duration-200"
  >
    <FaPlus className="text-xl" />
    <span className="text-sm">Add Task</span>
  </button>
    </div>
  </div>

  {/* Assigned Members List */}
  <ul className="list-none space-y-3">
    {project.assignedUsers.map((user) => (
      <li
        key={user.id}
        className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg hover:bg-gray-100 transition duration-300"
      >
      
        <div className="flex items-center space-x-3">
  <img
    className="w-16 h-16 rounded-full border-2 border-gray-200 object-cover"
    src={
      user?.profile_picture
        ? `http://localhost:5000/uploads/${user.profile_picture}?t=${new Date().getTime()}`
        : "http://localhost:5000/uploads/default-profile.png"
    }
    alt="Profile"
    onError={(e) => {
      e.target.onerror = null;
      e.target.src = "http://localhost:5000/uploads/default-profile.png";
    }}
  />
  <span className="text-gray-800 font-medium">{user.name}</span>
</div>

        <button
          onClick={() => handleRemoveMember(user.id)}
          className="cursor-pointer bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:bg-red-600 active:scale-95 transition duration-200"
        >
          Remove
        </button>
      </li>
    ))}
  </ul>
</div>
{/* Show Mode For task */}

{showModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        <FaUserPlus className="mr-2 text-green-500" /> Add Members
      </h2>
      {unassignedUsers.length > 0 ? (
        <>
          <select
            multiple
            value={selectedUsers}
            onChange={(e) => {
              const values = Array.from(e.target.selectedOptions, (option) =>
                parseInt(option.value)
              );
              setSelectedUsers(values);
            }}
            className="border p-2 w-full rounded-md focus:ring-2 focus:ring-blue-400"
          >
            {unassignedUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name} 
                {/* ({user.role}) */}
              </option>
            ))}
          </select>

          <div className="flex justify-end mt-4 space-x-2">
            <button
              onClick={handleAddMembers}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 active:scale-95 transition duration-200"
            >
              Confirm
            </button>

            <button
              onClick={() => setShowModal(false)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 active:scale-95 transition duration-200"
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
      <p className="text-red-500 text-center font-medium flex items-center justify-center gap-2">
  ❌ You don't have the authority to add new members.
</p>
<button 
  onClick={() => setShowModal(false)}
  className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-600 active:scale-95 transition-transform duration-200 mx-auto block"
>
  Back
</button>
        </>
      )}
    </div>
  </div>
)}


 {/* Task Creation Form */}
 
{showTaskModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
        <FaTasks className="mr-2 text-blue-600" /> Create a New Task
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className=" cursor-pointer  border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />

        <textarea
          placeholder="Description"
          className=" cursor-pointer  border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none resize-none"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />

        <input
          type="date"
          className=" cursor-pointer  border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
          value={newTask.deadline}
          onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
        />

        <select
          className=" cursor-pointer  border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
          value={newTask.assignedTo}
          onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
        >
          <option value="">Select Assigned User</option>
          {project.assignedUsers.map((user) => (
            <option key={user.id} value={user.id}>{user.name}</option>
          ))}
        </select>
      </div>

      <div className="flex justify-between mt-6">
        <button
          onClick={() => setShowTaskModal(false)}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-gray-700 active:scale-95 transition duration-200"
        >
          Back
        </button>

        <button
          onClick={createTask}
          className={`bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 active:scale-95 transition duration-200 ${creatingTask ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={creatingTask}
        >
          {creatingTask ? "Creating..." : "Create Task"}
        </button>
      </div>
    </div>
  </div>
)}


      {/* Kanban Board */}
   
<DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 md:p-6">
          {["todo", "in-progress", "done"].map((status) => (
            <Droppable droppableId={status} key={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="border p-4 rounded-lg shadow-lg bg-gray-50"
                >
                  <h2 className="text-lg font-bold capitalize text-center bg-gray-300 p-2 rounded">
                    {status.replace("_", " ")}
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {tasks
                      .filter((task) => task.status === status)
                      .map((task, index) => (
                        <Draggable
                          key={task.id.toString()}
                          draggableId={task.id.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className="p-4 bg-white rounded-xl shadow-md border-l-4 border-blue-500 hover:shadow-lg transition-all"
                            >
                              <div className="flex items-center justify-between mb-2">
                                <p className="font-bold text-lg text-gray-800">
                                  {task.title}
                                </p>
                                <span
                                  className={`text-xs font-semibold px-3 py-1 rounded-full ${
                                    priorityColors[task.priority]
                                  }`}
                                >
                                  {task.priority.toUpperCase()}
                                </span>
                              </div>

                              <p className="text-sm text-gray-600 mb-2">
                                {task.description}
                              </p>

                              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-3">
                                <p>⏳ Progress: {task.progress}%</p>
                                <p>
                                  📅 Deadline:{" "}
                                  {new Date(task.deadline).toLocaleDateString()}
                                </p>
                                <p>👤 Created By: {task.creator.name} </p>
                                <p>
                                  🔗 Assigned To:{" "}
                                  {task.assignedUsers.length > 0
                                    ? task.assignedUsers
                                        .map((user) => user.name)
                                        .join(", ")
                                    : "Unassigned"}
                                </p>
                              </div>

                              <div className="flex justify-between items-center mt-3">
                                {status !== "todo" && (
                                  <button
                                    onClick={() =>
                                      updateTaskStatus(task.id, "todo")
                                    }
                                    className="cursor-pointer text-xs bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600 transition"
                                  >
                                    ➡️ To-Do
                                  </button>
                                )}
                                {status !== "in-progress" && (
                                  <button
                                    onClick={() =>
                                      updateTaskStatus(task.id, "in-progress")
                                    }
                                    className="cursor-pointer text-xs bg-yellow-400 text-white px-3 py-1 rounded-full hover:bg-yellow-500 transition"
                                  >
                                    🚧 In Progress
                                  </button>
                                )}
                                {status !== "done" && (
                                  <button
                                    onClick={() =>
                                      updateTaskStatus(task.id, "done")
                                    }
                                    className="cursor-pointer text-xs bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition"
                                  >
                                    ✅ Done
                                  </button>
                                )}

                                <div className="flex gap-2">
                                  <button
                                    onClick={() => openEditForm(task)}
                                    className="cursor-pointer text-xs bg-gray-400 text-white px-3 py-1 rounded-full hover:bg-gray-500 transition"
                                  >
                                    ✏️ Edit
                                  </button>

                                  <button
                                    onClick={() => deleteTask(task.id)}
                                    className="cursor-pointer text-xs bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-600 transition"
                                  >
                                    🗑️ Delete
                                  </button>
                                </div>
                              </div>
                            </li>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </ul>
                </div>
              )}
            </Droppable>
          ))}

          {editingTask && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white p-6 rounded shadow-lg w-96">
                <h3 className="text-lg font-bold mb-4">Edit Task</h3>

                <label className="block mb-2">Status:</label>
                <select
                  value={updatedTask.status}
                  onChange={(e) =>
                    setUpdatedTask({ ...updatedTask, status: e.target.value })
                  }
                  className="w-full p-2 border rounded mb-3"
                >
                  <option value="todo">To-Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>

                <label className="block mb-2">Priority:</label>
                <select
                  value={updatedTask.priority}
                  onChange={(e) =>
                    setUpdatedTask({ ...updatedTask, priority: e.target.value })
                  }
                  className="w-full p-2 border rounded mb-3"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>

                <label className="block mb-2">Progress:</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={updatedTask.progress}
                  onChange={(e) =>
                    setUpdatedTask({ ...updatedTask, progress: e.target.value })
                  }
                  className="w-full p-2 border rounded mb-3"
                />

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setEditingTask(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded hover:bg-gray-600"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updateTask}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </DragDropContext>



    </div>
  );
};


export default KanbanBoard;
