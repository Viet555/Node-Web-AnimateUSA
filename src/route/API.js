const express = require('express')
const { handleLogin, handlegetAllUser, handleCreateUser, handleEditUser, } = require('../controller/UserController')
const { getImgBanner, CreateBanner, getAllDoctor, postInforDoctor,
    getDetailDoctor, CreateProduct, getAllcode, getProductFigureLimit, createInforProduct,
    getallProductByType, getAllDetailProductById, getAllProduct, handleDeleteUser,
    getAllUser, handleUpdateUser, getAllProductNew, createFaq, getFaq } = require('../controller/Admincontroller')
let Router = express.Router();
Router.post('/api/login', handleLogin)
Router.post('/api/create-img-banner', CreateBanner)
Router.get('/api/limit-img-banner', getImgBanner);
Router.post('/api/Create-product', CreateProduct);
Router.post('/api/create-new-user', handleCreateUser)
// Router.put('/api/edit-user', handleEditUser)
Router.delete('/api/delete-user', handleDeleteUser);
Router.get('/api/allcode', getAllcode);
Router.post('/api/Create-infor-Product', createInforProduct)
Router.get('/api/limit-Product-display', getProductFigureLimit);
Router.get('/api/get-all-product-by-type', getallProductByType);
Router.get('/api/all-Detail-product-byId', getAllDetailProductById)
Router.get('/api/get-detail-All-product', getAllProduct);
Router.put('/api/update-user-admin', handleUpdateUser);
Router.get('/api/get-all-user', getAllUser);
Router.get('/api/get-all-product-new', getAllProductNew);

Router.post('/api/create-Faq', createFaq);
Router.post('/api/get-faq', getFaq);
// Router.get('/api/get-Product-exclu', getProductlimitExclude);
module.exports = Router;