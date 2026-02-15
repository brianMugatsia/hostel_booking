import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./payment.css";

function Payment() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    const phoneRegex = /^(2547|2541)[0-9]{8}$/;

    if (!phoneRegex.test(phone)) {
      newErrors.phone =
        "Enter valid format (2547XXXXXXXX)";
    }

    if (!amount || amount <= 0) {
      newErrors.amount = "Enter a valid amount";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePayment = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    // Simulated API call
    setTimeout(() => {
      setLoading(false);
      navigate("/confirmation");
    }, 2500);
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center px-3 payment-bg">
      <div className="card w-100 payment-card">
        <div className="card-header text-center py-3">
          <h5 className="mb-1 fw-bold">M-Pesa Secure Payment</h5>
          <small>Complete your hostel booking</small>
        </div>

        <div className="card-body p-4">
          <form onSubmit={handlePayment} noValidate>

            {/* Phone */}
            <div className="mb-3">
              <label className="form-label text-dark fw-semibold">
                M-Pesa Phone Number
              </label>
              <input
                type="tel"
                className={`form-control ${
                  errors.phone && "is-invalid"
                }`}
                placeholder="2547XXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <div className="invalid-feedback">
                {errors.phone}
              </div>
            </div>

            {/* Amount */}
            <div className="mb-4">
              <label className="form-label text-dark fw-semibold">
                Amount (KES)
              </label>
              <input
                type="number"
                className={`form-control ${
                  errors.amount && "is-invalid"
                }`}
                placeholder="6000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
              <div className="invalid-feedback">
                {errors.amount}
              </div>
            </div>

            <button
              type="submit"
              className="btn w-100 payment-btn text-dark btn-outline-success"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Processing...
                </>
              ) : (
                "Pay with M-Pesa"
              )}
            </button>
          </form>

          <p className="text-center mt-3 small secure-text">
               Secure & Encrypted Transaction
          </p>
        </div>
      </div>
    </div>
  );
}

export default Payment;
