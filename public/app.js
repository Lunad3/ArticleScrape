$.getJSON("/articles",(data)=>{
    console.log(data);
    for (let i=0; i<data.length; i++){
        $("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].headline + "<br/>" + data[i].url + "</p>");
    }
});

$(document).on("click","p",()=>{
    $("#notes").empty();
    let thisId = $(this).attr("data-Id");
    console.log(thisId);
});