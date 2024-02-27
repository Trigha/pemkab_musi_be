const { deleteFile } = require('../helper/fileSystem.helper');
const DataHukumService = require('../services/dataHukum.service');
const decidePlatform = require('../helper/decidePlatform.helper')
let hitCount = 0;
class DataHukumController {
    async getDataHukumById(req, res) {
        try {
            // hitCount++;
            const { id } = req.params;

            const data = await DataHukumService.getDataHukumById(id);
            let imageLink = null;
            if (data && data.dataValues.file) {
            const storedFilePath = data.dataValues.file
                          .split(decidePlatform())
                          .pop();
                        imageLink = `${req.protocol}://${req.get('host')}/uploads/${storedFilePath}`;
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

    async createDataHukum(req, res) {
        const payload = req.body
        const files = req.files
        let processedFiles = {}
        try {
            if (files) {
                for (const [key, value] of Object.entries(files)) {
                    processedFiles[key] = value[0].path
                }
            }

            const createdData = await DataHukumService.createDataHukum({
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

    async updateDataHukumById(req, res) {
        const { id } = req.params;
        const payload = req.body;
        const files = req.files;
        let filePath;
        try {
            const existingData = await DataHukumService.getDataHukumById(id);
            if (!existingData) throw new Error('Not Found');
    
            if (files) {
                filePath = files.file[0].path;
                const storedFilePath = existingData.dataValues.file.split(decidePlatform()).pop();
                deleteFile(storedFilePath);
                payload.file = filePath
            }   
    
            await DataHukumService.updateDataHukumById(id, payload);
    
            const updatedData = await DataHukumService.getDataHukumById(id);
    
            res.status(201).send(updatedData);
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: err.message });
        }
    }
    

    async getDataHukum(req, res) {
        let response;
        try {
            // hitCount++;
            const { searchBy, search } = req.query;
            const data = await DataHukumService.getDataHukum({ searchBy, search });
            if(data.rows){
                response = data.rows.map((item) => {
                    let imageLink = null;
                    if (item.dataValues.file) {
                        const storedFilePath = item.dataValues.file
                          .split(decidePlatform())
                          .pop();
                        imageLink = `${req.protocol}://${req.get('host')}/uploads/${storedFilePath}`;
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

    async deleteDataHukumById(req, res) {
        const { id } = req.params;
        try {
            if (!id)
               return res
                .status(400)
                .json({ code: 400, message: 'File Id Is Required' });

            const data = await DataHukumService.getDataHukumById(id);

            if (!data)
                res.status(404).json({ code: 404, message: 'Not Found!' });

            const storedImagePath = data.dataValues.file
                .split(decidePlatform())
                .pop();
            deleteFile(storedImagePath);

            await DataHukumService.deleteDataHukumById(id);
            res.status(204).json({
                code: 204,
                message: 'Data Removed!',
              });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getHitCount() {
        return hitCount;
    }
}

module.exports = new DataHukumController();