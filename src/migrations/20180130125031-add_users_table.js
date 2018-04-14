'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: Sequelize.BIGINT
            },
            login: {
                unique: true,
                type: Sequelize.STRING,
                allowNull: false
            },
            email: {
                unique: true,
                allowNull: false,
                type: Sequelize.STRING,
            },
            photo_path: {
                type: Sequelize.STRING
            }
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('users', {});
    }
};
