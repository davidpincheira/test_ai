const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const seasonSchema = Schema({
    title: String,
    chapters: [{
        type: Schema.Types.ObjectId,
        ref: "Chapter" 
    }]
});

module.exports = mongoose.model('Season', seasonSchema);


/* const mongoose =  require('mongoose');

const seasonSchema = mongoose.Schema({
    title: String,
    chapters: [{
        type: Schema.Types.ObjectId,
        ref: "Chapter" 
    }]
});

const chapterSchema = mongoose.Schema({
    title: String,
    season: [{
        type: Schema.Types.ObjectId,
        ref: "Season" 
    }]
});

module.exports = mongoose.model('Season', seasonSchema);
module.exports = mongoose.model('Chapter', chapterSchema);
 */