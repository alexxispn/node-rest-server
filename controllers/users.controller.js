import {response} from "express";
import UserModel from "../models/user.model.js";
import {encryptPassword} from "../helpers/db-validator.js";

export const getUsers = async (req, res = response) => {
    const {limit = 5, from = 0} = req.query;
    const query = {state: true};
    const [total, users] = await Promise.all([
        UserModel.countDocuments(query),
        UserModel.find(query)
            .skip(Number(from))
            .limit(Number(limit))
    ]);
    res.json({total, users});
}

export const postUser = async (req, res = response) => {
    const {name, email, password, role} = req.body;
    const user = new UserModel({name, email, password: encryptPassword(password), role});
    await user.save();
    res.status(201).json(user);
}

export const putUser = async (req, res = response) => {
    const {id} = req.params;
    const {_id, password, google, email, ...rest} = req.body;
    if (password) rest.password = encryptPassword(password);
    const user = await UserModel.findByIdAndUpdate(id, rest);
    res.json(user);
}

export const deleteUser = async (req, res = response) => {
    const {id} = req.params;
    const user = await UserModel.findByIdAndUpdate(id, {state: false});
    res.json(user);
}

export const patchUser = async (req, res) => {
    const {id} = req.params;
    res.json({
        id
    });
}


