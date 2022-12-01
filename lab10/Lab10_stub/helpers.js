//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.


const usernameValidation = (username) => {
    if (!username) throw "Please provide a username";
    if (typeof username != 'string') throw "username type should be string";
    username = username.trim().toLowerCase();
    if (username.length < 4) throw 'username length should be at least 4 character';

    // check if string contains space
    const space = /\s/;
    if (space.test(username) == true) throw 'username should not contains space';

    // check if string is only number
    const num = /^\d+$/;
    if (num.test(username) == true) throw `username should not be only digits`;
    return username;
}

const passwordValidation = (password) => {
    if (!password) throw "Please provide a password";
    if (typeof password != 'string') throw "Password should be a string";
    password = password.trim();
    if (password.length < 6) throw "Password should be at least 6 character, or can not be full of space";
    // check if string contains space
    const space = /\s/;
    if (space.test(password) == true) throw 'Password should not contains space';
    return password;
}

module.exports = { usernameValidation, passwordValidation };