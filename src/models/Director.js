const mongoose =  require('mongoose');

const directorSchema = mongoose.Schema({
    name: String,
    lastName: String,
    gender: Number
});

module.exports = mongoose.model('Director', directorSchema);