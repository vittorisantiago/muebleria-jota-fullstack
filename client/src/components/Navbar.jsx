import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

function Navbar({ currentView, cartCount = 0, onNavigate }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const NavLink = ({ view, children }) => {
    const active = currentView === view;
    return (
      <button
        className={`${styles.navLink} ${active ? styles.isActive : ""}`}
        onClick={() => {
          onNavigate(view);
          setOpen(false);
        }}
      >
        {children}
        {active && <span className={styles.activeDot} aria-hidden="true" />}
      </button>
    );
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.inner}>
        {/* Marca / Logo (no navega) */}
        <div className={styles.brand} aria-label="Hermanos Jota">
          <img
            src="/assets/logo.svg"
            alt="Hermanos Jota"
            className={styles.brandLogo}
          />
          <span className={styles.brandName}>Hermanos&nbsp;Jota</span>
        </div>

        {/* Menú desktop */}
        <nav className={styles.menuDesktop} aria-label="Principal">
          <NavLink view="home">Inicio</NavLink>
          <NavLink view="catalog">Catálogo</NavLink>
          <NavLink view="contact">Contacto</NavLink>
        </nav>

        {/* Carrito */}
        <button
          className={styles.cart}
          onClick={() => onNavigate("cart")}
          aria-label={`Carrito: ${cartCount} artículo${
            cartCount === 1 ? "" : "s"
          }`}
          title="Ver carrito"
        >
          <span aria-hidden="true">🛍️</span>
          <span className={styles.cartLabel}>Carrito</span>
          {cartCount > 0 && (
            <span className={styles.cartBadge}>{cartCount}</span>
          )}
        </button>

        {/* Toggle mobile */}
        <button
          className={styles.hamburger}
          aria-label="Abrir menú"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Menú móvil */}
      <nav
        className={`${styles.menuMobile} ${open ? styles.open : ""}`}
        aria-label="Principal móvil"
      >
        <NavLink view="home">Inicio</NavLink>
        <NavLink view="catalog">Catálogo</NavLink>
        <NavLink view="contact">Contacto</NavLink>
      </nav>
    </header>
  );
}

export default Navbar;
