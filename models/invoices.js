const { sequelize, DataTypes } = require('sequelize');
const db = require('./db')


const Invoices = db.define('invoices', {
    idHD: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey : true
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
      },
    nameReceiver: {
        type: DataTypes.STRING,
        allowNull: false
    },
    note: {
        type: DataTypes.STRING,
        allowNull: false
    },
    addressReceiver: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneReceiver: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    totalItems: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    freezeTableName: true
  });
db.sync();
module.exports = Invoices;