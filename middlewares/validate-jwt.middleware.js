import jwt from "jsonwebtoken";
import {response} from "express";
import {UserModel} from "../models/index.js";

export default async (req, res = response, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'There is no token in the request'
        });
    }
    try {
        const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const user = await UserModel.findById(uid);
        if (!user) {
            return res.status(401).json({
                msg: 'Token is not valid - user does not exist in DB'
            });
        }
        if (!user.state) {
            return res.status(401).json({
                msg: 'Token is not valid - user with state: false'
            });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token is not valid'
        });
    }
}

