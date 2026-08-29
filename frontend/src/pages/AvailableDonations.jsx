import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function AvailableDonations() {
  const navigate = useNavigate();
  const [user] = useState(() => JSON.parse(localStorage.getItem("foodbridgeUser")));
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    fetchAvailable();
  }, [navigate]);

  const fetchAvailable = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/donations/available`);
      const data = await res.json();
      setDonations(data);
    } catch (err) {
      console.error(err);
      alert("Unable to load available donations.");
    } finally {
      setLoading(false);
    }
  };

  const handleClaim = async (id) => {
    if (!user) {
      alert("Please log in to claim donations.");
      return;
    }
    if (user.role !== "volunteer") {
      alert("Only volunteers can claim donations.");
      return;
    }

    try {
      const token = localStorage.getItem("foodbridgeToken");
      const res = await fetch(`${API}/api/donations/${id}/claim`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Could not claim donation.");
        return;
      }
      alert("Donation accepted.");
      fetchAvailable();
    } catch (err) {
      console.error(err);
      alert("Failed to claim donation.");
    }
  };

  if (!user) return null;

  return (
    <section className="donation-page">
      <div className="donation-card">
        <div className="donation-header">
          <i className="fa-solid fa-bell"></i>
          <h1>Available Donations</h1>
          <p>Browse available food donations you can accept.</p>
        </div>

        {loading ? (
          <p>Loading donations...</p>
        ) : donations.length === 0 ? (
          <p>No available donations right now.</p>
        ) : (
          donations.map((donation) => (
            <div key={donation._id} style={{ borderBottom: '1px solid #eee', padding: '18px 0' }}>
              <h3 style={{ margin: 0, color: '#111827' }}>{donation.foodName} <small style={{ color: '#374151', marginLeft: 8 }}>{donation.quantity}</small></h3>
              <p style={{ margin: '6px 0', color: '#111827' }}>{donation.foodType} • {donation.pickupLocation}</p>
              <p style={{ margin: '6px 0', color: '#111827' }}>{donation.description}</p>
              <p style={{ margin: '6px 0', color: '#374151' }}>Donor: {donation.donorName}</p>
              <button className="donation-submit" onClick={() => handleClaim(donation._id)}>
                Claim Donation
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default AvailableDonations;
