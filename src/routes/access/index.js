'use strict'

const express = require('express');
const accessController = require('../../controller/access.controller');
const routes = express.Router();
const { asyncHandler } = require('../../auth/checkAuth')
//signUp

routes.post('/shop/signup', asyncHandler(accessController.signUp))

module.exports = routes