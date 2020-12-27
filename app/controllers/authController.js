const model = require('../data/models/index');
const { Op } = require("sequelize");
const hashHelper = require('../helpers/hashes');

exports.getUserIdByUsernameOrEmail = async function(username, password) {
    let user = await model.user.findOne(
        { 
            where: { 
                [Op.or]: [
                    { username: username },
                    { email: username }
                ]
            } 
        }
        );
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