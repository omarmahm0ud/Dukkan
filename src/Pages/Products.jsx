import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts, getProductsByCategory, getCategories } from "../services/api.js";
import ProductCard from "../Components/ProductCard.jsx";
import Loader from "../Components/Loader.jsx";

function Products() {
  var [params, setParams] = useSearchParams();
  var category = params.get("category") || "all";

  var [products, setProducts] = useState([]);
  var [categories, setCategories] = useState([]);
  var [search, setSearch] = useState("");
  var [sort, setSort] = useState("default");
  var [loading, setLoading] = useState(true);
  var [error, setError] = useState("");

  useEffect(function () {
    getCategories()
      .then(setCategories)
      .catch(function (err) {
        setError(err.message);
      });
  }, []);

  useEffect(
    function () {
      setLoading(true);
      setError("");
      var request = category === "all" ? getProducts() : getProductsByCategory(category);
      request
        .then(setProducts)
        .catch(function (err) {
          setError(err.message);
        })
        .finally(function () {
          setLoading(false);
        });
    },
    [category]
  );

  function changeCategory(value) {
    if (value === "all") {
      setParams({});
    } else {
      setParams({ category: value });
    }
  }

  var visible = products.filter(function (product) {
    return product.title.toLowerCase().includes(search.toLowerCase());
  });

  if (sort === "low") {
    visible = [...visible].sort(function (a, b) {
      return a.price - b.price;
    });
  }

  if (sort === "high") {
    visible = [...visible].sort(function (a, b) {
      return b.price - a.price;
    });
  }

  return (
    <div className="container section">
      <h1>Products</h1>

      <div className="filters">
        <input
          type="text"
          placeholder="Search products"
          value={search}
          onChange={function (e) { setSearch(e.target.value); }}
        />
        <select value={category} onChange={function (e) { changeCategory(e.target.value); }}>
          <option value="all">All categories</option>
          {categories.map(function (item) {
            return (
              <option key={item} value={item}>
                {item}
              </option>
            );
          })}
        </select>
        <select value={sort} onChange={function (e) { setSort(e.target.value); }}>
          <option value="default">Sort by</option>
          <option value="low">Price: low to high</option>
          <option value="high">Price: high to low</option>
        </select>
      </div>

      {error && <p className="error">{error}</p>}
      {loading && <Loader />}

      {!loading && visible.length === 0 && !error && (
        <p className="empty">No products match your search.</p>
      )}

      {!loading && (
        <div className="product-grid">
          {visible.map(function (product) {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      )}
    </div>
  );
}

export default Products;
