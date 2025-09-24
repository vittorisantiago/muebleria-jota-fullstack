// src/components/Home.jsx
import styles from "./Home.module.css";

function Home({ products = [], onSelect, onNavigate }) {
  const featured = products.slice(0, 4);

  return (
    <section className={styles.home}>
      {/* HERO */}
      <div className={styles.hero}>
        <div className={styles.hero__content}>
          <h2 className={styles.hero__title}>Muebles que elevan tu hogar</h2>
          <p className={styles.hero__subtitle}>
            Diseños cálidos y modernos para tus espacios favoritos.
          </p>
          <button
            className={styles["cta-btn"]}
            onClick={() => onNavigate("catalog")}
          >
            Ver catálogo
          </button>
        </div>
      </div>

      {/* DESTACADOS */}
      <div className="container">
        <header className={styles.sectionHead}>
          <h3>Nuestros productos destacados</h3>
          <p className="muted">Selección curada por nuestro equipo</p>
        </header>

        <section className={styles.featured}>
          {featured.map((p) => (
            <article
              key={p.id}
              className={styles.featuredCard}
              onClick={() => onSelect(p)}
              tabIndex={0}
              role="button"
            >
              <img
                src={p.imagen}
                alt={p.nombre}
                onError={(e) => {
                  e.currentTarget.src =
                    "https://via.placeholder.com/800x600?text=Mueble";
                }}
              />
              <div className={styles.cardBody}>
                <h4 className={styles.featuredName}>{p.nombre}</h4>
                <p className={styles.featuredPrice}>
                  ${p.precio.toLocaleString("es-AR")}
                </p>
              </div>
            </article>
          ))}
        </section>
      </div>
    </section>
  );
}

export default Home;
