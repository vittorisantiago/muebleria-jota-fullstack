import { Router } from "express";
import {
  getAllProducts,
  getProductById,
} from "../controllers/products.controller.js";

const router = Router();

// GET /api/productos
router.get("/", getAllProducts);

// GET /api/productos/:id
router.get("/:id", getProductById);

export default router;
