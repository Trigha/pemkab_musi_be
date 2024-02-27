const express = require('express');
const DataUserController = require('../controllers/dataUser.controler');
const dataUserControler = require('../controllers/dataUser.controler');

const router = express.Router();

router.get('/all-user', dataUserControler.getAllDataUser);
router.post('/register', DataUserController.createDataUser);
router.post('/login', DataUserController.loginUser);
router.put('/update/:id', DataUserController.updateUser);

module.exports = router;