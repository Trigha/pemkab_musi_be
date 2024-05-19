const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize.config');

class DataHukum extends Model { }

DataHukum.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    judul: {
        type: DataTypes.STRING
    },
    deskripsi: {
        type: DataTypes.STRING
    },
    file: {
        type: DataTypes.STRING
    },
    createdAt: {
        type: DataTypes.DATE
    },
    updatedAt: {
        type: DataTypes.DATE
    }
}, {
    sequelize,
    modelName: 'DataArtikel',
    freezeTableName: true,
    tableName: 'data_artikel'
});

module.exports = DataHukum;