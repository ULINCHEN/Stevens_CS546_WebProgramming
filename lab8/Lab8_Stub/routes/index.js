//Here you will require route files and export them as used in previous labs
const peopleRoutes = require('./people');


const constructorMethod = (app) => {

    app.use('/', peopleRoutes);

    app.use('*', (req, res) => {
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;