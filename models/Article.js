const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    url:{
        type: String,
        required: true
    },
    thumbnail:{
        type: String,
        required: true
    },
    headline:{
        type: String,
        required: true
    },
    summary:{
        type: String,
        required: true
    }
});

const Article = mongoose.model("Article",ArticleSchema);

module.exports = Article;