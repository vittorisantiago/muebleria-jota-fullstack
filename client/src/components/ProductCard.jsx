// ProductCard.jsx
import styles from "./ProductCard.module.css";

function ProductCard({ product, onClick }) {
  return (
    <article
      className={styles.card}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onClick();
      }}
      aria-label={`Ver detalle de ${product.nombre}`}
    >
      <div className={styles.media}>
        <img
          src={product.imagen}
          alt={product.nombre}
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/800x600?text=Mueble";
          }}
        />
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{product.nombre}</h3>
        <div className={styles.meta}>
          <span className={styles.price}>
            ${product.precio.toLocaleString("es-AR")}
          </span>
          {product.stock != null && (
            <small className={styles.stock}>Stock: {product.stock}</small>
          )}
        </div>
      </div>
    </article>
  );
}
export default ProductCard;
