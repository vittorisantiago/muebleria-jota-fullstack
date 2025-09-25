// src/controllers/cart.controller.js
// Carrito en memoria por sesión (sin login, sin DB)

import { products } from "../data/products.js";

// Carrito global (demo, 1 solo usuario)
let cart = [];

// GET /api/cart
export const getCart = (req, res) => {
  res.json(cart);
};

// POST /api/cart/add { id, qty }
export const addToCart = (req, res, next) => {
  const { id, qty = 1 } = req.body;
  const product = products.find((p) => p.id === id);
  if (!product) {
    const err = new Error(`Producto con id ${id} no encontrado`);
    err.status = 404;
    return next(err);
  }
  for (let i = 0; i < qty; i++) {
    cart.push(product);
  }
  res.json({ ok: true, cart });
};

// POST /api/cart/remove { id }
export const removeFromCart = (req, res) => {
  const { id } = req.body;
  let found = false;
  cart = cart.filter((item) => {
    if (!found && item.id === id) {
      found = true;
      return false;
    }
    return true;
  });
  res.json({ ok: true, cart });
};

// POST /api/cart/delete { id }
export const deleteFromCart = (req, res) => {
  const { id } = req.body;
  cart = cart.filter((item) => item.id !== id);
  res.json({ ok: true, cart });
};

// POST /api/cart/clear
export const clearCart = (req, res) => {
  cart = [];
  res.json({ ok: true, cart });
};
