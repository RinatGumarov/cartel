module.exports = (sequelize, DataTypes) => {
    
    let messages = sequelize.define('messages', {
        text: DataTypes.TEXT,
        status: DataTypes.STRING,
        chatId: {
            type: DataTypes.BIGINT,
            field: "chat_id"
        },
        senderId: {
            type: DataTypes.BIGINT,
            field: "sender_id"
        },
        createdAt: {
            type: DataTypes.DATE,
            field: "created_at"
        }
    }, {
        timestamps: false
    });
    
    messages.associate = function (models) {
        messages.belongsTo(models.chats, {
            foreignKey: 'chatId',
        });
        messages.belongsTo(models.users, {
            foreignKey: 'userId',
        });
    };
    
    return messages;
};