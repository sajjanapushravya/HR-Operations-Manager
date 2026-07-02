import { useState, useEffect } from 'react';
import StatusBadge from '../components/StatusBadge';

const ApplicantDashboard = () => {
  const [user, setUser] = useState(null);
  const [application, setApplication] = useState(null);
  const [formData, setFormData] = useState({ opportunityId: '' });
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeBase64, setResumeBase64] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    setUser(currentUser);

    const apps = JSON.parse(localStorage.getItem('applications')) || [];
    const myApp = apps.find(app => app.email === currentUser?.email);
    setApplication(myApp);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file);
      const reader = new FileReader();
      reader.onload = (ev) => setResumeBase64(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.opportunityId || !resumeBase64) {
      setMessage("Please fill all fields and upload resume");
      return;
    }

    const apps = JSON.parse(localStorage.getItem('applications')) || [];
    const newApp = {
      id: Date.now(),
      fullName: user.fullName,
      email: user.email,
      opportunityId: formData.opportunityId,
      resumeBase64,
      status: "Pending",
      appliedDate: new Date().toISOString()
    };

    apps.push(newApp);
    localStorage.setItem('applications', JSON.stringify(apps));
    setApplication(newApp);
    setMessage("Application submitted successfully!");
  };

  const viewResume = () => {
    if (application?.resumeBase64) {
      const win = window.open();
      win.document.write(`<iframe src="${application.resumeBase64}" style="width:100%; height:100vh; border:none;"></iframe>`);
    }
  };

  return (
    <div className="container">
      <div className="card" style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>Welcome, {user?.fullName}!</h1>
      </div>

      {application ? (
        <div className="card">
          <h2>Application Status</h2>
          <p><strong>Opportunity ID:</strong> {application.opportunityId}</p>
          <StatusBadge status={application.status} />
          <div style={{ margin: '25px 0', fontSize: '1.1rem', lineHeight: '1.6' }}>
            {application.status === "Pending" && "Your application is under review."}
            {application.status === "Selected" && "🎉 Congratulations! You have been selected. Please visit the office for further process."}
            {application.status === "Rejected" && "Thank you for applying. Unfortunately you were not selected."}
          </div>
          <button onClick={viewResume} className="btn-primary">View Resume</button>
        </div>
      ) : (
        <div className="card">
          <h2>Submit New Application</h2>
          <form onSubmit={handleSubmit}>
            <input type="text" value={user?.fullName} readOnly style={{ width: '100%', padding: '12px', marginBottom: '15px' }} />
            <input type="email" value={user?.email} readOnly style={{ width: '100%', padding: '12px', marginBottom: '15px' }} />
            <input 
              type="text" 
              placeholder="Opportunity ID" 
              value={formData.opportunityId}
              onChange={(e) => setFormData({ ...formData, opportunityId: e.target.value })}
              required 
              style={{ width: '100%', padding: '12px', marginBottom: '15px' }} 
            />
            
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} required style={{ marginBottom: '15px' }} />
            
            {resumeFile && <p>Selected: <strong>{resumeFile.name}</strong></p>}

            <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '20px' }}>
              Submit Application
            </button>
          </form>
          {message && <p style={{ textAlign: 'center', marginTop: '15px', color: 'green' }}>{message}</p>}
        </div>
      )}
    </div>
  );
};

export default ApplicantDashboard;