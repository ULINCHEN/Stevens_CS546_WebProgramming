//Here you will require both data files and export them as shown in lecture code where there is more than one data file. Look at lecture 6 lecture code for example

const movies = require('./movies');
const reviews = require('./reviews');


module.exports = {
    movies: movies,
    reviews: reviews
}