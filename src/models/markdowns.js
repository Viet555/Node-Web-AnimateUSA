'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class markdowns extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            markdowns.belongsTo(models.ProDucts, { foreignKey: 'productId', })
            // define association here
        }
    };
    markdowns.init({
        // id: DataTypes.STRING,
        contentHTML: DataTypes.TEXT('long'),
        contentmarkdowns: DataTypes.TEXT('long'),
        description: DataTypes.TEXT('long'),
        productID: DataTypes.INTEGER,


    }, {
        sequelize,
        modelName: 'markdowns',
    });
    return markdowns;
};