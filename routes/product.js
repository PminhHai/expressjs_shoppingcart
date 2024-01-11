const express = require('express');
const router = express.Router();

const productController = require('../controllers/ProductController');

router.post('/create', productController.create);
router.put('/update/:id', productController.update);
router.get('/getAll', productController.getAllProduct);
router.delete("/delete/:id",productController.deleteProduct);

module.exports = router;