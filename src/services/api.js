var BASE = "https://fakestoreapi.com";

async function request(path, options) {
  var res = await fetch(BASE + path, options);
  if (!res.ok) {
    throw new Error("Something went wrong, please try again");
  }
  return res.json();
}

export function getProducts() {
  return request("/products");
}

export function getProduct(id) {
  return request("/products/" + id);
}

export function getCategories() {
  return request("/products/categories");
}

export function getProductsByCategory(category) {
  return request("/products/category/" + encodeURIComponent(category));
}

export async function loginUser(username, password) {
  var res = await fetch(BASE + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username, password: password }),
  });
  if (!res.ok) {
    throw new Error("Username or password is incorrect");
  }
  return res.json();
}

export function createOrder(items) {
  return request("/carts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: 1,
      date: new Date().toISOString().slice(0, 10),
      products: items.map(function (item) {
        return { productId: item.id, quantity: item.qty };
      }),
    }),
  });
}
