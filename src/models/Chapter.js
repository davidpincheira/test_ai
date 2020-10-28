const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const chapterSchema = mongoose.Schema({
    title: String,
    season: {
        type: Schema.Types.ObjectId,
        ref: "Season"
    }
});

module.exports = mongoose.model('Chapter', chapterSchema);