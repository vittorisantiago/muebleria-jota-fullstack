import { useState } from "react";
import styles from "./ProductDetail.module.css";

function ProductDetail({ product, onAddToCart, onBack }) {
  const [added, setAdded] = useState(false);

  const handleAdd = async () => {
    await onAddToCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <section className={styles.detailWrapper}>
      <div className={styles.imgBox}>
        <img
          className={styles.img}
          src={product.imagen}
          alt={product.nombre}
          onError={(e) => {
            e.currentTarget.src =
              "https://via.placeholder.com/600x400?text=Mueble";
          }}
        />
      </div>
      <div className={styles.info}>
        <h2 className={styles.name}>{product.nombre}</h2>
        {product.descripcion && (
          <p className={styles.desc}>{product.descripcion}</p>
        )}
        <p className={styles.price}>
          ${product.precio.toLocaleString("es-AR")}
        </p>
        {product.medidas && (
          <p className={styles.desc}>
            <strong>Medidas: </strong>
            {product.medidas}
          </p>
        )}
        <div className={styles.btnRow}>
          <button className={styles.backBtn} onClick={onBack}>
            ← Volver
          </button>
          <button className={styles.addBtn} onClick={handleAdd}>
            Añadir al Carrito
          </button>
        </div>
        {added && (
          <div className={styles.addedMsg}>¡Producto agregado al carrito!</div>
        )}
      </div>
    </section>
  );
}
export default ProductDetail;
