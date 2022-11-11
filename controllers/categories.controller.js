import {response} from "express";
import {CategoryModel} from "../models/index.js";

export const getCategories = (req, res = response) => {
    res.json({
        msg: 'get from categories'
    });
}

export const getCategory = (req, res = response) => {
    res.json({
        msg: 'get from categories'
    });
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

export const putCategory = (req, res = response) => {
    res.json({
        msg: 'put from categories'
    });
}

export const deleteCategory = (req, res = response) => {
    res.json({
        msg: "'delete from categories"
    });
}
