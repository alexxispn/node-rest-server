import {model, Schema} from "mongoose";

export default model('Category', new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    state: {
        type: Boolean,
        default: true,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
}));
