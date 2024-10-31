import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageAvailability.css';

function ManageAvailability() {
  const [availability, setAvailability] = useState('monday');
  const [blockTime, setBlockTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('consultation');
  const [duration, setDuration] = useState(15);
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    const fetchCurrentDate = async () => {
      try {
        const response = await axios.get('https://Health_careApp-backend.cloud-stacks.com/api/utils/getCurrentDate');
        setCurrentDate(response.data.currentDate);
      } catch (error) {
        console.error('Failed to fetch current date:', error);
      }
    };

    fetchCurrentDate();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('https://Health_careApp-backend.cloud-stacks.com/api/appointments', {
        availability,
        blockTime,
        appointmentType,
        duration,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      alert('Preferences saved successfully');
    } catch (error) {
      console.error('Error saving preferences:', error);
      alert('An error occurred while saving preferences.');
    }
  };

  return (
    <div className="doctor-calendar-management">
      <header className="header">
        <h1>Doctor Calendar Management</h1>
        <p>Current Date: {currentDate}</p>
      </header>
      <div className="sidebar">
        <ul>
          <li className="active">Set Availability</li>
          <li>Manage Appointments</li>
          <li>Preferences</li>
        </ul>
      </div>
      <main className="main-content">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="availability">Availability</label>
            <select id="availability" value={availability} onChange={(e) => setAvailability(e.target.value)}>
              <option value="monday">Monday</option>
              <option value="tuesday">Tuesday</option>
              <option value="wednesday">Wednesday</option>
              <option value="thursday">Thursday</option>
              <option value="friday">Friday</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="block-time">Block Time Slots</label>
            <input type="time" id="block-time" value={blockTime} onChange={(e) => setBlockTime(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="appointment-type">Appointment Type</label>
            <select id="appointment-type" value={appointmentType} onChange={(e) => setAppointmentType(e.target.value)}>
              <option value="consultation">Consultation</option>
              <option value="follow-up">Follow Up</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="duration">Duration</label>
            <input type="number" id="duration" value={duration} min="15" max="60" step="15" onChange={(e) => setDuration(e.target.value)} />
          </div>
          <button type="submit" className="primary-button">
            Save Preferences
          </button>
        </form>
      </main>
      <footer className="footer">
        <p>&copy; 2023 Health Care App. All rights reserved. <a href="/privacy-policy">Privacy Policy</a></p>
      </footer>
    </div>
  );
}

export default ManageAvailability;
