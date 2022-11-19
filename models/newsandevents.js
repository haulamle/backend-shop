const { sequelize, DataTypes } = require('sequelize');
const db = require('./db')


const Newsandevents = db.define('newsandevents', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey : true
    },
    description : {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
},{
    freezeTableName: true
  });
db.sync();
module.exports = Newsandevents;