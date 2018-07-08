const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cheerio = require("cheerio");
const request = require("request");
const website = "https://www.nationalgeographic.org/";

const db = require("./models");
const PORT = 3000;
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/TestDB";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

app.get("/scrape",(req,res)=>{
    request(website + "news/",(error,response,html)=>{
        const $ = cheerio.load(html);
        console.log("####################################");
        $(".ng-thumbnail").each((i,element)=>{
            const newArticle = {
                url: website + $(element).children().children(".ng-promo-title").children().attr("href"),
                thumbnail: website + $(element).children().children(".ng-image-link").attr("href"),
                headline: $(element).children().children(".ng-promo-title").children().text(),
                summary: $(element).children().children(".ng-margin-top").text()
            };
            db.Article.findOne({"url":newArticle.url},(err,searchResults)=>{
                if(!searchResults){
                    console.log("+");
                    db.Article.create(newArticle);
                }else{
                    console.log("=");
                }
            });
        });
    });
    res.send("Scrape Complete");
});

app.get("/articles", function(req, res) {
    db.Article.find({})
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
    });
});
  



app.listen(PORT,()=>{
    console.log("Server Listening on http://localhost:" + PORT);
});