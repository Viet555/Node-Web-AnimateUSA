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
const getDataAllCode = (typeInput) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!typeInput) {
                resolve({
                    errCode: 1,
                    message: 'Missing input Type !'
                })
            } else {
                let dataAllcode = await db.allcodes.findAll({
                    where: { type: typeInput }

                })
                resolve({
                    errCode: 0,
                    data: dataAllcode
                })
            }

        } catch (e) {
            reject(e)
        }
    })

}

const CreateProductService = (ProductData) => {
    return new Promise(async (resolve, reject) => {

        if (!ProductData.productName || !ProductData.count || !ProductData.imageProduct || !ProductData.typeProduct) {
            resolve({
                errCode: -1,
                message: 'Missing Input parameter !!'
            })
        }
        else {
            let data = await db.ProDucts.create({
                productName: ProductData.productName,
                count: ProductData.count,
                imageProduct: ProductData.imageProduct,
                Sku: ProductData.Sku,
                categories: ProductData.categories,
                tag: ProductData.tag,
                typeProducts: ProductData.typeProduct
            })
            resolve({
                errCode: 0,
                data: data
            })
        }

        try {

        } catch (e) {
            reject(e)
        }
    })
}
module.exports = { getImgBannerService, createBannerService, CreateProductService, getDataAllCode }