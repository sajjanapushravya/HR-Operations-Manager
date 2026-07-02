const StatusBadge = ({ status }) => {
  const styles = {
    Pending: { background: '#fff3cd', color: '#856404' },
    Selected: { background: '#d4edda', color: '#155724' },
    Rejected: { background: '#f8d7da', color: '#721c24' }
  };

  return (
    <span style={{
      padding: '8px 20px',
      borderRadius: '30px',
      fontWeight: '600',
      ...styles[status]
    }}>
      {status}
    </span>
  );
};

export default StatusBadge;