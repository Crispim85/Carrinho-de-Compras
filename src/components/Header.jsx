export default function Header({ busca, setBusca }) {
  return (
    <header>
      <input
        type="text"
        placeholder="Pesquisar"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
      />
    </header>
  );
}