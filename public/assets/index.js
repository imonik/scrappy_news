$(document).ready(function () {
    var $btnScrape = $('#btnScrappe');

    $btnScrape.on('click', function(){
        alert('clicked');
        // Using the core $.ajax() method
        $.ajax({
            url: "/scrape",// The URL for the request
            //data: {},// The data to send (will be converted to a query string)
            type: "GET",// Whether this is a POST or GET request
            //dataType: "json",// The type of data we expect back
        })
        .done(function (json) {// Code to run if the request succeeds (is done);
            // The response is passed to the function
            // $("<h1>").text(json.title).appendTo("body");
            // $("<div class=\"content\">").html(json.html).appendTo("body");
            console.log(json)
        })
        // Code to run if the request fails; the raw request and
        // status codes are passed to the function
        .fail(function (xhr, status, errorThrown) {
            alert("Sorry, there was a problem!");
            console.log("Error: " + errorThrown);
            console.log("Status: " + status);
            //console.dir(xhr);
        })
        // Code to run regardless of success or failure;
        // .always(function (xhr, status) {
        //     alert("The request is complete!");
        // });
    });

    function getAllNews(){

    }
});