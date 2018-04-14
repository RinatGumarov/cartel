const models = require('../../../core/models');
const Op = models.sequelize.Op;
const Users = models.users;
// const Roles = models.roles;

// const rolesService = require('./roleService');
// const employeeService = require('../../employee/services/employeeService');
// const companyService = require('../../company/services/companyService');

let instance;

class UsersService {
    
    /**
     * @param email
     * @returns {Promise<boolean>}
     */
    async isEmailFree(email) {
        let user = await Users.findOne({
            where: {
                email: {
                    [Op.eq]: email,
                },
            },
        });
        return user === null;
    }
    
    /**
     * @param id
     * @returns {Promise<Model>}
     */
    async getUserById(id) {
        let user = await Users.findOne({
            where: {
                id: {
                    [Op.eq]: id
                }
            }
        });
        
        return user;
    }
    
    /**
     * toDo переделать на всю обшую информацию из разных таблиц
     * получить информацию о юзере по id
     * @param id
     * @returns {Promise<void>}
     */
    async getNameByUserId(id) {
        let user = await this.getUserById(id);
        let name = null;
        if (user.role = "EMPLOYEE") {
            let employee = await employeeService.getByUserId(id);
            return employee.name;
        }
        if (user.role = "COMPANY") {
            let company = await companyService.findByUserId(id);
            return company.name;
        }
    }
    
    /**
     * @param email
     * @returns {Promise<Model>}
     */
    async getUserByEmail(email) {
        let user = await Users.findOne({
            where: {
                email: {
                    [Op.eq]: email
                }
            }
        });
        return user;
    }
    
    /**
     * @param email
     * @param login
     * @returns {Promise<*>}
     */
    async saveUser(email, login) {
        return await Users.create({
            email,
            login
        });
    }
    
    
    /**
     * @returns {Promise<T>}
     * @param user
     */
    async deleteUser(user) {
        return await user.destroy();
    }
    
}

instance = new UsersService();
module.exports = instance;