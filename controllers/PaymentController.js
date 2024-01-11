const Payment = require('../models/Payment');
const Cart = require('../models/Cart');

const create = async (req, res) => {

    try {
        if(!req.body) {
            res.status(400).send({
                message: 'Data to add can not be empty!',
            });
        }
    
        const cartId = req.body.cartId;
    
        const paymentMethod = req.body.paymentMethod;
    
        const cart = await Cart.findById(cartId);
    
        if (!cart) {
            return res.status(404).json({ error:  "Can't find cart!" });
        }
    
        const amount = cart.total;

        const status = req.body.status;
    
        const payment = new Payment({
            cartId: cartId,
            amount: amount,
            paymentMethod: paymentMethod,
            status: status
        });
        
        await Cart.updateOne(
            {_id: cartId},
            {
                $set: {
                  status: status,
                },
            }
        ).exec();
        await payment.save();

        //Socket from request
        const io = req.io;

        //Update Cart Event
        io.emit('update-cart-status', { cartId: cartId, status: status });
        console.log('Sent update-cart-status event');

        res.status(200).json({
            success: true,
            message: 'Payment added successfully',
            payment: payment,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: true,
            message: 'Some error occurred while adding the Payment',
            error: error.message,
        });
}
    
};

module.exports = {create};