const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashHelper = {
    hashSync(input){
        return bcrypt.hashSync(input, saltRounds);
    },
    hashASync(input){
        return bcrypt.hash(input, saltRounds);
    },
    compareSync(input,stored){
        return bcrypt.compareSync(input,stored);
    },
    compareAsync(input,stored){
        return bcrypt.compare(input,stored);
    }
}

module.exports = hashHelper;