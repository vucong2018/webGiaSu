'use strict'

const shopModel = require("../models/shop.model")
const bcrypt = require('bcrypt');
const crypto = require('node:crypto');
const KeyTokenService = require("./keyToken.service");
const { createTokenPair } = require("../auth/authUtils");
const { getInfoData } = require("../utils");
const { Badrequest, AuthFailureError, BadRequestError } = require("../core/error.respone");
// service
const { findByEmail } = require('./shop.service')
const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}

class AccessService {
    generatePairKey = () => {
        const publicKey = crypto.randomBytes(64).toString('hex');
        const privateKey = crypto.randomBytes(64).toString('hex');
        return { publicKey, privateKey }
    };
    static login = async ({ email, password, refreshToken = null }) => {
        /*
            1 - check email in dbs
            2 - match password
            3 - create AT vs RS and save
            4 - genrate tokens
            5 - get data return login
        */

        // 1.
        const foundShop = await findByEmail({ email });
        if (!foundShop) {
            throw new BadRequestError('Shop not registered!');
        }

        // 2.
        const match = bcrypt.compare(password, foundShop.password);
        if (!match) {
            throw new AuthFailureError('AuthFailure error')
        }

        // 3.
        // TODO token
        const { privateKey, publicKey } = generatePairKey();

        // 4. Generate tokens
        // TODO tokens

        const tokens = await createTokenPair({ userId: foundShop._id, email }, publicKey, privateKey);
        await KeyTokenService.createKeyToken({
            refreshToken: tokens.refreshToken,
            privateKey, publicKey
        })
        return {
            shop: getInfoData({ fileds: ['_id', 'name', 'email'], object: foundShop }),
            tokens
        }
    }
    static signUp = async ({ name, email, password }) => {
        const holderShop = await shopModel.findOne({ email }).lean()

        if (holderShop) {
            throw new BadRequestError('Error: Shop already registered!')
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newShop = await shopModel.create({
            name, email, password: passwordHash, roles: [RoleShop.SHOP]
        })
        if (newShop) {
            const { privateKey, publicKey } = generatePairKey();
            const keyStore = await KeyTokenService.createKeyToken({
                userId: newShop._id,
                publicKey,
                privateKey
            })
            if (!keyStore) {
                return {
                    code: 'xxx',
                    message: 'KeyStore error'
                }
            }
            // create pair token

            const tokens = await createTokenPair({ userId: newShop._id, email }, publicKey, privateKey);
            return {
                code: 201,
                metadata: {
                    shop: getInfoData({ fileds: ['_id', 'name', 'email'], object: newShop }),
                    tokens
                }
            }
            // return { newShop, privateKey, publicKey };
        }
        return {
            code: 201,
            metadata: null
        }


    }
}

module.exports = AccessService