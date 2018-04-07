'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('chats', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            name: {
                type: Sequelize.STRING,
            },
            is_group: {
                type: Sequelize.BOOLEAN
            }
        })
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('chats', {});
    }
};
