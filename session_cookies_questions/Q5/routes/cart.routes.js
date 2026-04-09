import express from "express";
import { addToCart, login, viewCart } from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/add-cart", addToCart);
router.get("/login", login);
router.get("/cart", viewCart);

export default router;