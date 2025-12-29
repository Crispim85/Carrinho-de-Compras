export default function ProductItem({ produto, onDelete }) {
  return (
    <li>
      <h5>{produto.titulo}</h5>

      {produto.link && (
        <p>
          <a href={produto.link} target="_blank" rel="noreferrer">
            {produto.link}
          </a>
        </p>
      )}

      <div className="actions">
        <i className="bx bx-trash" onClick={() => onDelete(produto.id)} />
      </div>
    </li>
  );
}