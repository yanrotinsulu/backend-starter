const hashHelper = require('../helpers/hashes');
let model = require('../data/models/index');

const services = {
    async getUserId(username, password){
        let user = await model.user.findOne({ where: { email: username } });
        if(user) {
            let compareResult = await hashHelper.compareAsync(password, user.password);
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