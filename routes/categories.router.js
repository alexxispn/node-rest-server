import express from "express";
import {check} from "express-validator";
import {ValidateFields, ValidateJwt} from "../middlewares/index.js";
import {postCategory} from "../controllers/categories.controller.js";


const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        msg: 'get from categories'
    });
});

router.get('/:id', (req, res) => {
    res.json({
        msg: 'get from categories'
    });
});

router.post('/', [
    ValidateJwt,
    check('name', 'Name is required').not().isEmpty(),
    ValidateFields
], postCategory);

router.put('/:id', (req, res) => {
    res.json({
        msg: 'put from categories'
    });
});

router.delete('/:id', (req, res) => {
    res.json({
        msg: "'delete from categories"
    });
});

export default router;
