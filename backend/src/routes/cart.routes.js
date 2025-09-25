import { Router } from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
  deleteFromCart,
  clearCart,
} from "../controllers/cart.controller.js";

const router = Router();

// GET /api/cart
router.get("/", getCart);

// POST /api/cart/add
router.post("/add", addToCart);

// POST /api/cart/remove
router.post("/remove", removeFromCart);

// POST /api/cart/delete
router.post("/delete", deleteFromCart);

// POST /api/cart/clear
router.post("/clear", clearCart);

export default router;
