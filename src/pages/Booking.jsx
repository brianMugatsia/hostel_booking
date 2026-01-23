import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Booking() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    regNumber: "",
    phoneNumber: "",
    userId: 1 // for testing, can be dynamic if you have login
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8082/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Booking submitted!");
        navigate("/payment");
      } else {
        alert("Failed to submit booking");
      }
    } catch (error) {
      console.error(error);
      alert("Error submitting booking");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Book Hostel</h3>
      <form className="col-md-6" onSubmit={handleBooking}>
        <input
          name="fullName"
          className="form-control mb-2"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          name="regNumber"
          className="form-control mb-2"
          placeholder="Registration Number"
          value={formData.regNumber}
          onChange={handleChange}
          required
        />
        <input
          name="phoneNumber"
          className="form-control mb-2"
          placeholder="Phone Number"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-success">
          Submit Booking
        </button>
      </form>
    </div>
  );
}

export default Booking;
