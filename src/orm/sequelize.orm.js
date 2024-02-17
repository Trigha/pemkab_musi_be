const sequelize = require('../config/sequelize.config');
const { HomePage, HomePageBanner } = require('../models/Sequelize/index.model')

async function connectToDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        // Define your models and associations here
        // ...
        new HomePage()
        new HomePageBanner()

        return sequelize;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

module.exports = connectToDatabase;
