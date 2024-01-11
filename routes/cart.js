const express = require('express');
const router = express.Router();

const cartController = require('../controllers/CartController');

router.post('/create', cartController.create);
router.put('/update/:id', cartController.update);
router.delete('/delete/:id', cartController.deleteCart);

module.exports = router;