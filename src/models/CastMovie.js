const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const CastMovie = Schema({
    type: String,
    actor_id: Number,
    movie_id: Number,
});

module.exports = mongoose.model('CastMovie', CastMovie);