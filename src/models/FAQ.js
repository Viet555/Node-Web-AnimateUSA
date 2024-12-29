'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class faqs extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    faqs.init({
        // id: DataTypes.STRING,
        contentHTML: DataTypes.TEXT('long'),
        contentmarkdowns: DataTypes.TEXT('long'),
    }, {
        sequelize,
        modelName: 'faqs',

    });
    return faqs;
};