import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const ASSET_BASE = import.meta.env.VITE_ASSET_BASE ?? "";

function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="initial-loader-screen">
        <div className="loader">
          <span className="loader-spinner"></span>
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="hero" id="home">
        <div className="watermark">FOODBRIDGE</div>

        <div className="hero-left">
          <span className="hero-tag">🌱 Food Rescue Platform</span>

          <h1>
            Save Food.
            <br />
            Feed Lives.
          </h1>

          <p>
            FoodBridge connects Restaurants, Convention Halls, Volunteers and
            NGOs to rescue surplus food and deliver it safely to poor families,
            street children and elderly people.
          </p>

          <div className="hero-buttons">
            <button className="donate-btn">Donate Food</button>
            <button className="volunteer-btn">Become Volunteer</button>
          </div>
        </div>

        <div className="hero-right">
          <img src={`${ASSET_BASE}/assets/images/hero.png`} alt="FoodBridge Hero" />
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="about" id="about">
        <div className="about-image">
          <img src={`${ASSET_BASE}/assets/images/about.png`} alt="About FoodBridge" />
        </div>

        <div className="about-content">
          <span className="section-tag">About FoodBridge</span>

          <h2>Together We Can Reduce Food Waste</h2>

          <p>
            Every day thousands of kilograms of fresh food are wasted by
            restaurants and convention halls, while many people sleep hungry.
          </p>

          <p>
            FoodBridge creates a bridge between food donors and volunteers so
            that surplus food reaches poor families, street children and
            elderly people before it is wasted.
          </p>

          <div className="about-cards">
            <div className="about-card">
              <i className="fa-solid fa-utensils"></i>
              <h3>Food Rescue</h3>
              <p>Rescue extra food before it becomes waste.</p>
            </div>

            <div className="about-card">
              <i className="fa-solid fa-hand-holding-heart"></i>
              <h3>Community Support</h3>
              <p>Volunteers help distribute food to people.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="how-it-works" id="how-it-works">
        <div className="section-title">
          <span>Working Process</span>
          <h2>How FoodBridge Works</h2>
        </div>

        <div className="steps">
          <div className="step">
            <i className="fa-solid fa-store"></i>
            <h3>Restaurant</h3>
            <p>Restaurant reports surplus food.</p>
          </div>

          <div className="step">
            <i className="fa-solid fa-building"></i>
            <h3>Convention Hall</h3>
            <p>Wedding & event food can also be donated.</p>
          </div>

          <div className="step">
            <i className="fa-solid fa-bell"></i>
            <h3>Notification</h3>
            <p>Nearby volunteers receive instant notification.</p>
          </div>

          <div className="step">
            <i className="fa-solid fa-truck-fast"></i>
            <h3>Collection</h3>
            <p>Volunteers collect food safely.</p>
          </div>

          <div className="step">
            <i className="fa-solid fa-heart"></i>
            <h3>Distribution</h3>
            <p>
              Food reaches poor people, street children and elderly people.
            </p>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="features" id="features">
        <div className="section-title">
          <span>Our Features</span>
          <h2>Why Choose FoodBridge?</h2>
        </div>

        <div className="feature-container">
          <div className="feature-card">
            <i className="fa-solid fa-bowl-food"></i>
            <h3>Food Rescue</h3>
            <p>Collect extra food before it is wasted.</p>
          </div>

          <div className="feature-card">
            <i className="fa-solid fa-store"></i>
            <h3>Restaurant Partner</h3>
            <p>
              Restaurants can instantly post available surplus food.
            </p>
          </div>

          <div className="feature-card">
            <i className="fa-solid fa-building"></i>
            <h3>Convention Hall</h3>
            <p>
              Wedding and event organizers can donate remaining food.
            </p>
          </div>

          <div className="feature-card">
            <i className="fa-solid fa-users"></i>
            <h3>Volunteer Network</h3>
            <p>
              Nearby volunteers receive notifications and collect food.
            </p>
          </div>

          <div className="feature-card">
            <i className="fa-solid fa-location-dot"></i>
            <h3>Location Based</h3>
            <p>
              Find the nearest food donation quickly and efficiently.
            </p>
          </div>

          <div className="feature-card">
            <i className="fa-solid fa-shield-heart"></i>
            <h3>Safe Distribution</h3>
            <p>
              Deliver food responsibly to people who truly need it.
            </p>
          </div>
        </div>
      </section>

      {/* ================= IMPACT ================= */}
      <section className="impact" id="impact">
        <div className="section-title">
          <span>Our Impact</span>
          <h2>Together We Can Make A Difference</h2>
        </div>

        <div className="counter-container">
          <div className="counter">
            <h3>250+</h3>
            <p>Meals Rescued</p>
          </div>

          <div className="counter">
            <h3>120+</h3>
            <p>Active Volunteers</p>
          </div>

          <div className="counter">
            <h3>35+</h3>
            <p>Restaurants</p>
          </div>

          <div className="counter">
            <h3>18+</h3>
            <p>Convention Halls</p>
          </div>

          <div className="counter">
            <h3>5000+</h3>
            <p>People Helped</p>
          </div>
        </div>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="mission">
        <div className="section-title">
          <span>Our Purpose</span>
          <h2>Mission & Vision</h2>
        </div>

        <div className="mission-container">
          <div className="mission-card">
            <i className="fa-solid fa-bullseye"></i>
            <h3>Our Mission</h3>
            <p>
              Reduce food waste by creating a digital bridge between food
              donors and volunteers so that surplus food reaches people in
              need safely and quickly.
            </p>
          </div>

          <div className="mission-card">
            <i className="fa-solid fa-eye"></i>
            <h3>Our Vision</h3>
            <p>
              Build a Bangladesh where no edible food is wasted while people
              remain hungry.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CORE VALUES ================= */}
      <section className="values">
        <div className="section-title">
          <span>Core Values</span>
          <h2>What We Believe</h2>
        </div>

        <div className="value-container">
          <div className="value-card">
            <i className="fa-solid fa-handshake"></i>
            <h3>Trust</h3>
            <p>We believe in honesty and transparency.</p>
          </div>

          <div className="value-card">
            <i className="fa-solid fa-seedling"></i>
            <h3>Sustainability</h3>
            <p>Less food waste means a healthier planet.</p>
          </div>

          <div className="value-card">
            <i className="fa-solid fa-users"></i>
            <h3>Community</h3>
            <p>Volunteers are the heart of FoodBridge.</p>
          </div>

          <div className="value-card">
            <i className="fa-solid fa-heart"></i>
            <h3>Humanity</h3>
            <p>Every rescued meal can change someone's day.</p>
          </div>
        </div>
      </section>

      {/* ================= FOOD SAFETY ================= */}
      <section className="food-safety">
        <div className="section-title">
          <span>Food Safety</span>
          <h2>Donation Guidelines</h2>
        </div>

        <div className="safety-box">
          <ul>
            <li>✔ Fresh and hygienic food only.</li>
            <li>✔ Food must be packed properly.</li>
            <li>✔ Expired food is strictly prohibited.</li>
            <li>✔ Volunteers inspect food before distribution.</li>
            <li>
              ✔ Priority goes to poor families, street children and elderly
              people.
            </li>
          </ul>
        </div>
      </section>

      {/* ================= CONTACT ================= */}
      <section className="contact" id="contact">
        <div className="section-title">
          <span>Get In Touch</span>
          <h2>Contact FoodBridge</h2>
          <p>
            Have surplus food or want to become a volunteer? Contact us today.
          </p>
        </div>

        <div className="contact-container">
          <div className="contact-card">
            <i className="fa-solid fa-location-dot"></i>
            <h3>Address</h3>
            <p>Sylhet, Bangladesh</p>
          </div>

          <div className="contact-card">
            <i className="fa-solid fa-phone"></i>
            <h3>Phone</h3>
            <p>+880 1700-000000</p>
          </div>

          <div className="contact-card">
            <i className="fa-solid fa-envelope"></i>
            <h3>Email</h3>
            <p>support@foodbridge.com</p>
          </div>
        </div>
      </section>

      {/* ================= PARTNERS ================= */}
      <section className="partners" id="partners">
        <div className="section-title">
          <span>Our Partners</span>
          <h2>Together We Can Make A Difference</h2>
          <p>
            FoodBridge works with restaurants, convention halls, NGOs and
            volunteers to reduce food waste.
          </p>
        </div>

        <div className="partner-container">
          <div className="partner-card">
            <i className="fa-solid fa-store"></i>
            <h3>Restaurant Partners</h3>
            <p>
              Restaurants can instantly report surplus food through FoodBridge.
            </p>
          </div>

          <div className="partner-card">
            <i className="fa-solid fa-building"></i>
            <h3>Convention Halls</h3>
            <p>
              Wedding and event organizers can donate extra meals safely.
            </p>
          </div>

          <div className="partner-card">
            <i className="fa-solid fa-handshake-angle"></i>
            <h3>NGO Partners</h3>
            <p>NGOs help distribute rescued food to people in need.</p>
          </div>

          <div className="partner-card">
            <i className="fa-solid fa-people-group"></i>
            <h3>Volunteer Team</h3>
            <p>
              Volunteers receive notifications and deliver food quickly.
            </p>
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="cta">
        <div className="cta-content">
          <h2>Every Meal Matters</h2>

          <p>
            Join FoodBridge today and help reduce food waste while bringing
            smiles to people who need it most.
          </p>

          <div className="cta-buttons">
            <button className="donate-btn">Donate Food</button>
            <button className="volunteer-btn">Join As Volunteer</button>
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section className="faq">
        <div className="section-title">
          <span>FAQ</span>
          <h2>Frequently Asked Questions</h2>
        </div>

        <div className="faq-container">
          <div className="faq-item">
            <h3>Who can donate food?</h3>
            <p>Restaurants, convention halls and event organizers.</p>
          </div>

          <div className="faq-item">
            <h3>Who receives the food?</h3>
            <p>
              Poor families, street children, elderly people and homeless
              people.
            </p>
          </div>

          <div className="faq-item">
            <h3>Is the food checked?</h3>
            <p>Yes. Volunteers inspect food before distribution.</p>
          </div>
        </div>
      </section>

      {/* ================= NEWSLETTER ================= */}
      <section className="newsletter">
        <div className="newsletter-content">
          <span>Stay Connected</span>
          <h2>Subscribe To FoodBridge</h2>

          <p>
            Get updates about food donation campaigns, volunteer activities and
            community events.
          </p>

          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email address"
            />

            <button type="submit">Subscribe</button>
          </form>
        </div>
      </section>

      {/* ================= TEAM ================= */}
      <section className="team">
        <div className="section-title">
          <span>Our Team</span>
          <h2>People Behind FoodBridge</h2>
        </div>

        <div className="team-container">
          <div className="team-card">
            <i className="fa-solid fa-user-tie"></i>
            <h3>Restaurant Manager</h3>
            <p>Publishes surplus food information.</p>
          </div>

          <div className="team-card">
            <i className="fa-solid fa-user-group"></i>
            <h3>Volunteer Leader</h3>
            <p>Coordinates food collection.</p>
          </div>

          <div className="team-card">
            <i className="fa-solid fa-truck"></i>
            <h3>Delivery Volunteer</h3>
            <p>Delivers food to people in need.</p>
          </div>

          <div className="team-card">
            <i className="fa-solid fa-user-shield"></i>
            <h3>Admin</h3>
            <p>Manages the FoodBridge platform.</p>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIAL ================= */}
      <section className="testimonial">
        <div className="section-title">
          <span>Testimonials</span>
          <h2>What People Say</h2>
        </div>

        <div className="testimonial-container">
          <div className="testimonial-card">
            <i className="fa-solid fa-quote-left"></i>
            <p>
              "FoodBridge helped us donate extra food instead of throwing it
              away."
            </p>
            <h4>Restaurant Owner</h4>
          </div>

          <div className="testimonial-card">
            <i className="fa-solid fa-quote-left"></i>
            <p>
              "Receiving notifications makes food collection much faster."
            </p>
            <h4>Volunteer</h4>
          </div>

          <div className="testimonial-card">
            <i className="fa-solid fa-quote-left"></i>
            <p>
              "This platform can reduce food waste and help thousands of
              people."
            </p>
            <h4>NGO Member</h4>
          </div>
        </div>
      </section>

      {/* ================= EMERGENCY NOTICE ================= */}
      <section className="notice">
        <div className="notice-box">
          <i className="fa-solid fa-circle-info"></i>

          <div>
            <h3>Emergency Food Collection</h3>

            <p>
              When restaurants or convention halls publish available surplus
              food, nearby volunteers receive a notification and collect the
              food as quickly as possible.
            </p>
          </div>
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="gallery">
        <div className="section-title">
          <span>Gallery</span>
          <h2>FoodBridge In Action</h2>

          <p>
            A glimpse of how restaurants, convention halls, volunteers and
            communities work together.
          </p>
        </div>

        <div className="gallery-container">
          <div className="gallery-card">
            <img src={`${ASSET_BASE}/assets/images/gallery-1.png`} alt="Restaurant" />
          </div>

          <div className="gallery-card">
            <img src={`${ASSET_BASE}/assets/images/gallery-2.jpg`} alt="Convention Hall" />
          </div>

          <div className="gallery-card">
            <img src={`${ASSET_BASE}/assets/images/gallery-3.jpg`} alt="Volunteer" />
          </div>

          <div className="gallery-card">
            <img src={`${ASSET_BASE}/assets/images/gallery-4.jpg`} alt="Food Donation" />
          </div>
        </div>
      </section>

      {/* ================= ACHIEVEMENTS ================= */}
      <section className="achievement">
        <div className="section-title">
          <span>Achievements</span>
          <h2>Our Journey So Far</h2>
        </div>

        <div className="achievement-container">
          <div className="achievement-card">
            <i className="fa-solid fa-award"></i>
            <h3>Best Social Idea</h3>
            <p>A smart initiative to reduce food waste.</p>
          </div>

          <div className="achievement-card">
            <i className="fa-solid fa-earth-asia"></i>
            <h3>Green Future</h3>
            <p>Helping build a sustainable Bangladesh.</p>
          </div>

          <div className="achievement-card">
            <i className="fa-solid fa-handshake"></i>
            <h3>Community Support</h3>
            <p>Bringing people together through kindness.</p>
          </div>
        </div>
      </section>

      {/* ================= MOTTO ================= */}
      <section className="motto">
        <h2>"Don't Waste Food. Share It."</h2>
        <p>Every extra meal can become someone's hope.</p>
      </section>

      {/* ================= DEVELOPER ================= */}
      <section className="developer">
        <div className="section-title">
          <span>About The Project</span>
          <h2>FoodBridge Project</h2>
        </div>

        <div className="developer-content">
          <p>
            FoodBridge is a social impact platform designed to reduce food
            waste by connecting Restaurants, Convention Halls and Volunteers.
            The goal is to deliver surplus food safely to poor families,
            homeless people, street children and elderly people.
          </p>

          <div className="developer-box">
            <div>
              <h3>Project Version</h3>
              <p>Version 1.0</p>
            </div>

            <div>
              <h3>Status</h3>
              <p>Frontend Development</p>
            </div>

            <div>
              <h3>Technology</h3>
              <p>HTML • CSS • JavaScript</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SCROLL TO TOP ================= */}
      <button id="scrollTopBtn">
        <i className="fa-solid fa-arrow-up"></i>
      </button>

      {/* ================= FLOATING DONATE ================= */}
      <div className="floating-donate">
        <a href="#home">
          <i className="fa-solid fa-hand-holding-heart"></i>
          Donate Now
        </a>
      </div>

      

      {/* ================= FOOTER ================= */}
      <footer>
        <div className="footer-container">
          <div className="footer-logo">
            <h2>FoodBridge</h2>

            <p>
              Connecting Surplus Food With People In Need.
            </p>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>

            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-social">
            <h3>Follow Us</h3>

            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin-in"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
              <a href="#"><i className="fab fa-github"></i></a>
            </div>
          </div>
        </div>

        <hr />

        <p className="copyright">
          © 2026 FoodBridge | All Rights Reserved.
        </p>
      </footer>
    </>
  );
}

export default Home;