const http = require('http')
const path = require('path')

const conf = require("./config/defaultConfig")
const route = require('./helper/route')
const openUrl = require('./helper/open')

class Server {
    constructor(config) {
        this.config = Object.assign({}, conf, config)
    }
    start() {
        const server = http.createServer((req, res) => {
            const filePath = path.join(this.config.root, req.url)
            route(req, res, filePath, this.config)
        })

        server.listen(this.config.port, this.config.hostname, () => {
            const address = `http://${this.config.hostname}:${this.config.port}`
            console.log(`Server start at ${address}`)
            openUrl(address)
        })
    }
}

module.exports = Server