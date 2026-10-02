import { createContext, useContext, useEffect, useState } from "react";

var CartContext = createContext();

function loadCart() {
  var saved = localStorage.getItem("cart");
  if (saved) {
    return JSON.parse(saved);
  }
  return [];
}

export function CartProvider({ children }) {
  var [items, setItems] = useState(loadCart());

  useEffect(
    function () {
      localStorage.setItem("cart", JSON.stringify(items));
    },
    [items]
  );

  function addToCart(product) {
    var exists = items.find(function (item) {
      return item.id === product.id;
    });
    if (exists) {
      setItems(
        items.map(function (item) {
          if (item.id === product.id) {
            return { ...item, qty: item.qty + 1 };
          }
          return item;
        })
      );
    } else {
      setItems([
        ...items,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.image,
          qty: 1,
        },
      ]);
    }
  }

  function changeQty(id, qty) {
    if (qty < 1) {
      return;
    }
    setItems(
      items.map(function (item) {
        if (item.id === id) {
          return { ...item, qty: qty };
        }
        return item;
      })
    );
  }

  function removeFromCart(id) {
    setItems(
      items.filter(function (item) {
        return item.id !== id;
      })
    );
  }

  function clearCart() {
    setItems([]);
  }

  var count = items.reduce(function (sum, item) {
    return sum + item.qty;
  }, 0);

  var total = items.reduce(function (sum, item) {
    return sum + item.price * item.qty;
  }, 0);

  return (
    <CartContext.Provider
      value={{ items, count, total, addToCart, changeQty, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
