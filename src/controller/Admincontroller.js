const { getAllDoctorSevice, saveInforDoctorService, getDetailDoctorService } = require('../services/DoctorService')
const { createBannerService, getImgBannerService } = require('../services/AdminService')


const CreateBanner = async (req, res) => {
    try {
        let data = await createBannerService(req.body)
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'err from server'
        })

    }

}

const getImgBanner = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 6;
    try {
        let response = await getImgBannerService(+limit)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'Error from SV'
        })
    }
}
const getAllDoctor = async (req, res) => {

    try {
        let response = await getAllDoctorSevice()
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'error'
        })
    }
}
const postInforDoctor = async (req, res) => {
    try {
        let response = await saveInforDoctorService(req.body)
        return res.status(200).json(response)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: 'error form server'
        })
    }
}
const getDetailDoctor = async (req, res) => {
    try {

        let inforDoctor = await getDetailDoctorService(req.query.id)
        return res.status(200).json(inforDoctor)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: -1,
            message: "err form server"
        })
    }
}
module.exports = {
    getImgBanner, getAllDoctor, postInforDoctor, getDetailDoctor, CreateBanner
}