//Here you will require data files and export them as shown in lecture code and worked in previous labs.
const { createUser, checkUser } = require('./users');

module.exports = {
    createUser: createUser,
    checkUser: checkUser,
}