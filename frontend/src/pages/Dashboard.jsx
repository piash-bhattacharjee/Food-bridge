import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("foodbridgeUser")
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  const handleLogout = () => {
    localStorage.removeItem("foodbridgeUser");
    localStorage.removeItem("foodbridgeToken");
    navigate("/login");
  };

  if (!user) {
    return null;
  }

  const donorCards = [
    {
      title: "Donate Food",
      description: "Share surplus food with people in need.",
      action: () => navigate("/food-donations"),
    },
    {
      title: "My Donations",
      description: "View the donations you have created.",
      action: () => navigate("/my-activities"),
    },
    {
      title: "My Activities",
      description: "Track your donation activity.",
      action: () => navigate("/my-activities"),
    },
    {
      title: "Profile",
      description: "Manage your account details.",
      action: () => navigate("/profile"),
    },
    {
      title: "Logout",
      description: "Sign out from your account.",
      action: handleLogout,
    },
  ];

  const volunteerCards = [
    {
      title: "Available Donations",
      description: "Browse available food donations.",
      action: () => navigate("/available-donations"),
    },
    {
      title: "My Activities",
      description: "See accepted donations.",
      action: () => navigate("/my-activities"),
    },
    {
      title: "Profile",
      description: "Manage your account details.",
      action: () => navigate("/profile"),
    },
    {
      title: "Logout",
      description: "Sign out from your account.",
      action: handleLogout,
    },
  ];

  const cards = user.role === "donor" ? donorCards : volunteerCards;

  return (
    <div className="dashboard-page">

      {/* Sidebar */}
      <aside className="dashboard-sidebar">

        <div className="dashboard-logo">
          <div className="logo-icon">
            <i className="fa-solid fa-hand-holding-heart"></i>
          </div>

          <div>
            <h2>FoodBridge</h2>
            <p>Connecting Food With Hope</p>
          </div>
        </div>

        <nav className="dashboard-nav">

          <button className="active">
            <i className="fa-solid fa-house"></i>
            Dashboard
          </button>

          {user.role === "donor" ? (
            <button onClick={() => navigate("/food-donations")}> 
              <i className="fa-solid fa-utensils"></i>
              Food Donations
            </button>
          ) : (
            <button onClick={() => navigate("/available-donations")}> 
              <i className="fa-solid fa-bell"></i>
              Available Donations
            </button>
          )}

          <button onClick={() => navigate("/my-activities") }>
            <i className="fa-solid fa-hand-holding-heart"></i>
            My Activities
          </button>

          <button onClick={() => navigate("/profile") }>
            <i className="fa-solid fa-user"></i>
            Profile
          </button>

        </nav>

        <button
          className="dashboard-logout"
          onClick={handleLogout}
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          Logout
        </button>

      </aside>

      {/* Main Content */}
      <main className="dashboard-main">

        {/* Topbar */}
        <header className="dashboard-topbar">

          <div>
            <h1>Dashboard</h1>
          </div>

          <div className="dashboard-user">

            <div className="user-avatar">
              <i className="fa-solid fa-user"></i>
            </div>

            <div>
              <strong>{user.name}</strong>
              <span>{user.role}</span>
            </div>

            <div className="dashboard-corner-logo" aria-hidden>
              <div className="logo-icon small">
                <i className="fa-solid fa-hand-holding-heart"></i>
              </div>
            </div>

          </div>


        </header>

        {/* Welcome */}
        <section className="welcome-card">

          <div>
            <h2>
              Hello, {user.name} 👋
            </h2>

            <p>
              Thank you for being part of FoodBridge.
              Together we can connect surplus food with
              people who need it.
            </p>
          </div>

          <i className="fa-solid fa-heart"></i>

        </section>

        {/* Cards */}
        <section className="dashboard-stats">
          {cards.map((card) => (
            <div key={card.title} className="stat-card" onClick={card.action} style={{ cursor: "pointer" }}>
              <div className="stat-icon">
                <i className="fa-solid fa-circle-check"></i>
              </div>

              <div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Account Information */}
        <section className="account-section">

          <h2>Account Information</h2>

          <div className="account-card">

            <div className="account-row">
              <span>Name</span>
              <strong>{user.name}</strong>
            </div>

            <div className="account-row">
              <span>Email</span>
              <strong>{user.email}</strong>
            </div>

            <div className="account-row">
              <span>Role</span>
              <strong className="role-badge">
                {user.role}
              </strong>
            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default Dashboard;