import { useState, useMemo } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import Header from "./components/Header.jsx";
import ProductList from "./components/ProductList.jsx";
import Modal from "./components/Modal.jsx";
import { useIndexedDB } from "./hooks/useIndexedDB.js";
import "./App.css";

export default function App() {
  const { produtos, adicionarProduto, deletarProduto, reordenarProdutos } = useIndexedDB();
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);

  const produtosFiltrados = useMemo(() => {
    return produtos.filter((p) =>
      p.titulo.toLowerCase().includes(busca.toLowerCase())
    );
  }, [produtos, busca]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (busca !== "") return; // Impede reordenação com filtro ativo

    if (active.id !== over?.id) {
      const oldIndex = produtos.findIndex((p) => p.id === active.id);
      const newIndex = produtos.findIndex((p) => p.id === over.id);

      const newArray = arrayMove(produtos, oldIndex, newIndex);
      reordenarProdutos(newArray);
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
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
    </DndContext>
  );
}