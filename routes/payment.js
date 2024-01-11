const express = require('express');
const router = express.Router();

const paymentController = require('../controllers/PaymentController');

router.post('/create', paymentController.create);

module.exports = router;