import { useState } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${API}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      // Save logged-in user and token
      localStorage.setItem("foodbridgeUser", JSON.stringify(data.user));
      if (data.token) localStorage.setItem("foodbridgeToken", data.token);

      alert("Login successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);
      alert("Server connection failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-page">
      <div className="overlay"></div>

      <div className="login-card">

        {/* Logo */}
        <div
          className="logo"
          style={{
            display: "block",
            textAlign: "center",
          }}
        >
          <div className="logo-icon">
            <i className="fa-solid fa-hand-holding-heart"></i>
          </div>

          <h2>FoodBridge</h2>

          <p>Connecting Food With Hope</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>

          {/* Email */}
          <div className="input-box">
            <i className="fa-solid fa-envelope"></i>

            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="input-box">
            <i className="fa-solid fa-lock"></i>

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <span
              className="toggle-password"
              onClick={(e) => {
                const input =
                  e.currentTarget.parentElement.querySelector(
                    "input"
                  );

                const icon =
                  e.currentTarget.querySelector("i");

                if (input.type === "password") {
                  input.type = "text";

                  icon.classList.remove("fa-eye");
                  icon.classList.add("fa-eye-slash");
                } else {
                  input.type = "password";

                  icon.classList.remove("fa-eye-slash");
                  icon.classList.add("fa-eye");
                }
              }}
            >
              <i className="fa-solid fa-eye"></i>
            </span>
          </div>

          {/* Options */}
          <div className="options">

            <label>
              <input type="checkbox" />
              Remember Me
            </label>

            <a href="#">
              Forgot Password?
            </a>

          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="loader">
                <span className="loader-spinner"></span>
                Loading...
              </span>
            ) : (
              "Login"
            )}
          </button>

        </form>

        {/* Register Link */}
        <div className="bottom-links">
          <p>
            Don't have an account?{" "}

            <Link to="/register">
              Register Now
            </Link>
          </p>
        </div>

        {/* Back Home */}
        <div className="back-home">
          <Link to="/">
            <i className="fa-solid fa-arrow-left"></i>
            Back to Home
          </Link>
        </div>

      </div>
    </section>
  );
}

export default Login;