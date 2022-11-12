import {response} from "express";
import {ProductModel} from "../models/index.js";

export const getProducts = async (req, res = response) => {
    const {limit = 5, from = 0} = req.query;
    const query = {state: true};
    const [total, products] = await Promise.all([
        ProductModel.countDocuments(query),
        ProductModel.find(query)
            .populate('user', 'name')
            .populate('category', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ]);
    res.json({total, products});
}

export const getProduct = async (req, res = response) => {
    const {id} = req.params;
    const product = await ProductModel.findById(id)
}

export const postProduct = async (req, res = response) => {
    const {state, user, ...body} = req.body;
    const productDB = await ProductModel.findOne({name: body.name});
    if (productDB) {
        return res.status(400).json({
            msg: `Product ${productDB.name} already exists`
        });
    }
    const data = {
        ...body,
        name: body.name.toUpperCase(),
        user: req.user._id
    }
    const product = new ProductModel(data);
    await product.save();
    res.status(201).json(product);
}

export const putProduct = async (req, res = response) => {
    const {id} = req.params;
    const {state, user, ...data} = req.body;
    if (data.name) {
        data.name = data.name.toUpperCase();
    }
    data.user = req.user._id;
    const product = await ProductModel.findByIdAndUpdate(id, data, {new: true});
    res.json(product);
}

export const deleteProduct = async (req, res = response) => {
    const {id} = req.params;
    const product = await ProductModel.findByIdAndUpdate(id, {state: false}, {new: true});
    res.json(product);
}
