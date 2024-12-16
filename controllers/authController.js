const Customer = require('../models/customer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



const register = async (req, res) => {
  const { name, email, password } = req.body;
  const customerExists = await Customer.findOne({ email });

  if (customerExists) {
    return res.status(400).json({ message: 'Email already registered' });
  }

  const customer = new Customer({ name, email, password });
  await customer.save();
  
  const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(201).json({ token, customer });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const customer = await Customer.findOne({ email });

  if (!customer) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const isMatch = await customer.matchPassword(password);
  if (!isMatch) {
    return res.status(400).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, customer });
};

module.exports = { register, login };
