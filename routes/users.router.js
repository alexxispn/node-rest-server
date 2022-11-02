import express from "express";
import {check} from "express-validator";
import {deleteUser, getUsers, patchUser, postUser, putUser} from "../controllers/users.controller.js";
import ValidateUser from "../middlewares/validateUser.middleware.js";
import {existEmail, existId, validRole} from "../helpers/db-validator.js";

const router = express.Router();

router.get('/', getUsers);
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password must be at least 6 characters').isLength({min: 6}),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom(existEmail),
    check('role').custom(validRole),
    ValidateUser
], postUser);
router.put('/:id', [
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(existId),
    check('role').custom(validRole),
    ValidateUser
], putUser);
router.delete('/:id', [
    check('id', 'ID is not valid').isMongoId(),
    check('id').custom(existId),
    ValidateUser
], deleteUser);
router.patch('/:id', patchUser);

export default router;

