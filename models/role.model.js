import {Schema, model} from "mongoose";

export default model('Roles', new Schema({
    role: {
        type: String,
        required: [true, 'Please add a role'],
    }
}));
