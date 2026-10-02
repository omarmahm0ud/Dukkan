import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProduct } from "../services/api.js";
import { useCart } from "../Context/CartContext.jsx";
import Loader from "../Components/Loader.jsx";

function ProductDetails() {
  var { id } = useParams();
  var { addToCart } = useCart();
  var [product, setProduct] = useState(null);
  var [loading, setLoading] = useState(true);
  var [error, setError] = useState("");
  var [added, setAdded] = useState(false);

  useEffect(
    function () {
      setLoading(true);
      getProduct(id)
        .then(setProduct)
        .catch(function (err) {
          setError(err.message);
        })
        .finally(function () {
          setLoading(false);
        });
    },
    [id]
  );

  function handleAdd() {
    addToCart(product);
    setAdded(true);
    setTimeout(function () {
      setAdded(false);
    }, 1500);
  }

  if (loading) {
    return <Loader />;
  }

  if (error || !product) {
    return (
      <div className="container section">
        <p className="error">{error || "Product not found"}</p>
        <Link to="/products" className="btn">
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="container section details">
      <div className="details-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="details-info">
        <span className="product-category">{product.category}</span>
        <h1>{product.title}</h1>
        <p className="rating">
          Rated {product.rating.rate} out of 5 by {product.rating.count} customers
        </p>
        <p className="details-price">${product.price.toFixed(2)}</p>
        <p>{product.description}</p>
        <button className="btn" onClick={handleAdd}>
          {added ? "Added to cart" : "Add to cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductDetails;
