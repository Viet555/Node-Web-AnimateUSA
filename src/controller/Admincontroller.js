const { getAllDoctorSevice, saveInforDoctorService, getDetailDoctorService } = require('../services/DoctorService')
const { createBannerService, getImgBannerService,
    CreateProductService, getDataAllCode, getProductFigureService, createInforProductService, getAllproductByTypeService, AllDetailByidService, } = require('../services/AdminService')


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
const CreateProduct = async (req, res) => {

    try {
        let dataProduct = await CreateProductService(req.body)
        return res.status(200).json(dataProduct)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: 1,
            message: 'err form server',
        })
    }
}
const getAllcode = async (req, res) => {
    try {

        let typeInput = req.query.typeInput
        let dataAllcode = await getDataAllCode(typeInput)
        return res.status(200).json(dataAllcode)
    } catch (e) {
        console.log(e)
        return res.status(200).json({

            errCode: 1,
            message: ' Get AllCode Fail Maybe Err form server '

        })
    }
}

const getProductFigureLimit = async (req, res) => {
    try {
        limit = req.query.limitInput
        type = req.query.typeInput

        if (!limit) limit = 6;
        let data = await getProductFigureService(+limit, type)
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
    }
}
const createInforProduct = async (req, res) => {
    try {
        console.log(req.body)
        let data = await createInforProductService(req.body)
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: 1,
            message: ' err from sever'
        })
    }
}
const getallProductByType = async (req, res) => {
    try {
        let data = await getAllproductByTypeService(req.query.inputType)
        return res.status(200).json(data)
    } catch (e) {

        console.log(e)
        return res.status(200).json({
            errCode: 1,
            message: 'Err from server '
        })
    }
}
const getAllDetailProductById = async (req, res) => {
    try {

        let data = await AllDetailByidService(req.query.inputId)
        return res.status(200).json(data)
    } catch (e) {
        console.log(e)
        return res.status(200).json({
            errCode: 1,
            message: 'err From sever'
        })
    }
}
////
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
    getImgBanner, getAllDoctor, postInforDoctor, getDetailDoctor,
    CreateBanner, CreateProduct, getAllcode, getProductFigureLimit,
    createInforProduct, getallProductByType, getAllDetailProductById
}