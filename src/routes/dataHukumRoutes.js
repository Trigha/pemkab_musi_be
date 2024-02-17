const express = require('express');
const multer = require('multer');
const storage = require('../middleware/multer.middleware');
const authMiddleware = require('../middleware/authMiddleware');
const DataHukumController = require('../controllers/dataHukum.controler');

const upload = multer({ storage });

const router = express.Router();

router.post('/',authMiddleware, upload.fields([
    { name: 'file', maxCount: 1 }
]), DataHukumController.createDataHukum);

router.get('/all-data',authMiddleware, DataHukumController.getDataHukum);

router.get('/:id', authMiddleware, DataHukumController.getDataHukumById);

router.put('/:id',authMiddleware,  upload.fields([
    { name: 'file', maxCount: 1 },
]), DataHukumController.updateDataHukumById);

router.delete('/:id',authMiddleware, DataHukumController.deleteDataHukumById);

module.exports = router;