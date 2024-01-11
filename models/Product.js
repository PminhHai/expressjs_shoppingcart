const mongoose = require('mongoose');

const product = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    price : { type: Number}
},
{
    timestamps: true,
},);

product.method("toJSON", function () {
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})

const Product = mongoose.model('Product', product);

module.exports = Product;