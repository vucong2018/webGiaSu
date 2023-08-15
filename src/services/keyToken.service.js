'use strict'

const keytokenModel = require("../models/keytoken.model");
const { options } = require("../routes");


class KeyTokenService {
    static createKeyToken = async ({ userId, publicKey, privateKey, refreshToken }) => {
        try {
            // const tokens = await keytokenModel.create({
            //     user: userId,
            //     publicKey,
            //     privateKey
            // })

            // return tokens ? tokens.publicKey : null
            const filter = { user: userId };
            const update = {
                publicKey, privateKey, refreshTokensUsed: [], refreshToken
            };
            const options = {
                upsert: true,
                new: true
            }
            const tokens = await keytokenModel.findOneAndUpdate(filter, update, options)

            return tokens ? tokens.publicKey : null;
        } catch (error) {
            return error
        }
    }
}

module.exports = KeyTokenService