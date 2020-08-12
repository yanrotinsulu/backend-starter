const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashHelper = {
    hashSync(input){
        return bcrypt.hashSync(input, saltRounds);
    },
    compareSync(input,stored){
        return bcrypt.compareSync(input,stored);
    }
}

module.exports = hashHelper;