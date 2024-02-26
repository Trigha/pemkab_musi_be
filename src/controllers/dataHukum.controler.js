const { deleteFile } = require('../helper/fileSystem.helper');
const DataHukumService = require('../services/dataHukum.service');
const decidePlatform = require('../helper/decidePlatform.helper')

class DataHukumController {
    async getDataHukumById(req, res) {
        try {
            const { id } = req.params;

            const data = await DataHukumService.getDataHukumById(id);
            let imageLink = null;
            const storedFilePath = data.file
                          .split(decidePlatform())
                          .pop();
                        imageLink = `${req.protocol}://${req.get('host')}/uploads/${storedFilePath}`;
            // const createLink = (filePath) => {
            //     const storedFilePath = filePath.toString().split(decidePlatform()).pop()
            //     return `${req.protocol}://${req.get('host')}/uploads/${storedFilePath}`;
            // }

            res.json({
                ...data,
                file: imageLink,
            });
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
        let storedFilePath

        let filePath;
        try {
            const existingData = await DataHukumService.getDataHukumById(id)
            if (!existingData) throw new Error('Not Found');

            if (files) {
                filePath = files.path;
        
                storedFilePath = existingData.file.split(decidePlatform()).pop();
                // deleteFile(storedFilePath);
              }
           

            await DataHukumService.updateDataHukumById(id, {
                ...payload,
                file: files
            });

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
            const { searchBy, search } = req.query;
            const data = await DataHukumService.getDataHukum({ searchBy, search });
            if(data){
                response = data.map((item) => {
                    let imageLink = null;
                    if (item.file) {
                        const storedFilePath = item.file
                          .split(decidePlatform())
                          .pop();
                        imageLink = `${req.protocol}://${req.get('host')}/uploads/${storedFilePath}`;
                    }
                    return {
                        ...item,
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

            const storedImagePath = data.file
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
}

module.exports = new DataHukumController();