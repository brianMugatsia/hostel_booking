import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "./confirmation.css";

function Confirmation() {
  const navigate = useNavigate();
  const location = useLocation();

  const bookingData = location.state || {
    fullName: "Guest User",
    phone: "2547XXXXXXXX",
    amount: "6000",
  };

  // Generate reference ONLY once
  const [reference] = useState(() => {
    return (
      "MPESA-" +
      Math.floor(100000 + Math.random() * 900000)
    );
  });

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("HOSTEL BOOKING RECEIPT", 20, 20);

    doc.setFontSize(12);
    doc.text(`Name: ${bookingData.fullName}`, 20, 40);
    doc.text(`Phone: ${bookingData.phone}`, 20, 50);
    doc.text(`Amount Paid: KES ${bookingData.amount}`, 20, 60);
    doc.text(`Payment Method: M-Pesa`, 20, 70);
    doc.text(`Reference: ${reference}`, 20, 80);
    doc.text(`Status: Confirmed`, 20, 90);

    doc.save("Hostel-Booking-Receipt.pdf");
  };

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center confirmation-bg px-3">
      <div className="card confirmation-card w-100">
        <div className="card-body text-center p-4">

          <div className="success-icon mb-3">✓</div>

          <h5 className="fw-bold success-title">
            Payment Successful
          </h5>

          <p className="small text-muted">
            Your hostel booking has been confirmed.
          </p>

          <div className="details-box text-start mt-4 mb-4">
            <p><strong>Name:</strong> {bookingData.fullName}</p>
            <p><strong>Phone:</strong> {bookingData.phone}</p>
            <p><strong>Amount:</strong> KES {bookingData.amount}</p>
            <p><strong>Reference:</strong> {reference}</p>
          </div>

          <button
            className="btn confirm-btn btn-success w-100 mb-2"
            onClick={generatePDF}
          >
            Download Receipt (PDF)
          </button>

          <button
            className="btn btn-outline-success w-100"
            onClick={() => navigate("/")}
          >
            Go to Home
          </button>

        </div>
      </div>
    </div>
  );
}

export default Confirmation;
