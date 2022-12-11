import bycryptjs from 'bcryptjs';
import {CategoryModel, RoleModel, UserModel, ProductModel} from '../models/index.js';

export const encryptPassword = (password = '') => {
    const salt = bycryptjs.genSaltSync();
    return bycryptjs.hashSync(password, salt);
}

export const validRole = async (role = '') => {
    const roleExists = await RoleModel.findOne({role});
    if (!roleExists) {
        throw new Error(`Role ${role} does not exist`);
    }
}

export const existEmail = async (email = '') => {
    const emailExists = await UserModel.findOne({email});
    if (emailExists) {
        throw new Error(`Email ${email} already exists`);
    }
}

export const existUserById = async (id) => {
    const idExists = await UserModel.findById(id);
    if (!idExists) {
        throw new Error(`ID ${id} does not exist`);
    }
}

export const existCategoryById = async (id) => {
    const categoryExists = await CategoryModel.findById(id);
    if (!categoryExists) {
        throw new Error(`ID ${id} does not exist`);
    }
}

export const existProductById = async (id) => {
    const productExists = await ProductModel.findById(id);
    if (!productExists) {
        throw new Error(`ID ${id} does not exist`);
    }
}

export const validCollections = (collection = '', collections = []) => {
    const included = collections.includes(collection);
    if (!included) {
        throw new Error(`Collection ${collection} is not allowed, only ${collections}`);
    }
    return true;
}


