const path = require('path')
const fs = require('fs')

const mimeTypes = {
    'js': "application/x-javascript",
    'css': "text/css",
    'html': "text/html",
    'htm': "text/html",
    'txt': "text/plain"
}

module.exports = (filePath) => {
    let ext = path.extname(filePath).split('.').pop().toLowerCase()

    if (!ext) {
        ext = filePath;
    }

    return mimeTypes[ext] || mimeTypes['txt']
}