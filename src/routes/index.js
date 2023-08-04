'use strict'

const express = require('express');
const { apiKey } = require('../auth/checkAuth');
const router = express.Router();
router.use(apiKey)
router.use('/v1/api', require('./access'))


module.exports = router