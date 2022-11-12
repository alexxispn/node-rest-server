import express from "express";
import {check} from "express-validator";
import {ValidateFields, ValidateJwt, ValidateRoles} from "../middlewares/index.js";
import {existCategoryById} from "../helpers/db-validator.js";
import {
    deleteCategory,
    getCategories,
    getCategory,
    postCategory,
    putCategory
} from "../controllers/categories.controller.js";


const router = express.Router();

router.get('/', getCategories);

router.get('/:id', [
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(existCategoryById),
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
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(existCategoryById),
    ValidateFields
], putCategory);

router.delete('/:id', [
    ValidateJwt,
    ValidateRoles('ADMIN_ROLE', 'SUPER_ROLE'),
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(existCategoryById),
    ValidateFields
], deleteCategory);

export default router;
