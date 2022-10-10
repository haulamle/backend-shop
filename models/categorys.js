const { sequelize, DataTypes } = require('sequelize');
const db = require('./db')


const Categorys = db.define('categorys', {
    idDM: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey : true
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
    status: {
        type: DataTypes.STRING,
        allowNull: false
    }
},{
  freezeTableName: true
});
db.sync();
module.exports = Categorys;