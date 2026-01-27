import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Booking() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    regNumber: "",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.regNumber || !formData.phoneNumber) {
      alert("Please fill in all fields");
      return;
    }

    navigate("/payment", { state: formData });
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center px-3">
      <div
        className="card shadow w-100 booking-card"
        style={{ maxWidth: "420px" }}
      >
        <div className="card-header bg-success text-white text-center">
          <h5 className="mb-0">Book a Hostel</h5>
          <small className="opacity-75">
            Enter your details to continue
          </small>
        </div>

        <div className="card-body">
          <form onSubmit={handleBooking}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                name="fullName"
                className="form-control form-control-lg"
                placeholder="John Doe"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Registration Number</label>
              <input
                name="regNumber"
                className="form-control form-control-lg"
                placeholder="SIT/1234/24"
                value={formData.regNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Phone Number</label>
              <input
                name="phoneNumber"
                type="tel"
                inputMode="numeric"
                className="form-control form-control-lg"
                placeholder="07XXXXXXXX"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-success btn-lg w-100">
              Continue to Payment →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Booking;
