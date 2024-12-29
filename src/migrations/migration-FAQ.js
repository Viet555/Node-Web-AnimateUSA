'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('faqs', {

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }, contentmarkdowns: {
                allowNull: true,
                type: Sequelize.TEXT('long'),
            },
            contentHTML: {
                allowNull: true,
                type: Sequelize.TEXT('long'),
            },
            contentmarkdowns: {
                allowNull: true,
                type: Sequelize.TEXT('long'),
            },

        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('faqs');
    }
};