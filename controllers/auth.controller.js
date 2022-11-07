import {response} from "express";
import bcrypt from "bcryptjs";
import UserModel from "../models/user.model.js";
import GenerateJwt from "../helpers/generate-jwt.js";

export const login = async (req, res = response) => {
    try {
        const user = await UserModel.findOne({email: req.body.email});
        if (!user) {
            return res.status(400).json({
                msg: 'User / Password are not correct - email'
            });
        }
        if (!user.state) {
            return res.status(400).json({
                msg: 'User / Password are not correct - state: false'
            });
        }
        const validPassword = bcrypt.compareSync(req.body.password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'User / Password are not correct - password'
            });
        }
        const token = await GenerateJwt(user.id);
        res.json({
            user,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Please contact the administrator'
        });
    }
}
