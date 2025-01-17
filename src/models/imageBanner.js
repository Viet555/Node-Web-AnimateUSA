'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class imageBanners extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    imageBanners.init({
        // id: DataTypes.STRING,
        image: DataTypes.STRING,
        title: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'imageBanners',
    });
    return imageBanners;
};