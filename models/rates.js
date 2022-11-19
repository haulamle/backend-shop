const { sequelize, DataTypes } = require('sequelize');
const db = require('./db')


const Rates = db.define('rates', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey : true
    },
    idUser : {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: false
    },
    star: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    freezeTableName: true
  });
db.sync();
module.exports = Rates;