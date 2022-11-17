import {response} from "express";
import {Types} from "mongoose";
import {CategoryModel, ProductModel, UserModel} from "../models/index.js";

const collectionsAllowed = [
    'users',
    'categories',
    'products'
];

const searchUsers = async (term = '', res = response) => {
    const isMongoId = Types.ObjectId.isValid(term);
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

const searchCategories = async (term = '', res = response) => {
    const regex = new RegExp(term, 'i');
    const categories = await CategoryModel.find({name: regex, status: true});
    res.json({
        results: categories
    });
}

const searchProducts = async (term = '', res = response) => {
    const isMongoId = Types.ObjectId.isValid(term);
    if (isMongoId) {
        const product = await ProductModel.findById(term).populate('category', 'name');
        return res.json({
            results: (product) ? [product] : []
        });
    }

    const regex = new RegExp(term, 'i');
    const products = await ProductModel.find({name: regex, status: true}).populate('category', 'name');
    res.json({
        results: products
    });
}

export const search = async (req, res = response) => {
    const {collection, term} = req.params;
    if (!collectionsAllowed.includes(collection)) {
        return res.status(400).json({
            msg: `Allowed collections are: ${collectionsAllowed}`
        });
    }
    switch (collection) {
        case 'users':
            await searchUsers(term, res);
            break;
        case 'categories':
            await searchCategories(term, res);
            break;
        case 'products':
            await searchProducts(term, res);
            break;
        default:
            res.status(500).json({
                msg: 'Search not implemented yet'
            });
    }
}
