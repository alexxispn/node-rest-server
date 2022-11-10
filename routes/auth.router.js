import express from "express";
import {check} from "express-validator";
import {login, googleSignIn} from "../controllers/auth.controller.js";
import ValidateFields from "../middlewares/validate-fields.middleware.js";


const router = express.Router();

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    ValidateFields
], login);

router.post('/google', [
    check('id_token', 'id_token is required').not().isEmpty(),
    ValidateFields
], googleSignIn);

export default router;
