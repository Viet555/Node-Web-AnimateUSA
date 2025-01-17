'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      // User.belongsTo(models.allcode, { foreignKey: 'positionId', targetKey: 'keyMap', as: 'positionData' })
      // User.belongsTo(models.allcode, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' })
      // User.hasOne(models.markdowns, { foreignKey: 'doctorId', })
      // define association here
    }
  };
  User.init({
    // id: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.STRING,
    roleId: DataTypes.STRING,
    image: DataTypes.BLOB('long'),
    phoneNumber: DataTypes.STRING,
    positionId: DataTypes.STRING


  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};