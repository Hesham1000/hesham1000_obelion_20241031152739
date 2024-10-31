const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a database configuration file

class Appointment extends Model {
  static init(sequelize) {
    super.init({
      day: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['monday', 'tuesday', 'wednesday', 'thursday', 'friday']],
        },
      },
      blockTime: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      appointmentType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isIn: [['consultation', 'follow-up']],
        },
      },
      duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 15,
          max: 60,
        },
      },
    }, {
      sequelize,
      modelName: 'Appointment',
      timestamps: false,
    });
  }
}

Appointment.init(sequelize);

module.exports = Appointment;
