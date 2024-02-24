const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/sequelize.config');

class DataHukum extends Model { }

DataHukum.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    jenis_peraturan: {
        type: DataTypes.STRING
    },
    bentuk_peraturan: {
        type: DataTypes.STRING
    },
    judul: {
        type: DataTypes.STRING
    },
    no_peraturan: {
        type: DataTypes.STRING
    },
    tahun: {
        type: DataTypes.STRING
    },
    tmpt_penetapan: {
        type: DataTypes.STRING
    },
    tgl_penetapan: {
        type: DataTypes.DATE
    },
    penandatanganan: {
        type: DataTypes.DATE
    },
    tgl_penandatanganan: {
        type: DataTypes.STRING
    },
    pemrakarsa: {
        type: DataTypes.STRING
    },
    sumber: {
        type: DataTypes.STRING
    },
    status: {
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
    modelName: 'DataHukum',
    freezeTableName: true,
    tableName: 'data_hukum'
});

module.exports = DataHukum;