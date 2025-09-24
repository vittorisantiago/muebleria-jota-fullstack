// src/components/Footer.jsx
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      {/* Contenido principal */}
      <div className={`${styles.inner} container`}>
        {/* Columna marca */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <img src="/assets/logo.svg" alt="Hermanos Jota" />
          </div>
          <p className={styles.tagline}>
            Cada pieza cuenta la historia de manos expertas y materiales nobles.
          </p>
        </div>

        {/* Columna contacto */}
        <div className={styles.contact}>
          <h4 className={styles.title}>Contacto</h4>
          <p className={styles.text}>Hermanos Jota — Casa Taller</p>
          <p className={styles.text}>Av. San Juan 2847 — CABA</p>
          <p className={styles.text}>
            Lun a Vie: 10:00–19:00 · Sáb: 10:00–14:00
          </p>
          <p className={styles.text}>
            <a href="mailto:info@hermanosjota.com.ar" className={styles.link}>
              info@hermanosjota.com.ar
            </a>{" "}
            ·{" "}
            <a href="mailto:ventas@hermanosjota.com.ar" className={styles.link}>
              ventas@hermanosjota.com.ar
            </a>
          </p>
          <p className={styles.text}>
            <a
              href="https://instagram.com/hermanosjota_ba"
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              @hermanosjota_ba
            </a>{" "}
            ·{" "}
            <a
              href="https://wa.me/541145678900"
              target="_blank"
              rel="noreferrer"
              className={styles.link}
            >
              WhatsApp
            </a>
          </p>
        </div>
      </div>

      {/* Barra inferior */}
      <div className={styles.bottom}>
        <small>
          © {new Date().getFullYear()} Mueblería Hermanos Jota · Buenos Aires
        </small>
      </div>
    </footer>
  );
}

export default Footer;
