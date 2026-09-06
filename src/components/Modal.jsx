import { useState } from "react";

export default function Modal({ onClose, onAdd }) {
  const [titulo, setTitulo] = useState("");
  const [link, setLink] = useState("");

  const submit = (e) => {
    e.preventDefault();
    onAdd({ titulo, link });
    onClose();
  };

  return (
    <>
      <section id="overlay" className="active" onClick={onClose} />
      <div className="modal active">
        <h3>
          Adicionar produto
          <i className="bx bxs-x-circle" onClick={onClose} />
        </h3>

        <form onSubmit={submit}>
          <label htmlFor="titulo">Nome do produto</label>
          <input id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />

          <label htmlFor="link">Link</label>
          <input id="link" value={link} onChange={(e) => setLink(e.target.value)} />

          <button>Adicionar</button>
        </form>
      </div>
    </>
  );
}