const mongoose = require('mongoose');
const ObjectID = mongoose.Schema.Types.ObjectId;

const paymentSchema = new mongoose.Schema({
    cartId : {
        type: String,
        require : true,
    },
    amount : {
        type : Number,
        require : true,
    },
    paymentMethod: {
        type : String,
        require : true,
    },
    status : {
        type : String,
    }

},
{
    timestamps : true,
},);

const Payment = mongoose.model('Payment',paymentSchema);
module.exports = Payment;