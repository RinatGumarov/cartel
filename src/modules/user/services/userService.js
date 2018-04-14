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

    async findAllByFilter(filter, user) {
        filter = `%${filter}%`;
        return await models.users.findAll({
            where: {
                login: {
                    [Op.like]: filter
                },
                id: {
                    [Op.ne]: user.id
                }
            },
            limit: 10,
        })
    }

    /**
     * @param id
     * @returns {Promise<Model>}
     */
    async getUserById(id) {
        let user = await models.users.findOne({
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        });

        return user;
    }
}

if (typeof instance !== UserService) {
    instance = new UserService();
}

module.exports = instance;