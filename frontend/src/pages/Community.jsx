import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Community() {
  const navigate = useNavigate();
  const [user] = useState(() => JSON.parse(localStorage.getItem("foodbridgeUser")));
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchUsers();
  }, [navigate]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("foodbridgeToken");
      const res = await fetch(`${API}/api/auth/users`, { headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) } });
      if (!res.ok) throw new Error("Failed to load users");
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load community users.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <section className="donation-page">
      <div className="donation-card">
        <div className="donation-header">
          <i className="fa-solid fa-people-group"></i>
          <h1>Community</h1>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : users.length === 0 ? (
          <p>No registered users found.</p>
        ) : (
          <div style={{ display: 'grid', gap: 12 }}>
            {users.map((u) => (
              <div key={u._id} style={{ borderBottom: '1px solid #eee', padding: '12px 0' }}>
                <h3 style={{ margin: 0, color: '#111827' }}>{u.name} <small style={{ color: '#374151', marginLeft: 8 }}>{u.role}</small></h3>
                <p style={{ margin: '6px 0', color: '#111827' }}><strong style={{ color: '#111827' }}>Email:</strong> {u.email}</p>
                <p style={{ margin: '6px 0', color: '#111827' }}><strong style={{ color: '#111827' }}>Phone:</strong> {u.phone || '—'}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Community;
