const { Sequelize } = require('sequelize');
const db = new Sequelize(process.env.DATA_BASE, 'root', '', {
  host: 'localhost',
  dialect:  'mysql' 
});

db.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

module.exports = db;
