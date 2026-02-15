import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./booking.css";

function Booking() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    regNumber: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.regNumber.trim()) {
      newErrors.regNumber = "Registration number is required";
    }

    // Kenyan phone validation (07XXXXXXXX or 01XXXXXXXX)
    const phoneRegex = /^(07|01)[0-9]{8}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      newErrors.phoneNumber =
        "Enter a valid Kenyan phone number (07XXXXXXXX)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = (e) => {
    e.preventDefault();
    if (!validate()) return;

    navigate("/payment", { state: formData });
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center px-3 ">
      <div className="card shadow-lg border-0 w-100 booking-card">
        <div className="card-header   text-center py-4">
          <h4 className="mb-1 fw-bold text-white">Hostel Booking</h4>
          <small className="opacity-75 text-white">
            Please provide accurate details
          </small>
        </div>

        <div className="card-body p-4">
          <form onSubmit={handleBooking} noValidate>
            {/* Full Name */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Full Name
              </label>
              <input
                name="fullName"
                className={`form-control form-control-lg ${
                  errors.fullName && "is-invalid"
                }`}
                placeholder="brian mugatsia"
                value={formData.fullName}
                onChange={handleChange}
              />
              <div className="invalid-feedback">
                {errors.fullName}
              </div>
            </div>

            {/* Registration Number */}
            <div className="mb-3">
              <label className="form-label fw-semibold">
                Registration Number
              </label>
              <input
                name="regNumber"
                className={`form-control form-control-lg ${
                  errors.regNumber && "is-invalid"
                }`}
                placeholder="TMC/000/24"
                value={formData.regNumber}
                onChange={handleChange}
              />
              <div className="invalid-feedback">
                {errors.regNumber}
              </div>
            </div>

            {/* Phone */}
            <div className="mb-4">
              <label className="form-label fw-semibold">
                Phone Number
              </label>
              <input
                name="phoneNumber"
                type="tel"
                className={`form-control form-control-lg ${
                  errors.phoneNumber && "is-invalid"
                }`}
                placeholder="07XXXXXXXX"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <div className="invalid-feedback">
                {errors.phoneNumber}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-success btn-lg w-100 fw-semibold shadow-sm"
            >
              Continue to Payment →
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Booking;
