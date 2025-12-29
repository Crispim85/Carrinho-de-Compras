import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import ProductList from "./components/ProductList.jsx";
import Modal from "./components/Modal.jsx";
import "./App.css";

export default function App() {
  const [produtos, setProdutos] = useState([]);
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [db, setDb] = useState(null);

  useEffect(() => {
    const request = indexedDB.open("itensDB", 2);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      const store = db.createObjectStore("itens", {
        keyPath: "id",
        autoIncrement: true,
      });
      store.createIndex("ordem", "ordem");
    };

    request.onsuccess = (e) => {
      setDb(e.target.result);
    };
  }, []);

  useEffect(() => {
    if (!db) return;

    const tx = db.transaction("itens", "readonly");
    const store = tx.objectStore("itens");
    const index = store.index("ordem");

    index.getAll().onsuccess = (e) => {
      setProdutos(e.target.result);
    };
  }, [db]);

  const adicionarProduto = (produto) => {
    const tx = db.transaction("itens", "readwrite");
    const store = tx.objectStore("itens");

    store.add({ ...produto, ordem: produtos.length }).onsuccess = () => {
      setProdutos((prev) => [...prev, produto]);
    };
  };

  const deletarProduto = (id) => {
    const tx = db.transaction("itens", "readwrite");
    const store = tx.objectStore("itens");

    store.delete(id).onsuccess = () => {
      setProdutos((prev) => prev.filter((p) => p.id !== id));
    };
  };

  const produtosFiltrados = produtos.filter((p) =>
    p.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <>
      <Header busca={busca} setBusca={setBusca} />
      <ProductList
        produtos={produtosFiltrados}
        onDelete={deletarProduto}
        onNovo={() => setModalAberto(true)}
      />
      {modalAberto && (
        <Modal
          onClose={() => setModalAberto(false)}
          onAdd={adicionarProduto}
        />
      )}
    </>
  );
}