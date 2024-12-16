const Customer = require('../models/customer');

const submitFeedback = async (req, res) => {
  try {
    const { customerId, message } = req.body;

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    customer.feedbacks.push({ message });
    await customer.save();

    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFeedbacks = async (req, res) => {
  try {
    const customers = await Customer.find().populate('feedbacks');
    const feedbacks = customers.map((customer) => ({
      customerName: customer.name,
      feedbacks: customer.feedbacks,
    }));

    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { submitFeedback, getFeedbacks };