'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class allcodes extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            allcodes.hasMany(models.ProDucts, { foreignKey: 'typeProducts', as: 'typeProductData' })
            // allcodes.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' })


            // define association here
        }
    };
    allcodes.init({
        // id: DataTypes.STRING,
        keyMap: DataTypes.STRING,
        type: DataTypes.STRING,
        valueVie: DataTypes.STRING,
        valueEng: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'allcodes',
    });
    return allcodes;
};