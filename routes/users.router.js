import express from "express";
import {check} from "express-validator";
import {deleteUser, getUsers, postUser, putUser} from "../controllers/users.controller.js";
import {existEmail, existUserById, validRole} from "../helpers/db-validator.js";
import {ValidateFields, ValidateJwt, ValidateRoles} from "../middlewares/index.js";

const router = express.Router();

router.get('/', getUsers);
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({min: 6}),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom(existEmail),
    check('role').custom(validRole),
    ValidateFields
], postUser);
router.put('/:id', [
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(existUserById),
    check('role').custom(validRole),
    ValidateFields
], putUser);
router.delete('/:id', [
    ValidateJwt,
    ValidateRoles('ADMIN_ROLE', 'SUPER_ROLE'),
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(existUserById),
    ValidateFields
], deleteUser);

export default router;

