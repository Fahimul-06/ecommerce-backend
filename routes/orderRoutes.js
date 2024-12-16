const express = require('express');
const { createOrder, getOrderById, updateOrderStatus, deleteOrder } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, createOrder);             
router.get('/:id', protect, getOrderById);         
router.put('/:id', protect, updateOrderStatus);     
router.delete('/:id', protect, deleteOrder);        

module.exports = router;