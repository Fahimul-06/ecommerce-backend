const Order = require('../models/order');
const Product = require('../models/product');
const Customer = require('../models/customer');
const generateInvoice = require('../utils/invoiceGenerator');

const createOrder = async (req, res) => {
  try {
    const { customerId, products } = req.body;

    let totalPrice = 0;

    for (const item of products) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.product}` });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Not enough stock for: ${product.name}` });
      }

      totalPrice += product.price * item.quantity;

      product.stock -= item.quantity; // Reduce stock
      await product.save();
    }

    const order = new Order({
      customer: customerId,
      products,
      totalPrice,
      status: 'Pending',
    });

    const savedOrder = await order.save();

    // Generate invoice
    const invoicePath = generateInvoice(savedOrder._id, savedOrder);
    savedOrder.invoice = invoicePath;
    await savedOrder.save();

    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id).populate('customer').populate('products.product');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    await Order.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getOrderById, updateOrderStatus, deleteOrder };