function ProductDetail({ product, onAddToCart, onBack }) {
  return (
    <section className="detail">
      <button onClick={onBack}>← Volver</button>
      <div className="detail-content">
        <img
          src={product.imagen}
          alt={product.nombre}
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/600x400?text=Mueble";
          }}
        />
        <div>
          <h2>{product.nombre}</h2>
          {product.descripcion && <p>{product.descripcion}</p>}
          <p>
            <strong>Precio: </strong>${product.precio.toLocaleString("es-AR")}
          </p>
          {product.medidas && (
            <p>
              <strong>Medidas: </strong>
              {product.medidas}
            </p>
          )}
          <button onClick={onAddToCart}>Añadir al Carrito</button>
        </div>
      </div>
    </section>
  );
}
export default ProductDetail;
