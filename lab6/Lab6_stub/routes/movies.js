//require express and express router as shown in lecture code
const express = require('express');
const router = express.Router();
const { movies } = require('../data');
const validation = require('../helpers');

router
  .route('/')
  .get(async (req, res) => {
    //code here for GET
    try {
      const projection = { title: 1 }
      const movieData = await movies.getAllMovies(projection);
      res.json(movieData);
    }
    catch (e) {
      return res.status(400).json({ error: e });
    }


  })
  .post(async (req, res) => {
    //code here for POST
    let postData = req.body;

    try {
      postData = validation.postMovieCheck(postData);
    }
    catch (e) {
      console.log(e);
      return res.status(400).json({ error: e });
    }

    try {
      console.log(postData);
      const result = await movies.createMovie(
        postData.title,
        postData.plot,
        postData.genres,
        postData.rating,
        postData.studio,
        postData.director,
        postData.castMembers,
        postData.dateReleased,
        postData.runtime);
      res.status(200).json(result);

    }
    catch (e) {
      return res.status(404).json({ error: e });
    }


  });

router
  .route('/:movieId')
  .get(async (req, res) => {
    //code here for GET
    let movieId = req.params.movieId.toString();

    try {
      movieId = validation.checkId(movieId);
    }
    catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      const movieData = await movies.getMovieById(movieId);
      res.status(200).json(movieData);
    }
    catch (e) {
      return res.status(404).json({ error: e });
    }

  })
  .delete(async (req, res) => {
    //code here for DELETE
    let movieId = req.params.movieId.toString();
    console.log(movieId);
    try {
      movieId = validation.checkId(movieId);
    }
    catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      const result = await movies.removeMovie(movieId);
      res.status(200).json({ "movidId": movieId, "deleted": result });
    }
    catch (e) {
      return res.status(404).json({ error: e });
    }
  })
  .put(async (req, res) => {
    //code here for PUT
    let movieId = req.params.movieId.toString();
    let updateData = req.body;

    try {
      movieId = validation.checkId(movieId);
    }
    catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      await movies.getMovieById(movieId);
    }
    catch (e) {
      return res.status(404).json({ error: e });
    }

    try {
      updateData = validation.postMovieCheck(updateData);
    }
    catch (e) {
      return res.status(400).json({ error: e });
    }

    try {
      const result = await movies.updateMovie(
        movieId,
        updateData.title,
        updateData.plot,
        updateData.genres,
        updateData.rating,
        updateData.studio,
        updateData.director,
        updateData.castMembers,
        updateData.dateReleased,
        updateData.runtime
      );
      res.status(200).json(result);
    }
    catch (e) {
      return res.status(400).json({ error: e });
    }

  });


module.exports = router;