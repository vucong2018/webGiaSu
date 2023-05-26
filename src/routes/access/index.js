'use strict'

const express = require('express');
const accessController = require('../../controller/access.controller');
const routes = express.Router();

//signUp

routes.post('/shop/signup', accessController.signUp)

module.exports = routes