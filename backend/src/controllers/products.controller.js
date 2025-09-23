import { products } from "../data/products.js";

export const getAllProducts = (req, res) => {
  // Podríamos filtrar, paginar, etc. Por ahora devuelve todo
  res.json(products);
};

export const getProductById = (req, res, next) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);
  if (!product) {
    const err = new Error(`Producto con id ${id} no encontrado`);
    err.status = 404;
    return next(err); // delega al manejador centralizado
  }
  res.json(product);
};
