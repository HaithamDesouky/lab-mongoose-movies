const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const moviesSchema = Schema({
  name: { type: String, required: true },
  genre: { type: String },
  plot: { type: String }
});

const Movie = mongoose.model('Movie', moviesSchema);

module.exports = Movie;
