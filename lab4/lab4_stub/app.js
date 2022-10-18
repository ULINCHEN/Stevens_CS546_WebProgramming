/*

1. Create a Movie of your choice.
2. Log the newly created Movie. (Just that movie, not all movies)
3. Create another movie of your choice.
4. Query all movies, and log them all
5. Create the 3rd movie of your choice.
6. Log the newly created 3rd movie. (Just that movie, not all movies)
7. Rename the first movie
8. Log the first movie with the updated name. 
9. Remove the second movie you created.
10. Query all movies, and log them all
11. Try to create a movie with bad input parameters to make sure it throws errors.
12. Try to remove a movie that does not exist to make sure it throws errors.
13. Try to rename a movie that does not exist to make sure it throws errors.
14. Try to rename a movie passing in invalid data for the newName parameter to make sure it throws errors.
15. Try getting a movie by ID that does not exist to make sure it throws errors.

*/

// import db connect method
const connection = require('./config/mongoConnection');
const movies = require('./data/movies');

const main = async () => {

    const db = await connection.dbConnection();
    await db.dropDatabase();
    let firstMovie = undefined;
    let secondMovie = undefined;
    let allMovie = undefined;
    let thirdMovie = undefined;

    try {
        console.log("Q1 Q2:");
        // Q1 Q2
        firstMovie = await movies.createMovie("Hackers", "Hackers are blamed for making a virus that will capsize five oil tankers.", ["Crime", "Drama", "Romance"], "PG-13", "United Artists", "Iain Softley", ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"], "09/15/1995", "1h 45min");
        console.log('first added movie: ', firstMovie);
    }
    catch (err) {
        console.log(err);
    }

    try {
        // Q3 Q4
        console.log("Q3 Q4:");
        secondMovie = await movies.createMovie("The Breakfast Club", "Five high school students meet in Saturday detention and discover how they have a lot more in common than they thought.", ["Comedy", "Drama"], "R", "Universal Pictures", "John Hughes", ["Judd Nelson", "Molly Ringwald", "Ally Sheedy", "Anthony Hall", "Emilio Estevez"], "02/07/1985", "1h 37min");
        allMovie = await movies.getAllMovies();
        console.log('All the movie we have: ', allMovie);
    }
    catch (err) {
        console.log(err);
    }

    try {
        // Q5 Q6
        console.log("Q5 Q6:");
        thirdMovie = await movies.createMovie("Forty Two", "In 1947, Jackie Robinson becomes the first African-American to play in Major League Baseball in the modern era when he was signed by the Brooklyn Dodgers and faces considerable racism in the process.", ["Biography", "Drama", "Sport"], "PG-13", "Warner Brothers", "Brian Helgeland", ["Chadwick Boseman", "Harrison Ford", "Nicole Beharie", "Christopher Meloni"], "04/09/2013", "2h 8min");
        console.log('third added movie: ', thirdMovie);
    }
    catch (err) {
        console.log(err);
    }

    try {
        // Q7 Q8
        console.log("Q7 Q8:");
        firstMovie = await movies.renameMovie(firstMovie._id.toString(), "MIB");
        console.log(firstMovie);
    }
    catch (err) {
        console.log(err);
    }

    try {
        // Q9 Q10
        console.log("Q9 Q10:");
        await movies.removeMovie(secondMovie._id.toString());
        allMovie = await movies.getAllMovies();
        console.log('All the movie we have: ', allMovie);
    }
    catch (err) {
        console.log(err);
    }


    try {
        // Q11
        console.log("Add badmovie test 1:");
        badMoive = await movies.createMovie(" ", "Five high school students meet in Saturday detention and discover how they have a lot more in common than they thought.", ["Comedy", "Drama"], "R", "Universal Pictures", "John Hughes", ["Judd Nelson", "Molly Ringwald", "Ally Sheedy", "Anthony Hall", "Emilio Estevez"], "02/07/1985", "1h 37min");

    }
    catch (err) {
        console.log(err);
    }

    try {
        // Q11
        console.log("Add badmovie test 2:");
        badMoive = await movies.createMovie("Five high school students meet in Saturday detention and discover how they have a lot more in common than they thought.", ["Comedy", "Drama"], "R", "Universal Pictures", "John Hughes", ["Judd Nelson", "Molly Ringwald", "Ally Sheedy", "Anthony Hall", "Emilio Estevez"], "02/07/1985", "1h 37min");
    }
    catch (err) {
        console.log(err);
    }

    try {
        // Q11
        console.log("Add badmovie test 3:");
        badMoive = await movies.createMovie("love story", "Five high school students meet in Saturday detention and discover how they have a lot more in common than they thought.", [" ", "Drama"], "R", "Universal Pictures", "John Hughes", ["Judd Nelson", "Molly Ringwald", "Ally Sheedy", "Anthony Hall", "Emilio Estevez"], "02/07/1985", "1h 37min");
    }
    catch (err) {
        console.log(err);
    }

    try {
        // Q11
        console.log("Add badmovie test 4:");
        badMoive = await movies.createMovie("love story", "Five high school students meet in Saturday detention and discover how they have a lot more in common than they thought.", ["Drama"], "R", "Universal Pictures", "John Hughes", ["Judd Nelson", "Molly Ringwald", "Ally Sheedy", "Anthony Hall", "Emilio Estevez"], "02/07/1985", "1h 37min");
    }
    catch (err) {
        console.log(err);
    }

    try {
        // Q12
        console.log('removeMoive Test 1');
        await movies.removeMovie("634b2750ebd31f7774ad0e59");
    }
    catch (err) {
        console.log(err);
    }
    try {
        console.log('removeMoive Test 2');
        await movies.removeMovie("   ");

    }
    catch (err) {
        console.log(err);
    }
    try {
        console.log('removeMoive Test 3');
        await movies.removeMovie();

    }
    catch (err) {
        console.log(err);
    }

    try {
        // Q13
        console.log('renameMoive Test 1');
        await movies.renameMovie("634b2750ebd31f8884ad0e59", "Beautiful life");
    }
    catch (err) {
        console.log(err);
    }

    try {
        // Q14
        console.log('renameMoive Test 2');
        await movies.renameMovie(firstMovie._id.toString(), 123);
    }
    catch (err) {
        console.log(err);
    }

    try {
        // Q15
        console.log('getMovieById Test 1');
        await movies.getMovieById("634b2750ebd31f8884ad0e59");
    }
    catch (err) {
        console.log(err);
    }

    try {
        // Q15
        console.log('getMovieById Test 2');
        await movies.getMovieById("     ");
    }
    catch (err) {
        console.log(err);
    }

    try {
        // Q15
        console.log('getMovieById Test 3');
        await movies.getMovieById();
    }
    catch (err) {
        console.log(err);
    }


    connection.closeConnection();
    console.log('process done');
}

main();