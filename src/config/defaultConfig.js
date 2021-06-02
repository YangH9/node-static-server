module.exports = {
    root: process.cwd(),
    hostname: '127.0.0.1',
    port: 3000,
    compress: /\.(html|js|css|md)$/,
    cache: {
        maxAge: 600,
        expires: true,
        cacheControl: true,
        lastModified: true,
        eTag: true
    }
}