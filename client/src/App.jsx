// src/App.jsx
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import ContactForm from "./components/ContactForm";
import Home from "./components/Home";
import Cart from "./components/Cart";

function App() {
  // 'home' | 'catalog' | 'detail' | 'contact' | 'cart'
  const [view, setView] = useState("home");
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [cart, setCart] = useState([]);
  // Sincronizar carrito real al entrar a la vista 'cart' o al cargar la app
  useEffect(() => {
    const syncCart = () => {
      fetch("/api/cart")
        .then((res) => res.json())
        .then((data) => setCart(data))
        .catch(() => setCart([]));
    };
    if (view === "cart" || view === "home" || view === "catalog") {
      syncCart();
    }
  }, [view]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Cargar productos desde nuestra API (proxy Vite → backend:4000)
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/productos");
        if (!res.ok) throw new Error("Error al cargar productos");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSelect = (product) => {
    setSelected(product);
    setView("detail");
  };

  // Agregar producto al carrito (POST backend)
  const handleAddToCart = async (product) => {
    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: product.id, qty: 1 }),
      });
      if (!res.ok) throw new Error("Error al agregar al carrito");
      const data = await res.json();
      setCart(data.cart);
    } catch (err) {
      alert(err.message || "No se pudo agregar al carrito");
    }
  };

  // Sumar uno al producto en el carrito (POST backend)
  const handleCartAdd = async (id) => {
    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, qty: 1 }),
      });
      if (!res.ok) throw new Error("Error al sumar producto");
      const data = await res.json();
      setCart(data.cart);
    } catch (err) {
      alert(err.message || "No se pudo sumar producto");
    }
  };

  // Quitar uno (POST backend)
  const handleCartRemove = async (id) => {
    try {
      const res = await fetch("/api/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Error al quitar producto");
      const data = await res.json();
      setCart(data.cart);
    } catch (err) {
      alert(err.message || "No se pudo quitar producto");
    }
  };

  // Eliminar todos los de ese producto (POST backend)
  const handleCartDelete = async (id) => {
    try {
      const res = await fetch("/api/cart/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("Error al eliminar producto");
      const data = await res.json();
      setCart(data.cart);
    } catch (err) {
      alert(err.message || "No se pudo eliminar producto");
    }
  };

  // Vaciar carrito (POST backend, con confirmación)
  const handleCartClear = async () => {
    try {
      const res = await fetch("/api/cart/clear", {
        method: "POST",
      });
      if (!res.ok) throw new Error("Error al vaciar carrito");
      const data = await res.json();
      setCart(data.cart);
    } catch (err) {
      alert(err.message || "No se pudo vaciar el carrito");
    }
  };

  const handleBackToCatalog = () => {
    setSelected(null);
    setView("catalog");
  };

  return (
    <div className="app">
      {/* Pasamos currentView y cartCount para activo + badge + hamburguesa */}
      <Navbar currentView={view} cartCount={cart.length} onNavigate={setView} />

      <main className="container">
        {view === "home" && (
          <Home
            products={products}
            onSelect={handleSelect}
            onNavigate={setView}
          />
        )}

        {view === "catalog" && (
          <>
            {loading && <p>Cargando productos...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
            {!loading && !error && (
              <ProductList products={products} onSelect={handleSelect} />
            )}
          </>
        )}

        {view === "detail" && selected && (
          <ProductDetail
            product={selected}
            onAddToCart={() => handleAddToCart(selected)}
            onBack={handleBackToCatalog}
          />
        )}

        {view === "cart" && (
          <Cart
            cart={cart}
            onAdd={handleCartAdd}
            onRemove={handleCartRemove}
            onDelete={handleCartDelete}
            onClear={handleCartClear}
            onBack={() => setView("catalog")}
          />
        )}

        {view === "contact" && <ContactForm />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
