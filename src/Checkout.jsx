import React, { useState } from "react";

// Define the Checkout component
const Checkout = ({
  apiKey, // Thawani API key
  pubKey, // Thawani Public key
  client_reference_id, // Unique client reference ID
  products, // Array of products to be purchased
  success_url, // URL to redirect users to upon successful payment
  cancel_url, // URL to redirect users to if they cancel the payment
  metadata, // Additional metadata to be passed with the request
}) => {
  const [sessionID, setSessionID] = useState(null); // State to store the session ID

  // Function to create a checkout session
  const createCheckoutSession = async () => {
    // Prepare the request options for the POST request
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
      // Make a POST request to create a checkout session
      const response = await fetch(
        "https://uatcheckout.thawani.om/api/v1/checkout/session",
        requestOptions
      );
      const data = await response.json();

      // Check if the session was created successfully
      if (data.success) {
        setSessionID(data.data.session_id); // Update the session ID state
        // Redirect the user to the Thawani payment page
        window.location.href = `https://uatcheckout.thawani.om/pay/${data.data.session_id}?key=${pubKey}`;
      } else {
        console.error("Error creating checkout session:", data.description);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  // Render the Checkout component
  return (
    <div className="checkout">
      <button onClick={createCheckoutSession}>Proceed to Checkout</button>
      {sessionID && <p>Session ID: {sessionID}</p>}
    </div>
  );
};

export default Checkout;
