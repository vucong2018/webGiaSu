'use strict'

const { findById } = require('../services/apikey.service')
const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'athorization'
}

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString()
        if (!key) {
            return res.status(403).json({
                message: 'Forbidden Error'
            })
        }
        // check objJey
        const objKey = await findById(key)
        console.log('vào đây')
        if (!objKey) {
            return res.status(403).json({
                message: 'Forbidden Error'
            })
        }
        req.objKey = objKey;
        return next()
    } catch (error) {

    }
}

module.exports = {
    apiKey
}