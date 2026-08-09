import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function FoodDonations() {
  const navigate = useNavigate();
  const user = JSON.parse(
    localStorage.getItem("foodbridgeUser")
  );

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate, user]);

  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [foodType, setFoodType] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleDonation = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login first.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("foodbridgeToken");
      const response = await fetch(`${API}/api/donations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ foodName, quantity, foodType, pickupLocation, description }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSuccessMsg("");
        alert(data.message || "Donation failed.");
        return;
      }

      setSuccessMsg("Food donation submitted successfully! ❤️");

      setFoodName("");
      setQuantity("");
      setFoodType("");
      setPickupLocation("");
      setDescription("");
    } catch (error) {
      console.error("Donation Error:", error);
      alert(
        "Server connection failed. Make sure backend is running on port 5000."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <section className="donation-page">

      <div className="donation-card">

        <div className="donation-header">
          <i className="fa-solid fa-hand-holding-heart"></i>

          <h1>Food Donation</h1>

          <p>
            Share surplus food with people who need it.
          </p>
        </div>

        <form onSubmit={handleDonation}>

          {successMsg && (
            <div style={{ background: '#e6ffef', padding: 10, borderRadius:8, marginBottom:12, color:'#085d33' }}>
              {successMsg} <a href="/my-activities" style={{ marginLeft: 12 }}>View My Activities</a>
            </div>
          )}

          <div className="donation-input">
            <label>Food Name</label>

            <input
              type="text"
              placeholder="e.g. Cooked Rice"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              required
            />
          </div>

          <div className="donation-input">
            <label>Quantity</label>

            <input
              type="text"
              placeholder="e.g. 10 plates"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          <div className="donation-input">
            <label>Food Type</label>

            <select
              value={foodType}
              onChange={(e) => setFoodType(e.target.value)}
              required
            >
              <option value="">Select Food Type</option>
              <option value="Cooked Food">Cooked Food</option>
              <option value="Dry Food">Dry Food</option>
              <option value="Fruits">Fruits</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="donation-input">
            <label>Pickup Location</label>

            <input
              type="text"
              placeholder="Enter pickup location"
              value={pickupLocation}
              onChange={(e) =>
                setPickupLocation(e.target.value)
              }
              required
            />
          </div>

          <div className="donation-input">
            <label>Description</label>

            <textarea
              placeholder="Additional information..."
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              rows="4"
            />
          </div>

          <button
            type="submit"
            className="donation-submit"
            disabled={loading}
          >
            <i className="fa-solid fa-heart"></i>

            {loading
              ? "Submitting..."
              : "Submit Donation"}
          </button>

        </form>

      </div>

    </section>
  );
}

export default FoodDonations;