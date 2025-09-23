function ProductCard({ product, onClick }) {
  return (
    <article className="card" onClick={onClick} style={{ cursor: "pointer" }}>
      <img
        src={product.imagen}
        alt={product.nombre}
        onError={(e) => {
          e.currentTarget.src =
            "https://via.placeholder.com/300x200?text=Mueble";
        }}
      />
      <div className="card-body">
        <h3>{product.nombre}</h3>
        <p>${product.precio.toLocaleString("es-AR")}</p>
        {product.stock != null && <small>Stock: {product.stock}</small>}
      </div>
    </article>
  );
}
export default ProductCard;
