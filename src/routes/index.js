'use strict'

const express = require('express');
const routes = express.Router();

routes.use('/v1/api', require('./access'))
// routes.get('/', (req, res, next) => {
//     // const strCompress = 'Hel19.8.1lo Fantipjs'
//     return res.status(200).json({
//         message: 'Welcome VTC!',
//         // metaData: strCompress.repeat(100000)
//     })
// })

module.exports = routes