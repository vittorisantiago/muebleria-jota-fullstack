// ProductList.jsx
import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import styles from "./ProductList.module.css";

function ProductList({ products = [], onSelect }) {
  const [query, setQuery] = useState("");

  // Filtrado memoizado
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => {
      const name = (p.nombre || "").toLowerCase();
      const desc = (p.descripcion || "").toLowerCase();
      return name.includes(q) || desc.includes(q);
    });
  }, [products, query]);

  // Sugerencias cuando no hay match: primeros 4 productos (no filtrados)
  const suggestions = products.slice(0, 4);

  // Estado: no hay productos en el catálogo (lista vacía)
  if (!products || products.length === 0) {
    return <p className={styles.empty}>No hay productos disponibles.</p>;
  }

  return (
    <section className={styles.wrapper}>
      {/* Toolbar */}
      <div className={styles.toolbar}>
        <label htmlFor="search" className={styles.searchLabel}>
          <span className={styles.visuallyHidden}>Buscar productos</span>
          <input
            id="search"
            className={styles.search}
            type="search"
            placeholder="Buscar por nombre o descripción..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Buscar productos"
          />
        </label>

        <div className={styles.controls}>
          <span className={styles.resultCount}>
            {filtered.length} / {products.length}
          </span>
          {query && (
            <button
              className={styles.clearBtn}
              onClick={() => setQuery("")}
              aria-label="Limpiar búsqueda"
            >
              Limpiar
            </button>
          )}
        </div>
      </div>

      {/* Si no hay resultados, mostramos mensaje centrado y sugerencias */}
      {filtered.length === 0 ? (
        <div className={styles.noResultsContainer}>
          <div className={styles.noResults}>
            <h3>No encontramos resultados</h3>
            <p>
              Probá con otra palabra (por ejemplo: <em>mesa</em>,{" "}
              <em>sillón</em> o <em>madera</em>). Mientras tanto, te mostramos
              algunos productos sugeridos.
            </p>
            <button
              className={styles.clearBtnPrimary}
              onClick={() => setQuery("")}
              aria-label="Ver sugeridos"
            >
              Mostrar sugeridos
            </button>
          </div>

          {/* Sugerencias */}
          <div className={styles.suggestions}>
            {suggestions.map((p) => (
              <ProductCard key={p.id} product={p} onClick={() => onSelect(p)} />
            ))}
          </div>
        </div>
      ) : (
        // Grid normal con resultados (flex-grow para empujar footer abajo)
        <div className={styles.grid}>
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} onClick={() => onSelect(p)} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductList;
