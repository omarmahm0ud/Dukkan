var BASE = "https://dummyjson.com";

async function request(path, options) {
  var res = await fetch(BASE + path, options);
  if (!res.ok) {
    throw new Error("Something went wrong, please try again");
  }
  return res.json();
}

function fixProduct(p) {
  return {
    id: p.id,
    title: p.title,
    price: p.price,
    image: p.thumbnail,
    category: p.category,
    description: p.description,
    rating: {
      rate: p.rating,
      count: p.reviews ? p.reviews.length : p.stock,
    },
  };
}

export async function getProducts() {
  var data = await request("/products?limit=40");
  return data.products.map(fixProduct);
}

export async function getProduct(id) {
  var data = await request("/products/" + id);
  return fixProduct(data);
}

export async function getCategories() {
  var data = await request("/products/categories");
  return data.map(function (item) {
    if (typeof item === "string") {
      return item;
    }
    return item.slug;
  });
}

export async function getProductsByCategory(category) {
  var data = await request("/products/category/" + encodeURIComponent(category));
  return data.products.map(fixProduct);
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
  var data = await res.json();
  return { token: data.accessToken || data.token };
}

export function createOrder(items) {
  return request("/carts/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: 1,
      products: items.map(function (item) {
        return { id: item.id, quantity: item.qty };
      }),
    }),
  });
}
