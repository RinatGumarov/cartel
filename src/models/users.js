const bcrypt = require('bcrypt-nodejs');

module.exports = (sequelize, DataTypes) => {
    let users = sequelize.define('users', {
        login: DataTypes.STRING,
        email: DataTypes.STRING,
        photoPath: {
            type: DataTypes.STRING,
            field: 'photo_path',
        },
    }, {
        timestamps: false
    });
    
    users.beforeCreate((user) => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
    });
    
    users.prototype.validPassword = (password, validPass) => {
        return bcrypt.compareSync(password, validPass);
    };
    
    users.associate = function (models) {
        users.hasMany(models.notifications, {
            foreignKey: 'userId'
        });
        users.belongsToMany(models.chats, {
            through: 'user_chats',
            foreignKey: 'user_id',
            timestamps: false
        });
        users.hasMany(models.messages, {
            foreignKey: 'userId',
        });
    };
    
    return users;
};