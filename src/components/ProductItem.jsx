import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function ProductItem({ produto, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: produto.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: "flex",
    alignItems: "center"
  };

  return (
    <li ref={setNodeRef} style={style}>
      <i className="bx bx-grid-vertical drag-handle" {...attributes} {...listeners} style={{ cursor: "grab", marginRight: "10px", color: "#888" }} />
      
      <div style={{ flex: 1 }}>
        <h5>{produto.titulo}</h5>

        {produto.link && (
          <p>
            <a href={produto.link} target="_blank" rel="noreferrer">
              {produto.link}
            </a>
          </p>
        )}
      </div>

      <div className="actions">
        <i className="bx bx-trash" onClick={() => onDelete(produto.id)} style={{ cursor: "pointer" }} />
      </div>
    </li>
  );
}