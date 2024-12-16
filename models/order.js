const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  products: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: Number }],
  totalPrice: Number,
  status: { type: String, default: 'Pending' },
  invoice: String,
});

module.exports = mongoose.model('Order', orderSchema);