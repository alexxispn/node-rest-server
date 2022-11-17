import express from "express";
import {search} from "../controllers/search.controller.js";


const router = express.Router();

router.get("/:category/:product", search);

export default router;
