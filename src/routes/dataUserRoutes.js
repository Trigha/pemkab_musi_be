const express = require('express');
const DataUserController = require('../controllers/dataUser.controler');

const router = express.Router();

router.post('/register', DataUserController.createDataUser);
router.post('/login', DataUserController.loginUser);

module.exports = router;