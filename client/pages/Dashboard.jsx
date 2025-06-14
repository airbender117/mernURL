

import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // clear localStorage or auth context here if needed
    console.log('Logging out...');
    navigate('/login');
  };
  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));

    if (localUser?.email) {
        fetch(`http://localhost:9090/user/getuser/${localUser.email}`)
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(err => console.error(err));
    }
}, []);


  return (
    <>
      <h1>Dashboard</h1>

      <div>
        <h2>Welcome, User!</h2>
        <p>Email: user@example.com</p>
        <p>Account type: Standard</p>
      </div>

      <div>
        <h3>Recent Activity</h3>
        <ul>
          <li>Logged in from IP 127.0.0.1</li>
          <li>Viewed profile</li>
          <li>Updated settings</li>
        </ul>
      </div>

      <div>
        <button onClick={() => navigate('/profile')}>Go to Profile</button>
        <button onClick={() => navigate('/settings')}>Go to Settings</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
}
