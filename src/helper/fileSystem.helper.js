const fs = require('fs')
const path = require('path')

function deleteFile(fileName) {
    const filePath = path.join(process.cwd() + '/public/uploads', fileName);

    return new Promise(async (resolve, reject) => {
        if (await fs.existsSync(filePath)) {
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.log('File delete operation failed : ', err)
                    reject(err);
                    return;
                }
                console.log('File successfully deleted')
                resolve();
            });
        }
    });
}

module.exports = {
    deleteFile
}