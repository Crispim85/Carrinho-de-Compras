import { useState, useEffect } from "react";
import { openDB } from "idb";

export function useIndexedDB() {
  const [db, setDb] = useState(null);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const initDB = async () => {
      try {
        const database = await openDB("itensDB", 2, {
          upgrade(db) {
            if (!db.objectStoreNames.contains("itens")) {
              const store = db.createObjectStore("itens", {
                keyPath: "id",
                autoIncrement: true,
              });
              store.createIndex("ordem", "ordem");
            }
          },
        });
        setDb(database);
      } catch (error) {
        console.error("Erro ao abrir IndexedDB:", error);
      }
    };

    initDB();
  }, []);

  useEffect(() => {
    if (!db) return;

    const fetchProdutos = async () => {
      try {
        const allProducts = await db.getAllFromIndex("itens", "ordem");
        setProdutos(allProducts);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      }
    };

    fetchProdutos();
  }, [db]);

  const adicionarProduto = async (produto) => {
    if (!db) return;

    try {
      const novoProduto = { ...produto, ordem: Date.now() };
      const id = await db.add("itens", novoProduto);
      
      const produtoComId = { ...novoProduto, id };
      setProdutos((prev) => [...prev, produtoComId]);
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  };

  const deletarProduto = async (id) => {
    if (!db) return;

    try {
      await db.delete("itens", id);
      setProdutos((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  const reordenarProdutos = async (novaLista) => {
    if (!db) return;

    try {
      const tx = db.transaction("itens", "readwrite");
      
      await Promise.all(
        novaLista.map((produto, index) => {
          const produtoAtualizado = { ...produto, ordem: index };
          return tx.store.put(produtoAtualizado);
        })
      );
      
      await tx.done;
      
      setProdutos(novaLista.map((p, i) => ({ ...p, ordem: i })));
    } catch (error) {
      console.error("Erro ao reordenar produtos:", error);
    }
  };

  return { produtos, adicionarProduto, deletarProduto, reordenarProdutos };
}
