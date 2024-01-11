const mongoose = require('mongoose');
const Product = require('../models/Product');

const create = (req, res) => {
    
    if(!req.body.name) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    const product = new Product({
        name : req.body.name,
        description : req.body.description,
        price : req.body.price
    });
    return product
    .save()
    .then((newProduct) => {
        return res.status(201).json({
            success: true,
            message: 'New product created successfully',
            Product: newProduct,
        });
    })
    .catch((error) => {
        console.log(error);
        res.status(500).json({
            success: true,
            message: 'Some error occurred while creating the Product',
            error: error.message,
        });
    });
};

const getAllProduct = (req, res) => {
    Product.find()
        .then((data) => {
            return res.status(200).json({
                success: true,
                message: 'A list of all product',
                Product: data,
            });
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: 'Server error. Please try again.',
                error: err.message,
              });
        
        });
}


const update = (req,res) => {
    if(!req.body) {
        return res.status(400).send({
            message: 'Data to update can not be empty!',
        });
    }

    const id = req.params.id;
    const updateObject = req.body;

    Product.findByIdAndUpdate(id, updateObject)
    .then((data) => {
        if(!data) {
            res.status(404).send({
                message: `Cannot update Product with id=${id}. Maybe Product was not found!`,
            });
        }
        else {
            res.send({
                message: "Product was updated successfully.",
            });
        }
    }).catch((err) => {
        console.log(err);
        res.status(500).send({
            message: "Error updating Product with id=" + id,
        });
    });
};

const deleteProduct = (req,res) => {
    const id = req.params.id;

    Product.findByIdAndDelete(id)
    .then((data) => {
        if(!data) {
            res.status(404).send({
                message: `Cannot delete Product with id=${id}. Maybe Product was not found!`,
            });
        } else {
            res.send({
                message: "Product was deleted successfully !",
            });
        }
    })
    .catch((err) =>{
        res.status(500).send({
            message : "Could not delete Product with id=" + id
        });
    });
};

module.exports = { create, update, getAllProduct, deleteProduct };