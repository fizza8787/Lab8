// models/Event.js
const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  category: { type: String, enum: ['Meeting', 'Birthday', 'Appointment'], required: true },
  reminder: { type: Boolean, default: false },
  reminderTime: { type: Date }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
