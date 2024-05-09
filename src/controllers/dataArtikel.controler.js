const { deleteFile } = require('../helper/fileSystem.helper');
const DataArtikelService = require('../services/dataArtikel.service');
const decidePlatform = require('../helper/decidePlatform.helper')
let hitCount = 1;
class DataArtikelController {
    async getDataArtikelById(req, res) {
        try {
            if(req.userId){
                hitCount++;
            }
            const { id } = req.params;

            const data = await DataArtikelService.getDataArtikelById(id);
            let imageLink = null;
            let protocol = req.protocol;
            if (data && data.dataValues.file) {
            const storedFilePath = data.dataValues.file
                          .split(decidePlatform())
                          .pop();
                          if (req.headers['x-forwarded-proto'] === 'https' || req.secure) {
                              protocol = 'https';
                          }
                          imageLink = `${protocol}://${req.get('host')}/file?path=${data.dataValues.file}`;
                          
            // const createLink = (filePath) => {
            //     const storedFilePath = filePath.toString().split(decidePlatform()).pop()
            //     return `${req.protocol}://${req.get('host')}/uploads/${storedFilePath}`;
            // }
            }
            if (data) {
                res.json({
                    ...data.dataValues,
                    file: imageLink,
                });
            } else {
                res.status(404).json({ error: 'Data not found' });
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({ error: error.message });
        }
    }

    async createDataArtikel(req, res) {
        const payload = req.body
        const files = req.files
        let processedFiles = {}
        try {
            if (files) {
                for (const [key, value] of Object.entries(files)) {
                    processedFiles[key] = value[0].path
                }
            }

            const createdData = await DataArtikelService.createDataArtikel({
                ...payload,
                ...(processedFiles && {
                    ...processedFiles
                })
            });
            res.json(createdData);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateDataArtikelById(req, res) {
        const { id } = req.params;
        const payload = req.body;
        const files = req.files;
        let filePath;
        try {
            const existingData = await DataArtikelService.getDataArtikelById(id);
            if (!existingData) throw new Error('Not Found');
    
            if (files && files.file) {
                filePath = files.file[0].path;
                const storedFilePath = existingData.dataValues.file.split(decidePlatform()).pop();
                deleteFile(storedFilePath);
                payload.file = filePath
            } else {
                payload.file = existingData.dataValues.file
            }
            await DataArtikelService.updateDataArtikelById(id, payload);
    
            const updatedData = await DataArtikelService.getDataArtikelById(id);
    
            res.status(201).send(updatedData);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
    }
    

    async getDataArtikel(req, res) {
        let response;
        try {
            if(req.userId){
                hitCount++;
            }
            const { searchBy, search } = req.query;
            const data = await DataArtikelService.getDataArtikel({ searchBy, search });
            let protocol = req.protocol;
            if(data.rows){
                response = data.rows.map((item) => {
                    let imageLink = null;
                    if (item.dataValues.file) {
                        const storedFilePath = item.dataValues.file
                          .split(decidePlatform())
                          .pop();
                        imageLink = `${req.protocol}://${req.get('host')}/file?path=${item.dataValues.file}`;
                    }
                    return {
                        ...item.dataValues,
                        file: imageLink,
                    };
                });
            }
            res.send(response);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }    

    async deleteDataArtikelById(req, res) {
        const { id } = req.params;
        try {
            if (!id)
               return res
                .status(400)
                .json({ code: 400, message: 'File Id Is Required' });

            const data = await DataArtikelService.getDataArtikelById(id);

            if (!data)
                res.status(404).json({ code: 404, message: 'Not Found!' });

            const storedImagePath = data.dataValues.file
                .split(decidePlatform())
                .pop();
            deleteFile(storedImagePath);

            await DataArtikelService.deleteDataArtikelById(id);
            res.status(204).json({
                code: 204,
                message: 'Data Removed!',
              });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getHitCount(req, res) {
        try {
            res.status(200).json({ hitCount });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
}

module.exports = new DataArtikelController();