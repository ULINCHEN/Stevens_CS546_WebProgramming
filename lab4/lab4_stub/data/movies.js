const { movies } = require('../config/mongoCollections');
const { ObjectId } = require('mongodb');

const createMovie = async (
  title,
  plot,
  genres,
  rating,
  studio,
  director,
  castMembers,
  dateReleased,
  runtime
) => {

  // input number check
  const checkListOne = [title, plot, genres, rating, studio, director, castMembers, dateReleased, runtime];
  checkListOne.forEach(element => {
    if (!element) throw 'Insufficient Input Error';
  })

  // input type check
  const checkListTwo = [title, plot, rating, studio, director, dateReleased, runtime];
  checkListTwo.forEach(element => {
    if (typeof element != 'string' || element.trim().length == 0) throw 'Wrong Input Type Error: Invalid String';
  })

  // special character check
  const specialChars = /^[a-zA-Z\s]+$/
  if (specialChars.test(title.trim()) == false) throw 'title should not contain special character';


  const arr = director.trim().split(' ');
  if (arr.length != 2) throw 'Director should include firstname and lastname';
  arr.forEach(element => {
    if (element.length < 3) throw 'Firstname and last name should contains at least 3 characters';
    if (specialChars.test(element) == false) throw 'director should not contain special character';
  })

  // rating check
  const ratingSet = new Set(['G', 'PG', 'PG-13', 'R', ' NC-17']);
  if (!ratingSet.has(rating)) throw 'Rating should be one of those: G, PG, PG-13, R, NC-17';

  //genres check
  if (Array.isArray(genres) == false || genres.length == 0) throw 'Genres is Invalid';
  let newGenres = [];
  for (let item of genres) {
    if (typeof item != 'string') throw 'Each item in genres should be string';
    if (specialChars.test(item.trim()) == false || item.trim() == 0) throw 'Genres itme is Invalid';
    if (item.trim().length < 5) throw 'Genres item should have at least 5 characters.'
    newGenres.push(item.trim());
  }
  genres = newGenres;


  // castMembers check
  if (Array.isArray(castMembers) == false || castMembers.length < 1) throw 'castMember should be a string array include at least one element.';
  const newCastMember = [];
  for (let item of castMembers) {
    if (!item || typeof item != 'string' || item.trim().length == 0) throw 'castMember item should be a valid string';
    const cache = item.trim().split(' ');
    if (cache.length != 2) throw 'castMember should include firstname and lastname';
    if (cache[0].length < 3 || cache[1].length < 3) throw 'castMember firstname and lastname should have at least 3 character each';
    if (specialChars.test(cache[0]) == false || specialChars.test(cache[1]) == false) throw 'castMember firstname and lastname should not have speical character';
    if (cache[0].charAt(0) != cache[0].charAt(0).toUpperCase() || cache[1].charAt(0) != cache[1].charAt(0).toUpperCase()) throw 'first character of firstname and lastname should be Uppercase';
    newCastMember.push(item.trim());
  }
  castMembers = newCastMember;


  // dateReleased check
  if (dateReleased.length != 10 || dateReleased.charAt(2) != '/' || dateReleased.charAt(5) != '/') throw 'dateReleased Invalid: Wrong Format';
  const date = dateReleased.trim().split('/');
  // check month
  if (parseInt(date[0]) <= 0 || parseInt(date[0]) > 12) throw 'dateReleased Invalid: Month value Invalid';
  // check year
  const thisYear = new Date().getFullYear();
  if (parseInt(date[2]) < 1900 || parseInt(date[2]) - thisYear > 2) throw `dateReleased Invalid: years should not before 1900 or later than ${thisYear + 2}`;
  // check days
  const monthThatHasThirtyOneDays = new Set([1, 3, 5, 7, 8, 10, 12]);
  const monthThatHasThirtyDays = new Set([4, 6, 9, 11]);
  if (parseInt(date[1]) <= 0) throw 'dateReleased invalid: days value invalid';
  if (parseInt(date[0]) == 2 && (parseInt(date[1]) > 28)) throw 'dateReleased Invalid: February should be 1 - 28 days';
  if (monthThatHasThirtyOneDays.has(parseInt(date[0])) && (parseInt(date[1]) > 31)) throw 'dateReleased Invalid: should between 1 - 31 days';
  if (monthThatHasThirtyDays.has(parseInt(date[0])) && (parseInt(date[1]) > 30)) throw 'dateReleased Invalid: should between 1 - 30 days';

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


  // create obj
  const output = {
    title: title.trim(),
    plot: plot.trim(),
    genres: genres,
    rating: rating,
    studio: studio,
    director: director,
    castMembers: castMembers,
    dateReleased: dateReleased,
    runtime: runtime,
  }

  // connect to db and create collection
  const col = await movies();
  const info = await col.insertOne(output);
  if (!info.acknowledged || !info.insertedId) throw 'Could not add movie';

  // if add successful then return the new object from database;
  const newId = info.insertedId.toString();
  const returnValue = await getMovieById(newId);

  return returnValue;



};

const getAllMovies = async () => {

  const col = await movies();
  const moviesList = await col.find({}).toArray();
  if (!moviesList) throw 'Could not get all movies';
  return moviesList;

};

const getMovieById = async (id) => {
  if (!id) throw 'You mush provide an id to search for';
  if (typeof id !== 'string') throw 'Type of ID must be a string';
  if (id.trim().length === 0) throw 'ID can not be an empty string or just spaces';
  id = id.trim();
  if (!ObjectId.isValid(id)) throw 'invalid object ID';
  const col = await movies();
  const movie = await col.findOne({ _id: ObjectId(id) });
  if (movie == null) throw `No movie with id: ${id}`;

  return movie;
};

const removeMovie = async (id) => {
  if (!id) throw 'You mush provide an id to search for';
  if (typeof id !== 'string') throw 'Type of ID must be a string';
  if (id.trim().length === 0) throw 'ID can not be an empty string or just spaces';
  id = id.trim();
  if (!ObjectId.isValid(id)) throw 'invalid object ID';
  const col = await movies();
  const deleteInfo = await col.deleteOne({ _id: ObjectId(id) });

  if (deleteInfo.deletedCount === 0) {
    throw `Could not delete with id of ${id}`;
  }
  return { delete: true };
};

const renameMovie = async (id, newName) => {
  if (!id) throw 'You mush provide an id to search for';
  if (typeof id !== 'string') throw 'Type of ID must be a string';
  if (id.trim().length === 0) throw 'ID can not be an empty string or just spaces';
  id = id.trim();
  if (!ObjectId.isValid(id)) throw 'invalid object ID';

  if (!newName) throw 'Must provide a newName value';
  if (typeof newName != 'string') throw 'newName should be a string';
  if (newName.trim().length === 0) throw 'newName should not be a empty string or just spaces';
  const col = await movies();
  // const movie = await col.findOne({ _id: ObjectId(id) });
  // if (movie == null) throw `No movie with id: ${id}`;

  const updateData = { title: newName };
  const updateInfo = await col.updateOne({ _id: ObjectId(id) }, { $set: updateData });
  if (updateInfo.modifiedCount === 0) throw 'could not update movie name successfully';
  return await getMovieById(id);

};

module.exports = { createMovie, getAllMovies, getMovieById, removeMovie, renameMovie };


