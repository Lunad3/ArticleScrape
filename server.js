const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const request = require("request");
const website = "https://www.nationalgeographic.org/";

const db = require("./models");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/TestDB";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// add NEW articles to db
app.get("/scrape",(req,res)=>{
    console.log("SCRAPING");
    request(website + "news/",(error,response,html)=>{
        const $ = cheerio.load(html);
        $(".ng-thumbnail").each((i,element)=>{
            const newArticle = {
                url: website + $(element).children().children(".ng-promo-title").children().attr("href"),
                thumbnail: $(element).children().children(".ng-image-link").children().attr("data-src"),
                headline: $(element).children().children(".ng-promo-title").children().text(),
                summary: $(element).children().children(".ng-margin-top").text()
            };
            db.Article.findOne({"url":newArticle.url},(err,searchResults)=>{
                if(!searchResults){
                    db.Article.create(newArticle);
                }
            });
        });
    });
    res.send("Scrape Complete");
});

// return all articles in db
app.get("/articles", (req, res)=>{
    db.Article.find({})
      .then(dbArticles=>{
        res.json(dbArticles);
      })
      .catch(function(err) {
        res.json(err);
    });
});

// return all notes in db
app.get("/notes",(req,res)=>{
    db.Note.find({})
    .then(dbNotes=>{
        res.json(dbNotes);
    })
    .catch(err=>{
        res.json(err);
    });
});

// create new Note in db
app.post("/newNote",(req,res)=>{
    const newNote = {
        belongsTo: req.body.belongsTo,
        body: req.body.body
    }
    db.Note.create(newNote);
});

//Start Server
app.listen(PORT,()=>{
    console.log("Server Listening on http://localhost:" + PORT);
});