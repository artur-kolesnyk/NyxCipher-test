const express = require('express');
const router = express.Router();

//------------ Importing Controllers ------------//
const WhaleController = require('../controllers/WhaleController')

router.get('/transactions',
    WhaleController.getWhaleTransactions
);

module.exports = router;