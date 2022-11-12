import {response} from "express";
import {CategoryModel} from "../models/index.js";

export const getCategories = async (req, res = response) => {
    const {limit = 5, from = 0} = req.query;
    const query = {state: true};
    const [total, categories] = await Promise.all([
        CategoryModel.countDocuments(query),
        CategoryModel.find(query)
            .populate('user', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ]);
    res.json({total, categories});
}

export const getCategory = async (req, res = response) => {
    const {id} = req.params;
    const category = await CategoryModel.findById(id).populate('user', 'name');
    res.json(category);
}

export const postCategory = async (req, res = response) => {
    const name = req.body.name.toUpperCase();
    const user = req.user._id;
    const categoryDB = await CategoryModel.findOne({name});
    if (categoryDB) {
        return res.status(400).json({
            msg: `Category ${categoryDB.name} already exists`
        });
    }
    const data = {
        name,
        user
    }
    const category = new CategoryModel(data);
    await category.save();
    res.status(201).json(category);
}

export const putCategory = async (req, res = response) => {
    const {id} = req.params;
    const {state, user, ...data} = req.body;
    data.name = data.name.toUpperCase();
    data.user = req.user._id;
    const category = await CategoryModel.findByIdAndUpdate(id, data, {new: true});
    res.json(category);
}

export const deleteCategory = async (req, res = response) => {
    const {id} = req.params;
    const category = await CategoryModel.findByIdAndUpdate(id, {state: false}, {new: true});
    res.json(category);
}
