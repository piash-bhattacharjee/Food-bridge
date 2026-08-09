import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const stored = JSON.parse(localStorage.getItem("foodbridgeUser"));

  useEffect(() => {
    if (!stored) {
      navigate("/login");
    }
  }, [navigate, stored]);
  const [name, setName] = useState(stored?.name || "");
  const [email] = useState(stored?.email || "");
  const [phone, setPhone] = useState(stored?.phone || "");
  const [loading, setLoading] = useState(false);

  if (!stored) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("foodbridgeToken");
      const res = await fetch("http://localhost:5000/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...(token ? { Authorization: `Bearer ${token}` } : {}) },
        body: JSON.stringify({ name, phone }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      // update localStorage
      const updatedUser = { ...stored, name: data.user.name, phone: data.user.phone };
      localStorage.setItem("foodbridgeUser", JSON.stringify(updatedUser));

      alert("Profile updated successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section style={{ paddingTop: 140 }}>
      <div style={{ width: '90%', maxWidth: 760, margin: '0 auto', background: 'white', padding: 28, borderRadius: 12 }}>
        <h2>Profile</h2>
        <form onSubmit={handleSave}>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', marginBottom: 6 }}>Full Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} style={{ width: '100%', padding: 10, borderRadius:8, border: '1px solid #e6e6e6' }} />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', marginBottom: 6 }}>Email</label>
            <input value={email} readOnly style={{ width: '100%', padding: 10, borderRadius:8, border: '1px solid #e6e6e6', background:'#f5f5f5' }} />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', marginBottom: 6 }}>Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} style={{ width: '100%', padding: 10, borderRadius:8, border: '1px solid #e6e6e6' }} />
          </div>

          <button className="donation-submit" type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save Profile'}</button>
        </form>
      </div>
    </section>
  );
}

export default Profile;
