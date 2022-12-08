import {response} from "express";
import {UploadFile} from "../helpers/index.js";

export const uploadFile = async (req, res = response) => {
    try {
        if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
            return res.status(400).json({
                ok: false,
                msg: 'No files were uploaded.'
            });
        }
        const fileName = await UploadFile(req.files, undefined, 'imgs');
        console.log('fileName');
        res.json({
            fileName
        });
    } catch (e) {
        res.status(400).json({
            msg: e
        });
    }
}
