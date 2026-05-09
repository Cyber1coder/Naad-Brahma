// src/components/PaymentCard.jsx

function PaymentCard({ payment }) {
  return (
    <div className="payment-card">

      <h3>
        {payment.month} / {payment.year}
      </h3>

      <p>
        Total Fee: ₹{payment.total_fee}
      </p>

      <p>
        Fees Given: ₹{payment.fees_given}
      </p>

      <p>
        Remaining: ₹{payment.remaining}
      </p>

      <p>
        Payment Mode: {payment.payment_mode}
      </p>

      <p>
        Paid Date:{" "}
        {new Date(payment.paid_date).toLocaleDateString()}
      </p>

    </div>
  );
}

export default PaymentCard;