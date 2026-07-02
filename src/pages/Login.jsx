import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email.toLowerCase() && u.password === password);

    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      setMessage('Login successful!');
      setTimeout(() => {
        navigate(user.role === 'hr' ? '/hr' : '/applicant');
      }, 1000);
    } else {
      setMessage('Invalid credentials!');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
      <div className="glass" style={{ padding: '50px', borderRadius: '20px', width: '100%', maxWidth: '420px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '10px' }}>👔 Smart Hire</h1>
        <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Login</h2>

        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '14px', marginBottom: '15px', borderRadius: '10px', border: '2px solid #ddd' }} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '14px', marginBottom: '20px', borderRadius: '10px', border: '2px solid #ddd' }} />
          <button type="submit" className="btn-primary" style={{ width: '100%' }}>Login</button>
        </form>

        {message && <p style={{ textAlign: 'center', marginTop: '15px', color: message.includes('successful') ? 'green' : 'red' }}>{message}</p>}

        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Don't have an account? <Link to="/register" style={{ color: '#667eea' }}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;