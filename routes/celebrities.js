const express = require('express');
const Celebrity = require('../models/celebrityModel');
const celebRouter = new express.Router();

celebRouter.get('/', (request, response, next) => {
  console.log('connected');
  Celebrity.find()
    .then(data => {
      response.render('../views/celebrities/index', { data });
    })
    .catch(error => {
      next(error);
    });
});

celebRouter.get('/create', (request, response, next) => {
  response.render('../views/celebrities/create');
});

celebRouter.post('/create', (request, response, next) => {
  const data = request.body;

  Celebrity.create({
    name: data.name,
    occupation: data.occupation,
    catchPhrase: data.catchPhrase
  })
    .then(creation => {
      console.log('We did it!', creation);
      response.redirect('/celebrities');
    })
    .catch(error => {
      next(error);
    });
  console.log(data);
});

celebRouter.get('/:id/edit', (request, response, next) => {
  const id = request.params.id;

  Celebrity.findById(id)
    .then(data => {
      response.render('../views/celebrities/edit', { data });
    })
    .catch(error => next(error));
});

celebRouter.post('/:id/edit', (request, response, next) => {
  const id = request.params.id;
  const data = request.body;

  Celebrity.findByIdAndUpdate(id, {
    name: data.name,
    occupation: data.occupation,
    catchPhrase: data.catchPhrase
  })
    .then(() => {
      response.redirect('/celebrities');
    })
    .catch(error => {
      next(error);
    });
});

celebRouter.post('/:id/delete', (request, response, next) => {
  const id = request.params.id;

  Celebrity.findByIdAndDelete(id)

    .then(() => {
      response.redirect('/celebrities');
    })
    .then(error => {
      next(error);
    });
});

celebRouter.get('/:id', (request, response, next) => {
  const id = request.params.id;

  Celebrity.findById(id)
    .then(singleCeleb => {
      console.log(singleCeleb);
      response.render('../views/celebrities/show', singleCeleb);
    })
    .catch(error => {
      next(error);
    });
});

celebRouter.get('/');
module.exports = celebRouter;
