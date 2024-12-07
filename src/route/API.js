const express = require('express')
const { handleLogin, handlegetAllUser, handleCreateUser, handleEditUser, handleDeleteUser, } = require('../controller/UserController')
const { getImgBanner, CreateBanner, getAllDoctor, postInforDoctor, getDetailDoctor, CreateProduct, getAllcode, getProductFigureLimit } = require('../controller/Admincontroller')
let Router = express.Router();
Router.post('/api/login', handleLogin)
Router.post('/api/create-img-banner', CreateBanner)
Router.get('/api/limit-img-banner', getImgBanner);
Router.post('/api/Create-product', CreateProduct);
// Router.post('/api/create-new-user', handleCreateUser)
// Router.put('/api/edit-user', handleEditUser)
// Router.delete('/api/delete-user', handleDeleteUser);
Router.get('/api/allcode', getAllcode);

Router.get('/api/limit-Product-display', getProductFigureLimit);
// Router.post('/api/save-infor-doctor', postInforDoctor);
// Router.get('/api/get-detail-doctor', getDetailDoctor);
module.exports = Router;