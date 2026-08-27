import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function MyActivities() {
  const navigate = useNavigate();
  const [user] = useState(() => JSON.parse(localStorage.getItem("foodbridgeUser")));
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const isVolunteer = user?.role === "volunteer";
  const isDonor = user?.role === "donor";

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchDonations();
  }, [navigate]);

  const fetchDonations = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("foodbridgeToken");
      const res = await fetch(`${API}/api/donations/user/${encodeURIComponent(user.email)}`, { headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) } });
      const data = await res.json();
      setDonations(data);
    } catch (err) {
      console.error(err);
      alert("Failed to load your donations.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this donation?")) return;
    try {
      const token = localStorage.getItem("foodbridgeToken");
      const res = await fetch(`${API}/api/donations/${id}`, { method: "DELETE", headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) } });
      if (!res.ok) throw new Error("Delete failed");
      setDonations((d) => d.filter((x) => x._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete donation.");
    }
  };

  const startEdit = (donation) => {
    setEditingId(donation._id);
    setEditValues({
      foodName: donation.foodName,
      quantity: donation.quantity,
      foodType: donation.foodType,
      pickupLocation: donation.pickupLocation,
      description: donation.description || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({});
  };

  const saveEdit = async (id) => {
    try {
      const token = localStorage.getItem("foodbridgeToken");
      const res = await fetch(`${API}/api/donations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify(editValues),
      });
      if (!res.ok) throw new Error("Update failed");
      const data = await res.json();
      setDonations((list) => list.map((it) => (it._id === id ? data.donation : it)));
      setEditingId(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update donation.");
    }
  };

  if (!user) return null;

  return (
    <section className="donation-page">
      <div className="donation-card">
        <div className="donation-header">
          <i className="fa-solid fa-hand-holding-heart"></i>
          <h1>My Activities</h1>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : donations.length === 0 ? (
          <p>No donations yet.</p>
        ) : (
          donations.map((d) => (
            <div key={d._id} style={{ borderBottom: '1px solid #eee', padding: '12px 0' }}>
              {editingId === d._id ? (
                <div>
                  <input value={editValues.foodName} onChange={(e) => setEditValues({ ...editValues, foodName: e.target.value })} />
                  <input value={editValues.quantity} onChange={(e) => setEditValues({ ...editValues, quantity: e.target.value })} />
                  <input value={editValues.pickupLocation} onChange={(e) => setEditValues({ ...editValues, pickupLocation: e.target.value })} />
                  <select value={editValues.foodType} onChange={(e) => setEditValues({ ...editValues, foodType: e.target.value })}>
                    <option value="Cooked Food">Cooked Food</option>
                    <option value="Dry Food">Dry Food</option>
                    <option value="Fruits">Fruits</option>
                    <option value="Vegetables">Vegetables</option>
                    <option value="Other">Other</option>
                  </select>
                  <textarea value={editValues.description} onChange={(e) => setEditValues({ ...editValues, description: e.target.value })} />
                  <div style={{ marginTop: 8 }}>
                    <button onClick={() => saveEdit(d._id)} className="donation-submit">Save</button>
                    <button onClick={cancelEdit} style={{ marginLeft: 8 }}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 style={{ margin: 0 }}>{d.foodName} <small style={{ color: '#666', marginLeft: 8 }}>{d.quantity}</small></h3>
                  <p style={{ margin: '6px 0' }}>{d.foodType} • {d.pickupLocation}</p>
                  <p style={{ margin: '6px 0' }}>{d.description}</p>
                  <small style={{ color: '#666' }}>Status: {d.status} • Created: {new Date(d.createdAt).toLocaleString()}</small>
                  <div style={{ marginTop: 8 }}>
                    {!isVolunteer && (
                      <button onClick={() => startEdit(d)} className="donation-submit" style={{ background:'#FF9800' }}>Edit</button>
                    )}
                    {!isVolunteer && !isDonor && (
                      <button onClick={() => handleDelete(d._id)} style={{ marginLeft: 8 }}>Delete</button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default MyActivities;
