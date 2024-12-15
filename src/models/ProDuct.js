'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class ProDucts extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {

            ProDucts.belongsTo(models.allcodes, { foreignKey: 'typeProducts', targetKey: 'keyMap', as: 'typeProDuctsData' })
            ProDucts.belongsTo(models.Allcategories, { foreignKey: 'typeProducts', targetKey: 'keyMap', as: 'typeProDuctsCategories' })
            // ProDucts.belongsTo(models.allcode, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' })
            ProDucts.hasOne(models.markdowns, { foreignKey: 'productID', })
            // define association here
        }
    };
    ProDucts.init({
        // id: DataTypes.STRING,

        productName: DataTypes.STRING,
        count: DataTypes.INTEGER,
        Sku: DataTypes.STRING,
        categories: DataTypes.STRING,
        imageProduct: DataTypes.BLOB('long'),
        typeProducts: DataTypes.STRING,
        tag: DataTypes.STRING,


    }, {
        sequelize,
        modelName: 'ProDucts',
    });
    return ProDucts;
};