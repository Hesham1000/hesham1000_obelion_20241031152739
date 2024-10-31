import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CustomizePreferences.css';

function CustomizePreferences() {
  const [availability, setAvailability] = useState(false);
  const [appointmentType, setAppointmentType] = useState('General Consultation');
  const [duration, setDuration] = useState(15);
  const [currentDate, setCurrentDate] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://Health_careApp-backend.cloud-stacks.com/api/utils/getCurrentDate')
      .then(response => setCurrentDate(response.data.currentDate))
      .catch(err => setError('Failed to fetch current date.'));
  }, []);

  const handleAvailabilityChange = (e) => {
    setAvailability(e.target.checked);
  };

  const handleAppointmentTypeChange = (e) => {
    setAppointmentType(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://Health_careApp-backend.cloud-stacks.com/api/appointments', {
      availability: availability ? 'Available' : 'Blocked',
      blockTime: currentDate,
      appointmentType,
      duration
    })
    .then(response => {
      alert('Preferences saved successfully');
    })
    .catch(err => {
      setError('An error occurred while saving preferences.');
    });
  };

  return (
    <div className="doctor-calendar-management">
      <header className="header">
        <h1>Doctor Calendar Management</h1>
      </header>
      <div className="navigation-tabs">
        <button className="tab active">Set Availability</button>
        <button className="tab">Manage Appointments</button>
        <button className="tab">Preferences</button>
      </div>
      <main className="main-content">
        <form className="preferences-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Availability:</label>
            <input type="checkbox" checked={availability} onChange={handleAvailabilityChange} /> Available
          </div>
          <div className="form-group">
            <label>Appointment Type:</label>
            <select value={appointmentType} onChange={handleAppointmentTypeChange}>
              <option>General Consultation</option>
              <option>Follow-up</option>
              <option>Emergency</option>
            </select>
          </div>
          <div className="form-group">
            <label>Appointment Duration:</label>
            <input type="number" value={duration} min="15" max="120" step="15" onChange={handleDurationChange} /> minutes
          </div>
          <button type="submit" className="primary-action-button">Save Preferences</button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </main>
      <footer className="footer">
        <p>&copy; 2023 Health Care App. All rights reserved.</p>
        <a href="/privacy-policy">Privacy Policy</a>
      </footer>
    </div>
  );
}

export default CustomizePreferences;
