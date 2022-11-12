import express from "express";
import {check} from "express-validator";
import {ValidateFields, ValidateJwt, ValidateRoles} from "../middlewares/index.js";
import {existCategoryById} from "../helpers/db-validator.js";
import {
    getProducts,
    getProduct,
    postProduct,
    putProduct,
    deleteProduct
} from "../controllers/products.controller.js";


const router = express.Router();

router.get('/', getProducts);

router.get('/:id', [
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(existCategoryById),
    ValidateFields
], getProduct);

router.post('/', [
    ValidateJwt,
    check('name', 'Name is required').not().isEmpty(),
    ValidateFields
], postProduct);

router.put('/:id', [
    ValidateJwt,
    check('name', 'Name is required').not().isEmpty(),
    check('id').custom(existCategoryById),
    ValidateFields
], putProduct);

router.delete('/:id', [
    ValidateJwt,
    ValidateRoles('ADMIN_ROLE', 'SUPER_ROLE'),
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(existCategoryById),
    ValidateFields
], deleteProduct);

export default router;
