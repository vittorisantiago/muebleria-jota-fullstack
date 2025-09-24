import { useState } from "react";
import styles from "./ContactForm.module.css";

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [ok, setOk] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Contacto enviado:", form); // requisito del sprint
    setOk(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className={styles.contactSection}>
      <h2 className={styles.title}>Contacto</h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <label className={styles.label}>
          Nombre
          <input
            className={styles.input}
            name="name"
            value={form.name}
            onChange={onChange}
            required
          />
        </label>
        <label className={styles.label}>
          Email
          <input
            className={styles.input}
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            required
          />
        </label>
        <label className={styles.label}>
          Mensaje
          <textarea
            className={styles.textarea}
            name="message"
            value={form.message}
            onChange={onChange}
            required
          />
        </label>
        <button className={styles.button} type="submit">
          Enviar
        </button>
      </form>
      {ok && <p className={styles.successMsg}>¡Mensaje enviado con éxito!</p>}
    </section>
  );
}

export default ContactForm;
