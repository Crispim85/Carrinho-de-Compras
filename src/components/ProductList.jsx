import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";
import ProductItem from "./ProductItem";

export default function ProductList({ produtos, onDelete, onNovo }) {
  return (
    <section id="itens">
      <h2>
        Produtos
        <button onClick={onNovo}>Novo produto</button>
      </h2>

      <ul>
        <SortableContext items={produtos.map(p => p.id)} strategy={rectSortingStrategy}>
          {produtos.map((produto) => (
            <ProductItem
              key={produto.id}
              produto={produto}
              onDelete={onDelete}
            />
          ))}
        </SortableContext>
      </ul>
    </section>
  );
}