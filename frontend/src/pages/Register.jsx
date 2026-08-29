import { useState } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Check password match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API}/api/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            password,
            role,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      // Account created successfully
      localStorage.setItem("foodbridgeUser", JSON.stringify(data.user));
      if (data.token) localStorage.setItem("foodbridgeToken", data.token);
      alert("Account created successfully!");

      // Redirect to dashboard based on role
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration Error:", error);
      alert("Server connection failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="register-page">
      <div className="overlay"></div>

      <div className="register-card">

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

        {/* Register Form */}
        <form onSubmit={handleRegister}>

          {/* Full Name */}
          <div className="input-box">
            <i className="fa-solid fa-user"></i>

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Email */}
          <div className="input-box">
            <i className="fa-solid fa-envelope"></i>

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Phone */}
          <div className="input-box">
            <i className="fa-solid fa-phone"></i>

            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="input-box">
            <i className="fa-solid fa-lock"></i>

            <input
              type="password"
              placeholder="Create Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <span
              className="toggle-password"
              onClick={(e) => {
                const input =
                  e.currentTarget.parentElement.querySelector("input");
                const icon = e.currentTarget.querySelector("i");

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

          {/* Confirm Password */}
          <div className="input-box">
            <i className="fa-solid fa-lock"></i>

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <span
              className="toggle-password"
              onClick={(e) => {
                const input =
                  e.currentTarget.parentElement.querySelector("input");
                const icon = e.currentTarget.querySelector("i");

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

          {/* Role */}
          <div className="role-box">

            <h4>Select Your Role</h4>

            <div className="role-cards">

              {/* Donor */}
              <label className="role-card">
                <input
                  type="radio"
                  name="role"
                  value="donor"
                  checked={role === "donor"}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />

                <i className="fa-solid fa-hand-holding-heart"></i>

                <span>Donor</span>
              </label>

              {/* Volunteer */}
              <label className="role-card">
                <input
                  type="radio"
                  name="role"
                  value="volunteer"
                  checked={role === "volunteer"}
                  onChange={(e) => setRole(e.target.value)}
                />

                <i className="fa-solid fa-user-group"></i>

                <span>Volunteer</span>
              </label>

            </div>
          </div>

          {/* Terms */}
          <div className="terms">

            <label>
              <input type="checkbox" required />

              I agree to{" "}
              <a href="#">Terms & Conditions</a>
            </label>

          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="register-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="loader">
                <span className="loader-spinner"></span>
                Loading...
              </span>
            ) : (
              "Create Account"
            )}
          </button>

        </form>

        {/* Bottom Links */}
        <div className="bottom-links">

          <p>
            Already have an account?{" "}

            <Link to="/login">
              Login
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

export default Register;