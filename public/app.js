
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

const displayNote = function(note){
    const noteDiv = $("<div></div>");
    noteDiv.append($("<h4></h4").text(note.belongsTo));
    noteDiv.append($("<p></p>").text(note.body));

    $("#notes").append(noteDiv);
};


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



$(document).on("click",".MyCard",()=>{
    $("#selectedArticle").attr("data-id",$(this).attr("data-id"));
    $("#selectedArticle").text($(this).attr("data-healdine"));    
});

$(document).on("click","#createNote",()=>{
    newNote = {
        belongsTo:"ARTICLE ID",
        body :"THIS IS THE NOTE FOR THE ARTICLE"
        // belongsTo:$("#selectedArticle").attr("data-id"),
        // body: $("#newNote").val()
    }
    $("#newNote").val("");
    $.post("/newNote",newNote);
});
