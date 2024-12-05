const { where } = require('sequelize')
const db = require('../models/index')
const { raw } = require('body-parser')
const getTopDoctorHomeService = (limitInput) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                limit: limitInput,
                where: { roleId: 'R2' },
                order: [['createdAt', 'DESC']],
                attributes: {
                    exclude: ['password']
                },
                include: [
                    { model: db.allcode, as: 'positionData', attributes: ['valueEng', 'valueVie'] },
                    { model: db.allcode, as: 'genderData', attributes: ['valueEng', 'valueVie'] },
                ],
                raw: true,
                nest: true
            })

            resolve({
                errCode: 0,
                data: users
            })
        } catch (e) {
            reject(e)
        }
    })
}
const getAllDoctorSevice = () => {
    return new Promise(async (resolve, reject) => {
        try {

            let doctors = await db.User.findAll({
                where: { roleId: 'R2' },
                attributes: {
                    exclude: ['password', 'image']
                }
            })
            resolve({
                errCode: 0,
                data: doctors
            })
        } catch (e) {
            reject(e)
        }
    })
}
const saveInforDoctorService = (inputData) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!inputData.doctorId || !inputData.contentHTML || !inputData.contentmarkdowns || !inputData.action)
                resolve({
                    errCode: 1,
                    message: 'misng input '

                })
            else if (inputData.action === "EDIT") {
                let DrMarkdown = await db.markdowns.findOne({
                    where: { doctorId: inputData.doctorId },
                    raw: false
                })
                if (DrMarkdown) {
                    DrMarkdown.contentHTML = inputData.contentHTML;
                    DrMarkdown.contentmarkdowns = inputData.contentmarkdowns;
                    DrMarkdown.description = inputData.description;
                    DrMarkdown.updateAt = new Date();
                    await DrMarkdown.save()
                }
                resolve({
                    errCode: 0,
                    message: "Succes"

                })
            }
            else if (inputData.action === "CREATE") {
                await db.markdowns.create({
                    contentHTML: inputData.contentHTML,
                    contentmarkdowns: inputData.contentmarkdowns,
                    description: inputData.description,
                    doctorId: inputData.doctorId
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
const getDetailDoctorService = (doctorId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!doctorId) {
                resolve({
                    errCode: 1,
                    message: "missing required parameter !!!!"
                })
            } else {
                let dataDoctor = await db.User.findOne({
                    where: { id: doctorId },
                    attributes: {
                        exclude: ['password',]
                    },
                    include: [
                        { model: db.markdowns, attributes: ['description', 'contentmarkdowns', 'contentHTML'] },
                        { model: db.allcode, as: 'positionData', attributes: ['valueEng', 'valueVie'] },
                    ],

                    raw: false,
                    nest: true
                },
                )

                if (dataDoctor && dataDoctor.image) {
                    // dataDoctor.image = new Buffer(dataDoctor.image, 'base64').toString('binary');
                }
                resolve({
                    errCode: 0,
                    data: dataDoctor
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    getTopDoctorHomeService, getAllDoctorSevice, saveInforDoctorService, getDetailDoctorService
}