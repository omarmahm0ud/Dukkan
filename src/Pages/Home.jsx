import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts, getCategories } from "../services/api.js";
import ProductCard from "../Components/ProductCard.jsx";
import Loader from "../Components/Loader.jsx";

function Home() {
  var [products, setProducts] = useState([]);
  var [categories, setCategories] = useState([]);
  var [loading, setLoading] = useState(true);
  var [error, setError] = useState("");

  useEffect(function () {
    Promise.all([getProducts(), getCategories()])
      .then(function (data) {
        setProducts(data[0].slice(0, 4));
        setCategories(data[1]);
      })
      .catch(function (err) {
        setError(err.message);
      })
      .finally(function () {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <section className="hero">
        <div className="container hero-inner">
          <h1>Good things for every day, at fair prices.</h1>
          <p>Clothes, jewelry and electronics. Pick what you need and we deliver it.</p>
          <Link to="/products" className="btn">
            Shop all products
          </Link>
        </div>
      </section>

      <section className="container section">
        <h2>Shop by category</h2>
        <div className="category-grid">
          {categories.map(function (category) {
            return (
              <Link
                key={category}
                to={"/products?category=" + encodeURIComponent(category)}
                className="category-tile"
              >
                {category}
              </Link>
            );
          })}
        </div>
      </section>

      <section className="container section">
        <h2>Featured products</h2>
        {error && <p className="error">{error}</p>}
        <div className="product-grid">
          {products.map(function (product) {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </section>
    </div>
  );
}

export default Home;
