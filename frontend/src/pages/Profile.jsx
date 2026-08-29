import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Profile() {
  const navigate = useNavigate();

  const storedUser = (() => {
    try {
      const stored = localStorage.getItem("foodbridgeUser");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  })();

  const [user, setUser] = useState(storedUser);
  const [name, setName] = useState(storedUser?.name || "");
  const [email, setEmail] = useState(storedUser?.email || "");
  const [phone, setPhone] = useState(storedUser?.phone || "");
  const [role, setRole] = useState(storedUser?.role || "");
  const [loading, setLoading] = useState(false);
  const [profileLoading, setProfileLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("foodbridgeToken");

    if (!token) {
      setProfileLoading(false);
      setErrorMessage("Please log in to view your profile.");
      return;
    }

    const fetchProfile = async () => {
      setProfileLoading(true);

      try {
        const res = await fetch(`${API}/api/auth/profile`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          setErrorMessage(data.message || "Unable to load profile.");
          console.error("Unable to load profile:", res.status, data);
          return;
        }

        const profile = data.user;

        if (!profile) {
          setErrorMessage("Profile data is missing.");
          return;
        }

        // Set current logged-in user's information
        setUser(profile);
        setName(profile.name || "");
        setEmail(profile.email || "");
        setPhone(profile.phone || "");
        setRole(profile.role || "");

        // Keep localStorage synchronized with backend data
        localStorage.setItem("foodbridgeUser", JSON.stringify(profile));
      } catch (error) {
        console.error("Profile fetch error:", error);
        setErrorMessage("Profile fetch error: " + error.message);
      } finally {
        setProfileLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("foodbridgeToken");

      const res = await fetch(`${API}/api/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ name, phone }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Update failed");
      }

      const updatedUser = {
        ...user,
        name: data.user.name,
        phone: data.user.phone,
        email: data.user.email,
        role: data.user.role,
      };

      localStorage.setItem(
        "foodbridgeUser",
        JSON.stringify(updatedUser)
      );

      setUser(updatedUser);
      setName(data.user.name);
      setEmail(data.user.email);
      setPhone(data.user.phone);
      setRole(data.user.role);
      setIsEditing(false);

      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  // Prefer fetched `user` but fall back to `storedUser` so the card appears immediately after navigation.
  const displayUser = user || storedUser || {};
  const displayName = name || displayUser.name || "";
  const displayEmail = email || displayUser.email || "";
  const displayPhone = phone || displayUser.phone || "";
  const displayRole = role || displayUser.role || "";

  if (profileLoading && !displayEmail) {
    return (
      <section className="profile-page" style={{ paddingTop: 140 }}>
        <div className="profile-card" style={{ width: "90%", maxWidth: 760, margin: "0 auto" }}>
          <h2 style={{ fontWeight: 700, marginBottom: 20 }}>Profile</h2>
          <p style={{ fontWeight: 700, fontSize: 16 }}>Loading profile...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="profile-page" style={{ paddingTop: 140 }}>
      <div className="profile-card" style={{ width: "90%", maxWidth: 760, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, gap: 12 }}>
          <h2 style={{ fontWeight: 700, margin: 0 }}>Profile</h2>

          {!isEditing && (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              style={{
                background: "#00A86B",
                color: "#fff",
                border: "none",
                padding: "10px 16px",
                borderRadius: 10,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Edit Profile
            </button>
          )}
        </div>

        {isEditing ? (
          <form onSubmit={handleSave} style={{ display: "grid", gap: 18 }}>
            <div>
              <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
                style={{ opacity: 0.8, cursor: "not-allowed" }}
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div>
              <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Role</label>
              <input
                type="text"
                value={displayRole || "-"}
                disabled
                style={{ opacity: 0.8, cursor: "not-allowed", textTransform: "capitalize" }}
              />
            </div>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: "#00A86B",
                  color: "#fff",
                  border: "none",
                  borderRadius: 10,
                  padding: "12px 18px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>

              <button
                type="button"
                onClick={() => setIsEditing(false)}
                style={{
                  background: "#e2e8f0",
                  color: "#0f172a",
                  border: "none",
                  borderRadius: 10,
                  padding: "12px 18px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="account-card">
            <div className="account-row">
              <span>Name</span>
              <strong>{displayName || '-'}</strong>
            </div>

            <div className="account-row">
              <span>Email</span>
              <strong>{displayEmail || '-'}</strong>
            </div>

            <div className="account-row">
              <span>Phone</span>
              <strong>{displayPhone || '-'}</strong>
            </div>

            <div className="account-row">
              <span>Role</span>
              <strong style={{ textTransform: 'capitalize' }}>{displayRole || '-'}</strong>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Profile;