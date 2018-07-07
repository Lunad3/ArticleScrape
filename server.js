const cheerio = require("cheerio");
const request = require("request");
const website = "https://www.nationalgeographic.org/news/";

console.log("SERVER RUNNING");
// grab the html from the webpage
request(website,(error,response,html)=>{
    console.log("INSIDE REQUEST");
    // use cheerio to mimic jquery/ajax
    const $ = cheerio.load(html);
    let articles = [];

    // select element of interest to grab information from
    $(".ng-search-result-tile").each((i,element)=>{
        console.log("articles ++");
        // grab specific information from the webpage
        const article = {
            url: website + $(element).children(".ng-promo-title a").attr("href"),
            thumbnail: website + $(element).children(".ng-image-link").attr("href"),
            headline: $(element).children(".ng-promo-title a").text(),
            summary: $(element).children("p").text()
        }
        // place information inside an Obj and add to results arr
        articles.push(article);
    });

    for(let i=0; i<articles.length; i++){
        console.log()
        console.log(articles[i]);
    }
});
