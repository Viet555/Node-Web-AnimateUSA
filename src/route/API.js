const express = require('express')
const { handleLogin, handlegetAllUser, handleCreateUser, handleEditUser, handleDeleteUser, } = require('../controller/UserController')
const { getImgBanner, CreateBanner, getAllDoctor, postInforDoctor,
    getDetailDoctor, CreateProduct, getAllcode, getProductFigureLimit, createInforProduct, getallProductByType, getAllDetailProductById, getAllProduct } = require('../controller/Admincontroller')
let Router = express.Router();
Router.post('/api/login', handleLogin)
Router.post('/api/create-img-banner', CreateBanner)
Router.get('/api/limit-img-banner', getImgBanner);
Router.post('/api/Create-product', CreateProduct);
// Router.post('/api/create-new-user', handleCreateUser)
// Router.put('/api/edit-user', handleEditUser)
// Router.delete('/api/delete-user', handleDeleteUser);
Router.get('/api/allcode', getAllcode);
Router.post('/api/Create-infor-Product', createInforProduct)
Router.get('/api/limit-Product-display', getProductFigureLimit);
Router.get('/api/get-all-product-by-type', getallProductByType);
Router.get('/api/all-Detail-product-byId', getAllDetailProductById)
Router.get('/api/get-detail-All-product', getAllProduct);
module.exports = Router;