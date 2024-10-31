import React, { useState, useEffect } from 'react';
import './CalendarNavigation.css';
import axios from 'axios';

function CalendarNavigation() {
  const [availability, setAvailability] = useState('');
  const [blockTime, setBlockTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('consultation');
  const [duration, setDuration] = useState(15);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('https://Health_careApp-backend.cloud-stacks.com/api/appointments');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchAppointments();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('https://Health_careApp-backend.cloud-stacks.com/api/appointments', {
        availability,
        blockTime,
        appointmentType,
        duration
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setAvailability('');
      setBlockTime('');
      setAppointmentType('consultation');
      setDuration(15);
      alert('Appointment preferences saved successfully.');
    } catch (error) {
      console.error('Error saving appointment preferences:', error);
      alert('Failed to save appointment preferences.');
    }
  };

  return (
    <div className="calendar-navigation">
      <header className="header">
        <h1>Doctor Calendar Management</h1>
      </header>
      <div className="navigation-tabs">
        <ul>
          <li className="tab active">Set Availability</li>
          <li className="tab">Manage Appointments</li>
          <li className="tab">Preferences</li>
        </ul>
      </div>
      <main className="main-content">
        <form className="availability-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="availability">Set Availability</label>
            <input
              type="text"
              id="availability"
              placeholder="Select time slots"
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="appointments">Block Off Time Slots</label>
            <input
              type="text"
              id="appointments"
              placeholder="Block time slots"
              value={blockTime}
              onChange={(e) => setBlockTime(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="appointment-types">Customize Appointment Types</label>
            <select
              id="appointment-types"
              value={appointmentType}
              onChange={(e) => setAppointmentType(e.target.value)}
            >
              <option>Consultation</option>
              <option>Check-up</option>
              <option>Emergency</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="appointment-duration">Appointment Duration</label>
            <input
              type="number"
              id="appointment-duration"
              placeholder="Duration in minutes"
              value={duration}
              onChange={(e) => setDuration(+e.target.value)}
            />
          </div>
          <button type="submit" className="primary-action">Save Preferences</button>
        </form>
      </main>
      <footer className="footer">
        <p>© 2023 Doctor Calendar Management</p>
        <a href="/privacy">Privacy Policy</a>
      </footer>
    </div>
  );
}

export default CalendarNavigation;
