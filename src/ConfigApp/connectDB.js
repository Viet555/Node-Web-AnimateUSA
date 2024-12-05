const { Sequelize } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('data', 'root', "aomg1211", {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    port: 3308,
});
const connectDB = async () => {

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
module.exports = connectDB;