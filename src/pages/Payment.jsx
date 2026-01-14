import React, { useState } from "react";

function Payment() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");

  const handlePayment = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, amount }),
      });
      const data = await response.json();
      alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Payment failed");
    }
  };

  return (
    <div className="container mt-4">
      <h3>M-Pesa Payment</h3>
      <form className="col-md-6" onSubmit={handlePayment}>
        <input
          type="tel"
          className="form-control mb-2"
          placeholder="2547XXXXXXXX"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-success">
          Pay with M-Pesa
        </button>
      </form>
    </div>
  );
}

export default Payment;
