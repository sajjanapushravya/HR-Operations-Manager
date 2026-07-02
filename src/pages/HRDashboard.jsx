import { useState, useEffect } from 'react';
import StatusBadge from '../components/StatusBadge';

const HRDashboard = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const loadApps = () => {
      const apps = JSON.parse(localStorage.getItem('applications')) || [];
      setApplications(apps);
    };
    loadApps();
    window.addEventListener('storage', loadApps);
    return () => window.removeEventListener('storage', loadApps);
  }, []);

  const updateStatus = (id, newStatus) => {
    if (!confirm(`Mark as ${newStatus}?`)) return;

    const apps = JSON.parse(localStorage.getItem('applications')) || [];
    const updated = apps.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    );
    localStorage.setItem('applications', JSON.stringify(updated));
    setApplications(updated);
  };

  const viewResume = (resumeBase64) => {
    const win = window.open();
    win.document.write(`<iframe src="${resumeBase64}" style="width:100%; height:100vh; border:none;"></iframe>`);
  };

  return (
    <div className="container">
      <div className="card">
        <h1>HR Dashboard - All Applications ({applications.length})</h1>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '25px' }}>
        {applications.length === 0 ? (
          <p>No applications yet.</p>
        ) : (
          applications.map(app => (
            <div key={app.id} className="card">
              <h3>{app.fullName}</h3>
              <p><strong>Email:</strong> {app.email}</p>
              <p><strong>Opportunity ID:</strong> {app.opportunityId}</p>
              <p><strong>Applied:</strong> {new Date(app.appliedDate).toLocaleDateString()}</p>
              
              <StatusBadge status={app.status} />

              <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button onClick={() => viewResume(app.resumeBase64)} className="btn-primary">View Resume</button>
                {app.status === 'Pending' && (
                  <>
                    <button onClick={() => updateStatus(app.id, 'Selected')} className="btn-primary" style={{ background: '#28a745' }}>Select</button>
                    <button onClick={() => updateStatus(app.id, 'Rejected')} className="btn-primary" style={{ background: '#dc3545' }}>Reject</button>
                  </>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HRDashboard;