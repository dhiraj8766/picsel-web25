// src/pages/ContactPage.jsx
import React, { useState } from "react";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiSend
} from "react-icons/fi";
import "./ContactPage.css";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Your message has been sent!");
  };

  return (
    <div className="contact-page">
      <h1 className="contact-title">Contact Us</h1>
      <p className="contact-subtitle">
        We're here to help — reach out to our committee anytime.
      </p>

      {/* --- Contact Container --- */}
      <div className="contact-wrapper">

        {/* ----- Contact Info Box ----- */}
        <div className="contact-info">
          <h2>Get in Touch</h2>

          <div className="info-item">
            <FiMail />
            <span>support@college.com</span>
          </div>
          <div className="info-item">
            <FiPhone />
            <span>+91 98765 43210</span>
          </div>
          <div className="info-item">
            <FiMapPin />
            <span>College Campus, Maharashtra</span>
          </div>
        </div>

        {/* ----- Form Box ----- */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send Message</h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <textarea
            name="message"
            placeholder="Type your message..."
            required
            value={formData.message}
            onChange={handleChange}
          ></textarea>

          <button type="submit" className="send-btn">
            Send Message <FiSend />
          </button>
        </form>

      </div>
    </div>
  );
}
