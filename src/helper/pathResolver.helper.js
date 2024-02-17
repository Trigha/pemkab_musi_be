const path = require('path')

function resolvePath(fullPath, baseDir) {
    return path.relative(baseDir, fullPath)
}

module.exports = resolvePath