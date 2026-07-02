import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '', role: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(u => u.email === formData.email.toLowerCase())) {
      setMessage("Email already exists!");
      return;
    }

    users.push({ ...formData, email: formData.email.toLowerCase() });
    localStorage.setItem('users', JSON.stringify(users));
    setMessage("Registration successful! Redirecting...");
    setTimeout(() => navigate('/login'), 1500);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
      <div className="glass" style={{ padding: '50px', borderRadius: '20px', width: '100%', maxWidth: '420px' }}>
        <h1 style={{ textAlign: 'center' }}>Create Account</h1>
        <form onSubmit={handleRegister}>
          <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} required style={{ width: '100%', padding: '12px', margin: '10px 0', borderRadius: '10px' }} />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required style={{ width: '100%', padding: '12px', margin: '10px 0', borderRadius: '10px' }} />
          <select name="role" onChange={handleChange} required style={{ width: '100%', padding: '12px', margin: '10px 0', borderRadius: '10px' }}>
            <option value="">Select Role</option>
            <option value="applicant">Applicant</option>
            <option value="hr">HR Admin</option>
          </select>
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required style={{ width: '100%', padding: '12px', margin: '10px 0', borderRadius: '10px' }} />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required style={{ width: '100%', padding: '12px', margin: '10px 0', borderRadius: '10px' }} />
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '15px' }}>Register</button>
        </form>
        {message && <p style={{ textAlign: 'center', marginTop: '15px' }}>{message}</p>}
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          Already have an account? <Link to="/login" style={{ color: '#667eea' }}>Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;