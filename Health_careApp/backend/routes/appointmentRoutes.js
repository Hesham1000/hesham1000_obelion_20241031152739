const express = require('express');
const Sequelize = require('sequelize');

const router = express.Router();

const sequelize = new Sequelize('Health_careApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql'
});

// Connect to the database
sequelize.authenticate()
  .then(() => console.log('Database connected.'))
  .catch(err => console.error('Unable to connect to the database:', err));

// Handle errors
const errorHandler = (res, error) => {
  res.status(500).json({ error: error.message });
};

// GET /appointments - Retrieve all appointments
router.get('/appointments', async (req, res) => {
  try {
    const appointments = await sequelize.query("SELECT * FROM Appointments", { type: sequelize.QueryTypes.SELECT });
    res.status(200).json(appointments);
  } catch (error) {
    errorHandler(res, error);
  }
});

// POST /appointments - Create a new appointment
router.post('/appointments', async (req, res) => {
  const { availability, blockTime, appointmentType, duration } = req.body;
  try {
    const [result, metadata] = await sequelize.query(
      "INSERT INTO Appointments (availability, blockTime, appointmentType, duration) VALUES (?, ?, ?, ?)",
      { replacements: [availability, blockTime, appointmentType, duration] }
    );
    res.status(201).json({ message: 'Appointment created successfully', appointmentId: metadata.insertId });
  } catch (error) {
    errorHandler(res, error);
  }
});

// PUT /appointments/:id - Update an appointment
router.put('/appointments/:id', async (req, res) => {
  const { id } = req.params;
  const { availability, blockTime, appointmentType, duration } = req.body;

  try {
    await sequelize.query(
      "UPDATE Appointments SET availability = ?, blockTime = ?, appointmentType = ?, duration = ? WHERE id = ?",
      { replacements: [availability, blockTime, appointmentType, duration, id] }
    );
    res.status(200).json({ message: 'Appointment updated successfully' });
  } catch (error) {
    errorHandler(res, error);
  }
});

// DELETE /appointments/:id - Delete an appointment
router.delete('/appointments/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await sequelize.query(
      "DELETE FROM Appointments WHERE id = ?",
      { replacements: [id] }
    );
    res.status(200).json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    errorHandler(res, error);
  }
});

module.exports = router;
