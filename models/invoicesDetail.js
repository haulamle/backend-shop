const { sequelize, DataTypes } = require('sequelize');
const db = require('./db')


const InvoicesDetail = db.define('invoicesDetail', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey : true
    },
    idHD: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false
      },
    idSP: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    freezeTableName: true
  });
db.sync();
module.exports = InvoicesDetail;