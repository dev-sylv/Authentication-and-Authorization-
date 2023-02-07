import express, { Router } from "express";
import { GetProducts, postProducts } from "../Controllers/product.controller";

const router = Router();

router.route("/postproducts").post(postProducts);
router.route("/getproducts").get(GetProducts);

export default router