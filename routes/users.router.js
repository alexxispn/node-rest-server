import express from "express";
import {deleteUser, getUsers, patchUser, postUser, putUser} from "../controllers/users.controller.js";

const router = express.Router();

router.get('/', getUsers);
router.post('/', postUser);
router.put('/:id', putUser);
router.delete('/:id', deleteUser);
router.patch('/:id', patchUser);

export default router;

