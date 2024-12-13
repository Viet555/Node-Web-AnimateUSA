const { handleUserLogin, getAllUser, createUser, deleteUser, EditUser, gettAllcodeService } = require('../services/Userservice')
const handleLogin = async (req, res) => {
    let email = req.body.email
    let password = req.body.password
    if (!email || !password) {
        return res.status(500).json({
            errcode: 1,
            message: "missing input"
        })
    }
    let userData = await handleUserLogin(email, password)
    //check email user  exsit
    //compare password 
    //return user infor 
    //access token 
    return res.status(200).json({
        errcode: userData.errcode,
        message: userData.message,
        userData: userData.user ? userData.user : {}
    })
}
const handlegetAllUser = async (req, res) => {
    let id = req.query.id //all ,Single

    if (!id) {
        res.status(200).json({
            errcode: 1,
            message: "Missing required parameter",
            users: []
        })
    }
    let users = await getAllUser(id);
    res.status(200).json({
        errcode: 0,
        message: "OKI",
        users
    })
}
const handleCreateUser = async (req, res) => {
    let roleId = req.body.roleId
    let userData = await createUser(req.body)
    return res.status(200).json(userData)
}
const handleDeleteUser = async (req, res) => {
    let id = req.body.id
    if (!id) {
        return res.status(200).json({
            errcode: 1,
            message: "missing input parameter"
        })
    }
    let user = await deleteUser(id)
    return res.status(200).json(user)
}
const handleEditUser = async (req, res) => {
    let data = req.body
    let dataUser = await EditUser(data)
    return res.status(200).json(dataUser)
}
const getAllcode = async (req, res) => {
    try {

        let data = await gettAllcodeService(req.query.type);
        return res.status(200).json(data)

    } catch (e) {
        console.log('get  all code er :', e)
        return res.status(200).json({
            errcode: -1,
            message: "Err From server"
        })
    }
}
module.exports = { handleLogin, handlegetAllUser, handleCreateUser, handleEditUser, handleDeleteUser, getAllcode }