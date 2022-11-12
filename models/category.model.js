import {model, Schema} from "mongoose";

const CategorySchema = new Schema({
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
})

CategorySchema.methods.toJSON = function () {
    const {__v, state, ...category} = this.toObject();
    return category;
}

export default model('Category', CategorySchema);
