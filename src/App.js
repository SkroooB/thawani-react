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
