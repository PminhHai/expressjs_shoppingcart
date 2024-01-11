const mongoose = require('mongoose');
const ObjectID = mongoose.Schema.Types.ObjectId;

const cartSchema = mongoose.Schema({
    productId: {
        type : ObjectID,
        ref: 'Product',
        required: true
    },
    name: { type : String },
    price :  { type: Number },
    qty: {
        type : Number,
        default : 1,
        min: [1, 'Quantity can not be less then 1.']
    },
    status : {
        type : String,
        default : 'Chưa thanh toán',
    },
    total: {
        type: Number,
    },   
},
{
    timestamps: true,
},);

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;
