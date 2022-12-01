const { movies } = require('../config/mongoCollections');
const { ObjectId } = require('mongodb');
const validation = require('../helpers');


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
  if (!title ||
    !plot ||
    !genres ||
    !rating ||
    !studio ||
    !director ||
    !castMembers ||
    !dateReleased ||
    !runtime) throw 'Insufficient Input Error (Server end)';


  // input  check
  title = validation.checkString(title, "movie title");
  plot = validation.checkString(plot, 'movie plot');
  studio = validation.checkStudio(studio, 'studio');
  director = validation.checkDirector(director, 'director');
  dateReleased = validation.checkString(dateReleased, 'dateReleased');
  runtime = validation.checkString(runtime, 'runtime');

  // special character check
  title = validation.checkTitle(title, 'title');

  // rating check
  rating = validation.checkRating(rating);

  //genres check
  genres = validation.checkGenres(genres);

  // castMembers check
  castMembers = validation.checkCastMembers(castMembers);

  // dateReleased check
  dateReleased = validation.checkDate(dateReleased, 'dateReleased');

  // runtime check
  runtime = validation.checkRunTime(runtime);

  // create obj
  const output = {
    title: title,
    plot: plot,
    genres: genres,
    rating: rating,
    studio: studio,
    director: director,
    castMembers: castMembers,
    dateReleased: dateReleased,
    runtime: runtime,
    overallRating: 0,
    review: [],
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

const getAllMovies = async (projection) => {
  const col = await movies();
  let moviesList = undefined;

  if (!projection) {
    moviesList = await col.find({}).toArray();
  }
  else {
    moviesList = await col.find({}).project(projection).toArray();
  }

  if (moviesList.length == 0) throw 'No movie in database';

  return moviesList;
};

const getMovieById = async (movieId) => {
  if (!movieId) throw 'You mush provide an id to search for';
  if (typeof movieId !== 'string') throw 'Type of ID must be a string';
  if (movieId.trim().length === 0) throw 'ID can not be an empty string or just spaces';
  movieId = movieId.trim();
  if (!ObjectId.isValid(movieId)) throw 'invalid object ID';
  const col = await movies();
  const movie = await col.findOne({ _id: ObjectId(movieId) });
  if (movie == null) throw `No movie with id: ${movieId}`;

  return movie;
};

const removeMovie = async (movieId) => {
  if (!movieId) throw 'You mush provide an id to search for';
  if (typeof movieId !== 'string') throw 'Type of ID must be a string';
  if (movieId.trim().length === 0) throw 'ID can not be an empty string or just spaces';
  movieId = movieId.trim();
  if (!ObjectId.isValid(movieId)) throw 'invalid object ID';
  const col = await movies();
  const deleteInfo = await col.deleteOne({ _id: ObjectId(movieId) });

  if (deleteInfo.deletedCount === 0) {
    throw `Could not delete with id of ${movieId}`;
  }
  return true;
};

const updateMovie = async (
  movieId,
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



  if (!movieId || !title || !plot ||
    !genres || !rating || !studio ||
    !director || !castMembers || !dateReleased || !runtime) {

    throw 'Insufficient Input Error';
  }

  // input type check
  movieId = validation.checkString(movieId, 'movie ID');
  title = validation.checkTitle(title, 'title');
  plot = validation.checkString(plot, 'movie plot');
  studio = validation.checkStudio(studio, 'studio');
  director = validation.checkDirector(director, 'director');
  dateReleased = validation.checkString(dateReleased, 'dateReleased');
  runtime = validation.checkString(runtime, 'runtime');

  // movieId check
  if (!ObjectId.isValid(movieId)) throw 'invalid object ID';

  // genres check
  genres = validation.checkGenres(genres);

  // castmember check
  castMembers = validation.checkCastMembers(castMembers);

  // dateReleased check
  dateReleased = validation.checkDate(dateReleased, 'dateReleased');

  // runtime check
  runtime = validation.checkRunTime(runtime);

  const updateInfo = {
    title: title,
    plot: plot,
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
  return col
    .updateOne({ "_id": ObjectId(movieId) }, { $set: updateInfo })
    .then(async () => {
      const output = await getMovieById(movieId);
      console.log('update complete');
      return output;
    })

};

const renameMovie = async (id, newName) => {
  //Not used for this lab
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

module.exports = { createMovie, getAllMovies, getMovieById, removeMovie, updateMovie, renameMovie };
