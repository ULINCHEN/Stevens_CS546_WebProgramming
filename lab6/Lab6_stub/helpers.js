//You can add and export any helper functions you want here. If you aren't using any, then you can just leave this file as is.
const { ObjectId } = require('mongodb');
const { movies } = require('./config/mongoCollections');


const postMovieCheck = (postMovie) => {
    // input number check
    let title = postMovie.title
    let plot = postMovie.plot
    let genres = postMovie.genres
    let rating = postMovie.rating
    let studio = postMovie.studio
    let director = postMovie.director
    let castMembers = postMovie.castMembers
    let date = postMovie.dateReleased
    let runtime = postMovie.runtime
    const checkListOne = [title, plot, genres, rating, studio, director, castMembers, date, runtime];
    checkListOne.forEach(element => {
        if (!element) throw 'Insufficient Input Error(Router end)';
    })

    // input type check(string)
    title = checkString(title, 'title');
    plot = checkString(plot, 'plot');
    rating = checkString(rating, 'rating');
    studio = checkString(studio, 'studio');
    director = checkString(director, 'director');
    date = checkString(date, ' date');
    runtime = checkString(runtime, 'runtime');

    // special character check
    title = checkSpecialCharacter(title, 'title');

    // check director name
    director = checkName(director, 'director');

    // rating check
    rating = checkRating(rating);

    //genres check
    genres = checkGenres(genres);

    // castMembers check
    castMembers = checkCastMembers(castMembers);

    // date check
    date = checkDate(date, 'Date of movie');

    // runtime check
    runtime = checkRunTime(runtime);

    const output = {
        title: title,
        plot: plot,
        genres: genres,
        rating: rating,
        studio: studio,
        director: director,
        castMembers: castMembers,
        dateReleased: date,
        runtime: runtime,
    }
    return output;
}

const checkId = (id) => {
    console.log("checkId: ", id);
    if (!id) throw 'You must provide an id to search for';
    if (typeof id !== 'string') throw 'Type of ID must be a string';
    id = id.trim();
    if (id.length === 0) throw 'ID can not be an empty string or just spaces';
    if (!ObjectId.isValid(id)) throw 'invalid object ID';
    return id;
}

const checkStringLength = (string, minLength, inputName) => {
    if (string.length < minLength) throw `${inputName} length should be at least ${minLength}`;
    return string.trim();
}

const checkTitle = (title, inputName) => {
    title = checkString(title, inputName);
    title = checkSpecialCharacter(title, inputName);
    title = checkStringLength(title, 2, inputName);
    return title;
}

const checkStudio = (studio, inputName) => {
    studio = checkString(studio, inputName);
    studio = checkSpecialCharacterNoNumber(studio, inputName);
    studio = checkStringLength(studio, 5, inputName);
    return studio;
}

const checkDirector = (director, inputName) => {
    director = checkString(director, inputName);
    director = checkName(director, inputName);
    return director;
}

const checkString = (string, inputName) => {
    if (!string) throw `You mush provide a ${inputName}`;
    if (typeof string != 'string') throw `${inputName}'s type should be string`;
    string = string.trim();
    if (string.length === 0) throw `${inputName} can not be a empty string or string with only spaces`;
    return string;
}

const checkStringArray = (arr, inputName) => {
    let errorFlag = false;
    if (!arr || !Array.isArray(arr)) throw `You must provide an array of ${inputName}`;
    if (arr.length === 0) throw `${inputName} should not be a empty array`;
    for (let i of arr) {
        if (typeof i !== 'string' || i.trim().length === 0) {
            errorFlag = true;
            break;
        }
        i = i.trim();
    }
    if (errorFlag == true) throw `One or more item in ${inputName} array is invalid string`;
    return arr;
}

const checkSpecialCharacterNoNumber = (string, inputName) => {
    const specialChars = /^[a-zA-Z\s]+$/;
    string = string.trim();
    if (specialChars.test(string) === false) throw `${inputName} should only contains character a-z and A-Z`;
    return string;
}

const checkSpecialCharacter = (string, inputName) => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    string = string.trim();
    if (specialChars.test(string) === true) throw `${inputName} should not contain special character`;
    return string;
}

const checkName = (name, inputName) => {
    const arr = name.trim().split(' ');
    const specialChars = /^[a-zA-Z\s]+$/
    if (arr.length != 2) throw `${inputName} should have firstname and lastname`;
    arr.forEach(element => {
        if (element.length < 3) throw 'Firstname and last name should contains at least 3 characters';
        if (specialChars.test(element) == false) throw 'director should not contain special character or number';
    })
    return name.trim();
}

const checkRating = (rating) => {
    const ratingSet = new Set(['G', 'PG', 'PG-13', 'R', ' NC-17']);
    rating = rating.trim();
    if (!ratingSet.has(rating)) throw 'Rating should be one of those: G, PG, PG-13, R, NC-17';
    return rating;
}

const checkGenres = (genres) => {
    genres = checkStringArray(genres, 'genres');
    let newGenres = [];
    for (let item of genres) {
        item = checkString(item, 'genres item');
        item = checkSpecialCharacterNoNumber(item, 'genres item');
        item = checkStringLength(item, 5, 'genres item');
        newGenres.push(item);
    }
    genres = newGenres;
    return genres;
}

const checkDate = (date, inputName) => {
    if (date.length != 10 || date.charAt(2) != '/' || date.charAt(5) != '/') throw `${inputName} Invalid: Wrong Format`;
    let arr = date.trim().split('/');
    // check month
    if (parseInt(arr[0]) <= 0 || parseInt(arr[0]) > 12) throw `${inputName} Invalid: Month value Invalid`;
    // check year
    const thisYear = new Date().getFullYear();
    if (parseInt(arr[2]) < 1900 || parseInt(arr[2]) - thisYear > 2) throw `${inputName} Invalid: years should not before 1900 or later than ${thisYear + 2}`;
    // check days
    const monthThatHasThirtyOneDays = new Set([1, 3, 5, 7, 8, 10, 12]);
    const monthThatHasThirtyDays = new Set([4, 6, 9, 11]);
    if (parseInt(arr[1]) <= 0) throw `${inputName} invalid: days value invalid`;
    if (parseInt(arr[0]) == 2 && (parseInt(arr[1]) > 28)) throw `${inputName} Invalid: February should be 1 - 28 days`;
    if (monthThatHasThirtyOneDays.has(parseInt(arr[0])) && (parseInt(arr[1]) > 31)) throw `${inputName} Invalid:day's value should between 1 - 31 days`;
    if (monthThatHasThirtyDays.has(parseInt(arr[0])) && (parseInt(arr[1]) > 30)) throw `${inputName} Invalid: day's value should between 1 - 30 days`;
    return date.trim();
}

const checkRunTime = (runtime) => {
    // runtime check
    const cache = runtime.trim().split(' ');
    if (cache.length != 2) throw 'runtime input invalid';
    if (cache[0].length < 2 || cache[1].length < 4) throw 'runtime input invalid: format should be #h #min';
    if (cache[0].charAt(cache[0].length - 1) != 'h' || cache[1].substring(cache[1].length - 3, cache[1].length) != 'min') throw 'runtime input invalid: format should be #h #min';
    cache[0] = cache[0].substring(0, cache[0].length - 1);
    cache[1] = cache[1].substring(0, cache[1].length - 3);
    if (isNaN(cache[0]) || isNaN(cache[1])) throw 'runtime input invalid: hour or min is not a valid number';
    if (parseInt(cache[0]) <= 0 || parseInt(cache[0]) % 1 > 0 || parseInt(cache[1]) < 0 || parseInt(cache[1]) > 59) throw 'runtime input invalid: hour or min is not a valid number';
    if (parseInt(cache[1]) % 1 > 0) {
        const temp = cache[1].split('.');
        if (parseInt(temp[1]) < 0 || parseInt(temp[1]) > 59) throw 'runtime input invalid: hour or min is not a valid number';
    }

    return runtime.trim();
}

const checkCastMembers = (castMembers) => {
    castMembers = checkStringArray(castMembers, 'castMembers');
    const specialChars = /^[a-zA-Z\s]+$/;
    const newCastMember = [];
    for (let item of castMembers) {
        item = checkString(item, 'castMembers item');
        const cache = item.split(' ');
        if (cache.length != 2) throw 'castMember should include firstname and lastname';
        if (cache[0].length < 3 || cache[1].length < 3) throw 'castMember firstname and lastname should have at least 3 character each';
        cache[0] = checkSpecialCharacterNoNumber(cache[0], 'castMember firstname');
        cache[1] = checkSpecialCharacterNoNumber(cache[1], 'castMember lastname');
        if (cache[0].charAt(0) != cache[0].charAt(0).toUpperCase() || cache[1].charAt(0) != cache[1].charAt(0).toUpperCase()) throw 'first character of firstname and lastname should be Uppercase';
        newCastMember.push(item);
    }
    castMembers = newCastMember;
    return castMembers;
}

const checkRatingNumber = (rating) => {
    if (isNaN(rating) === true) throw 'Rating should be a number';
    if (rating < 1 || rating > 5) throw 'Rating should between 1 - 5';
    //rating = rating.toFixed(1);
    rating = Number(rating);
    rating = rating.toFixed(1);
    return rating;
}

const checkReview = (reviewTitle, reviewerName, review, rating) => {

    if (!reviewTitle || !reviewerName || !review || !rating) throw 'Error: Missing Input';

    // check string
    reviewTitle = checkString(reviewTitle, 'reviewTitle');
    reviewerName = checkString(reviewerName, 'reviewerName');
    review = checkString(review, 'review');

    // check rating
    rating = checkRatingNumber(rating);
    const output = {
        reviewTitle: reviewTitle,
        reviewerName: reviewerName,
        review: review,
        rating: rating,
    }
    return output;
}

const overallRatingUpdate = async (movieId, collection) => {
    const movieData = await collection.findOne({ _id: ObjectId(movieId) });
    const reviewData = await movieData.review;
    let totalRating = undefined;
    // if no review, set overall rating to 0;
    if (reviewData.length === 0) {
        totalRating = 0;
    }

    // if only one review, set overall rating to this reivew rating;
    else if (reviewData.length === 1) {
        totalRating = Number(reviewData[0].rating);
    }

    // else, get average value of all rating

    else {
        let allData = 0;
        for (let review of reviewData) {
            allData += Number(review.rating);
        }
        totalRating = allData / (reviewData.length);

        // overallRating = overallRating.toFixed(1);
    }
    totalRating = totalRating.toFixed(1);
    console.log("overall review updated: ", totalRating);
    const updateDoc = { $set: { overallRating: totalRating } }
    return await collection.updateOne({ _id: ObjectId(movieId) }, updateDoc);

}

module.exports = {
    postMovieCheck,
    checkId,
    checkTitle,
    checkStudio,
    checkDirector,
    checkString,
    checkStringArray,
    checkSpecialCharacter,
    checkName,
    checkRating,
    checkRatingNumber,
    checkGenres,
    checkDate,
    checkRunTime,
    checkCastMembers,
    checkReview,
    overallRatingUpdate
}