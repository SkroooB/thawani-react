import "./App.css";
import Checkout from "./Checkout";

function App() {
  return (
    <div>
      <h1>Thawani ECommerce Checkout Example</h1>
      <Checkout
        apiKey="rRQ26GcsZzoEhbrP2HZvLYDbn9C9et"
        pubKey='HGvTMLDssJghr9tlN9gr4DVYt0qyBy'
        client_reference_id="123123"
        products={[{ name: "product 1", quantity: 1, unit_amount: 10000 }]}
        success_url="http://localhost:3000/success"
        cancel_url="http://localhost:3000/canceled"
        metadata={{ "Customer name": "somename", "order id": 0 }}
      />
    </div>
  );
}

export default App;
