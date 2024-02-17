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
            inputValue.password = await hashPassword(inputValue.password)
            console.log(inputValue.password, 'MEMEK')
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
            console.log(password, 'cek pass')
            console.log(existingUser.password, 'cek pass 2')
            const passwordMatch = await comparePasswords(password, existingUser.password);
            console.log(passwordMatch, 'cek ini')
            if (!passwordMatch) {
                console.log('masuk sini 2')
                return { success: false, message: "Invalid username or password" };
            }
            const token = jwt.sign({ id: existingUser.id }, process.env.JWT_SECRET, {
                expiresIn: "1h",
              });
              return { success: true, token };
        } catch (error) {
            console.log(error)
            throw new Error('Failed to login');
        }
    }

}

module.exports = new DataUserService();