const DataHukumModel = require('../models/dataHukum.model');
const { v4: uuidv4 } = require('uuid'); 
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require('moment');
class DataHukumService {
    async getDataHukum({searchBy, search}) {
        try {
            let whereCondition = {};
                if (searchBy && search) {
                    whereCondition[searchBy] = {
                        [Sequelize.Op.like]: `%${search}%`
                    };
                }
            const data = await DataHukumModel.findAll({
                where: whereCondition
            });
            return data;
        } catch (error) {
            console.log(error)
            throw new Error(`Failed to get Data Hukum`);
        }
    }

    async getDataHukumById(id) {
        try {
            const data = await DataHukumModel.findByPk(id);
            return data;
        } catch (error) {
            console.log(error)
            throw new Error(`Failed to get Data Hukum with ID ${id}`);
        }
    }

    async createDataHukum(data) {
        try {
            const inputValue = {
                id: uuidv4(),
                tgl_penetapan: moment(data.tgl_penetapan).format('DD-MM-YYYY HH:mm:ss'),
                tgl_penandatanganan: moment(data.tgl_penandatanganan).format('DD-MM-YYYY HH:mm:ss'),
                createdAt: moment().format('DD-MM-YYYY HH:mm:ss'),
                ...data
            }
            return await DataHukumModel.create(inputValue);
        } catch (error) {
            console.log(error)
            throw new Error('Failed to create Data Hukum');
        }
    }
    

    async updateDataHukumById(id, imageData) {
        try {
            const image = await DataHukumModel.findByPk(id);
            if (!image) {
              throw new Error('File not found');
            }
            const inputValue = {
                tgl_penetapan: moment(data.tgl_penetapan).format('DD-MM-YYYY HH:mm:ss'),
                tgl_penandatanganan: moment(data.tgl_penandatanganan).format('DD-MM-YYYY HH:mm:ss'),
                updatedAt: moment().format('DD-MM-YYYY HH HH:mm:ss'),
                ...imageData
            }
            await image.update(inputValue);
            return image;
          } catch (error) {
            console.error('Failed to update data:', error);
            throw new Error('Failed to update data');
          }
    }

    async deleteDataHukumById(id) {
        try {
            return await DataHukumModel.destroy({
              where: {
                id,
              },
            });
          } catch (err) {
            console.log(err);
            throw err;
          }
    }
}

module.exports = new DataHukumService();