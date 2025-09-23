import { useState } from "react";

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
    <section className="contact">
      <h2>Contacto</h2>
      <form onSubmit={onSubmit}>
        <label>
          Nombre
          <input name="name" value={form.name} onChange={onChange} required />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            required
          />
        </label>
        <label>
          Mensaje
          <textarea
            name="message"
            value={form.message}
            onChange={onChange}
            required
          />
        </label>
        <button type="submit">Enviar</button>
      </form>
      {ok && <p style={{ color: "green" }}>¡Mensaje enviado con éxito!</p>}
    </section>
  );
}

export default ContactForm;
