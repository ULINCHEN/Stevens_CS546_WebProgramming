//Here you will require route files and export them as used in previous labs.
const defaultRoute = require('./sortArray');


const constructorMethod = (app) => {

    app.use('/', defaultRoute);

    app.use('*', (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;