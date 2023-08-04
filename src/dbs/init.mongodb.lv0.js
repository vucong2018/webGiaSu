'use strict'

const mongoose = require('mongoose')
const connectString = `mongodb://127.0.0.1:27017/giasu`
mongoose.connect(connectString).then(_ => console.log(`Success connect DB`)).catch(error => {
    console.error(error);
});


if (1 === 0) {
    mongoose.set('debug', true);
    mongoose.set('debug', { color: true })
}

module.exports = mongoose