import ProductItem from "./ProductItem";

export default function ProductList({ produtos, onDelete, onNovo }) {
  return (
    <section id="itens">
      <h2>
        Produtos
        <button onClick={onNovo}>Novo produto</button>
      </h2>

      <ul>
        {produtos.map((produto) => (
          <ProductItem
            key={produto.id}
            produto={produto}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </section>
  );
}