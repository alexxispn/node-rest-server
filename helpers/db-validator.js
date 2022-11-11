import bycryptjs from 'bcryptjs';
import {RoleModel, UserModel} from '../models/index.js';

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

export const existId = async (id) => {
    const idExists = await UserModel.findById(id);
    if (!idExists) {
        throw new Error(`ID ${id} does not exist`);
    }
}

