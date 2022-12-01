// const { userCollection } = require('../config/mongoCollections');
const { dbConnection, closeConnection } = require('./config/mongoConnection');
const { userCollection } = require('./config/mongoCollections');
const users = require('./data')

const main = async () => {

    const db = await dbConnection();
    await db.dropDatabase();

    const testUser = 'phill';
    const testPassword = '123abcD@';

    // first add user, should be add to database
    try {
        const res = await users.createUser(testUser, testPassword);
    }
    catch (e) {
        console.log(e);
    }

    // same username, should not add to database
    try {
        const res = await users.createUser(testUser, testPassword);
    }
    catch (e) {
        console.log(e);
    }

    const testUser2 = 'PHILL';
    const testPassword2 = '123fdaBA%$';

    // same username with all uppercase character, should not add to database
    try {
        const res = await users.createUser(testUser2, testPassword2);
    }
    catch (e) {
        console.log(e);
    }



    // connect to database and return all document
    const col = await userCollection();
    const cursor = await col.find({}).toArray();

    console.log('all doc: ', cursor);
    console.log("Seeding Process Finished");

    // close 
    closeConnection();

}


main();