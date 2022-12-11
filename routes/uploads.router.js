import express from "express";
import {check} from "express-validator";
import {ValidateFields, ValidateFile} from "../middlewares/index.js";
import {updateFile, uploadFile, getFile} from "../controllers/uploads.controller.js";
import {validCollections} from "../helpers/index.js";

const router = express.Router();

router.post('/',
    ValidateFile,
    uploadFile);

router.put('/:collection/:id', [
    ValidateFile,
    check('id', 'The id is not valid').isMongoId(),
    check('collection').custom(c => validCollections(c, ['users', 'products'])),
    ValidateFields
], updateFile);

router.get('/:collection/:id', [
    check('id', 'The id is not valid').isMongoId(),
    check('collection').custom(c => validCollections(c, ['users', 'products'])),
    ValidateFields
], getFile);

export default router;
