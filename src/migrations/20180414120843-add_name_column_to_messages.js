'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        queryInterface.addColumn('messages', 'name', Sequelize.STRING);
    },

    down: (queryInterface, Sequelize) => {
        queryInterface.removeColumn('messages', 'name');
    }
};