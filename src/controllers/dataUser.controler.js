const DataUserService = require('../services/dataUser.service');
const DataUserModel = require('../models/dataUser.model');
class DataUserController {

    async createDataUser(req, res){
        const payload = req.body
        try {
            const existingUser = await DataUserModel.findOne({
                where: { username: payload.username }
            });
    
            if (existingUser) {
                return res.status(400).json({ error: "Username already exists" });
            }
            const createdUser = await DataUserService.createDataUser(payload);
            res.json(createdUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async loginUser(req, res) {
        try {
          const { username, password } = req.body;
          const result = await DataUserService.loginUser(username, password);
          if (result.success) {
            res.json({ success: true, id: result.id, token: result.token });
          } else {
            res.status(401).json({ success: false, message: result.message });
          }
        } catch (error) {
          res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        }
      }

    async updateUser(req, res) {
      const payload = req.body;
      const { id } = req.params;
      try {
        const existingUser = await DataUserModel.findOne({
          where: { id: id }
      });
            if (!existingUser) throw new Error('Not Found Id User');
        const response = await DataUserService.updateUser(id, payload)
        if(response){
          res.status(201).json({
              code: 201,
              message: 'Successfully Updated',
              data: response
          })
        }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }  

    async getAllDataUser(req, res){
      try {
        const data =  await DataUserService.getAllDataUser()
        res.status(200).send(data);
      } catch (error) {
        console.log(err);
        res.status(500).json({ error: err.message });
      }
    }
}

module.exports = new DataUserController();