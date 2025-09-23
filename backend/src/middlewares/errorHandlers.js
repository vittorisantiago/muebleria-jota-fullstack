// 404 Not Found
export const notFound = (req, res, _next) => {
  res.status(404).json({ error: "Ruta no encontrada" });
};

// Error handler centralizado
export const errorHandler = (err, _req, res, _next) => {
  const status = err.status || 500;
  const message = err.message || "Error interno del servidor";
  res.status(status).json({ error: message });
};
