const bcrypt = require('bcryptjs');
const saltRounds = 8;
const { usernameValidation, passwordValidation } = require('../helpers');
const { userCollection } = require('../config/mongoCollections');



const createUser = async (username, password) => {
    username = usernameValidation(username);
    password = passwordValidation(password);
    const col = await userCollection();
    const checkUserExist = await col.findOne({ username: username });
    if (checkUserExist) throw 'Could not add this user: already have this user in database';

    const passwordAfterHash = await bcrypt.hash(password, saltRounds);
    const userData = {
        username: username,
        password: passwordAfterHash
    }
    // add to db
    const info = await col.insertOne(userData);
    if (!info.acknowledged || !info.insertedId) throw 'Could not add this user';
    return { insertedUser: true };
}

const checkUser = async (username, password) => {
    username = usernameValidation(username);
    password = passwordValidation(password);
    const col = await userCollection();
    const checkUserExist = await col.findOne({ username: username });
    if (!checkUserExist) throw 'Either the username or password is invalid"';
    const comparePassword = await bcrypt.compare(password, checkUserExist.password);
    if (comparePassword == false) throw 'Either the username or password is invalid';
    else return { authenticatedUser: true };
}


module.exports = { createUser, checkUser };