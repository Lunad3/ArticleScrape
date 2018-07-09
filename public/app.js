//helper function to place article in html
const displayArticle = function(article){
    const newCard = $("<div class='MyCard'></div>");
    newCard.attr("data-id",article._id);
    newCard.attr("data-headline",article.headline);
    
    const imgDiv  = $("<div class='MyCard-ImageDiv'></div>");
    const image   = $("<img class='MyCard-Image'>").attr("src",article.thumbnail);
    const title   = $("<h4  class='MyCard-Title'></h4>").text(article.headline);
    const link    = $("<a class='btn-floating halfway-fab waves-effect waves-light blue'><i class='material-icons'>Link</i></a>").attr("href",article.url);
    imgDiv.append(image);
    imgDiv.append(title);
    imgDiv.append(link);

    const contentDiv = $("<div class='MyCard-ContentDiv'></div>");
    const summary    = $("<p></p>").text(article.summary);
    contentDiv.append(summary);

    newCard.append(imgDiv);
    newCard.append(contentDiv);

    $("#articles").append(newCard);
};

//helper function to place note in html
const displayNote = function(note){
    const noteDiv = $("<div></div>");
    noteDiv.append($("<h4></h4").text(note.belongsTo));
    noteDiv.append($("<p></p>").text(note.body));

    $("#notes").append(noteDiv);
};

//When Page is Loaded, first load articles then notes
$.getJSON("/articles",data=>{
    for (let i=0; i<data.length; i++){
        console.log(data[i]);
        displayArticle(data[i]);
    }
}).then(()=>{
    $.getJSON("/notes",data=>{
        for (let i=0; i<data.length; i++){
            console.log(data[i]);
            displayNote(data[i]);
        }
    });
});

//when a card is clicked, show the user that it has been selected and save its articleID
//  PROBLEM!!!:: This currently dosent do anything, $(this) grabs an empty element
$(document).on("click",".MyCard",()=>{
    $("#selectedArticle").attr("data-id",$(this).attr("data-id"));
    $("#selectedArticle").text($(this).attr("data-healdine"));    
});

//Use the selected article and user to make a post request to the server to create a new Note
$(document).on("click","#createNote",()=>{
    newNote = {
        // currently the request information is hard coded in to show functionality
        // Since #selectedArticle is dependant on $(this) [currently not working] the request will fail
        belongsTo:"ARTICLE ID",
        body :"THIS IS THE NOTE FOR THE ARTICLE"
        // belongsTo:$("#selectedArticle").attr("data-id"),
        // body: $("#newNote").val()
    }
    $("#newNote").val("");
    $.post("/newNote",newNote);
});