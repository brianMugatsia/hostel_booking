import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./payment.css";

function Payment() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");

  const handlePayment = (e) => {
    e.preventDefault();

    if (!phone || !amount) {
      alert("Please fill in all fields");
      return;
    }

    // Frontend demo only
    alert("Payment request sent successfully ✅");
    navigate("/confirmation"); // optional next page
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center px-3">
      <div
        className="card shadow w-100 payment-card"
        style={{ maxWidth: "420px" }}
      >
        <div className="card-header bg-success text-white text-center">
          <h5 className="mb-0">M-Pesa Payment</h5>
          <small className="opacity-75">
            Complete your hostel booking
          </small>
        </div>

        <div className="card-body">
          <form onSubmit={handlePayment}>
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                inputMode="numeric"
                className="form-control form-control-lg"
                placeholder="2547XXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Amount (KES)</label>
              <input
                type="number"
                className="form-control form-control-lg"
                placeholder="e.g. 6000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-success btn-lg w-100"
            >
              Pay with M-Pesa
            </button>
          </form>

          <p className="text-muted text-center mt-3 mb-0 small">
            You will receive an M-Pesa prompt on your phone
          </p>
        </div>
      </div>
    </div>
  );
}

export default Payment;
