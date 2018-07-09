
const makeCard = function(article){
    const newCard = $("<div class='MyCard'></div>");
    
    const imgDiv  = $("<div class='MyCard-ImageDiv'></div>")
    const image   = $("<img class='MyCard-Image'>").attr("src",article.thumbnail);
    const title   = $("<h4  class='MyCard-Title'></h4>").text(article.headline);
    const button  = $("<a class='btn-floating halfway-fab waves-effect waves-light red'><i class='material-icons'>+</i></a>")
    imgDiv.append(image);
    imgDiv.append(title);
    imgDiv.append(button);

    const contentDiv = $("<div class='MyCard-ContentDiv'></div>");
    const summary    = $("<p></p>").text(article.summary);
    contentDiv.append(summary);

    newCard.append(imgDiv);
    newCard.append(contentDiv);

    return newCard;
}

$.getJSON("/articles",(data)=>{
    console.log(data);
    for (let i=0; i<data.length; i++){
        $("#articles").append(makeCard(data[i]));
    }
});



// $(document).on("click","p",()=>{
//     $("#notes").empty();
//     let thisId = $(this).attr("data-Id");
//     console.log(thisId);
// });