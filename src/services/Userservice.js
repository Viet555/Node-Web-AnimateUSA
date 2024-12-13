
const { response } = require('express');
const db = require('../models/index')
const bcrypt = require('bcryptjs');
const { where } = require('sequelize');
const salt = bcrypt.genSaltSync(10);
const handleUserLogin = async (email, password) => {

    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isexist = await checkUserEmail(email)
            if (isexist) {
                //user already exist
                //compare password
                // bcrypt.compareSync("", hash)
                let user = await db.User.findOne({
                    where: { email: email },
                    //loc data muon tim
                    attributes: ["email", "id", "password", "firstname", 'lastname', 'roleId', 'gender', 'image'],

                })
                if (user) {
                    let checkpass = await bcrypt.compareSync(password, user.password)
                    if (checkpass) {

                        userData.errcode = 0;
                        userData.message = "OKI",
                            delete user.password,
                            userData.user = user
                    }
                    else {
                        userData.errcode = 3;
                        userData.message = "Oh no! Wrong password"
                    }

                }
                else {
                    userData.errcode = 2;
                    userData.message = `User not found`
                }
            }
            else {
                //return err
                userData.errcode = 1;
                userData.message = `your email isn't exist in your system`

            }
            resolve(userData)
        } catch (e) {
            reject(e)

        }
    })
}
//check xem email user co ton tai trong he thog k 
const checkUserEmail = (Useremail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: Useremail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)

            }
        } catch (e) {
            reject(e)
        }
    })
}

const getAllUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = "";
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']

                    },
                })
            } if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { id: userId }
                })
            }
            resolve(users)

        } catch (e) {
            reject(e)
        }
    })
}
const createUser = (user) => {

    return new Promise(async (resolve, reject) => {
        try {
            if (!user.email || !user.password || !user.firstName || !user.lastName) {
                resolve({
                    errcode: -1,
                    message: 'missing param'
                })
            }
            let check = await checkUserEmail(user.email)
            if (check === true) {
                resolve({
                    errcode: 1,
                    message: 'email already exists',
                })
            }
            let hashPasswordUser = await hashUserPassword(user.password)
            if (check === false) {
                if (!user.roleId) {
                    user.roleId = "User"
                }
                await db.User.create({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    password: hashPasswordUser,
                    email: user.email,
                    roleId: user.roleId,
                    image: user.image,
                    gender: user.gender,
                    address: user.address,
                })
                resolve({
                    errcode: 0,
                    message: "Create Ok"
                })
            }
        } catch (e) {
            reject(e)
        }
    })

    // return new Promise(async (resolve, reject) => {
    //     let check = await checkUserEmail(user.email)
    //     if (check === true) {
    //         resolve({
    //             errcode: 1,
    //             message: "Email is already in used"
    //         })

    //     }
    //     let hashUserPasswordBcrypt = await hashUserPassword(user.password)
    //     if (check === false) {

    //         try {
    //             await db.User.create({
    //                 firstName: user.firstName,
    //                 lastName: user.lastName,
    //                 email: user.email,
    //                 password: hashUserPasswordBcrypt,
    //                 address: user.address,
    //                 gender: user.gender,
    //                 roleId: user.roleId,
    //                 phoneNumber: user.phoneNumber,
    //                 positionId: user.positionId,
    //                 image: user.avatar
    //             })
    //             resolve({
    //                 errcode: 0,
    //                 message: "Create Oki"
    //             })
    //         } catch (e) {
    //             reject(e)
    //         }
    //     }
    // })

}
const hashUserPassword = (password) => {
    return new Promise((resolve, reject) => {
        try {
            let hashPassword = bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        } catch (e) {
            reject(e)
        }
    })
}
const deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            user = await db.User.findOne({
                where: { id: userId },
            })
            if (!user) {
                resolve({
                    errcode: 2,
                    message: 'User not found'
                })
            }
            if (user) {
                await db.User.destroy({
                    where: { id: userId },
                });

                resolve({
                    errcode: 0,
                    message: "delete User succsess"
                });
            }
        } catch (e) {
            reject(e)
        }
    })
}
const EditUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.id || !data.roleId || !data.gender || !data.positionId) {
                resolve({
                    errcode: 2,
                    message: "Missing Id parameter !"
                })
            }
            let User = await db.User.findOne({
                where: { id: data.id },
                raw: false
            });

            if (User) {

                User.firstName = data.firstName
                User.lastName = data.lastName
                User.address = data.address
                User.roleId = data.roleId
                User.positionId = data.positionId
                User.gender = data.gender
                User.phoneNumber = data.phoneNumber
                User.image = data.avatar
                await User.save();
                resolve(
                    {
                        errcode: 0,
                        message: "Update User Success"
                    }
                )
            }
            else {
                resolve({
                    errcode: 1,
                    message: "user not found"
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}
const gettAllcodeService = (typeInput) => {
    console.log('check', typeInput)
    return new Promise(async (resolve, reject) => {
        try {
            if (!typeInput) {
                resolve({
                    errcode: 1,
                    message: "Missing parameter !"
                })
            }
            else {

                let res = {};

                let allcode = await db.allcode.findAll({
                    where: { type: typeInput }
                }
                );

                res.errcode = 0;
                res.data = allcode;
                resolve(res);

            }

        } catch (e) {
            reject(e);

        }
    })

}
module.exports = {
    handleUserLogin, getAllUser, createUser,
    deleteUser, EditUser, gettAllcodeService
}