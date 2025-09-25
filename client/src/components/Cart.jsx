import React from "react";
import styles from "./Cart.module.css";

function Cart({ cart, onAdd, onRemove, onDelete, onClear, onBack }) {
  // Agrupar productos por id y contar cantidades (soporta claves flexibles)
  const grouped = cart.reduce((acc, prod) => {
    const id = prod.id;
    if (!acc[id]) {
      acc[id] = { ...prod, qty: 0 };
    }
    acc[id].qty++;
    return acc;
  }, {});
  const items = Object.values(grouped);
  const total = items.reduce((sum, item) => {
    const price = item.precio ?? item.price ?? 0;
    return sum + price * item.qty;
  }, 0);

  return (
    <div className={styles.cartWrapper}>
      <h2 className={styles.title}>Carrito de compras</h2>
      {items.length === 0 ? (
        <div className={styles.empty}>Tu carrito está vacío.</div>
      ) : (
        <ul className={styles.list}>
          {items.map((item) => {
            const nombre = item.nombre || item.title || "(Sin nombre)";
            const imagen =
              item.imagen ||
              item.image ||
              "https://via.placeholder.com/80x80?text=Mueble";
            const price = item.precio ?? item.price ?? 0;
            return (
              <li key={item.id} className={styles.item}>
                <img src={imagen} alt={nombre} className={styles.img} />
                <div className={styles.info}>
                  <span className={styles.name}>{nombre}</span>
                  <span className={styles.price}>${price.toFixed(2)}</span>
                  <div className={styles.qtyRow}>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => onRemove(item.id)}
                      aria-label="Quitar uno"
                    >
                      -
                    </button>
                    <span className={styles.qty}>{item.qty}</span>
                    <button
                      className={styles.qtyBtn}
                      onClick={() => onAdd(item.id)}
                      aria-label="Sumar uno"
                    >
                      +
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => onDelete(item.id)}
                      aria-label="Eliminar producto"
                    >
                      ×
                    </button>
                  </div>
                  <span className={styles.subtotal}>
                    Subtotal: ${(price * item.qty).toFixed(2)}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <div className={styles.totalRow}>
        <span>Total:</span>
        <span className={styles.total}>${total.toFixed(2)}</span>
      </div>
      <div className={styles.actionsRow}>
        <div className={styles.mainActions}>
          <button className={styles.mainBtn} onClick={onBack}>
            Seguir comprando
          </button>
          <button
            className={`${styles.mainBtn} ${styles.checkoutBtn}`}
            onClick={() => {
              alert("¡Gracias por tu compra! (demo)");
              onClear();
            }}
          >
            Finalizar compra
          </button>
        </div>
        <div className={styles.clearRow}>
          <button className={styles.clearBtn} onClick={onClear}>
            Vaciar carrito
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
