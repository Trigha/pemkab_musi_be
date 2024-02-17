const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize.config');

class DataUser extends Model { }

DataUser.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'DataUser',
    freezeTableName: true,
    tableName: 'data_user'
});

module.exports = DataUser;