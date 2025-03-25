import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')); // Fetch user info from localStorage

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin-dashboard'); // Redirect to Admin dashboard
      } else if (user.role === 'manager') {
        navigate('/manager-dashboard'); // Redirect to Manager dashboard
      } else if (user.role === 'member') {
        navigate('/member-dashboard'); // Redirect to Member dashboard
      }
    }
  }, [navigate, user]);

  return <div>Loading...</div>; // Loading message while redirecting
};

export default Dashboard;
