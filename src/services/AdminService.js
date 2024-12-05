const crypto = require('crypto');

const db = require('../models/index');

const createBannerService = (dataInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            // dataInput.image = crypto.createHash('sha256').update(dataInput.image).digest('hex'); // Chuỗi 64 ký tự

            // dataInput.image = new Buffer(dataInput.image, 'base64').toString('binary');
            if (!dataInput.image) {
                resolve({
                    errCode: 1,
                    message: "missing image "
                })
            } else {
                let databanner = []
                let data = await db.imageBanners.create({
                    image: dataInput.image,
                    title: dataInput.title
                })
                resolve({
                    errCode: 0,
                    databanner: data
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}


const getImgBannerService = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.imageBanners.findAll({

                limit: limitInput,
                order: [['createdAt', 'DESC']],
                raw: true,
                nest: true
            })
            resolve({
                errCode: 0,
                data: data
            })

        } catch (e) {
            reject(e)
        }
    })
}
module.exports = { getImgBannerService, createBannerService }