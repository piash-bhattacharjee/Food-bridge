import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("foodbridgeUser"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  if (!user) {
    return null;
  }

  const navItems = [
    {
      label: "Dashboard",
      icon: "fa-solid fa-house",
      action: () => navigate("/dashboard"),
      active: true,
    },
    {
      label: user.role === "donor" ? "Food Donations" : "Available Donations",
      icon: user.role === "donor" ? "fa-solid fa-utensils" : "fa-solid fa-bell",
      action: () =>
        navigate(user.role === "donor" ? "/food-donations" : "/available-donations"),
    },
    {
      label: "My Activities",
      icon: "fa-solid fa-list-check",
      action: () => navigate("/my-activities"),
    },
    {
      label: "Profile",
      icon: "fa-solid fa-user",
      action: () => navigate("/profile"),
    },
  ];

  const actionCards = [
    {
      title: user.role === "donor" ? "Donate Food" : "Available Donations",
      description:
        user.role === "donor"
          ? "Share surplus food with people who need it."
          : "Browse available food donations ready for pickup.",
      icon: "fa-solid fa-leaf",
      action: () =>
        navigate(user.role === "donor" ? "/food-donations" : "/available-donations"),
    },
    {
      title: "My Activities",
      description: "Track your donation work and activity history.",
      icon: "fa-solid fa-chart-line",
      action: () => navigate("/my-activities"),
    },
    {
      title: "Profile",
      description: "Update your information and account settings.",
      icon: "fa-solid fa-id-badge",
      action: () => navigate("/profile"),
    },
    {
      title: "Community",
      description: "Stay connected with the FoodBridge community.",
      icon: "fa-solid fa-people-group",
      action: () => navigate("/my-activities"),
    },
    {
      title: "Messages",
      description: "Review announcements and next steps.",
      icon: "fa-solid fa-envelope",
      action: () => navigate("/profile"),
    },
    {
      title: "Logout",
      description: "Sign out and secure your account.",
      icon: "fa-solid fa-right-from-bracket",
      action: () => {
        localStorage.removeItem("foodbridgeUser");
        localStorage.removeItem("foodbridgeToken");
        navigate("/login");
      },
    },
  ];

  return (
    <div className="dashboard-page">
      <aside className="dashboard-sidebar">
        <div className="dashboard-brand">
          <div className="brand-icon">
            <i className="fa-solid fa-hand-holding-heart"></i>
          </div>
          <div className="brand-text">
            <h1>FoodBridge</h1>
            <p>Connecting food with hope</p>
          </div>
        </div>

        <div className="dashboard-user-card">
          <div className="user-avatar">
            <i className="fa-solid fa-user"></i>
          </div>
          <div className="user-meta">
            <strong>{user.name}</strong>
            <span>{user.email}</span>
          </div>
          <span className="role-badge">{user.role}</span>
        </div>

        <nav className="dashboard-nav">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`dashboard-nav-item${item.active ? " active" : ""}`}
              onClick={item.action}
            >
              <i className={item.icon}></i>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="dashboard-logout"
          onClick={() => {
            localStorage.removeItem("foodbridgeUser");
            localStorage.removeItem("foodbridgeToken");
            navigate("/login");
          }}
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          Sign Out
        </button>
      </aside>

      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div>
            <p className="topbar-label">Welcome back</p>
          </div>
        </header>

        <section className="welcome-banner">
          <div className="welcome-copy">
            <span className="eyebrow">Good day, {user.role}</span>
            <h3>
              Hello, {user.name} <span>👋</span>
            </h3>
            <p>
              You're doing great work with FoodBridge. Use this space to manage donations,
              track activity, and keep your profile updated.
            </p>
          </div>

          <div className="welcome-metric">
            <div className="metric-chip">
              <div className="metric-icon">
                <i className="fa-solid fa-heart"></i>
              </div>
              <div>
                <p>Helping communities with every meal.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="feature-grid">
          {actionCards.map((card) => (
            <button
              key={card.title}
              type="button"
              className="feature-card"
              onClick={card.action}
            >
              <div className="card-icon">
                <i className={card.icon}></i>
              </div>
              <div>
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </button>
          ))}
        </section>

        <section className="account-panel">
          <div className="panel-header">
            <div>
              <h3>Account information</h3>
              <p>Here are your account details and current role settings.</p>
            </div>
          </div>

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
              <strong>{user.role}</strong>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
