
const express = require('express');
const router = express.Router();
const moviesController= require('../controllers/movies.controller')

router.get('/movies/searchMovie/:search', moviesController.searchMovie)
router.get('/movies/getTop10Movies', moviesController.getTop10Movies)

module.exports = router;