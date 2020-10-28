const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const User = Schema({
    email: {
        type: String,
        unique: true
    },
    password: String,
    gender: Number
});

module.exports = mongoose.model('User', User);