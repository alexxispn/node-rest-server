import UserModel from "../models/user.model.js";

export const getUsers = (req, res) => {
    const {name = 'No name', apikey, page = 1, limit = 10} = req.query;

    res.json({
        msg: 'get API - controller',
        name,
        apikey,
        page,
        limit
    });
}

export const postUser = async (req, res) => {
    const {name, email, password, role} = req.body;
    const user = new UserModel({name, email, password, role});

    await user.save();

    res.status(201).json({
        msg: 'post API - postUser',
        user
    });
}

export const putUser = (req, res) => {
    const {id} = req.params;

    res.json({
        msg: 'put API - putUser',
        id
    });
}

export const deleteUser = (req, res) => {
    const {id} = req.params;

    res.json({
        msg: 'delete API - deleteUser',
        id
    });
}

export const patchUser = (req, res) => {
    const {id} = req.params;

    res.json({
        msg: 'patch API - patchUser',
        id
    });
}


