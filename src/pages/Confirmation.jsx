import React from "react";
import { useNavigate } from "react-router-dom";
import "./confirmation.css";

function Confirmation() {
  const navigate = useNavigate();

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center px-3">
      <div
        className="card shadow w-100 confirmation-card"
        style={{ maxWidth: "420px" }}
      >
        <div className="card-header bg-success text-white text-center">
          <h5 className="mb-0">Booking Confirmed 🎉</h5>
        </div>

        <div className="card-body text-center">
          <div className="success-icon mb-3">✓</div>

          <h6 className="mb-2">Payment Successful</h6>
          <p className="text-muted small">
            Your hostel booking has been completed successfully.
          </p>

          <hr />

          <div className="text-start small mb-3">
            <p className="mb-1">
              <strong>Status:</strong> Confirmed
            </p>
            <p className="mb-1">
              <strong>Payment Method:</strong> M-Pesa
            </p>
            <p className="mb-0">
              <strong>Reference:</strong> MPESA-XXXX
            </p>
          </div>

          <button
            className="btn btn-success btn-lg w-100 mb-2"
            onClick={() => navigate("/")}
          >
            Go to Home
          </button>

          <button
            className="btn btn-outline-secondary w-100"
            onClick={() => navigate("/booking")}
          >
            Book Another Hostel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
