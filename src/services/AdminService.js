const crypto = require('crypto');

const db = require('../models/index');
const { where } = require('sequelize');
const { error } = require('console');


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
//
const getProductFigureService = (limitInput, typeInput) => {

    return new Promise(async (resolve, reject) => {
        try {

            let dataProduct = await db.ProDucts.findAll({
                where: { typeProducts: typeInput },
                limit: limitInput,
                order: [['createdAt', 'DESC']],

            })
            resolve({
                errCode: 0,
                data: dataProduct
            })
        } catch (e) {
            reject(e)
        }
    })
}
const createInforProductService = (dataInput) => {
    return new Promise(async (resolve, reject) => {
        try {

            if (!dataInput.productId || !dataInput.contentHTML || !dataInput.contentmarkdowns || !dataInput.action)
                resolve({
                    errCode: -1,
                    message: 'missing input params'
                })
            else if (dataInput.action === 'EDIT') {
                let DTmarkdown = await db.markdowns.findOne({
                    where: { productId: dataInput.productId },
                    raw: false
                })
                if (DTmarkdown) {
                    DTmarkdown.contentHTML = dataInput.contentHTML;
                    DTmarkdown.contentmarkdowns = dataInput.contentmarkdowns;
                    DTmarkdown.description = dataInput.description;
                    DTmarkdown.updateAt = new Date();
                    await DTmarkdown.save()
                }
                resolve({
                    errCode: 0,
                    message: 'Up data Success'
                })
            }
            else if (dataInput.action === "CREATE") {
                await db.markdowns.create({
                    contentHTML: dataInput.contentHTML,
                    contentmarkdowns: dataInput.contentmarkdowns,
                    description: dataInput.description,
                    productId: dataInput.productId
                })
                resolve({
                    errCode: 0,
                    message: "Succes"
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
const getAllproductByTypeService = (inputType) => {
    return new Promise(async (resolve, reject) => {

        try {
            if (!inputType) {
                resolve({
                    errCode: 1,
                    message: 'Missing input  !'
                })
            } else {
                let dataProduct = await db.ProDucts.findAll({
                    where: { typeProducts: inputType }
                })
                resolve({
                    errCode: 0,
                    data: dataProduct
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}
const AllDetailByidService = (inputId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputId) {
                resolve({
                    errCode: 1,
                    message: 'Missing input !'
                })
            } else {
                let Product = await db.ProDucts.findOne({
                    where: { id: inputId },


                    include: [
                        { model: db.markdowns, attributes: ['description', 'contentmarkdowns', 'contentHTML'] },
                    ],
                    raw: false,
                    nest: true
                })

                resolve({
                    errCode: 0,
                    data: Product
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}
const getAllDataProjectService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataAll = await db.ProDucts.findAll({
                include: [
                    { model: db.markdowns, attributes: ['description', 'contentmarkdowns', 'contentHTML'] },
                ],
                raw: false,
                nest: true
            })
            resolve({
                errCode: 0,
                data: dataAll
            })
        } catch (e) {
            reject(e)
        }
    })
}
const deleteUserService = (UserId) => {
    console.log(UserId)
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: UserId }
            })
            if (!user) {
                resolve({
                    errCode: -1,
                    message: "User not found !"
                })
            }
            else {
                let dataUser = await db.User.destroy({
                    where: { id: UserId }
                })
                resolve({
                    errCode: 0,
                    message: " Delete User succedd "
                })
            }
        } catch (e) {
            reject(e)
        }
    })

}
const getAllUserService = () => {

    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                attributes: {
                    exclude: ['password', 'positionId']
                },
            })

            resolve(
                {
                    errCode: 0,
                    data: users
                }
            )

        } catch (e) {
            reject(e)
        }
    })
}
// const ProductlimitExclude = (inputId) => {
//     return new Promise(async(resolve, reject) => {
//         try {
//             let response = await db.ProDucts.findAll({
//                     attributes:{
//                         exclude :[pro]
//                     }
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }
const handleSaveUser = (dataUser) => {

    return new Promise(async (resolve, reject) => {
        try {
            if (!dataUser.id) {
                resolve({
                    errCode: 1,
                    message: 'User Not found !'
                })
            }
            let User = await db.User.findOne({
                where: { id: dataUser.id },
                raw: false
            })
            if (User) {
                User.firstName = dataUser.firstName,
                    User.lastName = dataUser.lastName,
                    User.gender = dataUser.gender,
                    User.address = dataUser.address,
                    User.roleId = dataUser.roleId,
                    User.image = dataUser.image
                await User.save();
            }
            resolve({
                errCode: 0,
                message: "Update User Success"
            })
        } catch (e) {
            reject(e)
        }
    })
}
const getAllProductNewService = (inputId) => {

    return new Promise(async (resolve, reject) => {
        try {
            dataProduct = await db.ProDucts.findAll({
                order: [['createdAt', inputId]],
            })
            resolve({
                errCode: 0,
                data: dataProduct
            })
        } catch (e) {
            reject(e)
        }
    })
}
const createFaqService = (dataInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(dataInput)
            if (!dataInput) {
                resolve({
                    errCode: -1,
                    message: ' missing input params'
                })

            }
            else {
                let dataFaq = await db.faqs.create({
                    contentHTML: dataInput.contentHTML,
                    contentmarkdowns: dataInput.contentmarkdowns,

                })
                resolve({
                    data: dataFaq
                })
            }

        } catch (e) {
            reject(e)
        }
    })
}
const getFaqService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataFaq = await db.faqs.findOne({
                order: [['createdAt', 'DESC']],
            })
            resolve({
                errCode: 0,
                data: dataFaq
            })
        } catch (e) {
            reject(e)
        }
    })

}
module.exports = {
    getImgBannerService, createBannerService, CreateProductService,
    getDataAllCode, getProductFigureService, createInforProductService,
    getAllproductByTypeService, AllDetailByidService, getAllDataProjectService,
    deleteUserService, getAllUserService, handleSaveUser, getAllProductNewService, createFaqService, getFaqService
}