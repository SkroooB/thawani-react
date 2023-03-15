# 🛍 Thawani ECommerce Checkout Example 🛒
A simple React checkout component using Thawani ECommerce API.

Author: SkroooB

## Thawani Checkout Docs
https://docs.thawani.om/

## ⚙ Installation
To use this component in your own project, simply clone the repository and install the required dependencies:


`git clone https://github.com/SkroooB/thawani-react.git`
`cd thawani-react`

`npm install`
## 📚 Usage
In your main application file, import the Checkout component and include it in your component tree with the necessary props:

```
import "./App.css";
import Checkout from "./Checkout";

function App() {
  return (
    <div>
      <h1>Thawani ECommerce Checkout Example</h1>
      <Checkout
        apiKey="your-api-key"
        pubKey="your-public-key"
        client_reference_id="your-client-reference-id"
        products={[{ name: "product 1", quantity: 1, unit_amount: 10000 }]}
        success_url="http://localhost:3000/success"
        cancel_url="http://localhost:3000/canceled"
        metadata={{ "Customer name": "somename", "order id": 0 }}
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
      <button onClick={createCheckoutSession}>🛍 Proceed to Checkout</button>
      {sessionID && <p>🔑 Session ID: {sessionID}</ID}</p>}
</div>
);
};

export default Checkout;
```

## 📄 License

MIT License.

## 🌟 Acknowledgements

Special thanks to SkroooB and Social Mania Oman for their contributions to this example project.