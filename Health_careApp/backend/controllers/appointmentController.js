const Appointment = require('../models/Appointment');

exports.setAvailability = async (req, res) => {
    try {
        const { day, blockTime, appointmentType, duration } = req.body;
        const appointment = await Appointment.create({
            day,
            blockTime,
            appointmentType,
            duration
        });
        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while setting availability.' });
    }
};

exports.getAvailability = async (req, res) => {
    try {
        const appointments = await Appointment.findAll();
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while fetching availability.' });
    }
};

exports.updateAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const { day, blockTime, appointmentType, duration } = req.body;
        const appointment = await Appointment.findByPk(id);

        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found.' });
        }

        appointment.day = day;
        appointment.blockTime = blockTime;
        appointment.appointmentType = appointmentType;
        appointment.duration = duration;
        await appointment.save();

        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating availability.' });
    }
};

exports.deleteAvailability = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findByPk(id);

        if (!appointment) {
            return res.status(404).json({ error: 'Appointment not found.' });
        }

        await appointment.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while deleting availability.' });
    }
};
