const hashHelper = require('../helpers/hashes');
let context = require('../../data/models/index');

const services = {
    async getUserId(username, password){
        var user = await context.users.findOne({ where: { email: username } });
        if(user) {
            var compareResult = await hashHelper.compareAsync(password, user.password);
            if(compareResult){
                return user.id;
            }
            else{
                return 0;
            }
        }
        else {
            return 0;
        }
    }
}

module.exports = services;