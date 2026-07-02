import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('currentUser');
      navigate('/login');
    }
  };

  return (
    <nav className="glass" style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#333', fontSize: '1.8rem', fontWeight: '700' }}>
        👔 Smart Hire
      </Link>
      
      {currentUser && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontWeight: '500' }}>Welcome, {currentUser.fullName}</span>
          <button onClick={handleLogout} className="btn-primary" style={{ padding: '8px 16px' }}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;