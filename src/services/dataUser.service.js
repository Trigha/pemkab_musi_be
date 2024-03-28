const DataUserModel = require('../models/dataUser.model');
const { v4: uuidv4 } = require('uuid'); 
const moment = require('moment');
const { hashPassword, comparePasswords } = require("../utils/passwordUtils");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');

class DataUserService {
    async createDataUser(data) {
        try {
            const inputValue = {
                id: uuidv4(),
                createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                ...data
            }
            inputValue.password = inputValue.password.replace(/[^0-9a-zA-Z]/g, '');
            inputValue.password = await hashPassword(inputValue.password)
            return await DataUserModel.create(inputValue);
        } catch (error) {
            console.log(error)
            throw new Error('Failed to create User');
        }
    }

    async loginUser(username, password) {
        try {
            const existingUser = await DataUserModel.findOne({
                where: { username: username }
            });
            if (!existingUser) {
                return { success: false, message: "Invalid username or password" };
            }
            const removeCase = password.replace(/[^0-9a-zA-Z]/g, '');
            const passwordMatch = await comparePasswords(removeCase, existingUser.password);
            if (!passwordMatch) {
                return { success: false, message: "Invalid username or password" };
            }
            const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
              });
              return { success: true, id: existingUser.id, token };
        } catch (error) {
            console.log(error)
            throw new Error('Failed to login');
        }
    }

    async updateUser(id, data){
        try {
            const existingUser = await DataUserModel.findOne({
                where: { id: id }
            });
            if (!existingUser) {
                return { success: false, message: "Invalid id user" };
            }
            const inputValue = {
                updatedAt: moment().format('YYYY-MM-DD HH:mm:ss'),
                ...data
            }
            const removeCase = inputValue.password.replace(/[^0-9a-zA-Z]/g, '');
            inputValue.password = await hashPassword(removeCase)
            await existingUser.update(inputValue);
            return existingUser;
        } catch (error) {
            console.error('Failed to update data:', error);
            throw new Error('Failed to update data');
        }
    }

    async getAllDataUser(){
        try {
            return await DataUserModel.findAndCountAll({
                attributes: ['id', 'username', 'createdAt']
            });
        } catch (error) {
            throw new Error(`Failed to get Data User`);
        }
    }
}

module.exports = new DataUserService();