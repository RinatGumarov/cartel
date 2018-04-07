'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('messages', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT
            },
            text: Sequelize.TEXT,
            sender_id: {
                allowNull: false,
                type: Sequelize.BIGINT,
                references: {
                    model: "users",
                    key: "id"
                }
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE,
                defaultValue: Sequelize.fn('NOW')
            },
            chat_id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                references: {
                    model: "chats",
                    key: "id",
                },
                cascade: true,
                onDelete: "CASCADE",
            },
        });
    },

    down: (queryInterface) => {
        return queryInterface.dropTable('messages', {});
    }
};
