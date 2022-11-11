import express from "express";
import {check} from "express-validator";
import {ValidateFields, ValidateJwt} from "../middlewares/index.js";
import {getCategories, getCategory, postCategory, putCategory, deleteCategory} from "../controllers/categories.controller.js";


const router = express.Router();

router.get('/', [
    ValidateJwt,
    ValidateFields
], getCategories);

router.get('/:id', [
    ValidateFields
], getCategory);

router.post('/', [
    ValidateJwt,
    check('name', 'Name is required').not().isEmpty(),
    ValidateFields
], postCategory);

router.put('/:id', [
    ValidateJwt,
    check('name', 'Name is required').not().isEmpty(),
    ValidateFields
], putCategory);

router.delete('/:id', [
    ValidateJwt,
    ValidateFields
], deleteCategory);

export default router;
