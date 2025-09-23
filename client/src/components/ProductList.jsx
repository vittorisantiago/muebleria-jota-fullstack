import ProductCard from "./ProductCard";

function ProductList({ products, onSelect }) {
  if (!products.length) return <p>No hay productos disponibles.</p>;
  return (
    <section className="grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onClick={() => onSelect(p)} />
      ))}
    </section>
  );
}

export default ProductList;
