'use strict'

const mongoose = require('mongoose')
const connectString = `mongodb://127.0.0.1:27017/giasu`

class Database {
    constructor() {
        this.connect();
    }
    // connect
    connect(type = 'mongodb') {

        if (1 === 1) {
            mongoose.set('debug', true);
            mongoose.set('debug', { color: true })
        }
        mongoose.connect(connectString, {
            maxPoolSize: 50
        }).then(_ => console.log(`Success connect DB`)).catch(error => {
            console.error(error);
            console.log('that bai');
        });

    }

    static getInstance() {
        if (!Database.instance) {
            Database.instance = new Database()
        }
        return Database.instance
    }
}
const instanceMongodb = Database.getInstance()
module.exports = mongoose