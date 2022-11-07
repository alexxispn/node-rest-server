import express from "express";
import {check} from "express-validator";
import {login} from "../controllers/auth.controller.js";
import ValidateFields from "../middlewares/validateFields.middleware.js";


const router = express.Router();

router.post('/login', [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    ValidateFields
], login);

export default router;
