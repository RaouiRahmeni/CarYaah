const {DataTypes}= require('sequelize');
const db = require('../index.js')

module.exports = db.define('conflict', {
    // attributess
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    conflict_report: {
        type: DataTypes.STRING,
        allowNull: false
      },
      conflict_status: {
        type: DataTypes.STRING,
        allowNull: false
      },
      id_car: {
        type: DataTypes.INTEGER,
        required : true,
        allowNull: false
      },
      id_client: {
        type: DataTypes.INTEGER,
        required : true,
        allowNull: false
      }
  });