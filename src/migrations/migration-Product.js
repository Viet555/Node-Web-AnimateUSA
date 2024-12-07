'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ProDucts', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            productName: {
                type: Sequelize.STRING
            },
            count: {
                type: Sequelize.INTEGER
            },
            Sku: {
                type: Sequelize.STRING
            },
            Categories: {
                type: Sequelize.STRING
            },

            imageProduct: {
                type: Sequelize.BLOB('long')
            },

            typeProducts: {
                type: Sequelize.STRING
            },
            tag: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: true,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: true,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('ProDucts');
    }
};
