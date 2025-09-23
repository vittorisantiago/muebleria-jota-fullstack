import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import ProductDetail from "./components/ProductDetail";
import ContactForm from "./components/ContactForm";

function App() {
  const [view, setView] = useState("catalog"); // 'catalog' | 'detail' | 'contact'
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [cart, setCart] = useState([]);
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

  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const handleBackToCatalog = () => {
    setSelected(null);
    setView("catalog");
  };

  return (
    <div className="app">
      <Navbar cartCount={cart.length} onNavigate={setView} />

      <main className="container">
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

        {view === "contact" && <ContactForm />}
      </main>

      <Footer />
    </div>
  );
}

export default App;
