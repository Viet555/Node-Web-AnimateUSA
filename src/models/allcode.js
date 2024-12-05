'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class allcode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            allcode.hasMany(models.User, { foreignKey: 'positionId', as: 'positionData' })
            allcode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' })


            // define association here
        }
    };
    allcode.init({
        // id: DataTypes.STRING,
        keyMap: DataTypes.STRING,
        type: DataTypes.STRING,
        valueEng: DataTypes.STRING,
        valueVie: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'allcode',
    });
    return allcode;
};