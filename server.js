const cheerio = require("cheerio");
const request = require("request");
const website = "https://www.nationalgeographic.org/news/";

// grab the html from the webpage
request(website,(error,response,html)=>{

    // use cheerio to mimic jquery/ajax
    const $ = cheerio.load(html);
    let results = [];

    // select element of interest to grab information from
    $(".ng-margin-top .ng-clearfix").each((i,element)=>{

        // grab specific information from the webpage
        // const headline = $(element).children().text();
        // const summary = $().text();
        // const url = website + $(element).attr("href");

        // place information inside an Obj and add to results arr
        // results.push({
        //     headline: headline,
            // summary: summary,
            // url: url
        // });
    });
});