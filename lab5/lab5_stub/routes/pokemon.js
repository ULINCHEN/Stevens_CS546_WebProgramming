//You will code the route in this file
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05/code/routes
const express = require('express');
const router = express.Router();
const { pokemonData } = require('../data');
const { checkId } = require('../helpers')


router
  .route('/')
  .get(async (req, res) => {
    try {
      const { data } = await pokemonData.pokemon();
      res.json(data);
    }
    catch (e) {
      res.status(500).send(e);
    }

  })

router
  .route('/:id')
  .get(async (req, res) => {

    try {
      let id = checkId(req.params.id);
    }
    catch (e) {
      return res.status(400).send(e);
    }

    try {
      const id = req.params.id;
      const { data } = await pokemonData.pokemonById(id);
      res.json(data);
    }
    catch (e) {
      return res.status(404).send(e);
    }
  })


module.exports = router;