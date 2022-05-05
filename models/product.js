const { Schema, model} = require('mongoose')

const ProductSchema = Schema({

    name: {
        type: String,
        required: [true, 'The name es required'],
        unique: true
    },
    state: {
        type: Boolean,
        default: true,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    },
    available: {
        type: Boolean, default: true
    },
    img: {type: String}
})

ProductSchema.methods.toJSON = function() {
    const { __v, _id, ...product } = this.toObject();
    product.uid = _id
    return product;
}

module.exports = model('Product', ProductSchema)