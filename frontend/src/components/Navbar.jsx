import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const stored = JSON.parse(localStorage.getItem("foodbridgeUser"));

  const handleLogout = () => {
    localStorage.removeItem("foodbridgeUser");
    localStorage.removeItem("foodbridgeToken");
    navigate("/login");
  };

  return (
    <header>
      <nav className="navbar">

        <div className="logo">
          <i className="fa-solid fa-hand-holding-heart"></i>

          <div>
            <h2>FoodBridge</h2>
            <small>Save Food • Feed Lives</small>
          </div>
        </div>

        <ul className="nav-menu">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#impact">Impact</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div className="nav-buttons">
          {!stored ? (
            <>
              <Link to="/login" className="login-btn">Login</Link>
              <Link to="/register" className="register-btn">Register</Link>
            </>
          ) : (
            <button onClick={handleLogout} className="login-btn">Logout</button>
          )}
        </div>

      </nav>
    </header>
  );
}

export default Navbar;