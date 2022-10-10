const { sequelize, DataTypes } = require('sequelize');
const db = require('./db')


const Products = db.define('products', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey : true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
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
    idDM: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    priceDiscount: {
        type: DataTypes.STRING,
        allowNull: false
    },
    size: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    freezeTableName: true
  });
db.sync();
module.exports = Products;