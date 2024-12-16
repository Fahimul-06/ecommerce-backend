const express = require('express');
const { submitFeedback, getFeedbacks } = require('../controllers/feedbackController');

const router = express.Router();

router.post('/', submitFeedback); 
router.get('/', getFeedbacks);  

module.exports = router;