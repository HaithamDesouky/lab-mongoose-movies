const express = require('express');
const Movie = require('../models/moviesModel');
const moviesRouter = new express.Router();

moviesRouter.get('/', (request, response, next) => {
  Movie.find()
    .then(movieData => {
      response.render('../views/movies/index', { movieData });
    })
    .catch(error => {
      next(error);
    });
});

moviesRouter.get('/create', (request, response, next) => {
  response.render('../views/movies/create');
});

moviesRouter.post('/create', (request, response, next) => {
  const data = request.body;

  Movie.create({
    name: data.name,
    genre: data.genre,
    plot: data.plot
  })
    .then(() => {
      response.redirect('/movies');
    })
    .catch(error => {
      next(error);
    });
});

moviesRouter.get('/:id', (request, response, next) => {
  const id = request.params.id;

  Movie.findById(id).then(movie => {
    response.render('../views/movies/show.hbs', { movie });
  });
});

moviesRouter.get('/');
module.exports = moviesRouter;
