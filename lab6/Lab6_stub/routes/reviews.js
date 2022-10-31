//require express and express router as shown in lecture code
const express = require('express');
const router = express.Router();
const { reviews } = require('../data');
const validation = require('../helpers');


router
  .route('/:movieId')
  .get(async (req, res) => {
    //code here for GET
    let movieId = req.params.movieId;

    try {
      movieId = validation.checkId(movieId);
    }
    catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      const result = await reviews.getAllReviews(movieId);
      res.status(200).json(result);
    }
    catch (e) {
      return res.status(404).json({ error: e });
    }

  })
  .post(async (req, res) => {
    //code here for POST
    let movieId = req.params.movieId;
    let content = req.body;

    try {
      movieId = validation.checkId(movieId);
      content = validation.checkReview(
        content.reviewTitle,
        content.reviewerName,
        content.review,
        content.rating
      )
    }
    catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      const result = await reviews.createReview(
        movieId,
        content.reviewTitle,
        content.reviewerName,
        content.review,
        content.rating
      );
      res.status(200).json(result);
    }
    catch (e) {
      return res.status(404).json({ error: e });
    }

  });

router
  .route('/review/:reviewId')
  .get(async (req, res) => {
    //code here for GET
    let reviewId = req.params.reviewId;

    try {
      reviewId = validation.checkId(reviewId);
    }
    catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      const result = await reviews.getReview(reviewId);
      res.status(200).json(result);
    }
    catch (e) {
      return res.status(404).json({ error: e });
    }

  })
  .delete(async (req, res) => {
    //code here for DELETE
    let reviewId = req.params.reviewId;

    try {
      reviewId = validation.checkId(reviewId);
    }
    catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      const result = await reviews.removeReview(reviewId);
      res.status(200).json(result);
    }
    catch (e) {
      return res.status(404).json({ error: e });
    }

  });


module.exports = router;