import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext.jsx";

function Cart() {
  var { items, total, changeQty, removeFromCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container section center">
        <h1>Your cart is empty</h1>
        <p className="empty">Add something you like and it will show up here.</p>
        <Link to="/products" className="btn">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="container section">
      <h1>Your cart</h1>
      <div className="cart-layout">
        <div className="cart-list">
          {items.map(function (item) {
            return (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.title} />
                <div className="cart-info">
                  <Link to={"/products/" + item.id}>{item.title}</Link>
                  <span>${item.price.toFixed(2)}</span>
                </div>
                <div className="qty">
                  <button onClick={function () { changeQty(item.id, item.qty - 1); }}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={function () { changeQty(item.id, item.qty + 1); }}>+</button>
                </div>
                <strong>${(item.price * item.qty).toFixed(2)}</strong>
                <button className="link-btn danger" onClick={function () { removeFromCart(item.id); }}>
                  Remove
                </button>
              </div>
            );
          })}
        </div>
        <aside className="summary">
          <h2>Order summary</h2>
          <div className="summary-row">
            <span>Total</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <Link to="/checkout" className="btn btn-full">
            Go to checkout
          </Link>
        </aside>
      </div>
    </div>
  );
}

export default Cart;
