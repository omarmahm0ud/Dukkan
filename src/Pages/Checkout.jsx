import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext.jsx";
import { createOrder } from "../services/api.js";

function Checkout() {
  var { items, total, clearCart } = useCart();
  var [form, setForm] = useState({ name: "", phone: "", address: "" });
  var [sending, setSending] = useState(false);
  var [error, setError] = useState("");
  var [orderId, setOrderId] = useState(null);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSending(true);
    setError("");
    createOrder(items)
      .then(function (order) {
        setOrderId(order.id);
        clearCart();
      })
      .catch(function (err) {
        setError(err.message);
      })
      .finally(function () {
        setSending(false);
      });
  }

  if (orderId) {
    return (
      <div className="container section center">
        <h1>Thank you, {form.name}!</h1>
        <p>Your order number is #{orderId}. We will call you on {form.phone} to confirm.</p>
        <Link to="/products" className="btn">
          Continue shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container section center">
        <h1>Nothing to check out</h1>
        <Link to="/products" className="btn">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="container section">
      <h1>Checkout</h1>
      <div className="cart-layout">
        <form className="form" onSubmit={handleSubmit}>
          <label>
            Full name
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Phone number
            <input name="phone" value={form.phone} onChange={handleChange} required />
          </label>
          <label>
            Delivery address
            <textarea name="address" rows="3" value={form.address} onChange={handleChange} required />
          </label>
          {error && <p className="error">{error}</p>}
          <button className="btn btn-full" disabled={sending}>
            {sending ? "Placing order..." : "Place order"}
          </button>
        </form>
        <aside className="summary">
          <h2>Order summary</h2>
          {items.map(function (item) {
            return (
              <div className="summary-row" key={item.id}>
                <span>
                  {item.qty} x {item.title.slice(0, 22)}
                </span>
                <span>${(item.price * item.qty).toFixed(2)}</span>
              </div>
            );
          })}
          <div className="summary-row total">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Checkout;
