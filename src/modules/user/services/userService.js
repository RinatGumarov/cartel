let instance;
const models = require('../../../core/models');
const Op = models.sequelize.Op;

class UserService {
    
    async addLanguages(user, languages) {
        await user.addLanguages(languages);
    }
    
    async allLanguages(user) {
        let languages = await user.getLanguages();
        if (languages.length === 0) {
            return [];
        }
        return languages;
    }

    async findAllByFilter(filter) {
        filter = `%${filter}%`;
        return await models.users.findAll({
            where: {
                login: {
                    [Op.like]: filter
                }
            },
            limit: 5,
        })
    }
    
}

if (typeof instance !== UserService) {
    instance = new UserService();
}

module.exports = instance;