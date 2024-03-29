/**
 * 缓存
 * Expires,Cache-Control
 * If-Modified-Since/Last-Modified
 * If-None-Match/Etag
 */

const {cache} = require('../config/defaultConfig')

function refreshRes(stats, res) {
    const {
        maxAge,
        expires,
        cacheControl,
        lastModified,
        eTag
    } = cache;

    if (expires) {
        res.setHeader('Expires', (new Date(Date.now() + maxAge * 1000).toUTCString()))
    }

    if (cacheControl) {
        res.setHeader('Cache-Control', `public, max-age=${maxAge}`)
    }

    if (lastModified) {
        res.setHeader('Last-Modified', stats.mtime.toUTCString())
    }

    if (eTag) {
        res.setHeader('ETag', stats.size - stats.mtim)
    }

}

module.exports = (stats, req, res) => {
    refreshRes(stats, res)

    const lastModified = req.headers['if-modified-since']
    const eTag = req.headers['if-none-match']

    if (!lastModified && !eTag) {
        return false
    }

    if (lastModified && lastModified !== res.getHeader('Last-Modified')) {
        return false;
    }
    if (eTag && eTag !== res.getHeader('ETag')) {
        return false;
    }

    return true

}