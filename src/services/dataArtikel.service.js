const DataArtikelModel = require('../models/dataArtikel.model');
const { v4: uuidv4 } = require('uuid'); 
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const moment = require('moment');
class DataArtikelService {
    async getDataArtikel({searchBy, search}) {
        try {
            let whereCondition = {};
                if (searchBy && search) {
                    whereCondition[searchBy] = {
                        [Sequelize.Op.like]: `%${search}%`
                    };
                }
            const data = await DataArtikelModel.findAndCountAll({
                where: whereCondition,
                order: [['createdAt', 'ASC']]
            });
            return data;
        } catch (error) {
            console.log(error)
            throw new Error(`Failed to get Data Artikel`, error);
        }
    }

    async getDataArtikelById(id) {
        try {
            const data = await DataArtikelModel.findByPk(id);
            return data;
        } catch (error) {
            console.log(error)
            throw new Error(`Failed to get Data Artikel with ID ${id}`, error);
        }
    }

    async createDataArtikel(data) {
        try {
            const inputValue = {
                id: uuidv4(),
                createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                ...data
            }
            return await DataArtikelModel.create(inputValue);
        } catch (error) {
            console.log(error)
            throw new Error('Failed to create Data Artikel', error);
        }
    } 

    async updateDataArtikelById(id, imageData) {
        try {
            const image = await DataArtikelModel.findByPk(id);
            if (!image) {
              throw new Error('File not found');
            }
            const inputValue = {
                updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                ...imageData
            }
            await image.update(inputValue);
            return image;
          } catch (error) {
            console.error('Failed to update data:', error);
            throw new Error('Failed to update data', error);
          }
    }

    async deleteDataArtikelById(id) {
        try {
            return await DataArtikelModel.destroy({
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

module.exports = new DataArtikelService();