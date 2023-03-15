# 🛍 Thawani ECommerce Checkout 🛒
A simple React checkout component using Thawani ECommerce API.

Author: SkroooB

## Thawani Checkout Docs
https://docs.thawani.om/

## ⚙ Installation
To use this component in your own project, simply clone the repository and install the required dependencies:

```
git clone https://github.com/SkroooB/thawani-react.git
cd thawani-react
npm install
```

## 📚 Usage
In your main application file, import the Checkout component and include it in your component tree with the necessary props:

```
import "./App.css";
import Checkout from "./Checkout";

// Define the App component
function App() {
  return (
    <div>
      <h1>Thawani ECommerce Checkout Example</h1>
      {/* Render the Checkout component with necessary props */}
      <Checkout
        apiKey="rRQ26GcsZzoEhbrP2HZvLYDbn9C9et" // Thawani API key
        pubKey='HGvTMLDssJghr9tlN9gr4DVYt0qyBy' // Thawani Public key
        client_reference_id="123123" // Unique client reference ID
        products={[ // Array of products to be purchased
          { name: "product 1", quantity: 1, unit_amount: 10000 }
        ]}
        success_url="http://localhost:3000/success" // URL to redirect users to upon successful payment
        cancel_url="http://localhost:3000/canceled" // URL to redirect users to if they cancel the payment
        metadata={{ // Additional metadata to be passed with the request
          "Customer name": "somename",
          "order id": 0
        }}
      />
    </div>
  );
}

export default App;
```

Replace your-api-key, your-public-key, and your-client-reference-id with your actual Thawani API key, public key, and client reference ID, respectively.

The products prop should be an array of objects with name, quantity, and unit_amount properties.

The success_url and cancel_url props should contain the URLs to redirect the customer to after a successful or canceled payment, respectively.

The metadata prop should be an object containing any additional data you want to associate with the checkout session.

## 💡 Example Component
The Checkout creates a checkout session and redirects the customer to Thawani's checkout page.

```
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
```

## 📄 License

MIT License.

## 🌟 Acknowledgements

Special thanks to SkroooB and Social Mania Oman for their contributions.