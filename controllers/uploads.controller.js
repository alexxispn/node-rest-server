import path from "path";
import fs from "fs";
import {response} from "express";
import {UploadFile} from "../helpers/index.js";
import {ProductModel, UserModel} from "../models/index.js";

export const uploadFile = async (req, res = response) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
            return res.status(400).json({
                ok: false,
                msg: 'No files were uploaded.'
            });
        }
        const fileName = await UploadFile(req.files, undefined, 'imgs');
        res.json({
            fileName
        });
    } catch (e) {
        res.status(400).json({
            msg: e
        });
    }
}

export const updateFile = async (req, res = response) => {
    const {collection, id} = req.params;
    let model;
    switch (collection) {
        case 'users':
            model = await UserModel.findById(id);
            if (!model) {
                return res.status(400).json({
                    ok: false,
                    msg: 'There is no user with that id'
                });
            }
            break;
        case 'products':
            model = await ProductModel.findById(id);
            if (!model) {
                return res.status(400).json({
                    ok: false,
                    msg: 'There is no product with that id'
                });
            }
            break;
        default:
            return res.status(500).json({
                ok: false,
                msg: 'This feature is not implemented yet'
            });
    }
    if (model.img) {
        const uploadPath = path.join('uploads/', collection, model.img);
        if (fs.existsSync(uploadPath)) {
            fs.unlinkSync(uploadPath);
        }
    }
    model.img = await UploadFile(req.files, undefined, collection);
    await model.save();
    res.json({
        model
    });
}

export const getFile = async (req, res = response) => {
    const {collection, id} = req.params;
    let model;
    switch (collection) {
        case 'users':
            model = await UserModel.findById(id);
            if (!model) {
                return res.status(400).json({
                    ok: false,
                    msg: 'There is no user with that id'
                });
            }
            break;
        case 'products':
            model = await ProductModel.findById(id);
            if (!model) {
                return res.status(400).json({
                    ok: false,
                    msg: 'There is no product with that id'
                });
            }
            break;
        default:
            return res.status(500).json({
                ok: false,
                msg: 'This feature is not implemented yet'
            });
    }
    if (model.img) {
        const uploadPath = path.join('uploads/', collection, model.img);
        if (fs.existsSync(uploadPath)) {
            return res.sendFile(uploadPath, {root: '.'});
        }
    }
    const noImagePath = path.join('uploads/', 'no-image.png');
    res.sendFile(noImagePath, {root: '.'});
}
