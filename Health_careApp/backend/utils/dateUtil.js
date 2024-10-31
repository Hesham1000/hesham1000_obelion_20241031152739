// File type: Utility

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('Health_careApp', 'root', 'root', {
  host: 'db',
  port: 3306,
  dialect: 'mysql',
});

async function getCurrentDate() {
  try {
    const [results] = await sequelize.query('SELECT CURDATE() as currentDate');
    return results[0].currentDate;
  } catch (error) {
    throw new Error('Failed to fetch current date from the database');
  }
}

async function formatDate(date) {
  try {
    const [results] = await sequelize.query('SELECT DATE_FORMAT(?, "%Y-%m-%d") as formattedDate', {
      replacements: [date],
    });
    return results[0].formattedDate;
  } catch (error) {
    throw new Error('Failed to format the date');
  }
}

module.exports = {
  getCurrentDate,
  formatDate,
};
