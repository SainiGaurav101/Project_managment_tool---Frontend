import { useLocation, useNavigate } from "react-router-dom";
import { FaUser, FaIdBadge, FaUserTag } from "react-icons/fa";

const UserDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <p className="text-red-500 text-lg font-semibold">User details not found.</p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            onClick={() => navigate(-1)}
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const { id, name, role } = state.user;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-2">
          <FaUser className="text-blue-500" /> {name}
        </h2>
        <div className="mt-4 space-y-2 text-gray-700">
          <p className="flex items-center gap-2 text-lg">
            <FaIdBadge className="text-gray-500" /> <strong>ID:</strong> {id}
          </p>
          <p className="flex items-center gap-2 text-lg">
            <FaUserTag className="text-gray-500" /> <strong>Role:</strong> {role}
          </p>
        </div>
        <button 
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default UserDetails;
