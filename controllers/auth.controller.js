import {response} from "express";
import bcrypt from "bcryptjs";
import {UserModel} from "../models/index.js";
import {GenerateJwt, GoogleVerify, encryptPassword} from "../helpers/index.js";

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

export const googleSignIn = async (req, res = response) => {
    const {id_token} = req.body;
    try {
        const {name, email, picture} = await GoogleVerify(id_token);
        let user = await UserModel.findOne({email});
        if (!user) {
            user = new UserModel({
                name,
                email,
                password: encryptPassword('password'),
                img: picture,
                google: true,
                role: 'USER_ROLE'
            });
            await user.save();
        }
        if (!user.state) {
            return res.status(401).json({
                msg: 'User blocked - contact the administrator'
            });
        }
        const token = await GenerateJwt(user.id);
        res.json({
            msg: 'ok, google sign in',
            user,
            token
        });
    } catch (error) {
        res.status(401).json({
            msg: 'Token is not valid'
        });
    }
}

