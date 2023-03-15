import React, { useState } from "react";

const Checkout = ({
  apiKey,
  pubKey,
  client_reference_id,
  products,
  success_url,
  cancel_url,
  metadata,
}) => {
  const [sessionID, setSessionID] = useState(null);

  const createCheckoutSession = async () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "thawani-api-key": apiKey,
      },
      body: JSON.stringify({
        client_reference_id,
        mode: "payment",
        products,
        success_url,
        cancel_url,
        metadata,
      }),
    };

    try {
      const response = await fetch(
        "https://uatcheckout.thawani.om/api/v1/checkout/session",
        requestOptions
      );
      const data = await response.json();

      if (data.success) {
        setSessionID(data.data.session_id);
        window.location.href = `https://uatcheckout.thawani.om/pay/${data.data.session_id}?key=${pubKey}`;
      } else {
        console.error("Error creating checkout session:", data.description);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <div className="checkout">
      <button onClick={createCheckoutSession}>Proceed to Checkout</button>
      {sessionID && <p>Session ID: {sessionID}</p>}
    </div>
  );
};

export default Checkout;
