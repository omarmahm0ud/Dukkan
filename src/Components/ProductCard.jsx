import { Link } from "react-router-dom";
import { useCart } from "../Context/CartContext.jsx";

function ProductCard({ product }) {
  var { addToCart } = useCart();

  return (
    <div className="product-card">
      <Link to={"/products/" + product.id} className="product-image">
        <img src={product.image} alt={product.title} />
      </Link>
      <div className="product-body">
        <span className="product-category">{product.category}</span>
        <Link to={"/products/" + product.id} className="product-title">
          {product.title}
        </Link>
        <div className="product-bottom">
          <strong>${product.price.toFixed(2)}</strong>
          <button className="btn btn-small" onClick={function () { addToCart(product); }}>
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
