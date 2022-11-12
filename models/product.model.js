import {model, Schema} from "mongoose";

const ProductSchema = new Schema({
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
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    price: {
        type: Number,
        default: 0,
    },
    description: {
        type: String,
    },
    available: {
        type: Boolean,
        default: true,
    },
    img: {
        type: String,
    }
})

ProductSchema.methods.toJSON = function () {
    const {__v, state, ...product} = this.toObject();
    return product;
}

export default model('Product', ProductSchema);
