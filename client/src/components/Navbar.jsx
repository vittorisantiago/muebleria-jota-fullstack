function Navbar({ cartCount, onNavigate }) {
  return (
    <header className="navbar">
      <h1 onClick={() => onNavigate("catalog")} style={{ cursor: "pointer" }}>
        Mueblería Hermanos Jota
      </h1>
      <nav>
        <button onClick={() => onNavigate("home")}>Inicio</button>
        <button onClick={() => onNavigate("catalog")}>Catálogo</button>
        <button onClick={() => onNavigate("contact")}>Contacto</button>
        <span>🛒 {cartCount}</span>
      </nav>
    </header>
  );
}
export default Navbar;
