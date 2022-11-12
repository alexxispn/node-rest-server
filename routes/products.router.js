import express from "express";
import {check} from "express-validator";
import {ValidateFields, ValidateJwt, ValidateRoles} from "../middlewares/index.js";
import {existCategoryById, existProductById} from "../helpers/db-validator.js";
import {deleteProduct, getProduct, getProducts, postProduct, putProduct} from "../controllers/products.controller.js";


const router = express.Router();

router.get('/', getProducts);

router.get('/:id', [
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(existProductById),
    ValidateFields
], getProduct);

router.post('/', [
    ValidateJwt,
    check('name', 'Name is required').not().isEmpty(),
    check('category', 'Category is required').not().isEmpty(),
    check('category', 'Invalid ID').isMongoId(),
    check('category').custom(existCategoryById),
    ValidateFields
], postProduct);

router.put('/:id', [
    ValidateJwt,
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(existProductById),
    ValidateFields
], putProduct);

router.delete('/:id', [
    ValidateJwt,
    ValidateRoles('ADMIN_ROLE', 'SUPER_ROLE'),
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(existProductById),
    ValidateFields
], deleteProduct);

export default router;
