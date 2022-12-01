const movieCollection = require('./config/mongoCollections');
const { dbConnection, closeConnection } = require('./config/mongoConnection');
const { movies, reviews } = require('./data');

const main = async () => {

    const db = await dbConnection();
    await db.dropDatabase();

    const movieDataOne = {
        title: "Test1",
        plot: "Hackers are blamed for making a virus that will capsize five oil tankers.",
        genres: ["Crime", "Drama", "Romance"],
        rating: "PG-13",
        studio: "United Artists",
        director: "Iain Softley",
        castMembers: ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"],
        dateReleased: "09/15/1995",
        runtime: "1h 45min"
    }

    const movieDataTwo = {
        title: "Test2",
        plot: "Hackers are blamed for making a virus that will capsize five oil tankers.",
        genres: ["Crime", "Drama", "Romance"],
        rating: "PG-13",
        studio: "United Artists",
        director: "Iain Softley",
        castMembers: ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"],
        dateReleased: "09/15/1995",
        runtime: "1h 45min"
    }

    const movieDataThree = {
        title: "Test3",
        plot: "Hackers are blamed for making a virus that will capsize five oil tankers.",
        genres: ["Crime", "Drama", "Romance"],
        rating: "PG-13",
        studio: "United Artists",
        director: "Iain Softley",
        castMembers: ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"],
        dateReleased: "09/15/1995",
        runtime: "1h 45min"
    }

    const movieDataFour = {
        title: "Test4",
        plot: "Hackers are blamed for making a virus that will capsize five oil tankers.",
        genres: ["Crime", "Drama", "Romance"],
        rating: "PG-13",
        studio: "United Artists",
        director: "Iain Softley",
        castMembers: ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"],
        dateReleased: "09/15/1995",
        runtime: "1h 45min"
    }

    const movieDataFive = {
        title: "Test5",
        plot: "Hackers are blamed for making a virus that will capsize five oil tankers.",
        genres: ["Crime", "Drama", "Romance"],
        rating: "PG-13",
        studio: "United Artists",
        director: "Iain Softley",
        castMembers: ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"],
        dateReleased: "09/15/1995",
        runtime: "1h 45min"
    }

    const movieDataSix = {
        title: "Test6",
        plot: "Hackers are blamed for making a virus that will capsize five oil tankers.",
        genres: ["Crime", "Drama", "Romance"],
        rating: "PG-13",
        studio: "United Artists",
        director: "Iain Softley",
        castMembers: ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"],
        dateReleased: "09/15/1995",
        runtime: "1h 45min"
    }

    const movieDataSeven = {
        title: "Test7",
        plot: "Hackers are blamed for making a virus that will capsize five oil tankers.",
        genres: ["Crime", "Drama", "Romance"],
        rating: "PG-13",
        studio: "United Artists",
        director: "Iain Softley",
        castMembers: ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"],
        dateReleased: "09/15/1995",
        runtime: "1h 45min"
    }

    const movieDataEight = {
        title: "Test8",
        plot: "Hackers are blamed for making a virus that will capsize five oil tankers.",
        genres: ["Crime", "Drama", "Romance"],
        rating: "PG-13",
        studio: "United Artists",
        director: "Iain Softley",
        castMembers: ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"],
        dateReleased: "09/15/1995",
        runtime: "1h 45min"
    }

    const movieDataNine = {
        title: "Test9",
        plot: "Hackers are blamed for making a virus that will capsize five oil tankers.",
        genres: ["Crime", "Drama", "Romance"],
        rating: "PG-13",
        studio: "United Artists",
        director: "Iain Softley",
        castMembers: ["Jonny Miller", "Angelina Jolie", "Matthew Lillard", "Fisher Stevens"],
        dateReleased: "09/15/1995",
        runtime: "1h 45min"
    }

    const reviewOne = {
        reviewTitle: "review1",
        reviewerName: "YoulinChen",
        review: "This movie was good. It was entertaining, but as someone who works in IT, it was not very realistic",
        rating: 1
    }

    const reviewTwo = {
        reviewTitle: "review2",
        reviewerName: "YoulinChen",
        review: "This movie was good. It was entertaining, but as someone who works in IT, it was not very realistic",
        rating: 2
    }

    const reviewThree = {
        reviewTitle: "review3",
        reviewerName: "YoulinChen",
        review: "This movie was good. It was entertaining, but as someone who works in IT, it was not very realistic",
        rating: 3
    }

    const reviewFour = {
        reviewTitle: "review4",
        reviewerName: "YoulinChen",
        review: "This movie was good. It was entertaining, but as someone who works in IT, it was not very realistic",
        rating: 4
    }

    const reviewFive = {
        reviewTitle: "review5",
        reviewerName: "YoulinChen",
        review: "This movie was good. It was entertaining, but as someone who works in IT, it was not very realistic",
        rating: 1
    }

    const reviewSix = {
        reviewTitle: "review6",
        reviewerName: "YoulinChen",
        review: "This movie was good. It was entertaining, but as someone who works in IT, it was not very realistic",
        rating: 2
    }

    let test1 = undefined;
    let movieId = undefined;

    try {

        test1 = await movies.createMovie(movieDataOne.title, movieDataOne.plot, movieDataOne.genres, movieDataOne.rating, movieDataOne.studio, movieDataOne.director, movieDataOne.castMembers, movieDataOne.dateReleased, movieDataOne.runtime);
        await movies.createMovie(movieDataTwo.title, movieDataTwo.plot, movieDataTwo.genres, movieDataTwo.rating, movieDataTwo.studio, movieDataTwo.director, movieDataTwo.castMembers, movieDataTwo.dateReleased, movieDataTwo.runtime);
        await movies.createMovie(movieDataThree.title, movieDataThree.plot, movieDataThree.genres, movieDataThree.rating, movieDataThree.studio, movieDataThree.director, movieDataThree.castMembers, movieDataThree.dateReleased, movieDataThree.runtime);
        await movies.createMovie(movieDataFour.title, movieDataFour.plot, movieDataFour.genres, movieDataFour.rating, movieDataFour.studio, movieDataFour.director, movieDataFour.castMembers, movieDataFour.dateReleased, movieDataFour.runtime);
        await movies.createMovie(movieDataFive.title, movieDataFive.plot, movieDataFive.genres, movieDataFive.rating, movieDataFive.studio, movieDataFive.director, movieDataFive.castMembers, movieDataFive.dateReleased, movieDataFive.runtime);

        movieId = test1._id.toString();

    }
    catch (e) {
        console.log('add movie error: ', e);
    }

    try {
        await reviews.createReview(movieId, reviewOne.reviewTitle, reviewOne.reviewerName, reviewOne.review, reviewOne.rating);
        await reviews.createReview(movieId, reviewTwo.reviewTitle, reviewTwo.reviewerName, reviewTwo.review, reviewTwo.rating);
        await reviews.createReview(movieId, reviewThree.reviewTitle, reviewThree.reviewerName, reviewThree.review, reviewThree.rating);
        await reviews.createReview(movieId, reviewFour.reviewTitle, reviewFour.reviewerName, reviewFour.review, reviewFour.rating);

    }
    catch (e) {
        console.log('add movie error: ', e);
    }


    console.log("Seeding Process Finished");
    closeConnection();


}


main();