const { movies } = require('../config/mongoCollections');
const { ObjectId } = require('mongodb');
const { getMovieById } = require('./movies');
const validation = require('../helpers')


const createReview = async (
  movieId,
  reviewTitle,
  reviewerName,
  review,
  rating
) => {

  // 1, check input
  if (!movieId || !reviewTitle || !reviewerName || !review || !rating) throw "Error:Missing Input";

  // 2, check string
  movieId = validation.checkString(movieId, 'movie id');
  reviewTitle = validation.checkString(reviewTitle, 'reviewTitle');
  reviewerName = validation.checkString(reviewerName, 'reviewerName');
  review = validation.checkString(review, 'review');

  // check movieId
  if (!ObjectId.isValid(movieId)) throw 'invalid object ID';

  console.log('here');
  // check rating
  rating = validation.checkRatingNumber(rating);

  // setup current date
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const curDate = `${month}/${day}/${year}`;

  const reviewDoc = {
    _id: new ObjectId(),
    reviewTitle: reviewTitle,
    reviewDate: curDate,
    reviewerName: reviewerName,
    review: review,
    rating: rating,
  }

  // connect to db, get movie doc, create review

  const col = await movies();
  const res = col.find({ _id: movieId }).toArray();
  if (res.length == 0) throw `Movie with id: ${movieId} doesn't exsit`

  await col.updateOne({ _id: ObjectId(movieId) }, { $push: { review: reviewDoc } });
  await validation.overallRatingUpdate(movieId, col);// problem could be declare collection again inside this method.
  const movie = await getMovieById(movieId);
  const reviewData = movie.review;
  console.log(reviewData);
  return reviewData[reviewData.length - 1];

  // return col
  //   .updateOne({ _id: ObjectId(movieId) }, { $push: { review: reviewDoc } })
  //   .then(async () => {
  //     await validation.overallRatingUpdate(movieId);
  //     const movie = await getMovieById(movieId);
  //     console.log("movie data after updata review:", movie);
  //   })
  //   .then(async () => {
  //     const movie = await getMovieById(movieId);
  //     return movie.review;
  //   })
};

const getAllReviews = async (movieId) => {

  // check input
  if (!movieId) throw 'Need a movieId';
  if (typeof movieId != 'string' || movieId.trim().length == 0) throw 'Invalid movieId';
  // check movieId
  if (!ObjectId.isValid(movieId)) throw 'movieId is not a valid object ID';
  movieId = movieId.trim();
  const res = await getMovieById(movieId);
  if (res.length == 0) throw `Movie with id: ${movieId} doesn't exsit`
  const col = await movies();
  //const output = await col.findOne({ _id: ObjectId(movieId) }, { projection: { _id: 0, review: 1 } });
  return res.review;

};

const getReview = async (reviewId) => {

  if (!reviewId) throw 'Need a reviewId';
  if (typeof reviewId != 'string' || reviewId.trim().length == 0) throw 'Invalid movieId';
  if (!ObjectId.isValid(reviewId)) throw 'reviewId is not a valid object ID';
  reviewId = reviewId.trim();

  // get collection
  const col = await movies();
  // get movie result that has reviewId
  const projection = { _id: 0, review: 1 };
  const res = await col.find({ "review._id": ObjectId(reviewId) }).project(projection).toArray();
  let data = res[0].review;
  let output = undefined;
  for (let i of data) {
    if (i._id == reviewId) {
      output = i;
      break;
    };
  }
  if (output === undefined) throw `Did not find review with id ${reviewId}`;
  return output;

};

const removeReview = async (reviewId) => {
  if (!reviewId) throw 'Need a reviewId';
  if (typeof reviewId != 'string' || reviewId.trim().length == 0) throw 'Invalid reviewId';
  if (!ObjectId.isValid(reviewId)) throw 'reviewId is not a valid object ID';
  reviewId = reviewId.trim();
  const col = await movies();
  console.log('准备删除的ID:', reviewId);
  //const projection = { review: 1 };
  const res = await col.find({ "review._id": ObjectId(reviewId) }).toArray();
  let currentReview = res[0].review;
  let movieId = res[0]._id.toString();
  for (let i = 0; i < currentReview.length; ++i) {
    if (currentReview[i]._id.toString() === reviewId) {
      currentReview.splice(i, 1);
      break;
    }
  }
  await col.updateOne({ "review._id": ObjectId(reviewId) }, { $set: { "review": currentReview } });
  await validation.overallRatingUpdate(movieId, col);
  const result = await col.find({ _id: ObjectId(movieId) }).toArray();
  return result;
};

module.exports = { createReview, getAllReviews, getReview, removeReview };
