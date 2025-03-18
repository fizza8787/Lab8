MONGODB_URI="mongodb://localhost:27017/event-planner"
PORT="5000"
JWT_SECRET="saimasaleem"

const express = require('express');
const Event = require('../models/eventModel');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();


router.post('/', verifyToken, async (req, res) => {
  const { name, description, date, time, category, reminder, reminderTime } = req.body;

  try {
    const newEvent = new Event({ userId: req.userId, name, description, date, time, category, reminder, reminderTime });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});


router.get('/', verifyToken, async (req, res) => {
  try {
    const events = await Event.find({ userId: req.userId, date: { $gte: new Date() } }).sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/category/:category', verifyToken, async (req, res) => {
  const { category } = req.params;

  try {
    const events = await Event.find({ userId: req.userId, category, date: { $gte: new Date() } }).sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get('/reminders', verifyToken, async (req, res) => {
  try {
    const events = await Event.find({ userId: req.userId, reminder: true, date: { $gte: new Date() } }).sort({ date: 1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
