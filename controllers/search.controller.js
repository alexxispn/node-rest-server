import {response} from "express";
import {ObjectId} from "mongoose";
import {UserModel} from "../models/index.js";


const categories = [
    'coffees',
    'juices',
    'breakfast'
];

const searchUsers = async (term = '', res = response) => {
    const isMongoId = ObjectId.isValid(term);
    if (isMongoId) {
        const user = await UserModel.findById(term);
        return res.json({
            results: (user) ? [user] : []
        });
    }

    const regex = new RegExp(term, 'i');
    const users = await UserModel.find({
        $or: [{name: regex}, {email: regex}],
        $and: [{status: true}]
    });
    res.json({
        results: users
    });
}


export const search = (req, res = response) => {
    const {category, product} = req.params;

    if (!categories.includes(category)) {
        return res.status(400).json({
            ok: false,
            msg: 'The category is not valid'
        });
    }
    switch (category) {
        case 'coffees':
            res.json({
                ok: true,
                msg: 'Coffees'
            });
            break;
        case 'juices':
            res.json({
                ok: true,
                msg: 'Juices'
            });
            break;
        case 'breakfast':
            res.json({
                ok: true,
                msg: 'Breakfast'
            });
            break;
    }
}
