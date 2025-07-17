const express = require('express');
const router = express.Router();
const Worker = require('../models/Worker');

// Add new worker
router.post('/', async (req, res) => {
  try {
    console.log('Received request to add worker:', req.body);
    const { name } = req.body;
    
    if (!name || name.trim() === '') {
      return res.status(400).json({ message: 'Name is required' });
    }
    
    const newWorker = new Worker({ name: name.trim() });
    console.log('Created new worker:', newWorker);
    
    const savedWorker = await newWorker.save();
    console.log('Saved worker:', savedWorker);
    
    res.status(201).json(savedWorker);
  } catch (err) {
    console.error('Error adding worker:', err);
    res.status(500).json({ message: err.message });
  }
});

// Get all workers
router.get('/', async (req, res) => {
  const workers = await Worker.find().sort({ name: 1 });
  res.json(workers);
});

// GET /workers/report
router.get('/report', async (req, res) => {
  try {
    const workers = await Worker.find().sort({ name: 1 });

    const totalLoaned = workers.reduce((sum, w) => sum + w.currentBalance, 0);
    const totalPayments = workers.reduce((sum, w) => sum + w.lastPayment, 0);

    res.json({
      summary: {
        totalLoaned,
        totalPayments
      },
      workers
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /workers/:id/payments
router.post('/:id/payments', async (req, res) => {
  const { amount } = req.body;

  try {
    const worker = await Worker.findById(req.params.id);
    if (!worker) return res.status(404).json({ message: 'Worker not found' });

    if (typeof amount !== 'number' || amount <= 0) {
      return res.status(400).json({ message: 'Invalid payment amount' });
    }

    // Update balance and payment info
    worker.currentBalance -= amount;
    worker.lastPayment = amount;
    worker.lastPaymentDate = new Date();

    await worker.save();
    res.json(worker);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;