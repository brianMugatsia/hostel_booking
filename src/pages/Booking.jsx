import React from "react";
import { useNavigate } from "react-router-dom";

function Booking() {
  const navigate = useNavigate();

  const handleBooking = (e) => {
    e.preventDefault();
    // You can save booking info to backend here
    alert("Booking submitted!");
    navigate("/payment"); // Redirect to Payment page
  };

  return (
    <div className="container mt-4">
      <h3>Book Hostel</h3>
      <form className="col-md-6" onSubmit={handleBooking}>
        <input className="form-control mb-2" placeholder="Full Name" required />
        <input className="form-control mb-2" placeholder="Registration Number" required />
        <input className="form-control mb-2" placeholder="Phone Number" required />
        <button type="submit" className="btn btn-success">
          Submit Booking
        </button>
      </form>
    </div>
  );
}

export default Booking;
