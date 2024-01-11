const mongoose = require('mongoose');
const Cart = require('../models/Cart');
const Product = require('../models/Product');


const create = async (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: 'Data to add can not be empty!',
        });
    }
    const productId = req.body.productId;
    const qty = req.body.qty;

    console.log(req.body);

    const product = await Product.findById(productId);

    if (!product) {
        return res.status(404).json({ error: "Can't find product!" });
    }

    const id = product.id;
    const name = product.name;
    const price = product.price;
    const total = qty * price;

    const status = req.body.status;

    const cart = new Cart({
        productId: id, 
        name : name, 
        price : price, 
        qty : qty,
        status : status,
        total : total
    })

    return cart
    .save()
    .then((newCart) => {
        return res.status(201).json({
            success: true,
            message: 'New Cart add successfully',
            Cart: newCart,
        });
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({
            success: true,
            message: 'Some error occurred while adding the Cart',
            error: error.message,
        });
    });
}

const update = async (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: 'Data to update can not be empty!',
        });
    }

    const id = req.params.id;
    const qty = req.body.qty;
    
    const cart = await Cart.findById(id);

    const productId = req.body.productId;

    const product = await Product.findById(productId);

    if (!product) {
        return res.status(404).json({ error: 'Không tìm thấy sản phẩm!' });
    }

    const name = product.name;
    const price = product.price;
    const total = qty * price;

    const status = req.body.status;

    Cart.updateOne(
        {_id: id},
        {
            $set: {
              productId: productId,
              name: name,
              price: price,
              qty: qty,
              status: status,
              total: total,
            },
        }
    ).exec().then(() => {
        req.io.emit('update-cart', { cartId: id });
        console.log('Sent update-cart event');
        return res.status(201).json({
            success: true,
            message: 'Update Cart successfully',
        });
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({
            success: true,
            message: 'Some error occurred while updating the Cart',
            error: error.message,
        });
    });
}

const deleteCart = async (req,res) => {

    const id = req.params.id;

    Cart.findByIdAndDelete(id)
    .then((data) => {
        if(!data) {
            res.status(404).send({
                message: `Cannot delete Cart with id=${id}. Maybe Product was not found!`,
            });
        } else {
            res.send({
                message: "Cart was deleted successfully !",
            })
        }
    })
    .catch((err) => {
        console.log(err);
        res.status(500).send({
            message : "Could not delete Cart with id=" + id
        });
    });
}

module.exports = { create, update, deleteCart };