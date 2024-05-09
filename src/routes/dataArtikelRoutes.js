const express = require('express');
const multer = require('multer');
const storage = require('../middleware/multer.middleware');
const authMiddleware = require('../middleware/authMiddleware');
const DataArtikelController = require('../controllers/dataArtikel.controler');

const upload = multer({ storage });

const router = express.Router();

router.post('/',authMiddleware, upload.fields([
    { name: 'img', maxCount: 1 }
]), DataArtikelController.createDataArtikel);

router.get('/all-data', DataArtikelController.getDataArtikel);

router.get('/hit-amount', DataArtikelController.getHitCount);

router.get('/:id', DataArtikelController.getDataArtikelById);

router.put('/:id',authMiddleware,  upload.fields([
    { name: 'img', maxCount: 1 },
]), DataArtikelController.updateDataArtikelById);

router.delete('/:id',authMiddleware, DataArtikelController.deleteDataArtikelById);

module.exports = router;